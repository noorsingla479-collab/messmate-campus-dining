import { useState, useEffect } from 'react';
import { ChefHat, Menu as MenuIcon, X } from 'lucide-react';
import { navItems, type PageId } from './components/nav';
import { useLocalStorage } from './hooks/useLocalStorage';
import type { Review, Feedback, WasteReport, Profile } from './types';
import {
  seedReviews,
  seedFeedback,
  seedWasteReports,
  defaultProfile,
} from './seedData';
import { Dashboard } from './pages/Dashboard';
import { WeeklyMenu } from './pages/WeeklyMenu';
import { Ratings } from './pages/Ratings';
import { Feedback as FeedbackPage } from './pages/Feedback';
import { FoodWaste } from './pages/FoodWaste';
import { FoodAvailability } from './pages/FoodAvailability';
import { Profile as ProfilePage } from './pages/Profile';

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageId>('dashboard');
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  const [reviews, setReviews] = useLocalStorage<Review[]>('messmate_reviews', seedReviews);
  const [feedbacks, setFeedbacks] = useLocalStorage<Feedback[]>('messmate_feedbacks', seedFeedback);
  const [wasteReports, setWasteReports] = useLocalStorage<WasteReport[]>('messmate_waste', seedWasteReports);
  const [profile, setProfile] = useLocalStorage<Profile>('messmate_profile', defaultProfile);

  useEffect(() => {
    setMobileNavOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage]);

  const addReview = (r: Review) => setReviews((prev) => [r, ...prev]);
  const updateReview = (id: string, r: Review) =>
    setReviews((prev) => prev.map((x) => (x.id === id ? r : x)));
  const deleteReview = (id: string) =>
    setReviews((prev) => prev.filter((x) => x.id !== id));

  const addFeedback = (f: Feedback) => setFeedbacks((prev) => [f, ...prev]);
  const addWasteReport = (w: WasteReport) => setWasteReports((prev) => [w, ...prev]);

  const navigate = (page: PageId) => setCurrentPage(page);

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard reviews={reviews} profileName={profile.name} onNavigate={navigate} />;
      case 'menu':
        return <WeeklyMenu />;
      case 'ratings':
        return (
          <Ratings
            reviews={reviews}
            onAddReview={addReview}
            onUpdateReview={updateReview}
            onDeleteReview={deleteReview}
          />
        );
      case 'feedback':
        return <FeedbackPage feedbacks={feedbacks} onSubmit={addFeedback} />;
      case 'waste':
        return <FoodWaste reports={wasteReports} onSubmit={addWasteReport} />;
      case 'availability':
        return <FoodAvailability />;
      case 'profile':
        return <ProfilePage profile={profile} onUpdate={setProfile} reviews={reviews} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen flex bg-cream-100">
      {/* Sidebar — desktop */}
      <aside className="hidden lg:flex w-64 flex-shrink-0 bg-white border-r border-cream-200 flex-col sticky top-0 h-screen">
        <SidebarContent currentPage={currentPage} onNavigate={navigate} profileName={profile.name} />
      </aside>

      {/* Mobile nav */}
      {mobileNavOpen && (
        <div className="lg:hidden fixed inset-0 z-50">
          <div className="absolute inset-0 bg-ink-900/40 backdrop-blur-sm" onClick={() => setMobileNavOpen(false)} />
          <aside className="absolute left-0 top-0 bottom-0 w-72 bg-white shadow-2xl flex flex-col animate-fadeIn">
            <button onClick={() => setMobileNavOpen(false)} className="absolute top-4 right-4 p-2 rounded-lg hover:bg-cream-100">
              <X size={20} />
            </button>
            <SidebarContent currentPage={currentPage} onNavigate={navigate} profileName={profile.name} />
          </aside>
        </div>
      )}

      {/* Main content */}
      <div className="flex-1 min-w-0 flex flex-col">
        {/* Mobile header */}
        <header className="lg:hidden sticky top-0 z-40 bg-white border-b border-cream-200 px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center">
              <ChefHat size={20} className="text-white" />
            </div>
            <span className="font-display font-extrabold text-ink-900 text-lg">MessMate</span>
          </div>
          <button onClick={() => setMobileNavOpen(true)} className="p-2 rounded-lg hover:bg-cream-100">
            <MenuIcon size={22} />
          </button>
        </header>

        {/* Page content */}
        <main className="flex-1 p-4 md:p-6 lg:p-8 max-w-7xl mx-auto w-full">
          {renderPage()}
        </main>

        {/* Footer */}
        <footer className="border-t border-cream-200 bg-white px-6 py-4 text-center">
          <p className="text-sm text-ink-400">
            MessMate — Smarter Campus Dining. Built for students, by students.
          </p>
        </footer>
      </div>
    </div>
  );
}

function SidebarContent({
  currentPage,
  onNavigate,
  profileName,
}: {
  currentPage: PageId;
  onNavigate: (page: PageId) => void;
  profileName: string;
}) {
  return (
    <>
      <div className="p-6 border-b border-cream-200">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center shadow-soft">
            <ChefHat size={24} className="text-white" />
          </div>
          <div>
            <h1 className="font-display font-extrabold text-ink-900 text-lg leading-tight">MessMate</h1>
            <p className="text-xs text-ink-400 font-medium">Smarter Campus Dining</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = currentPage === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium text-sm transition-all ${
                active
                  ? 'bg-orange-500 text-white shadow-soft'
                  : 'text-ink-600 hover:bg-cream-100 hover:text-ink-900'
              }`}
            >
              <Icon size={20} className={active ? 'text-white' : 'text-ink-400'} />
              {item.label}
            </button>
          );
        })}
      </nav>

      <div className="p-4 border-t border-cream-200">
        <button
          onClick={() => onNavigate('profile')}
          className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-cream-100 transition-colors text-left"
        >
          <div className="w-10 h-10 rounded-xl bg-orange-100 flex items-center justify-center flex-shrink-0">
            <span className="font-display font-bold text-orange-600">
              {profileName.charAt(0).toUpperCase()}
            </span>
          </div>
          <div className="min-w-0">
            <p className="font-semibold text-ink-900 text-sm truncate">{profileName}</p>
            <p className="text-xs text-ink-400 truncate">View Profile</p>
          </div>
        </button>
      </div>
    </>
  );
}
