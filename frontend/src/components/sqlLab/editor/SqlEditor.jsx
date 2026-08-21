import { useEffect, useRef } from "react";
import Editor from "@monaco-editor/react";
import { Database } from "lucide-react";

import {
  registerSqlCompletionProvider,
} from "../utils/sqlCompletionProvider";

const SqlEditor = ({
  value,
  onChange,
  tables = [],
  columns = {},
}) => {
  const providerRef = useRef(null);

  useEffect(() => {
    return () => {
      providerRef.current?.dispose();
    };
  }, []);

  const registerCompletion = () => {
    providerRef.current?.dispose();

    providerRef.current =
      registerSqlCompletionProvider({
        tables,
        columns,
      });
  };

  const handleEditorDidMount = (editor, monaco) => {
    monaco.editor.defineTheme("workbench-sql", {
      base: "vs-dark",
      inherit: true,

      rules: [
        {
          token: "keyword",
          foreground: "569CD6",
        },
        {
          token: "keyword.sql",
          foreground: "569CD6",
        },
        {
          token: "string",
          foreground: "CE9178",
        },
        {
          token: "number",
          foreground: "B5CEA8",
        },
        {
          token: "comment",
          foreground: "6A9955",
        },
        {
          token: "type",
          foreground: "4EC9B0",
        },
        {
          token: "identifier",
          foreground: "D4D4D4",
        },
      ],

      colors: {
        "editor.background": "#05070B",
        "editor.foreground": "#D4D4D4",

        "editorLineNumber.foreground": "#475569",
        "editorLineNumber.activeForeground": "#94A3B8",

        "editorCursor.foreground": "#22D3EE",

        "editor.lineHighlightBackground": "#0B1018",
        "editor.lineHighlightBorder": "#00000000",

        "editor.selectionBackground": "#164E63",
        "editor.inactiveSelectionBackground": "#0F3442",

        "editorGutter.background": "#05070B",

        "editorIndentGuide.background": "#111827",
        "editorIndentGuide.activeBackground": "#1E293B",

        "editorSuggestWidget.background": "#0B1120",
        "editorSuggestWidget.border": "#1E293B",
        "editorSuggestWidget.foreground": "#CBD5E1",

        "editorSuggestWidget.selectedBackground": "#172554",

        "editorHoverWidget.background": "#0B1120",
        "editorHoverWidget.border": "#1E293B",

        "scrollbarSlider.background": "#33415580",
        "scrollbarSlider.hoverBackground": "#475569A0",
        "scrollbarSlider.activeBackground": "#64748BA0",
      },
    });

    monaco.editor.setTheme("workbench-sql");

    registerCompletion();

    editor.addCommand(
      monaco.KeyMod.CtrlCmd |
      monaco.KeyCode.Space,
      () => {
        editor.trigger(
          "keyboard",
          "editor.action.triggerSuggest",
          {}
        );
      }
    );

    editor.focus();
  };
  useEffect(() => {
    registerCompletion();

    return () => {
      providerRef.current?.dispose();
    };
  }, [tables, columns]);

  return (
    <div
      className="
        overflow-hidden
        rounded-2xl
        border
        border-slate-800
        bg-[#0b1120]
      "
    >

      {/* ================================================== */}
      {/* HEADER */}
      {/* ================================================== */}

      <div
        className="
          flex
          items-center
          justify-between
          border-b
          border-slate-800
          bg-[#0b1120]
          px-5
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
            <Database
              size={18}
              className="text-cyan-400"
            />
          </div>

          <div>

            <h2
              className="
                text-sm
                font-semibold
                text-white
              "
            >
              SQL Editor
            </h2>

            <p
              className="
                mt-0.5
                text-xs
                text-slate-500
              "
            >
              Write and execute PostgreSQL queries
            </p>

          </div>

        </div>


        {/* PostgreSQL */}

        <div
          className="
            flex
            items-center
            gap-2
            rounded-lg
            border
            border-emerald-500/20
            bg-emerald-500/10
            px-3
            py-1.5
          "
        >

          <span
            className="
              h-1.5
              w-1.5
              rounded-full
              bg-emerald-400
            "
          />

          <span
            className="
              text-xs
              font-medium
              text-emerald-400
            "
          >
            PostgreSQL
          </span>

        </div>

      </div>


      {/* ================================================== */}
      {/* EDITOR */}
      {/* ================================================== */}

      <div className="bg-[#05070b]">

        <Editor
          height="460px"
          defaultLanguage="sql"
          value={value || ""}
          onChange={(v) => onChange(v || "")}
          onMount={handleEditorDidMount}
          theme="vs-dark"

          options={{

            /* -------------------------------------------- */
            /* Layout */
            /* -------------------------------------------- */

            automaticLayout: true,

            padding: {
              top: 18,
              bottom: 18,
            },

            minimap: {
              enabled: false,
            },

            scrollBeyondLastLine: false,

            scrollbar: {
              vertical: "auto",
              horizontal: "auto",

              verticalScrollbarSize: 8,
              horizontalScrollbarSize: 8,

              useShadows: false,
            },


            /* -------------------------------------------- */
            /* Typography */
            /* -------------------------------------------- */

            fontSize: 15,

            fontFamily:
              "'JetBrains Mono', 'Fira Code', Consolas, monospace",

            fontLigatures: true,

            lineHeight: 25,

            letterSpacing: 0,


            /* -------------------------------------------- */
            /* Editing */
            /* -------------------------------------------- */

            wordWrap: "on",

            tabSize: 2,

            insertSpaces: true,

            detectIndentation: false,

            autoIndent: "full",

            formatOnPaste: true,

            formatOnType: false,


            /* -------------------------------------------- */
            /* Suggestions */
            /* -------------------------------------------- */

            suggestOnTriggerCharacters: true,

            quickSuggestions: {
              other: true,
              comments: false,
              strings: false,
            },

            snippetSuggestions: "top",

            suggestSelection: "first",

            parameterHints: {
              enabled: true,
            },

            acceptSuggestionOnEnter: "on",

            tabCompletion: "on",


            /* -------------------------------------------- */
            /* Lines / Gutter */
            /* -------------------------------------------- */

            lineNumbers: "on",

            lineNumbersMinChars: 3,

            renderLineHighlight: "line",

            renderWhitespace: "none",

            showFoldingControls: "mouseover",

            folding: true,

            foldingStrategy: "auto",


            /* -------------------------------------------- */
            /* Cursor */
            /* -------------------------------------------- */

            cursorBlinking: "smooth",

            cursorSmoothCaretAnimation: "on",

            cursorStyle: "line",

            cursorWidth: 2,

            smoothScrolling: true,

            roundedSelection: false,


            /* -------------------------------------------- */
            /* Brackets */
            /* -------------------------------------------- */

            matchBrackets: "always",

            bracketPairColorization: {
              enabled: true,
            },

            guides: {
              indentation: false,
              bracketPairs: true,
            },


            /* -------------------------------------------- */
            /* Clean UI */
            /* -------------------------------------------- */

            overviewRulerBorder: false,

            hideCursorInOverviewRuler: true,

            contextmenu: true,

            links: true,

            hover: {
              enabled: true,
            },

            stickyScroll: {
              enabled: false,
            },

            occurrencesHighlight: "singleFile",

            selectionHighlight: true,

            wordBasedSuggestions: "currentDocument",

            ariaLabel:
              "PostgreSQL SQL Editor",
          }}
        />

      </div>

    </div>
  );
};

export default SqlEditor;