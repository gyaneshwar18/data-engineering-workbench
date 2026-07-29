import { useEffect, useRef } from "react";
import Editor from "@monaco-editor/react";
import { Database } from "lucide-react";

import { registerSqlCompletionProvider } from "../utils/sqlCompletionProvider";

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

  const handleEditorDidMount = (editor, monaco) => {
    providerRef.current?.dispose();

    providerRef.current = registerSqlCompletionProvider({
      tables,
      columns,
    });

    editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.Space, () => {
      editor.trigger("keyboard", "editor.action.triggerSuggest", {});
    });

    editor.focus();
  };

  useEffect(() => {
    providerRef.current?.dispose();

    providerRef.current = registerSqlCompletionProvider({
      tables,
      columns,
    });

    return () => {
      providerRef.current?.dispose();
    };
  }, [tables, columns]);

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-700 bg-slate-900 shadow-xl">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-700 px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="rounded-lg bg-cyan-500/10 p-2">
            <Database className="h-5 w-5 text-cyan-400" />
          </div>

          <div>
            <h2 className="font-semibold text-white">
              SQL Editor
            </h2>

            <p className="text-sm text-slate-400">
              Write and execute PostgreSQL queries
            </p>
          </div>
        </div>

        <span className="rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-400">
          PostgreSQL
        </span>
      </div>

      {/* Editor */}
      <Editor
        height="420px"
        defaultLanguage="sql"
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
            "'JetBrains Mono','Fira Code','Consolas',monospace",

          wordWrap: "on",
          scrollBeyondLastLine: false,

          tabSize: 2,

          formatOnPaste: true,
          formatOnType: true,

          suggestOnTriggerCharacters: true,
          quickSuggestions: true,
          snippetSuggestions: "top",

          folding: true,

          lineNumbers: "on",

          renderWhitespace: "selection",

          smoothScrolling: true,

          cursorBlinking: "smooth",

          roundedSelection: true,
        }}
      />
    </div>
  );
};

export default SqlEditor;