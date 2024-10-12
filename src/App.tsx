import React, { useState, useEffect } from 'react';
import { Code, Play, Pause, RefreshCw } from 'lucide-react';
import CodeEditor from './components/CodeEditor';
import PromptInput from './components/PromptInput';
import { generateCode } from './utils/codeGenerator';

function App() {
  const [prompt, setPrompt] = useState('');
  const [generatedCode, setGeneratedCode] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [isContinuous, setIsContinuous] = useState(false);

  useEffect(() => {
    let interval: number | undefined;

    if (isContinuous && prompt) {
      interval = setInterval(() => {
        generateCode(prompt).then(setGeneratedCode);
      }, 5000); // Generate code every 5 seconds
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isContinuous, prompt]);

  const handleGenerateCode = async () => {
    if (prompt) {
      setIsGenerating(true);
      const code = await generateCode(prompt);
      setGeneratedCode(code);
      setIsGenerating(false);
    }
  };

  const toggleContinuousGeneration = () => {
    setIsContinuous(!isContinuous);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col p-8">
      <header className="mb-8">
        <h1 className="text-4xl font-bold text-gray-800 flex items-center">
          <Code className="mr-2" />
          Infinite Python Codebase Creator + Optimizer 24/7
        </h1>
      </header>
      <main className="flex-grow flex flex-col space-y-6">
        <PromptInput
          value={prompt}
          onChange={setPrompt}
          onSubmit={handleGenerateCode}
          isGenerating={isGenerating}
        />
        <div className="flex items-center space-x-4">
          <button
            onClick={handleGenerateCode}
            disabled={isGenerating || !prompt}
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors disabled:opacity-50"
          >
            {isGenerating ? (
              <RefreshCw className="animate-spin" />
            ) : (
              'Generate Code'
            )}
          </button>
          <button
            onClick={toggleContinuousGeneration}
            className={`px-4 py-2 rounded-md transition-colors ${
              isContinuous
                ? 'bg-red-500 hover:bg-red-600 text-white'
                : 'bg-green-500 hover:bg-green-600 text-white'
            }`}
          >
            {isContinuous ? <Pause /> : <Play />} Continuous Generation
          </button>
        </div>
        <CodeEditor value={generatedCode} />
      </main>
    </div>
  );
}

export default App;