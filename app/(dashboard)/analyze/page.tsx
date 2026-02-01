'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useMutation } from '@tanstack/react-query';
import { analysis } from '@/lib/api';
import toast from 'react-hot-toast';
import Link from 'next/link';
import { Loader2, Sparkles, TrendingUp, AlertCircle } from 'lucide-react';

export default function AnalyzePage() {
  const router = useRouter();
  const [script, setScript] = useState('');
  const [scriptType, setScriptType] = useState('general');
  const [title, setTitle] = useState('');
  const [result, setResult] = useState<any>(null);

  const analyzeMutation = useMutation({
    mutationFn: () => analysis.analyze(script, scriptType, title),
    onSuccess: (data) => {
      setResult(data);
      toast.success('Analysis complete!');
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.detail || 'Analysis failed');
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (script.split(' ').length < 50) {
      toast.error('Script must be at least 50 words');
      return;
    }

    analyzeMutation.mutate();
  };

  const wordCount = script.split(' ').filter(w => w).length;

  return (
    <div className="min-h-screen bg-dark-950">
      {/* Header */}
      <nav className="border-b border-dark-800 bg-dark-900/50 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/dashboard" className="text-2xl font-bold text-gradient">
              ScriptLyze
            </Link>
            <Link href="/dashboard" className="text-dark-400 hover:text-white">
              Back to Dashboard
            </Link>
          </div>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {!result ? (
          <>
            <h1 className="text-4xl font-bold mb-8">Analyze Your Script</h1>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="card">
                <label className="block text-sm font-medium mb-2">Script Title (Optional)</label>
                <input
                  type="text"
                  className="input"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="My Awesome Video"
                />
              </div>

              <div className="card">
                <label className="block text-sm font-medium mb-2">Script Type</label>
                <select
                  className="input"
                  value={scriptType}
                  onChange={(e) => setScriptType(e.target.value)}
                >
                  <option value="general">General</option>
                  <option value="tutorial">Tutorial</option>
                  <option value="vlog">Vlog</option>
                  <option value="review">Review</option>
                  <option value="entertainment">Entertainment</option>
                  <option value="educational">Educational</option>
                </select>
              </div>

              <div className="card">
                <div className="flex justify-between items-center mb-2">
                  <label className="block text-sm font-medium">Your Script</label>
                  <span className="text-sm text-dark-400">
                    {wordCount} words
                  </span>
                </div>
                <textarea
                  className="input min-h-[400px] font-mono text-sm"
                  value={script}
                  onChange={(e) => setScript(e.target.value)}
                  placeholder="Paste your YouTube script here...

Example:
Did you know that 95% of YouTubers quit before hitting 1000 subscribers? I was almost one of them. But then I discovered this simple trick that changed everything..."
                />
                {wordCount < 50 && wordCount > 0 && (
                  <p className="text-yellow-400 text-sm mt-2 flex items-center gap-2">
                    <AlertCircle className="w-4 h-4" />
                    Minimum 50 words required ({50 - wordCount} more needed)
                  </p>
                )}
              </div>

              <button
                type="submit"
                disabled={analyzeMutation.isPending || wordCount < 50}
                className="btn btn-primary w-full text-lg py-4 flex items-center justify-center gap-2"
              >
                {analyzeMutation.isPending ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Analyzing...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5" />
                    Analyze Script
                  </>
                )}
              </button>
            </form>
          </>
        ) : (
          <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
              <h1 className="text-4xl font-bold">Analysis Results</h1>
              <button
                onClick={() => setResult(null)}
                className="btn btn-outline"
              >
                Analyze Another
              </button>
            </div>

            {/* Overall Score */}
            <div className="card bg-gradient-to-br from-primary-900/20 to-pink-900/20 border-primary-700">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold mb-2">Overall Score</h2>
                  <div className="flex items-center gap-3">
                    <span className="text-6xl font-bold text-primary-400">
                      {result.overall_score.toFixed(1)}
                    </span>
                    <div>
                      <div className="text-sm text-dark-400">out of 10</div>
                      <div className={`px-3 py-1 rounded-full text-sm font-semibold mt-1 ${
                        result.virality_prediction === 'High'
                          ? 'bg-green-500/20 text-green-400'
                          : result.virality_prediction === 'Medium'
                          ? 'bg-yellow-500/20 text-yellow-400'
                          : 'bg-red-500/20 text-red-400'
                      }`}>
                        {result.virality_prediction} Potential
                      </div>
                    </div>
                  </div>
                </div>
                <TrendingUp className="w-16 h-16 text-primary-500 opacity-50" />
              </div>
            </div>

            {/* Detailed Scores */}
            <div className="card">
              <h3 className="text-xl font-bold mb-4">Detailed Breakdown</h3>
              <div className="space-y-4">
                {Object.entries(result.scores).map(([key, value]: [string, any]) => (
                  <div key={key}>
                    <div className="flex justify-between mb-2">
                      <span className="font-medium capitalize">{key.replace('_', ' ')}</span>
                      <span className="font-bold">{value}/10</span>
                    </div>
                    <div className="h-3 bg-dark-800 rounded-full overflow-hidden">
                      <div
                        className={`h-full transition-all ${
                          value >= 8 ? 'bg-green-500' : value >= 6 ? 'bg-yellow-500' : 'bg-red-500'
                        }`}
                        style={{ width: `${value * 10}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Strengths */}
              {result.strengths?.length > 0 && (
                <div className="card">
                  <h3 className="text-lg font-bold mb-4 text-green-400">✓ Strengths</h3>
                  <ul className="space-y-3">
                    {result.strengths.map((strength: string, i: number) => (
                      <li key={i} className="flex items-start gap-2 text-sm">
                        <span className="text-green-500 mt-1 flex-shrink-0">✓</span>
                        <span>{strength}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Weaknesses */}
              {result.weaknesses?.length > 0 && (
                <div className="card">
                  <h3 className="text-lg font-bold mb-4 text-yellow-400">⚠ Weaknesses</h3>
                  <ul className="space-y-3">
                    {result.weaknesses.map((weakness: string, i: number) => (
                      <li key={i} className="flex items-start gap-2 text-sm">
                        <span className="text-yellow-500 mt-1 flex-shrink-0">!</span>
                        <span>{weakness}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Improvements */}
            {result.improvements?.length > 0 && (
              <div className="card">
                <h3 className="text-xl font-bold mb-4">💡 Improvement Suggestions</h3>
                <div className="space-y-4">
                  {result.improvements.map((imp: any, i: number) => (
                    <div key={i} className="border border-dark-800 rounded-lg p-4 bg-dark-900/50">
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 rounded-full bg-primary-500/20 flex items-center justify-center flex-shrink-0 mt-1">
                          <span className="text-primary-400 font-bold">{i + 1}</span>
                        </div>
                        <div className="flex-1">
                          <div className="font-semibold text-primary-400 mb-1">{imp.section}</div>
                          <div className="text-dark-400 text-sm mb-3">
                            <strong>Issue:</strong> {imp.issue}
                          </div>
                          <div className="bg-dark-800 p-3 rounded-lg">
                            <strong className="text-green-400">Suggestion:</strong>
                            <p className="mt-1">{imp.suggestion}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Viral Patterns */}
            <div className="card">
              <h3 className="text-lg font-bold mb-4">Viral Patterns</h3>
              
              {result.viral_patterns_detected?.length > 0 && (
                <div className="mb-4">
                  <div className="text-sm text-green-400 font-semibold mb-2">✓ Detected</div>
                  <div className="flex flex-wrap gap-2">
                    {result.viral_patterns_detected.map((pattern: string, i: number) => (
                      <span key={i} className="px-2 py-1 bg-green-500/20 text-green-400 rounded text-xs">
                        {pattern}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {result.viral_patterns_missing?.length > 0 && (
                <div>
                  <div className="text-sm text-yellow-400 font-semibold mb-2">⚠ Missing</div>
                  <div className="flex flex-wrap gap-2">
                    {result.viral_patterns_missing.map((pattern: string, i: number) => (
                      <span key={i} className="px-2 py-1 bg-yellow-500/20 text-yellow-400 rounded text-xs">
                        {pattern}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
