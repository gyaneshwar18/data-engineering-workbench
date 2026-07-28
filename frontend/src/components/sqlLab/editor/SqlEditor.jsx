import Editor from "@monaco-editor/react";

const SqlEditor = ({
  value = "",
  onChange = () => {},
}) => {
  const handleEditorChange = (value) => {
    onChange(value || "");
  };

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-700/50 bg-slate-900/70 backdrop-blur-xl">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-700/50 px-5 py-4">
        <div>
          <h2 className="text-sm font-semibold text-white">
            SQL Editor
          </h2>

          <p className="mt-1 text-xs text-slate-500">
            Write and execute SQL queries against your datasets.
          </p>
        </div>

        <div className="rounded-lg border border-cyan-500/20 bg-cyan-500/10 px-3 py-1">
          <span className="text-xs font-medium text-cyan-400">
            PostgreSQL
          </span>
        </div>
      </div>

      {/* Monaco Editor */}
      <Editor
        height="420px"
        defaultLanguage="sql"
        value={value}
        onChange={handleEditorChange}
        theme="vs-dark"
        options={{
          minimap: {
            enabled: false,
          },
          fontSize: 15,
          fontLigatures: true,
          wordWrap: "on",
          automaticLayout: true,
          scrollBeyondLastLine: false,
          padding: {
            top: 18,
            bottom: 18,
          },
          tabSize: 2,
          insertSpaces: true,
          formatOnPaste: true,
          formatOnType: true,
          suggestOnTriggerCharacters: true,
          quickSuggestions: true,
          smoothScrolling: true,
          cursorBlinking: "smooth",
          roundedSelection: true,
          renderLineHighlight: "all",
          contextmenu: true,
          lineNumbers: "on",
          folding: true,
          bracketPairColorization: {
            enabled: true,
          },
        }}
      />
    </div>
  );
};

export default SqlEditor;