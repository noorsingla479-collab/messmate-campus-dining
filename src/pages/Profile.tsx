import { useState } from 'react';
import { User, Save, Heart, Star, Pencil, Check, X, Mail, MapPin, DoorClosed, Hash } from 'lucide-react';
import type { Profile, Review } from '../types';
import { StarRating } from '../components/StarRating';
import { getMealById, allMeals } from '../data';
import { FoodCard } from '../components/FoodCard';

interface ProfilePageProps {
  profile: Profile;
  onUpdate: (profile: Profile) => void;
  reviews: Review[];
}

export function Profile({ profile, onUpdate, reviews }: ProfilePageProps) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState<Profile>(profile);
  const [saved, setSaved] = useState(false);

  const myReviews = reviews.filter((r) => r.author === 'You');

  const save = () => {
    onUpdate(draft);
    setEditing(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const cancel = () => {
    setDraft(profile);
    setEditing(false);
  };

  const toggleFavorite = (mealId: string) => {
    const newFavs = draft.favoriteMeals.includes(mealId)
      ? draft.favoriteMeals.filter((m) => m !== mealId)
      : [...draft.favoriteMeals, mealId];
    const newProfile = { ...draft, favoriteMeals: newFavs };
    setDraft(newProfile);
    if (!editing) onUpdate(newProfile);
  };

  const favoriteMealObjects = profile.favoriteMeals
    .map((id) => getMealById(id))
    .filter((m): m is NonNullable<typeof m> => m !== undefined);

  return (
    <div className="space-y-6 animate-fadeIn">
      <div>
        <h1 className="text-2xl md:text-3xl font-display font-extrabold text-ink-900 mb-1">My Profile</h1>
        <p className="text-ink-500">Manage your details, favourite meals, and see your reviews.</p>
      </div>

      {saved && (
        <div className="p-4 rounded-xl bg-green-50 border border-green-200 flex items-center gap-3 animate-pop">
          <Check className="text-green-500" size={22} />
          <p className="text-sm font-semibold text-green-800">Profile updated successfully!</p>
        </div>
      )}

      {/* Profile card */}
      <div className="card overflow-hidden">
        <div className="h-24 bg-gradient-to-r from-orange-400 to-orange-600" />
        <div className="px-6 pb-6">
          <div className="flex items-end justify-between -mt-10 mb-4">
            <div className="w-20 h-20 rounded-2xl bg-white shadow-card flex items-center justify-center border-4 border-white">
              <User className="text-orange-500" size={36} />
            </div>
            {!editing ? (
              <button onClick={() => setEditing(true)} className="btn-secondary">
                <Pencil size={16} /> Edit Profile
              </button>
            ) : (
              <div className="flex gap-2">
                <button onClick={save} className="btn-primary">
                  <Save size={16} /> Save
                </button>
                <button onClick={cancel} className="btn-ghost">
                  <X size={16} /> Cancel
                </button>
              </div>
            )}
          </div>

          {!editing ? (
            <>
              <h2 className="text-2xl font-display font-bold text-ink-900">{profile.name}</h2>
              <p className="text-ink-500 mb-1">{profile.email}</p>
              <p className="text-sm text-ink-600 leading-relaxed max-w-2xl mb-4">{profile.bio}</p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <InfoChip icon={Hash} label="Roll Number" value={profile.rollNumber} />
                <InfoChip icon={MapPin} label="Hostel" value={profile.hostel} />
                <InfoChip icon={DoorClosed} label="Room" value={profile.room} />
                <InfoChip icon={Mail} label="Email" value={profile.email} />
              </div>
            </>
          ) : (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="label">Name</label>
                  <input value={draft.name} onChange={(e) => setDraft({ ...draft, name: e.target.value })} className="input" />
                </div>
                <div>
                  <label className="label">Roll Number</label>
                  <input value={draft.rollNumber} onChange={(e) => setDraft({ ...draft, rollNumber: e.target.value })} className="input" />
                </div>
                <div>
                  <label className="label">Hostel</label>
                  <input value={draft.hostel} onChange={(e) => setDraft({ ...draft, hostel: e.target.value })} className="input" />
                </div>
                <div>
                  <label className="label">Room</label>
                  <input value={draft.room} onChange={(e) => setDraft({ ...draft, room: e.target.value })} className="input" />
                </div>
                <div className="md:col-span-2">
                  <label className="label">Email</label>
                  <input value={draft.email} onChange={(e) => setDraft({ ...draft, email: e.target.value })} className="input" />
                </div>
                <div className="md:col-span-2">
                  <label className="label">Bio</label>
                  <textarea value={draft.bio} onChange={(e) => setDraft({ ...draft, bio: e.target.value })} rows={3} className="input resize-none" maxLength={200} />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Favourite meals */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-display font-bold text-ink-900 flex items-center gap-2">
            <Heart size={20} className="text-orange-500 fill-orange-400" /> Favourite Meals
          </h2>
          {editing && (
            <span className="text-xs text-ink-400">Click meals below to toggle favourites</span>
          )}
        </div>

        {favoriteMealObjects.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-4 stagger">
            {favoriteMealObjects.map((meal) => (
              <FoodCard key={meal.id} meal={meal} />
            ))}
          </div>
        ) : (
          <div className="card p-8 text-center text-ink-400 mb-4">
            No favourites yet. {editing && 'Pick some meals below to add them!'}
          </div>
        )}

        {editing && (
          <div className="card p-4">
            <p className="text-sm font-semibold text-ink-700 mb-3">All Meals — click to toggle favourite</p>
            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-2">
              {allMeals.map((meal) => {
                const isFav = draft.favoriteMeals.includes(meal.id);
                return (
                  <button
                    key={meal.id}
                    onClick={() => toggleFavorite(meal.id)}
                    className={`relative rounded-xl overflow-hidden border-2 transition-all ${
                      isFav ? 'border-orange-400 ring-2 ring-orange-200' : 'border-transparent hover:border-cream-300'
                    }`}
                  >
                    <img src={meal.image} alt={meal.name} className="w-full h-16 object-cover" loading="lazy" />
                    {isFav && (
                      <div className="absolute top-1 right-1 bg-orange-500 rounded-full p-0.5">
                        <Heart size={12} className="text-white fill-white" />
                      </div>
                    )}
                    <p className="text-xs font-medium text-ink-700 p-1.5 truncate bg-white">{meal.name}</p>
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* My reviews */}
      <div>
        <h2 className="text-xl font-display font-bold text-ink-900 flex items-center gap-2 mb-4">
          <Star size={20} className="text-orange-500" /> My Reviews
        </h2>
        {myReviews.length === 0 ? (
          <div className="card p-8 text-center text-ink-400">
            You haven't written any reviews yet. Visit the Ratings page to share your thoughts!
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 stagger">
            {myReviews.map((review) => {
              const meal = getMealById(review.mealId);
              return (
                <div key={review.id} className="card p-5">
                  <div className="flex items-center gap-3 mb-3">
                    {meal && <img src={meal.image} alt={review.mealName} className="w-12 h-12 rounded-lg object-cover" />}
                    <div>
                      <h4 className="font-semibold text-ink-900 text-sm">{review.mealName}</h4>
                      <p className="text-xs text-ink-500">{new Date(review.createdAt).toLocaleDateString()}</p>
                    </div>
                  </div>
                  <StarRating value={review.rating} size={16} className="mb-2" />
                  <p className="text-sm text-ink-600 leading-relaxed">{review.comment}</p>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

function InfoChip({ icon: Icon, label, value }: { icon: typeof User; label: string; value: string }) {
  return (
    <div className="p-3 rounded-xl bg-cream-50 border border-cream-200">
      <div className="flex items-center gap-1.5 text-ink-400 mb-1">
        <Icon size={13} />
        <span className="text-xs font-medium">{label}</span>
      </div>
      <p className="text-sm font-semibold text-ink-800 truncate">{value}</p>
    </div>
  );
}
