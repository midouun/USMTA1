
import React, { useState, FC } from 'react';
import type { DiscussionTopic } from '../types';
import { generateDiscussionTopic } from '../services/geminiService';
import { LoadingSpinner } from './LoadingSpinner';

const initialTopics: DiscussionTopic[] = [
  {
    id: 1,
    author: 'أ. خليل',
    avatar: 'https://picsum.photos/seed/prof/48/48',
    title: 'أثر التحول الرقمي على العقود الإدارية في الجزائر',
    content: 'مع التوجه العالمي نحو الرقمنة، كيف يمكن للقانون الإداري الجزائري التكيف مع العقود الإلكترونية والذكية؟ ما هي التحديات والفرص؟',
    replies: [
      { id: 1, author: 'فاطمة الزهراء', avatar: 'https://picsum.photos/seed/fatima/48/48', content: 'أعتقد أن التحدي الأكبر هو في الإطار التشريعي الحالي الذي قد لا يكون مواكباً لهذه التطورات السريعة.', timestamp: 'منذ ساعتين' },
      { id: 2, author: 'أمين', avatar: 'https://picsum.photos/seed/amine/48/48', content: 'نقطة مهمة، لكن ألا يمكن الاعتماد على القياس مع القوانين المقارنة كحل مؤقت؟', timestamp: 'منذ ساعة' },
    ],
    timestamp: 'منذ 3 ساعات'
  },
  {
    id: 2,
    author: 'سليمة',
    avatar: 'https://picsum.photos/seed/salima/48/48',
    title: 'المسؤولية الجنائية للذكاء الاصطناعي: هل نحن بحاجة لتشريع جديد؟',
    content: 'عندما يرتكب نظام ذكاء اصطناعي (سيارة ذاتية القيادة مثلاً) خطأ يؤدي إلى ضرر، من يتحمل المسؤولية؟ المبرمج، المالك، أم الكيان الاصطناعي نفسه؟',
    replies: [],
    timestamp: 'منذ يوم'
  },
];

export const DiscussionForum: FC = () => {
  const [topics, setTopics] = useState<DiscussionTopic[]>(initialTopics);
  const [activeTopic, setActiveTopic] = useState<DiscussionTopic | null>(topics[0]);
  const [newReply, setNewReply] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleAddReply = (topicId: number) => {
    if (!newReply.trim() || !activeTopic) return;
    const updatedTopic = {
      ...activeTopic,
      replies: [
        ...activeTopic.replies,
        {
          id: Date.now(),
          author: 'أنت',
          avatar: 'https://picsum.photos/seed/you/48/48',
          content: newReply,
          timestamp: 'الآن',
        }
      ]
    };
    
    setTopics(topics.map(t => t.id === topicId ? updatedTopic : t));
    setActiveTopic(updatedTopic);
    setNewReply('');
  };

  const handleGenerateTopic = async () => {
    setIsLoading(true);
    const newTopicContent = await generateDiscussionTopic();
    const newTopic: DiscussionTopic = {
        id: Date.now(),
        author: 'الذكاء الاصطناعي',
        avatar: 'https://picsum.photos/seed/ai/48/48',
        timestamp: 'الآن',
        replies: [],
        ...newTopicContent,
    };
    setTopics([newTopic, ...topics]);
    setActiveTopic(newTopic);
    setIsLoading(false);
  };

  return (
    <div className="flex flex-col lg:flex-row gap-6 h-[calc(100vh-4rem)]">
      {/* Topics List */}
      <div className="w-full lg:w-1/3 bg-white rounded-xl shadow-lg p-4 overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">مواضيع النقاش</h2>
          <button 
            onClick={handleGenerateTopic}
            disabled={isLoading}
            className="bg-blue-600 text-white px-3 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition flex items-center disabled:bg-blue-300">
            {isLoading ? <LoadingSpinner size="sm"/> : 'اقترح موضوعًا بالـ AI'}
          </button>
        </div>
        <ul className="space-y-2">
          {topics.map(topic => (
            <li key={topic.id} onClick={() => setActiveTopic(topic)} className={`p-3 rounded-lg cursor-pointer transition-colors ${activeTopic?.id === topic.id ? 'bg-blue-100' : 'hover:bg-gray-100'}`}>
              <h3 className="font-semibold text-gray-800">{topic.title}</h3>
              <p className="text-xs text-gray-500">طرحه: {topic.author}</p>
            </li>
          ))}
        </ul>
      </div>

      {/* Active Topic View */}
      <div className="w-full lg:w-2/3 bg-white rounded-xl shadow-lg p-6 flex flex-col">
        {activeTopic ? (
          <>
            <div className="border-b pb-4 mb-4 flex-shrink-0">
              <h1 className="text-2xl font-bold mb-2">{activeTopic.title}</h1>
              <div className="flex items-center text-sm text-gray-500">
                <img src={activeTopic.avatar} alt={activeTopic.author} className="w-8 h-8 rounded-full ml-2" />
                <span>{activeTopic.author}</span>
                <span className="mx-2">&middot;</span>
                <span>{activeTopic.timestamp}</span>
              </div>
              <p className="mt-4 text-gray-700">{activeTopic.content}</p>
            </div>

            <div className="flex-grow overflow-y-auto pr-2 space-y-4">
              {activeTopic.replies.map(reply => (
                <div key={reply.id} className="flex items-start">
                  <img src={reply.avatar} alt={reply.author} className="w-10 h-10 rounded-full ml-3" />
                  <div className="bg-gray-100 rounded-lg p-3 w-full">
                    <div className="flex justify-between items-center">
                      <span className="font-semibold">{reply.author}</span>
                      <span className="text-xs text-gray-500">{reply.timestamp}</span>
                    </div>
                    <p className="text-gray-700 mt-1">{reply.content}</p>
                  </div>
                </div>
              ))}
              {activeTopic.replies.length === 0 && <p className="text-center text-gray-500 py-8">لا توجد ردود بعد. كن أول من يشارك!</p>}
            </div>

            <div className="mt-4 pt-4 border-t flex-shrink-0">
              <div className="flex items-start">
                <img src="https://picsum.photos/seed/you/48/48" alt="أنت" className="w-10 h-10 rounded-full ml-3" />
                <div className="w-full flex">
                  <textarea
                    value={newReply}
                    onChange={(e) => setNewReply(e.target.value)}
                    placeholder="أضف ردك هنا..."
                    className="w-full p-2 border rounded-r-lg focus:ring-blue-500 focus:border-blue-500 transition"
                    rows={2}
                  />
                  <button onClick={() => handleAddReply(activeTopic.id)} className="bg-blue-600 text-white px-4 py-2 rounded-l-lg font-semibold hover:bg-blue-700 transition">
                    إرسال
                  </button>
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="flex items-center justify-center h-full">
            <p className="text-gray-500 text-lg">اختر موضوعًا لبدء النقاش.</p>
          </div>
        )}
      </div>
    </div>
  );
};
