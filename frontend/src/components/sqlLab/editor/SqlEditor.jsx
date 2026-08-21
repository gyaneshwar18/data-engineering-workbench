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
  /* Register Monaco instance                           */
  /* -------------------------------------------------- */

  const handleEditorDidMount = (editor, monaco) => {
    monacoRef.current = monaco;

    providerRef.current?.dispose();

    providerRef.current =
      registerSqlCompletionProvider({
        monaco,
        tables,
      });

    editor.focus();
  };

  /* -------------------------------------------------- */
  /* Update table suggestions                           */
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

  return (
    <div
      className="
        overflow-hidden
        rounded-2xl
        border
        border-slate-800
        bg-black 
        shadow-xl
      "
    >

      {/* ------------------------------------------------ */}
      {/* Editor Header                                   */}
      {/* ------------------------------------------------ */}

      <div
        className="
          flex
          items-center
          justify-between
          border-b
          border-slate-800
          bg-slate-950
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
            <Database
              className="h-5 w-5 text-cyan-400"
            />
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

      {/* ------------------------------------------------ */}
      {/* Monaco Editor                                   */}
      {/* ------------------------------------------------ */}

      <div className="bg-black">

        <Editor
          height="420px"
          language="sql"
          value={value}
          onChange={(v) => onChange(v || "")}
          onMount={handleEditorDidMount}
          theme="vs-dark"

          options={{
            automaticLayout: true,

            minimap: {
              enabled: false,
            },

            fontSize: 15,

            fontFamily:
              "'JetBrains Mono', 'Fira Code', 'Consolas', monospace",

            fontLigatures: true,

            lineNumbers: "on",

            lineNumbersMinChars: 3,

            glyphMargin: false,

            folding: true,

            foldingHighlight: true,

            wordWrap: "on",

            scrollBeyondLastLine: false,

            smoothScrolling: true,

            cursorBlinking: "smooth",

            cursorSmoothCaretAnimation: "on",

            renderWhitespace: "selection",

            renderLineHighlight: "line",

            roundedSelection: false,

            tabSize: 2,

            insertSpaces: true,

            automaticClosingBrackets: "always",

            automaticClosingQuotes: "always",

            bracketPairColorization: {
              enabled: true,
            },

            guides: {
              indentation: false,
              bracketPairs: true,
            },

            padding: {
              top: 12,
              bottom: 12,
            },

            overviewRulerBorder: false,

            hideCursorInOverviewRuler: true,

            scrollbar: {
              verticalScrollbarSize: 8,
              horizontalScrollbarSize: 8,
              useShadows: false,
            },

            suggest: {
              showKeywords: false,
              showFunctions: false,
              showSnippets: false,
              showMethods: false,
              showFields: false,
              showVariables: false,
              showClasses: true,
              showConstants: false,
              showConstructors: false,
              showEnums: false,
              showInterfaces: false,
              showModules: false,
              showProperties: false,
              showReferences: false,
              showStructs: false,
              showUnits: false,
              showValues: false,
              showWords: false,
            },

            quickSuggestions: false,

            suggestOnTriggerCharacters: true,

            parameterHints: {
              enabled: false,
            },

            formatOnPaste: false,

            formatOnType: false,

            wordBasedSuggestions: "off",

            contextmenu: true,

            selectOnLineNumbers: true,
          }}
        />

      </div>

    </div>
  );
};

export default SqlEditor;