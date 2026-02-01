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
                      <span className="font-medium capitaliz
