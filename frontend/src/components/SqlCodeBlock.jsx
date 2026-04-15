import Editor from "react-simple-code-editor";
import Prism from "prismjs";
import "prismjs/components/prism-sql";
import "prismjs/themes/prism-tomorrow.css";

export default function SqlCodeBlock({ code, onChange }) {
  return (
    <div className="bg-gray-900 rounded-xl p-4 text-sm">
      <Editor
        value={code}
        onValueChange={onChange}
        highlight={(code) => Prism.highlight(code, Prism.languages.sql, "sql")}
        padding={10}
        className="outline-none text-green-400"
        style={{
          fontFamily: "monospace",
          minHeight: "120px"
        }}
      />
    </div>
  );
}