
import React, { useState, FC } from 'react';
import { analyzeTextForOriginality } from '../services/geminiService';
import { LoadingSpinner } from './LoadingSpinner';
import Markdown from 'react-markdown';

export const IntegrityHelper: FC = () => {
  const [text, setText] = useState('');
  const [analysis, setAnalysis] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleAnalyzeText = async () => {
    if (!text.trim()) return;
    setIsLoading(true);
    setAnalysis('');
    const result = await analyzeTextForOriginality(text);
    setAnalysis(result);
    setIsLoading(false);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-xl shadow-lg p-8 border-t-4 border-yellow-500">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">مساعد الأمانة العلمية</h1>
          <p className="text-gray-600 mt-2">احصل على ملاحظات بناءة لتحسين أسلوبك وتعزيز أصالة كتابتك.</p>
        </div>

        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="ألصق فقرة من كتابتك هنا لتحليلها..."
          className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition min-h-[200px]"
          rows={8}
        />
        <div className="text-center mt-4">
          <button
            onClick={handleAnalyzeText}
            disabled={isLoading || !text.trim()}
            className="bg-yellow-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-yellow-600 transition flex items-center justify-center disabled:bg-yellow-300 disabled:cursor-not-allowed mx-auto"
          >
            {isLoading ? <LoadingSpinner /> : 'تحليل النص'}
          </button>
        </div>
      </div>

      {(isLoading || analysis) && (
        <div className="mt-6 bg-white rounded-xl shadow-lg p-8">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center min-h-[200px]">
              <LoadingSpinner size="lg" />
              <p className="mt-4 text-gray-600">يتم تحليل النص بعناية...</p>
            </div>
          ) : (
            <div>
              <h2 className="text-2xl font-bold mb-4">نتائج التحليل</h2>
              <div className="prose prose-lg max-w-none text-right" dir="rtl">
                <Markdown>{analysis}</Markdown>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
