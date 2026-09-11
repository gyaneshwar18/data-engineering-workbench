import { useEffect, useRef, useState } from "react";
import Editor from "@monaco-editor/react";
import { Database } from "lucide-react";

import {
  registerSqlCompletionProvider,
} from "../utils/sqlCompletionProvider";

const SqlEditor = ({
  value,
  onChange,
  tables = [],
}) => {
  const monacoRef = useRef(null);
  const providerRef = useRef(null);

  const [isMobile, setIsMobile] = useState(() =>
    typeof window !== "undefined"
      ? window.matchMedia("(max-width: 767px)").matches
      : false
  );

  /* -------------------------------------------------- */
  /* Responsive Editor Height                           */
  /* -------------------------------------------------- */

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 767px)");

    const handleChange = (event) => {
      setIsMobile(event.matches);
    };

    setIsMobile(mediaQuery.matches);
    mediaQuery.addEventListener("change", handleChange);

    return () => {
      mediaQuery.removeEventListener("change", handleChange);
    };
  }, []);

  /* -------------------------------------------------- */
  /* Monaco Mount                                       */
  /* -------------------------------------------------- */

  const handleEditorDidMount = (editor, monaco) => {
    monacoRef.current = monaco;

    /* ----------------------------------------------- */
    /* SQL Editor Theme                                */
    /* ----------------------------------------------- */

    monaco.editor.defineTheme("sql-dark", {
      base: "vs-dark",
      inherit: true,

      rules: [
        {
          token: "keyword",
          foreground: "60A5FA",
        },
        {
          token: "keyword.sql",
          foreground: "60A5FA",
        },
        {
          token: "string",
          foreground: "A7F3D0",
        },
        {
          token: "number",
          foreground: "FBBF24",
        },
        {
          token: "comment",
          foreground: "64748B",
        },
        {
          token: "delimiter",
          foreground: "94A3B8",
        },
        {
          token: "type",
          foreground: "C4B5FD",
        },
      ],

      colors: {
        "editor.background": "#0B0D10",
        "editor.foreground": "#E2E8F0",

        "editorGutter.background": "#0B0D10",
        "editorLineNumber.foreground": "#475569",
        "editorLineNumber.activeForeground": "#94A3B8",

        "editor.lineHighlightBackground": "#14171C",
        "editor.lineHighlightBorder": "#14171C",

        "editorCursor.foreground": "#CBD5E1",

        "editor.selectionBackground": "#263241",
        "editor.inactiveSelectionBackground": "#1E2733",

        "editorSuggestWidget.background": "#111318",
        "editorSuggestWidget.foreground": "#E2E8F0",
        "editorSuggestWidget.border": "#252A32",
        "editorSuggestWidget.selectedBackground": "#1E293B",
        "editorSuggestWidget.highlightForeground": "#60A5FA",

        "editorHoverWidget.background": "#111318",
        "editorHoverWidget.foreground": "#E2E8F0",
        "editorHoverWidget.border": "#252A32",

        "scrollbarSlider.background": "#334155",
        "scrollbarSlider.hoverBackground": "#475569",
        "scrollbarSlider.activeBackground": "#64748B",

        "editorBracketMatch.background": "#1E293B",
        "editorBracketMatch.border": "#475569",

        "editorWidget.background": "#111318",
        "editorWidget.foreground": "#E2E8F0",
        "editorWidget.border": "#252A32",

        "input.background": "#111318",
        "input.foreground": "#E2E8F0",
        "input.border": "#334155",
      },
    });

    monaco.editor.setTheme("sql-dark");

    /* ----------------------------------------------- */
    /* Completion Provider                             */
    /* ----------------------------------------------- */

    providerRef.current?.dispose();

    providerRef.current =
      registerSqlCompletionProvider({
        monaco,
        tables,
      });

    editor.focus();
  };

  /* -------------------------------------------------- */
  /* Update Table Suggestions                           */
  /* -------------------------------------------------- */

  useEffect(() => {
    if (!monacoRef.current) return;

    providerRef.current?.dispose();

    providerRef.current =
      registerSqlCompletionProvider({
        monaco: monacoRef.current,
        tables,
      });

    return () => {
      providerRef.current?.dispose();
      providerRef.current = null;
    };
  }, [tables]);

  /* -------------------------------------------------- */
  /* Cleanup                                            */
  /* -------------------------------------------------- */

  useEffect(() => {
    return () => {
      providerRef.current?.dispose();
      providerRef.current = null;
    };
  }, []);

  /* -------------------------------------------------- */
  /* UI                                                 */
  /* -------------------------------------------------- */

  return (
    <div
      className="
        min-w-0
        w-full
        max-w-full
        overflow-hidden

        rounded-xl
        border
        border-slate-700/50

        bg-slate-900/70
        shadow-xl
        backdrop-blur-xl

        sm:rounded-2xl
      "
    >
      {/* ================================================= */}
      {/* Editor Header                                     */}
      {/* ================================================= */}

      <div
        className="
          flex
          min-w-0
          items-center
          justify-between
          gap-2

          border-b
          border-slate-700/50

          bg-slate-900/80

          px-3.5
          py-3

          sm:gap-4
          sm:px-6
          sm:py-4
        "
      >
        {/* Left */}

        <div className="flex min-w-0 items-center gap-2.5 sm:gap-3">
          <div
            className="
              flex
              h-8
              w-8
              shrink-0
              items-center
              justify-center

              rounded-lg
              border
              border-cyan-500/20
              bg-cyan-500/10

              sm:h-9
              sm:w-9
            "
          >
            <Database
              className="h-4 w-4 text-cyan-400 sm:h-5 sm:w-5"
            />
          </div>

          <div className="min-w-0">
            <h2
              className="
                truncate
                text-xs
                font-semibold
                text-white

                sm:text-sm
              "
            >
              SQL Editor
            </h2>

            <p
              className="
                mt-0.5
                truncate
                text-[10px]
                text-slate-400

                sm:text-sm
              "
            >
              Write and execute PostgreSQL queries
            </p>
          </div>
        </div>

        {/* Right */}

        <span
          className="
            shrink-0
            rounded-full
            border
            border-emerald-500/20
            bg-emerald-500/10

            px-2
            py-0.5

            text-[9px]
            font-medium
            text-emerald-400

            sm:px-3
            sm:py-1
            sm:text-xs
          "
        >
          PostgreSQL
        </span>
      </div>

      {/* ================================================= */}
      {/* Monaco Editor                                     */}
      {/* ================================================= */}

      <div
        className="
          min-w-0
          w-full
          max-w-full
          overflow-hidden

          bg-[#0B0D10]
        "
      >
        <Editor
          height={isMobile ? "300px" : "420px"}
          language="sql"
          value={value}
          onChange={(v) => onChange(v || "")}
          onMount={handleEditorDidMount}
          theme="sql-dark"

          options={{
            /* --------------------------------------- */
            /* Layout                                  */
            /* --------------------------------------- */

            automaticLayout: true,

            /* --------------------------------------- */
            /* Appearance                              */
            /* --------------------------------------- */

            minimap: {
              enabled: false,
            },

            fontSize: 14,

            fontFamily:
              "'JetBrains Mono', 'Fira Code', 'Consolas', monospace",

            fontLigatures: true,

            lineHeight: 22,

            /* --------------------------------------- */
            /* Lines                                   */
            /* --------------------------------------- */

            lineNumbers: "on",

            lineNumbersMinChars: 3,

            glyphMargin: false,

            folding: true,

            foldingHighlight: true,

            /* --------------------------------------- */
            /* Text                                    */
            /* --------------------------------------- */

            /*
             * Keep long SQL inside Monaco.
             * Lines stay on a single line and Monaco
             * handles horizontal scrolling internally.
             */
            wordWrap: "off",

            scrollBeyondLastLine: false,

            smoothScrolling: true,

            cursorBlinking: "smooth",

            cursorSmoothCaretAnimation: "on",

            renderWhitespace: "selection",

            renderLineHighlight: "line",

            roundedSelection: false,

            /* --------------------------------------- */
            /* Indentation                             */
            /* --------------------------------------- */

            tabSize: 2,

            insertSpaces: true,

            /* --------------------------------------- */
            /* Brackets                                */
            /* --------------------------------------- */

            automaticClosingBrackets: "always",

            automaticClosingQuotes: "always",

            bracketPairColorization: {
              enabled: true,
            },

            guides: {
              indentation: false,
              bracketPairs: true,
            },

            /* --------------------------------------- */
            /* Editor spacing                          */
            /* --------------------------------------- */

            padding: {
              top: 12,
              bottom: 12,
            },

            /* --------------------------------------- */
            /* Scrollbar                               */
            /* --------------------------------------- */

            overviewRulerBorder: false,

            hideCursorInOverviewRuler: true,

            scrollbar: {
              verticalScrollbarSize: 8,
              horizontalScrollbarSize: 8,
              useShadows: false,
              alwaysConsumeMouseWheel: false,
            },

            /* --------------------------------------- */
            /* Suggestions                             */
            /* --------------------------------------- */

            suggest: {
              showKeywords: false,
              showFunctions: false,
              showSnippets: false,
              showMethods: false,
              showFields: true,
              showVariables: false,
              showClasses: true,
              showConstants: false,
              showConstructors: false,
              showEnums: false,
              showInterfaces: false,
              showModules: false,
              showProperties: true,
              showReferences: false,
              showStructs: false,
              showUnits: false,
              showValues: false,
              showWords: false,
            },

            quickSuggestions: true,

            suggestOnTriggerCharacters: true,

            parameterHints: {
              enabled: false,
            },

            /* --------------------------------------- */
            /* Formatting                              */
            /* --------------------------------------- */

            formatOnPaste: false,

            formatOnType: false,

            wordBasedSuggestions: "off",

            /* --------------------------------------- */
            /* Context menu                            */
            /* --------------------------------------- */

            contextmenu: true,

            selectOnLineNumbers: true,
          }}
        />
      </div>
    </div>
  );
};

export default SqlEditor;