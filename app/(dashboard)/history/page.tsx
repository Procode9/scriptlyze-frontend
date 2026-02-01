'use client';

import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { analysis } from '@/lib/api';
import Link from 'next/link';
import { Clock, Trash2, Eye, Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';

export default function HistoryPage() {
  const [limit] = useState(20);
  const [offset, setOffset] = useState(0);
  const queryClient = useQueryClient();

  const { data: history, isLoading } = useQuery({
    queryKey: ['history', limit, offset],
    queryFn: () => analysis.getHistory(limit, offset),
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => analysis.deleteAnalysis(id),
    onSuccess: () => {
      toast.success('Analysis deleted');
      queryClient.invalidateQueries({ queryKey: ['history'] });
    },
    onError: () => {
      toast.error('Failed to delete');
    },
  });

  const handleDelete = (id: string, title: string) => {
    if (confirm(`Delete "${title || 'Untitled'}"?`)) {
      deleteMutation.mutate(id);
    }
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
            <Link href="/dashboard" className="text-dark-400 hover:text-white">
              Back to Dashboard
            </Link>
          </div>
        </div>
      </nav>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-bold mb-8">Analysis History</h1>

        {isLoading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-primary-500" />
          </div>
        ) : history?.analyses?.length === 0 ? (
          <div className="card text-center py-20">
            <p className="text-dark-400 text-lg mb-4">No analyses yet</p>
            <Link href="/analyze" className="btn btn-primary inline-flex">
              Analyze Your First Script
            </Link>
          </div>
        ) : (
          <>
            <div className="space-y-4">
              {history?.analyses?.map((item: any) => (
                <div key={item.id} className="card hover:border-dark-700 transition-all">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <h3 className="text-xl font-bold mb-2">
                        {item.title || 'Untitled Script'}
                      </h3>
                      <div className="flex items-center gap-4 text-sm text-dark-400">
                        <span className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {new Date(item.created_at).toLocaleString()}
                        </span>
                        <span>{item.word_count} words</span>
                        <span className={`px-2 py-1 rounded text-xs font-semibold ${
                          item.virality_prediction === 'High'
                            ? 'bg-green-500/20 text-green-400'
                            : item.virality_prediction === 'Medium'
                            ? 'bg-yellow-500/20 text-yellow-400'
                            : 'bg-red-500/20 text-red-400'
                        }`}>
                          {item.virality_prediction}
