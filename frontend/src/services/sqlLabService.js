import axios from "axios";

const API = import.meta.env.VITE_API_BASE_URL;

const sqlLabService = {
  // ===============================
  // Metadata
  // ===============================

  async fetchTables() {
    const { data } = await axios.get(`${API}/sql-lab/tables`);
    return data;
  },

  async fetchSchema(tableName) {
    const { data } = await axios.get(
      `${API}/sql-lab/schema/${tableName}`
    );

    return data;
  },

  async fetchMetadata() {
    const tables = await this.fetchTables();

    const allColumns = {};

    await Promise.all(
      tables.map(async (table) => {
        const columns = await this.fetchSchema(table);

        allColumns[table] = columns.map((column) => column.column);
      })
    );

    return {
      tables,
      columns: allColumns,
    };
  },

  // ===============================
  // Query Execution
  // ===============================

  async runQuery(query) {
    const { data } = await axios.post(
      `${API}/sql-lab/run`,
      {
        query,
      }
    );

    return data;
  },

  // ===============================
  // Save Query
  // ===============================

  async saveQuery(query) {
    const { data } = await axios.post(
      `${API}/sql-lab/save`,
      {
        query,
      }
    );

    return data;
  },

  // ===============================
  // Upload Dataset
  // ===============================

  async uploadCSV(file) {
    const formData = new FormData();

    formData.append("file", file);

    const { data } = await axios.post(
      `${API}/sql-lab/upload`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    return data;
  },
};

export default sqlLabService;