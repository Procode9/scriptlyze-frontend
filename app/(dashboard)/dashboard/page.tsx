'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useStore } from '@/lib/store';
import { useQuery } from '@tanstack/react-query';
import { analysis } from '@/lib/api';
import Link from 'next/link';
import { 
  Sparkles, 
  TrendingUp, 
  Clock, 
  BarChart3,
  ArrowRight,
  Loader2 
} from 'lucide-react';

export default function DashboardPage() {
  const router = useRouter();
  const user = useStore((state) => state.user);
  const isAuthenticated = useStore((state) => state.isAuthenticated);

  // Redirect if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated, router]);

  // Fetch stats
  const { data: stats } = useQuery({
    queryKey: ['stats'],
    queryFn: () => analysis.getStats(),
    enabled: isAuthenticated,
  });

  // Fetch recent analyses
  const { data: history, isLoading } = useQuery({
    queryKey: ['history'],
    queryFn: () => analysis.getHistory(5, 0),
    enabled: isAuthenticated,
  });

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary-500" />
      </div>
    );
  }

  const getPlanColor = (plan: string) => {
    if (plan === 'creator') return 'text-purple-400 bg-purple-500/20';
    if (plan === 'pro') return 'text-primary-400 bg-primary-500/20';
    return 'text-dark-400 bg-dark-800';
  };

  const getPlanLimit = (plan: string) => {
    if (plan === 'creator') return 500;
    if (plan === 'pro') return 50;
    return 3;
  };

  return (
    <div className="min-h-screen bg-dark-950">
      {/* Header */}
      <nav className="border-b border-dark-800 bg-dark-900/50 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="text-2xl font-bold text-gradient">
              ScriptLyze
            </Link>
            <div className="flex items-center gap-4">
              <span className={`px-3 py-1 rounded-full text-sm font-semibold capitalize ${getPlanColor(user.plan)}`}>
                {user.plan}
              </span>
              <button
                onClick={() => {
                  useStore.getState().logout();
                  router.push('/');
                }}
                className="text-dark-400 hover:text-white text-sm"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Welcome */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">
            Welcome back, {user.username || 'Creator'}! 👋
          </h1>
          <p className="text-dark-400 text-lg">
            Ready to analyze your next viral script?
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-4 gap-6 mb-12">
          {/* Analyses Used */}
          <div className="card">
            <div className="flex items-center justify-between mb-2">
              <span className="text-dark-400 text-sm">Analyses This Month</span>
              <BarChart3 className="w-5 h-5 text-primary-500" />
            </div>
            <div className="text-3xl font-bold">
              {user.analyses_this_month} / {getPlanLimit(user.plan)}
            </div>
            <div className="mt-2 h-2 bg-dark-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-primary-600"
                style={{
                  width: `${(user.analyses_this_month / getPlanLimit(user.plan)) * 100}%`,
                }}
              />
            </div>
          </div>

          {/* Total Analyses */}
          <div className="card">
            <div className="flex items-center justify-between mb-2">
              <span className="text-dark-400 text-sm">Total Analyses</span>
              <TrendingUp className="w-5 h-5 text-green-500" />
            </div>
            <div className="text-3xl font-bold">{user.total_analyses}</div>
            <div className="text-sm text-dark-500 mt-2">All time</div>
          </div>

          {/* Average Score */}
          <div className="card">
            <div className="flex items-center justify-between mb-2">
              <span className="text-dark-400 text-sm">Average Score</span>
              <Sparkles className="w-5 h-5 text-yellow-500" />
            </div>
            <div className="text-3xl font-bold">
              {stats?.average_score ? stats.average_score.toFixed(1) : '—'}
            </div>
            <div className="text-sm text-dark-500 mt-2">Out of 10</div>
          </div>

          {/* Best Score */}
          <div className="card">
            <div className="flex items-center justify-between mb-2">
              <span className="text-dark-400 text-sm">Best Score</span>
              <TrendingUp className="w-5 h-5 text-purple-500" />
            </div>
            <div className="text-3xl font-bold">
              {stats?.best_score ? stats.best_score.toFixed(1) : '—'}
            </div>
            <div className="text-sm text-dark-500 mt-2">Personal record</div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          <Link
            href="/analyze"
            className="card group hover:border-primary-600 transition-all cursor-pointer"
          >
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-2xl font-bold mb-2">Analyze New Script</h3>
                <p className="text-dark-400">
                  Get instant feedback on your YouTube script
                </p>
              </div>
              <ArrowRight className="w-8 h-8 text-primary-500 group-hover:translate-x-2 transition-transform" />
            </div>
          </Link>

          {user.plan === 'free' && (
            <Link
              href="/pricing"
              className="card bg-gradient-to-br from-primary-900/20 to-pink-900/20 border-primary-700 group hover:border-primary-600 transition-all cursor-pointer"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-2xl font-bold mb-2">Upgrade to Pro</h3>
                  <p className="text-dark-400">
                    50 analyses/month + A/B testing + improvements
                  </p>
                </div>
                <ArrowRight className="w-8 h-8 text-primary-500 group-hover:translate-x-2 transition-transform" />
              </div>
            </Link>
          )}
        </div>

        {/* Recent Analyses */}
        <div className="card">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">Recent Analyses</h2>
            <Link href="/history" className="text-primary-500 hover:text-primary-400 text-sm">
              View all
            </Link>
          </div>

          {isLoading ? (
            <div className="flex justify-center py-12">
              <Loader2 className="w-8 h-8 animate-spin text-primary-500" />
            </div>
          ) : history?.analyses?.length === 0 ? (
            <div className="text-center py-12 text-dark-400">
              <Sparkles className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p className="text-lg mb-2">No analyses yet</p>
              <p className="text-sm">Start by analyzing your first script!</p>
              <Link href="/analyze" className="btn btn-primary mt-4 inline-flex items-center gap-2">
                <Sparkles className="w-4 h-4" />
                Analyze Script
              </Link>
            </div>
          ) : (
            <div className="space-y-3">
              {history?.analyses?.map((item: any) => (
                <Link
                  key={item.id}
                  href={`/analysis/${item.id}`}
                  className="block p-4 bg-dark-800 rounded-lg hover:bg-dark-700 transition-all"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <h4 className="font-semibold mb-1">
                        {item.title || 'Untitled Script'}
                      </h4>
                      <div className="flex items-center gap-4 text-sm text-dark-400">
                        <span className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {new Date(item.created_at).toLocaleDateString()}
                        </span>
                        <span>{item.word_count} words</span>
                        <span className={`px-2 py-1 rounded text-xs font-semibold ${
                          item.virality_prediction === 'High'
                            ? 'bg-green-500/20 text-green-400'
                            : item.virality_prediction === 'Medium'
                            ? 'bg-yellow-500/20 text-yellow-400'
                            : 'bg-red-500/20 text-red-400'
                        }`}>
                          {item.virality_prediction} Potential
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className={`text-3xl font-bold ${
                        item.overall_score >= 8
                          ? 'text-green-400'
                          : item.overall_score >= 6
                          ? 'text-yellow-400'
                          : 'text-red-400'
                      }`}>
                        {item.overall_score.toFixed(1)}
                      </div>
                      <div className="text-xs text-dark-500">Score</div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
