import * as monaco from "monaco-editor";

const SQL_KEYWORDS = [
  "SELECT",
  "FROM",
  "WHERE",
  "GROUP BY",
  "HAVING",
  "ORDER BY",
  "LIMIT",
  "OFFSET",
  "DISTINCT",
  "JOIN",
  "INNER JOIN",
  "LEFT JOIN",
  "RIGHT JOIN",
  "FULL OUTER JOIN",
  "CROSS JOIN",
  "ON",
  "AS",
  "AND",
  "OR",
  "NOT",
  "IN",
  "EXISTS",
  "BETWEEN",
  "LIKE",
  "IS NULL",
  "IS NOT NULL",
  "INSERT",
  "UPDATE",
  "DELETE",
  "CREATE",
  "ALTER",
  "DROP",
  "TRUNCATE",
  "VALUES",
  "INTO",
  "CASE",
  "WHEN",
  "THEN",
  "ELSE",
  "END",
  "UNION",
  "UNION ALL",
  "WITH",
];

const SQL_FUNCTIONS = [
  "COUNT",
  "SUM",
  "AVG",
  "MIN",
  "MAX",
  "ROUND",
  "ABS",
  "COALESCE",
  "NOW",
  "CURRENT_DATE",
  "CURRENT_TIMESTAMP",
  "LOWER",
  "UPPER",
  "LENGTH",
  "CONCAT",
  "SUBSTRING",
];

const SQL_SNIPPETS = [
  {
    label: "select",
    insertText:
`SELECT *
FROM \${1:table}
WHERE \${2:condition};`,
  },
  {
    label: "group",
    insertText:
`SELECT \${1:column},
COUNT(*) AS total
FROM \${2:table}
GROUP BY \${1:column};`,
  },
  {
    label: "join",
    insertText:
`SELECT *
FROM \${1:table1}
INNER JOIN \${2:table2}
ON \${1:table1}.id = \${2:table2}.id;`,
  },
  {
    label: "order",
    insertText:
`SELECT *
FROM \${1:table}
ORDER BY \${2:column} DESC;`,
  },
];

export const registerSqlCompletionProvider = ({
  tables = [],
  columns = {},
}) => {
  return monaco.languages.registerCompletionItemProvider("sql", {
    triggerCharacters: [".", " "],

    provideCompletionItems: () => {
      const suggestions = [];

      /* SQL Keywords */

      SQL_KEYWORDS.forEach((keyword) => {
        suggestions.push({
          label: keyword,
          kind: monaco.languages.CompletionItemKind.Keyword,
          insertText: keyword,
        });
      });

      /* SQL Functions */

      SQL_FUNCTIONS.forEach((fn) => {
        suggestions.push({
          label: fn,
          kind: monaco.languages.CompletionItemKind.Function,
          insertText: `${fn}($0)`,
          insertTextRules:
            monaco.languages
              .CompletionItemInsertTextRule
              .InsertAsSnippet,
        });
      });

      /* Tables */

      tables.forEach((table) => {
        suggestions.push({
          label: table,
          kind: monaco.languages.CompletionItemKind.Class,
          insertText: table,
          detail: "Table",
        });
      });

      /* Columns */

      Object.entries(columns).forEach(
        ([tableName, tableColumns]) => {
          tableColumns.forEach((column) => {
            suggestions.push({
              label: column,
              kind: monaco.languages.CompletionItemKind.Field,
              insertText: column,
              detail: tableName,
            });
          });
        }
      );

      /* Snippets */

      SQL_SNIPPETS.forEach((snippet) => {
        suggestions.push({
          label: snippet.label,
          kind: monaco.languages.CompletionItemKind.Snippet,
          insertText: snippet.insertText,
          insertTextRules:
            monaco.languages
              .CompletionItemInsertTextRule
              .InsertAsSnippet,
          documentation: "SQL Snippet",
        });
      });

      return { suggestions };
    },
  });
};