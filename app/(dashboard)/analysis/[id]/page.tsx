'use client';

import { useQuery } from '@tanstack/react-query';
import { analysis } from '@/lib/api';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { Loader2, ArrowLeft, Download, TrendingUp } from 'lucide-react';

export default function AnalysisDetailPage() {
  const params = useParams();
  const id = params.id as string;

  const { data: result, isLoading } = useQuery({
    queryKey: ['analysis', id],
    queryFn: () => analysis.getAnalysis(id),
  });

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-dark-950">
        <Loader2 className="w-8 h-8 animate-spin text-primary-500" />
      </div>
    );
  }

  if (!result) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-dark-950">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Analysis not found</h2>
          <Link href="/dashboard" className="btn btn-primary">
            Back to Dashboard
          </Link>
        </div>
      </div>
    );
  }

  const getScoreColor = (score: number) => {
    if (score >= 8) return 'text-green-400 bg-green-500/20';
    if (score >= 6) return 'text-yellow-400 bg-yellow-500/20';
    return 'text-red-400 bg-red-500/20';
  };

  return (
    <div className="min-h-screen bg-dark-950">
      {/* Header */}
      <nav className="border-b border-dark-800 bg-dark-900/50 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/dashboard" className="text-2xl font-bold text-gradient">
              ScriptLyze
            </Link>
            <div className="flex items-center gap-4">
              <button className="btn btn-outline flex items-center gap-2">
                <Download className="w-4 h-4" />
                Export PDF
              </button>
              <Link href="/history" className="text-dark-400 hover:text-white">
                Back to History
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Link href="/history" className="flex items-center gap-2 text-dark-400 hover:text-white mb-6">
          <ArrowLeft className="w-4 h-4" />
          Back to all analyses
        </Link>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Results */}
          <div className="lg:col-span-2 space-y-6">
            {/* Header */}
            <div className="card">
              <h1 className="text-3xl font-bold mb-4">
                {result.title || 'Analysis Results'}
              </h1>
              <div className="flex items-center gap-4 text-sm text-dark-400">
                <span>{new Date(result.created_at).toLocaleString()}</span>
                <span>•</span>
                <span>{result.word_count} words</span>
                <span>•</span>
                <span>{result.estimated_duration}</span>
              </div>
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
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
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

            {/* Meta */}
            <div className="card bg-dark-900">
              <h3 className="text-lg font-bold mb-4">Script Info</h3>
              <div className="space-y-3 text-sm">
                <div>
                  <div className="text-dark-500 mb-1">Word Count</div>
                  <div className="font-semibold">{result.word_count} words</div>
                </div>
                <div>
                  <div className="text-dark-500 mb-1">Estimated Duration</div>
                  <div className="font-semibold">{result.estimated_duration}</div>
                </div>
                {result.estimated_retention && (
                  <div>
                    <div className="text-dark-500 mb-1">Predicted Retention</div>
                    <div className="font-semibold">{result.estimated_retention}</div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
