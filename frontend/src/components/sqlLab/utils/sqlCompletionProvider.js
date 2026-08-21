export const registerSqlCompletionProvider = ({
  monaco,
  tables = [],
}) => {
  if (!monaco) {
    return {
      dispose: () => {},
    };
  }

  return monaco.languages.registerCompletionItemProvider(
    "sql",
    {
      /*
       * Only trigger when typing a table name.
       *
       * We intentionally DO NOT trigger on spaces.
       */
      triggerCharacters: [" "],

      provideCompletionItems: (model, position) => {
        const lineText = model
          .getLineContent(position.lineNumber)
          .substring(0, position.column - 1);

        /*
         * Show table suggestions only after:
         *
         * FROM
         * JOIN
         * INNER JOIN
         * LEFT JOIN
         * RIGHT JOIN
         * FULL JOIN
         * CROSS JOIN
         * UPDATE
         * INTO
         * DELETE FROM
         */

        const tableContext =
          /\b(from|join|inner\s+join|left\s+join|right\s+join|full\s+(?:outer\s+)?join|cross\s+join|update|into)\s+[a-zA-Z0-9_]*$/i.test(
            lineText
          );

        if (!tableContext) {
          return {
            suggestions: [],
          };
        }

        const word =
          model.getWordUntilPosition(position);

        const range = {
          startLineNumber: position.lineNumber,
          endLineNumber: position.lineNumber,
          startColumn: word.startColumn,
          endColumn: word.endColumn,
        };

        const suggestions = tables
          .map((table) => {
            const tableName =
              typeof table === "string"
                ? table
                : table?.table_name || table?.name;

            if (!tableName) {
              return null;
            }

            return {
              label: tableName,

              kind:
                monaco.languages.CompletionItemKind.Class,

              insertText: tableName,

              detail: "PostgreSQL table",

              range,
            };
          })
          .filter(Boolean);

        return {
          suggestions,
        };
      },
    }
  );
};