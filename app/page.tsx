import Link from 'next/link';
import { Sparkles, TrendingUp, Zap, BarChart3, Users, CheckCircle } from 'lucide-react';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-dark-950">
      {/* Navigation */}
      <nav className="border-b border-dark-800 bg-dark-900/50 backdrop-blur-xl fixed w-full top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="text-2xl font-bold text-gradient">
              ScriptLyze
            </div>
            <div className="flex items-center gap-4">
              <Link href="/login" className="text-dark-300 hover:text-white">
                Login
              </Link>
              <Link href="/signup" className="btn btn-primary">
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="pt-32 pb-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-6xl font-bold mb-6 animate-fade-in">
            Turn Your Scripts Into{' '}
            <span className="text-gradient">Viral Videos</span>
          </h1>
          <p className="text-xl text-dark-400 mb-8 max-w-2xl mx-auto">
            AI-powered script analysis that predicts virality, improves retention, 
            and helps you create content that actually performs.
          </p>
          <div className="flex gap-4 justify-center">
            <Link href="/signup" className="btn btn-primary text-lg px-8 py-4">
              <Sparkles className="w-5 h-5 mr-2 inline" />
              Analyze Your First Script
            </Link>
            <Link href="#features" className="btn btn-outline text-lg px-8 py-4">
              See How It Works
            </Link>
          </div>

          {/* Stats */}
          <div className="grid md:grid-cols-3 gap-8 mt-20 max-w-4xl mx-auto">
            <div className="card text-center">
              <div className="text-4xl font-bold text-primary-500 mb-2">95%</div>
              <div className="text-dark-400">Accuracy Rate</div>
            </div>
            <div className="card text-center">
              <div className="text-4xl font-bold text-primary-500 mb-2">10K+</div>
              <div className="text-dark-400">Scripts Analyzed</div>
            </div>
            <div className="card text-center">
              <div className="text-4xl font-bold text-primary-500 mb-2">2.5x</div>
              <div className="text-dark-400">Avg. View Increase</div>
            </div>
          </div>
        </div>
      </div>

      {/* Features */}
      <div id="features" className="py-20 px-4 bg-dark-900/30">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16">
            Everything You Need to <span className="text-gradient">Go Viral</span>
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="card hover:border-primary-600 transition-all">
              <div className="w-12 h-12 bg-primary-500/20 rounded-lg flex items-center justify-center mb-4">
                <TrendingUp className="w-6 h-6 text-primary-500" />
              </div>
              <h3 className="text-xl font-bold mb-2">Hook Analysis</h3>
              <p className="text-dark-400">
                AI analyzes your first 8 seconds to predict if viewers will keep watching or click away.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="card hover:border-primary-600 transition-all">
              <div className="w-12 h-12 bg-primary-500/20 rounded-lg flex items-center justify-center mb-4">
                <BarChart3 className="w-6 h-6 text-primary-500" />
              </div>
              <h3 className="text-xl font-bold mb-2">Retention Prediction</h3>
              <p className="text-dark-400">
                Get estimated retention percentage and learn exactly where viewers might drop off.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="card hover:border-primary-600 transition-all">
              <div className="w-12 h-12 bg-primary-500/20 rounded-lg flex items-center justify-center mb-4">
                <Zap className="w-6 h-6 text-primary-500" />
              </div>
              <h3 className="text-xl font-bold mb-2">Viral Pattern Detection</h3>
              <p className="text-dark-400">
                Identify proven viral patterns like curiosity gaps, social proof, and transformation stories.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="card hover:border-primary-600 transition-all">
              <div className="w-12 h-12 bg-primary-500/20 rounded-lg flex items-center justify-center mb-4">
                <Sparkles className="w-6 h-6 text-primary-500" />
              </div>
              <h3 className="text-xl font-bold mb-2">AI Improvements</h3>
              <p className="text-dark-400">
                Get specific, actionable suggestions to improve your hook, pacing, and call-to-action.
              </p>
            </div>

            {/* Feature 5 */}
            <div className="card hover:border-primary-600 transition-all">
              <div className="w-12 h-12 bg-primary-500/20 rounded-lg flex items-center justify-center mb-4">
                <Users className="w-6 h-6 text-primary-500" />
              </div>
              <h3 className="text-xl font-bold mb-2">A/B Testing</h3>
              <p className="text-dark-400">
                Compare two script versions and see which one is predicted to perform better.
              </p>
            </div>

            {/* Feature 6 */}
            <div className="card hover:border-primary-600 transition-all">
              <div className="w-12 h-12 bg-primary-500/20 rounded-lg flex items-center justify-center mb-4">
                <BarChart3 className="w-6 h-6 text-primary-500" />
              </div>
              <h3 className="text-xl font-bold mb-2">Performance Tracking</h3>
              <p className="text-dark-400">
                Track your script scores over time and see your improvement as a creator.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Pricing */}
      <div className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16">
            Simple, <span className="text-gradient">Transparent Pricing</span>
          </h2>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Free */}
            <div className="card hover:scale-105 transition-transform">
              <h3 className="text-2xl font-bold mb-2">Free</h3>
              <div className="text-4xl font-bold mb-6">
                $0<span className="text-lg text-dark-400">/month</span>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span>3 analyses per month</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span>Basic scoring</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span>Hook analysis</span>
                </li>
              </ul>
              <Link href="/signup" className="btn btn-outline w-full">
                Get Started
              </Link>
            </div>

            {/* Pro */}
            <div className="card border-primary-600 hover:scale-105 transition-transform relative">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary-600 text-white px-4 py-1 rounded-full text-sm font-semibold">
                Most Popular
              </div>
              <h3 className="text-2xl font-bold mb-2">Pro</h3>
              <div className="text-4xl font-bold mb-6">
                $29<span className="text-lg text-dark-400">/month</span>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span>50 analyses per month</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span>Full analysis + improvements</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span>A/B testing</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span>Export to PDF</span>
                </li>
              </ul>
              <Link href="/signup" className="btn btn-primary w-full">
                Start Free Trial
              </Link>
            </div>

            {/* Creator */}
            <div className="card hover:scale-105 transition-transform">
              <h3 className="text-2xl font-bold mb-2">Creator</h3>
              <div className="text-4xl font-bold mb-6">
                $99<span className="text-lg text-dark-400">/month</span>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span>500 analyses per month</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span>Everything in Pro</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span>API access</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span>Priority support</span>
                </li>
              </ul>
              <Link href="/signup" className="btn btn-outline w-full">
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="py-20 px-4 bg-gradient-to-r from-primary-900/20 to-pink-900/20">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">
            Ready to Create <span className="text-gradient">Viral Content?</span>
          </h2>
          <p className="text-xl text-dark-400 mb-8">
            Join thousands of creators using AI to optimize their YouTube scripts.
          </p>
          <Link href="/signup" className="btn btn-primary text-lg px-8 py-4">
            <Sparkles className="w-5 h-5 mr-2 inline" />
            Start Analyzing for Free
          </Link>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-dark-800 py-12 px-4">
        <div className="max-w-7xl mx-auto text-center text-dark-500">
          <p>&copy; 2025 ScriptLyze. Built with ❤️ for YouTube creators.</p>
        </div>
      </footer>
    </div>
  );
}
