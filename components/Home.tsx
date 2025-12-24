
import React, { FC, SVGProps } from 'react';
import type { AppView } from '../types';

interface HomeProps {
  setActiveView: (view: AppView) => void;
}

export const Home: FC<HomeProps> = ({ setActiveView }) => {
  return (
    <div className="space-y-8 animate-fade-in">
      <header className="bg-white rounded-xl shadow-lg p-8 text-center border-t-4 border-blue-600">
        <h1 className="text-4xl font-bold text-gray-800 mb-2">مرحباً بك في رفيق طالب الحقوق</h1>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          منصتك المتكاملة لإثراء رحلتك الأكاديمية في عالم القانون، من النقاشات الفكرية إلى إتقان البحث العلمي.
        </p>
      </header>

      <section>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <FeatureCard
            icon={<UsersIcon className="w-12 h-12 text-blue-500" />}
            title="ملتقى النقاش"
            description="شارك الأفكار، اطرح الأسئلة، وتناقش مع زملائك وأساتذتك في بيئة أكاديمية محفزة."
            onClick={() => setActiveView('forum')}
          />
          <FeatureCard
            icon={<BookOpenIcon className="w-12 h-12 text-green-500" />}
            title="مرشد البحث العلمي"
            description="احصل على توجيهات وخطوات عملية لبدء وتطوير أبحاثك القانونية بثقة واحترافية."
            onClick={() => setActiveView('research')}
          />
          <FeatureCard
            icon={<ShieldCheckIcon className="w-12 h-12 text-yellow-500" />}
            title="مساعد الأمانة العلمية"
            description="عزز أصالة كتاباتك. احصل على مساعدة لتحسين أسلوبك وتجنب السرقات العلمية."
            onClick={() => setActiveView('integrity')}
          />
        </div>
      </section>

       <footer className="text-center pt-4">
        <p className="text-gray-500">
          "المعرفة قوة، والقانون هو أداتها."
        </p>
      </footer>
    </div>
  );
};

interface FeatureCardProps {
  icon: React.ReactElement;
  title: string;
  description: string;
  onClick: () => void;
}

const FeatureCard: FC<FeatureCardProps> = ({ icon, title, description, onClick }) => (
  <div
    onClick={onClick}
    className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl hover:-translate-y-1 transform transition-all duration-300 cursor-pointer flex flex-col items-center text-center"
  >
    <div className="mb-4">{icon}</div>
    <h3 className="text-xl font-bold text-gray-800 mb-2">{title}</h3>
    <p className="text-gray-600 flex-grow">{description}</p>
     <button className="mt-4 text-blue-600 font-semibold hover:text-blue-800 transition-colors">
      اذهب الآن &rarr;
    </button>
  </div>
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

