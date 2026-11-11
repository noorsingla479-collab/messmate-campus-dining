import { useState, useRef } from 'react';
import {
  FilePlus2,
  Upload,
  X,
  CheckCircle2,
  Image as ImageIcon,
  ArrowRight,
} from 'lucide-react';
import type { Issue, Category, Location, Priority } from '../types';
import { categories, locations, priorities, categoryColors } from '../types';
import { CategoryIcon } from '../components/CategoryIcon';
import type { PageId } from '../components/nav';

interface ReportIssueProps {
  onSubmit: (issue: Issue) => void;
  profileName: string;
  onNavigate: (page: PageId) => void;
}

export function ReportIssue({ onSubmit, profileName, onNavigate }: ReportIssueProps) {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<Category>('Electricity');
  const [location, setLocation] = useState<Location>('Hostel');
  const [priority, setPriority] = useState<Priority>('Medium');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState<string | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [success, setSuccess] = useState(false);
  const [submittedId, setSubmittedId] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 2 * 1024 * 1024) {
      setErrors({ ...errors, image: 'Image must be under 2MB' });
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      setImage(reader.result as string);
      setErrors({ ...errors, image: '' });
    };
    reader.readAsDataURL(file);
  };

  const validate = (): boolean => {
    const errs: Record<string, string> = {};
    if (title.trim().length < 5) errs.title = 'Title must be at least 5 characters';
    if (description.trim().length < 20) errs.description = 'Description must be at least 20 characters';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    const id = `ISS-${Date.now().toString().slice(-6)}`;
    const issue: Issue = {
      id,
      title: title.trim(),
      category,
      description: description.trim(),
      location,
      priority,
      status: 'Submitted',
      image,
      submittedBy: profileName,
      submittedAt: Date.now(),
      statusUpdates: [
        { status: 'Submitted', note: 'Issue reported by student', timestamp: Date.now(), by: profileName },
      ],
    };
    onSubmit(issue);
    setSubmittedId(id);
    setSuccess(true);
    setTitle('');
    setDescription('');
    setImage(null);
    setCategory('Electricity');
    setLocation('Hostel');
    setPriority('Medium');
  };

  if (success) {
    return (
      <div className="max-w-xl mx-auto animate-fadeIn">
        <div className="card p-8 text-center">
          <div className="w-16 h-16 rounded-full bg-teal-100 flex items-center justify-center mx-auto mb-4 animate-pop">
            <CheckCircle2 size={36} className="text-teal-600" />
          </div>
          <h2 className="text-2xl font-display font-bold text-ink-900 mb-2">Issue Reported Successfully!</h2>
          <p className="text-ink-500 mb-1">Your issue has been submitted and is now being tracked.</p>
          <p className="text-sm text-ink-400 mb-6">
            Issue ID: <span className="font-mono font-bold text-sky-600">{submittedId}</span>
          </p>
          <div className="flex gap-3 justify-center">
            <button onClick={() => onNavigate('track')} className="btn-primary">
              Track Issues <ArrowRight size={16} />
            </button>
            <button
              onClick={() => setSuccess(false)}
              className="btn-secondary"
            >
              <FilePlus2 size={16} /> Report Another
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6 animate-fadeIn">
      <div>
        <h1 className="text-2xl md:text-3xl font-display font-extrabold text-ink-900 mb-1">Report an Issue</h1>
        <p className="text-ink-500">Fill out the form below to report a campus issue. All fields marked with * are required.</p>
      </div>

      <form onSubmit={handleSubmit} className="card p-6 md:p-8 space-y-6">
        {/* Title */}
        <div>
          <label className="label">Issue Title *</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g. Broken tube light in Room 214"
            className="input"
            maxLength={100}
          />
          {errors.title && <p className="text-sm text-red-500 mt-1.5 font-medium">{errors.title}</p>}
        </div>

        {/* Category */}
        <div>
          <label className="label">Category *</label>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setCategory(cat)}
                className={`flex items-center gap-2 p-3 rounded-xl border-2 text-sm font-medium transition-all ${
                  category === cat
                    ? 'border-sky-400 bg-sky-50 text-sky-700 ring-2 ring-sky-100'
                    : 'border-ink-200 text-ink-600 hover:border-sky-200 hover:bg-sky-50/50'
                }`}
              >
                <CategoryIcon category={cat} size={18} />
                <span className="truncate">{cat}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Location + Priority */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="label">Location *</label>
            <select value={location} onChange={(e) => setLocation(e.target.value as Location)} className="input">
              {locations.map((loc) => (
                <option key={loc} value={loc}>{loc}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="label">Priority *</label>
            <div className="flex gap-2">
              {priorities.map((p) => (
                <button
                  key={p}
                  type="button"
                  onClick={() => setPriority(p)}
                  className={`flex-1 py-2.5 rounded-xl font-semibold text-sm border-2 transition-all ${
                    priority === p
                      ? p === 'High'
                        ? 'border-red-400 bg-red-50 text-red-700'
                        : p === 'Medium'
                        ? 'border-amber-400 bg-amber-50 text-amber-700'
                        : 'border-green-400 bg-green-50 text-green-700'
                      : 'border-ink-200 text-ink-500 hover:border-ink-300'
                  }`}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Description */}
        <div>
          <label className="label">Description *</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Provide a detailed description of the issue. Include specific locations, when it started, and any other relevant details."
            rows={4}
            className="input resize-none"
            maxLength={500}
          />
          <div className="flex items-center justify-between mt-1">
            {errors.description ? (
              <p className="text-sm text-red-500 font-medium">{errors.description}</p>
            ) : (
              <span />
            )}
            <span className="text-xs text-ink-400">{description.length}/500</span>
          </div>
        </div>

        {/* Image upload */}
        <div>
          <label className="label">Attach Image (Optional)</label>
          {image ? (
            <div className="relative rounded-xl overflow-hidden border border-ink-200 group">
              <img src={image} alt="Upload preview" className="w-full max-h-56 object-cover" />
              <button
                type="button"
                onClick={() => setImage(null)}
                className="absolute top-3 right-3 p-2 rounded-lg bg-ink-900/60 text-white hover:bg-ink-900/80 transition backdrop-blur"
              >
                <X size={18} />
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="w-full p-8 rounded-xl border-2 border-dashed border-ink-200 hover:border-sky-300 hover:bg-sky-50/50 transition-all flex flex-col items-center gap-2 text-ink-400 hover:text-sky-600"
            >
              <div className="w-12 h-12 rounded-xl bg-ink-50 flex items-center justify-center">
                <Upload size={24} />
              </div>
              <span className="font-semibold text-sm">Click to upload an image</span>
              <span className="text-xs text-ink-400">PNG, JPG up to 2MB</span>
            </button>
          )}
          <input
            ref={fileInputRef}
            type="file"
            accept="image/png,image/jpeg"
            onChange={handleImageUpload}
            className="hidden"
          />
          {errors.image && <p className="text-sm text-red-500 mt-1.5 font-medium">{errors.image}</p>}
        </div>

        {/* Summary preview */}
        {(title || description) && (
          <div className="rounded-xl bg-sky-50/50 border border-sky-100 p-4 animate-fadeIn">
            <div className="flex items-center gap-2 text-sm font-semibold text-sky-700 mb-2">
              <ImageIcon size={16} /> Preview Summary
            </div>
            <p className="text-sm text-ink-600">
              <span className={`badge ${categoryColors[category]} mr-1`}>{category}</span>
              {' • '}
              {location} • {priority} priority
            </p>
          </div>
        )}

        {/* Submit */}
        <div className="pt-2">
          <button type="submit" className="btn-primary w-full md:w-auto">
            <FilePlus2 size={18} /> Submit Issue
          </button>
        </div>
      </form>
    </div>
  );
}
