import React from 'react';

interface CodeEditorProps {
  value: string;
}

const CodeEditor: React.FC<CodeEditorProps> = ({ value }) => {
  return (
    <div className="bg-gray-800 rounded-lg p-4 overflow-auto">
      <pre className="text-green-400 font-mono text-sm whitespace-pre-wrap">
        {value || 'Generated code will appear here...'}
      </pre>
    </div>
  );
};

export default CodeEditor;