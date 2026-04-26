'use client';

import { useState } from 'react';
import { Send } from 'lucide-react';

type GreetingState = {
  message: string;
  isLoading: boolean;
  error: string | null;
};

export default function Home() {
  const [name, setName] = useState<string>('');
  const [greeting, setGreeting] = useState<GreetingState>({
    message: 'Hi',
    isLoading: false,
    error: null,
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setGreeting({
      message: greeting.message,
      isLoading: true,
      error: null,
    });

    try {
      const response = await fetch('/api/greet', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: name.trim() }),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch greeting');
      }

      const data = (await response.json()) as { message: string };

      setGreeting({
        message: data.message,
        isLoading: false,
        error: null,
      });
    } catch (err: unknown) {
      const errorMessage =
        err instanceof Error ? err.message : 'An unexpected error occurred';

      setGreeting({
        message: greeting.message,
        isLoading: false,
        error: errorMessage,
      });
    }
  };

  return (
    <div className="w-full max-w-md">
      <div className="bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
          Welcome
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label
              htmlFor="name-input"
              className="block text-sm font-medium text-gray-700"
            >
              Enter your name
            </label>
            <input
              id="name-input"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name here"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              aria-label="Enter your name"
              disabled={greeting.isLoading}
            />
          </div>

          <button
            type="submit"
            disabled={greeting.isLoading}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-semibold py-2 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
            aria-label="Say Hi button"
          >
            {greeting.isLoading ? (
              <>
                <span className="inline-block animate-spin">⏳</span>
                Processing...
              </>
            ) : (
              <>
                <Send size={18} />
                Say Hi
              </>
            )}
          </button>
        </form>

        <div className="mt-8 pt-8 border-t border-gray-200">
          {greeting.error ? (
            <div
              role="alert"
              className="bg-red-50 border border-red-200 rounded-lg p-4"
            >
              <p className="text-red-700 font-medium">Error</p>
              <p className="text-red-600 text-sm mt-1">{greeting.error}</p>
            </div>
          ) : (
            <div
              role="status"
              aria-live="polite"
              aria-label="Greeting message"
              className="bg-blue-50 border border-blue-200 rounded-lg p-4"
            >
              <p className="text-2xl font-bold text-blue-900 text-center">
                {greeting.message}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}