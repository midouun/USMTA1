

import React, { useState, FC, SVGProps } from 'react';
import { Home } from './components/Home';
import { DiscussionForum } from './components/DiscussionForum';
import { ResearchHub } from './components/ResearchHub';
import { IntegrityHelper } from './components/IntegrityHelper';
import type { AppView } from './types';

const App: FC = () => {
  const [activeView, setActiveView] = useState<AppView>('home');

  const renderView = () => {
    switch (activeView) {
      case 'forum':
        return <DiscussionForum />;
      case 'research':
        return <ResearchHub />;
      case 'integrity':
        return <IntegrityHelper />;
      case 'home':
      default:
        return <Home setActiveView={setActiveView} />;
    }
  };

  const NavLink: FC<{
    view: AppView;
    label: string;
    // Fix: Updated icon prop type to be more specific, allowing className to be passed via cloneElement.
    icon: React.ReactElement<SVGProps<SVGSVGElement>>;
  }> = ({ view, label, icon }) => (
    <button
      onClick={() => setActiveView(view)}
      className={`flex items-center w-full px-4 py-3 text-right rounded-lg transition-colors duration-200 ${
        activeView === view
          ? 'bg-blue-600 text-white shadow-lg'
          : 'text-gray-600 hover:bg-blue-50 hover:text-blue-600'
      }`}
    >
      {React.cloneElement(icon, { className: 'w-6 h-6 ml-3' })}
      <span className="font-medium">{label}</span>
    </button>
  );

  return (
    <div className="bg-gray-50 min-h-screen font-sans text-gray-800 flex flex-col md:flex-row" dir="rtl">
      <aside className="w-full md:w-64 bg-white shadow-md md:shadow-lg p-4 md:p-6 flex flex-col shrink-0">
        <div className="flex items-center mb-8">
          <div className="bg-blue-600 p-2 rounded-lg">
            <ScaleIcon className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-xl font-bold text-gray-800 mr-3">رفيق طالب الحقوق</h1>
        </div>
        <nav className="flex flex-row md:flex-col justify-around md:justify-start gap-2">
          <NavLink view="home" label="الرئيسية" icon={<HomeIcon />} />
          <NavLink view="forum" label="ملتقى النقاش" icon={<UsersIcon />} />
          <NavLink view="research" label="مرشد البحث" icon={<BookOpenIcon />} />
          <NavLink view="integrity" label="مساعد الأمانة العلمية" icon={<ShieldCheckIcon />} />
        </nav>
        <div className="mt-auto hidden md:block pt-6">
            <p className="text-xs text-center text-gray-500">
                مشروع ناشئ 2026
                <br />
                جامعة د. مولاي الطاهر - سعيدة
            </p>
        </div>
      </aside>

      <main className="flex-1 p-4 sm:p-6 md:p-8 overflow-y-auto">
        {renderView()}
      </main>
    </div>
  );
};

const HomeIcon: FC<SVGProps<SVGSVGElement>> = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
  </svg>
);

const UsersIcon: FC<SVGProps<SVGSVGElement>> = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.653-.184-1.268-.5-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.653.184-1.268.5-1.857m0 0a5.002 5.002 0 019 0m-4.5 4.5a5 5 0 100-10 5 5 0 000 10z" />
  </svg>
);

const BookOpenIcon: FC<SVGProps<SVGSVGElement>> = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
  </svg>
);

const ShieldCheckIcon: FC<SVGProps<SVGSVGElement>> = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const ScaleIcon: FC<SVGProps<SVGSVGElement>> = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3-1m0 0l3.001 9A5.002 5.002 0 0018 7l3-1m-3 1v12m-6-12v12m-6-12v12" />
    </svg>
);

export default App;