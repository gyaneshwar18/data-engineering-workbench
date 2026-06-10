import React from "react";

const PipelineLogsModal = ({ isOpen, onClose, logsData }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      
      <div className="bg-gray-900 text-white w-200 max-h-[80vh] rounded-lg shadow-lg p-4 overflow-hidden">
        
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-lg font-bold">Pipeline Logs</h2>
          <button onClick={onClose} className="text-red-400">X</button>
        </div>

        <div className="text-sm mb-2">
          <p>Status: {logsData?.status}</p>
          <p>Started: {logsData?.started_at}</p>
          <p>Finished: {logsData?.finished_at}</p>
        </div>

        <div className="bg-black p-3 rounded overflow-y-auto h-[60vh] text-green-400 font-mono text-xs">
          <pre>{logsData?.logs || "No logs available"}</pre>
        </div>

      </div>
    </div>
  );
};

export default PipelineLogsModal;