import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 to-black text-white px-4 py-10">
      <div className="flex flex-wrap items-center justify-center gap-12 mb-10">
        <a
          href="https://vite.dev"
          target="_blank"
          rel="noopener noreferrer"
          className="transition-transform hover:scale-110"
        >
          <img
            src={viteLogo}
            className="h-24 w-24 p-4 hover:drop-shadow-[0_0_1.5em_#646cffaa] transition-all duration-300"
            alt="Vite logo"
          />
        </a>
        <a
          href="https://react.dev"
          target="_blank"
          rel="noopener noreferrer"
          className="transition-transform hover:scale-110"
        >
          <img
            src={reactLogo}
            className="h-24 w-24 p-4 animate-spin-slow hover:drop-shadow-[0_0_1.5em_#61dafbaa]"
            alt="React logo"
          />
        </a>
      </div>

      <h1 className="text-4xl sm:text-5xl font-extrabold text-center mb-6">
        Vite + React + TypeScript + TailwindCSS
      </h1>

      <div className="mb-6 text-center">
        <button
          onClick={() => setCount((c) => c + 1)}
          className="bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium px-6 py-3 rounded-xl shadow-lg hover:shadow-blue-500/50 transition-all duration-300"
        >
          Count is {count}
        </button>
        <p className="mt-4 text-sm text-gray-300">
          Edit <code className="bg-gray-800 px-2 py-1 rounded font-mono">src/App.tsx</code> and save to test HMR.
        </p>
      </div>

      <p className="text-sm text-gray-400">
        Click on the Vite and React logos to learn more.
      </p>
    </div>
  );
}

export default App;
