import { useEffect, useRef } from "react";
import Editor from "@monaco-editor/react";
import { Database } from "lucide-react";

import { registerSqlCompletionProvider } from "../utils/sqlCompletionProvider";

const SqlEditor = ({
  value,
  onChange,
  tables = [],
}) => {
  const monacoRef = useRef(null);
  const providerRef = useRef(null);

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
        /* ----------------------------------------- */
        /* Main editor                               */
        /* ----------------------------------------- */

        "editor.background": "#0B0D10",
        "editor.foreground": "#E2E8F0",

        /* ----------------------------------------- */
        /* Line numbers                              */
        /* ----------------------------------------- */

        "editorGutter.background": "#0B0D10",

        "editorLineNumber.foreground": "#475569",

        "editorLineNumber.activeForeground": "#94A3B8",

        /* ----------------------------------------- */
        /* Current line                              */
        /* ----------------------------------------- */

        "editor.lineHighlightBackground": "#14171C",

        "editor.lineHighlightBorder": "#14171C",

        /* ----------------------------------------- */
        /* Cursor                                     */
        /* ----------------------------------------- */

        "editorCursor.foreground": "#CBD5E1",

        /* ----------------------------------------- */
        /* Selection                                  */
        /* ----------------------------------------- */

        "editor.selectionBackground": "#263241",

        "editor.inactiveSelectionBackground": "#1E2733",

        /* ----------------------------------------- */
        /* Suggestions                               */
        /* ----------------------------------------- */

        "editorSuggestWidget.background": "#111318",

        "editorSuggestWidget.foreground": "#E2E8F0",

        "editorSuggestWidget.border": "#252A32",

        "editorSuggestWidget.selectedBackground": "#1E293B",

        "editorSuggestWidget.highlightForeground": "#60A5FA",

        /* ----------------------------------------- */
        /* Hover / autocomplete                      */
        /* ----------------------------------------- */

        "editorHoverWidget.background": "#111318",

        "editorHoverWidget.foreground": "#E2E8F0",

        "editorHoverWidget.border": "#252A32",

        /* ----------------------------------------- */
        /* Scrollbar                                 */
        /* ----------------------------------------- */

        "scrollbarSlider.background": "#334155",

        "scrollbarSlider.hoverBackground": "#475569",

        "scrollbarSlider.activeBackground": "#64748B",

        /* ----------------------------------------- */
        /* Brackets                                  */
        /* ----------------------------------------- */

        "editorBracketMatch.background": "#1E293B",

        "editorBracketMatch.border": "#475569",

        /* ----------------------------------------- */
        /* Widgets                                   */
        /* ----------------------------------------- */

        "editorWidget.background": "#111318",

        "editorWidget.foreground": "#E2E8F0",

        "editorWidget.border": "#252A32",

        /* ----------------------------------------- */
        /* Input                                     */
        /* ----------------------------------------- */

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
        overflow-hidden
        rounded-2xl
        border
        border-slate-800
        bg-[#0B0D10]
        shadow-xl
      "
    >

      {/* ================================================= */}
      {/* Editor Header                                     */}
       {/* ================================================= */}

      
      <div
        className="
    flex
    items-center
    justify-between
    border-b
    border-slate-780
    bg-slate-900
    px-6
    py-4
  "
      >
        <div className="flex items-center gap-3">

          <div
            className="
        flex
        h-9
        w-9
        items-center
        justify-center
        rounded-lg
        border
        border-cyan-500/20
        bg-cyan-500/10
      "
          >
            <Database className="h-5 w-5 text-cyan-400" />
          </div>

          <div>
            <h2 className="text-sm font-semibold text-white">
              SQL Editor
            </h2>

            <p className="text-xs text-slate-500">
              Write and execute PostgreSQL queries
            </p>
          </div>

        </div>

        <span
          className="
      rounded-full
      border
      border-emerald-500/20
      bg-emerald-500/10
      px-3
      py-1
      text-xs
      font-medium
      text-emerald-400
    "
        >
          PostgreSQL
        </span>
      </div>



      {/* ================================================= */}
      {/* Monaco Editor                                     */}
      {/* ================================================= */}

      <div className="bg-[#0B0D10]">

        <Editor
          height="420px"
          language="sql"

          value={value}

          onChange={(v) => onChange(v || "")}

          onMount={handleEditorDidMount}

          theme="sql-dark"

          options={{
            automaticLayout: true,

            /* --------------------------------------- */
            /* Appearance                              */
            /* --------------------------------------- */

            minimap: {
              enabled: false,
            },

            fontSize: 15,

            fontFamily:
              "'JetBrains Mono', 'Fira Code', 'Consolas', monospace",

            fontLigatures: true,

            lineHeight: 24,

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

            wordWrap: "on",

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
              top: 16,
              bottom: 16,
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