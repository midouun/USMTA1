
import React, { useState, FC } from 'react';
import { generateResearchGuidance } from '../services/geminiService';
import { LoadingSpinner } from './LoadingSpinner';
import Markdown from 'react-markdown';

export const ResearchHub: FC = () => {
  const [topic, setTopic] = useState('');
  const [guidance, setGuidance] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleGetGuidance = async () => {
    if (!topic.trim()) return;
    setIsLoading(true);
    setGuidance('');
    const result = await generateResearchGuidance(topic);
    setGuidance(result);
    setIsLoading(false);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-xl shadow-lg p-8 border-t-4 border-green-500">
        <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800">مرشد البحث العلمي</h1>
            <p className="text-gray-600 mt-2">أدخل موضوع بحثك واحصل على خارطة طريق للبدء.</p>
        </div>

        <div className="flex gap-2">
          <input
            type="text"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder="مثال: الحماية القانونية للبيانات الشخصية في الجزائر"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition"
          />
          <button
            onClick={handleGetGuidance}
            disabled={isLoading || !topic.trim()}
            className="bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition flex items-center justify-center disabled:bg-green-300 disabled:cursor-not-allowed"
          >
            {isLoading ? <LoadingSpinner /> : 'احصل على الإرشاد'}
          </button>
        </div>
      </div>

      {(isLoading || guidance) && (
        <div className="mt-6 bg-white rounded-xl shadow-lg p-8">
            {isLoading ? (
                <div className="flex flex-col items-center justify-center min-h-[200px]">
                    <LoadingSpinner size="lg"/>
                    <p className="mt-4 text-gray-600">يقوم الأستاذ الافتراضي بإعداد إرشاداتك...</p>
                </div>
            ) : (
                <div className="prose prose-lg max-w-none text-right" dir="rtl">
                    <Markdown>{guidance}</Markdown>
                </div>
            )}
        </div>
      )}
    </div>
  );
};
