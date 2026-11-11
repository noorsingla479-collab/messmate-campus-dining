import { useEffect, useState } from 'react';

interface BarChartProps {
  data: { label: string; value: number }[];
  maxValue?: number;
  unit?: string;
  height?: number;
  colorFrom?: string;
  colorTo?: string;
}

export function BarChart({
  data,
  maxValue,
  unit = '',
  height = 200,
  colorFrom = 'from-sky-500',
  colorTo = 'to-sky-300',
}: BarChartProps) {
  const max = maxValue ?? Math.max(...data.map((d) => d.value), 1);
  const [animated, setAnimated] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setAnimated(true), 100);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="flex items-end justify-around gap-2" style={{ height }}>
      {data.map((d) => {
        const pct = (d.value / max) * 100;
        const h = animated ? `${pct}%` : '0%';
        return (
          <div key={d.label} className="flex-1 flex flex-col items-center justify-end gap-2 h-full">
            <span className="text-xs font-bold text-ink-700 tabular-nums">
              {d.value}
              {unit}
            </span>
            <div
              className={`w-full max-w-[48px] rounded-t-lg bg-gradient-to-t ${colorFrom} ${colorTo} transition-all duration-700 ease-out relative group`}
              style={{ height: h, minHeight: animated ? 4 : 0 }}
            />
            <span className="text-xs font-medium text-ink-500">{d.label}</span>
          </div>
        );
      })}
    </div>
  );
}

interface DonutChartProps {
  segments: { label: string; value: number; color: string }[];
  size?: number;
  centerLabel?: string;
  centerValue?: string;
}

export function DonutChart({ segments, size = 180, centerLabel, centerValue }: DonutChartProps) {
  const [animated, setAnimated] = useState(false);
  const total = segments.reduce((s, seg) => s + seg.value, 0) || 1;
  const radius = size / 2 - 18;
  const circumference = 2 * Math.PI * radius;
  const center = size / 2;

  useEffect(() => {
    const t = setTimeout(() => setAnimated(true), 100);
    return () => clearTimeout(t);
  }, []);

  let offset = 0;
  return (
    <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={center} cy={center} r={radius} fill="none" stroke="#E2E8F0" strokeWidth={14} />
        {segments.map((seg, i) => {
          const len = (seg.value / total) * circumference;
          const dash = animated ? len : 0;
          const circle = (
            <circle
              key={i}
              cx={center}
              cy={center}
              r={radius}
              fill="none"
              stroke={seg.color}
              strokeWidth={14}
              strokeDasharray={`${dash} ${circumference}`}
              strokeDashoffset={-offset}
              strokeLinecap="round"
              style={{ transition: 'stroke-dasharray 0.8s ease-out, stroke-dashoffset 0.8s ease-out' }}
            />
          );
          offset += len;
          return circle;
        })}
      </svg>
      {(centerValue || centerLabel) && (
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-2xl font-display font-bold text-ink-900">{centerValue ?? total}</span>
          <span className="text-xs text-ink-500 font-medium">{centerLabel ?? 'Total'}</span>
        </div>
      )}
    </div>
  );
}

interface LineChartProps {
  data: { label: string; value: number }[];
  height?: number;
}

export function LineChart({ data, height = 220 }: LineChartProps) {
  const [animated, setAnimated] = useState(false);
  const max = Math.max(...data.map((d) => d.value), 1);
  const points = data.map((d, i) => {
    const x = (i / (data.length - 1)) * 100;
    const y = 100 - (d.value / max) * 80 - 5;
    return { x, y, ...d };
  });

  useEffect(() => {
    const t = setTimeout(() => setAnimated(true), 100);
    return () => clearTimeout(t);
  }, []);

  const pathD = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ');
  const areaD = `${pathD} L 100 100 L 0 100 Z`;

  return (
    <div className="w-full" style={{ height }}>
      <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-full overflow-visible">
        <defs>
          <linearGradient id="lineAreaBlue" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#0C8CE7" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#0C8CE7" stopOpacity="0" />
          </linearGradient>
        </defs>
        {[5, 25, 50, 75, 95].map((y) => (
          <line key={y} x1="0" y1={y} x2="100" y2={y} stroke="#E2E8F0" strokeWidth="0.3" />
        ))}
        <path
          d={areaD}
          fill="url(#lineAreaBlue)"
          style={{ opacity: animated ? 1 : 0, transition: 'opacity 0.8s ease-out 0.3s' }}
        />
        <path
          d={pathD}
          fill="none"
          stroke="#0C8CE7"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{
            strokeDasharray: 400,
            strokeDashoffset: animated ? 0 : 400,
            transition: 'stroke-dashoffset 1.2s ease-out',
          }}
        />
        {points.map((p, i) => (
          <circle
            key={i}
            cx={p.x}
            cy={p.y}
            r="1.3"
            fill="#0C8CE7"
            stroke="white"
            strokeWidth="0.5"
            style={{ opacity: animated ? 1 : 0, transition: `opacity 0.3s ease-out ${0.5 + i * 0.1}s` }}
          />
        ))}
      </svg>
      <div className="flex justify-around mt-2">
        {data.map((d) => (
          <span key={d.label} className="text-xs font-medium text-ink-500">
            {d.label}
          </span>
        ))}
      </div>
    </div>
  );
}

interface ProgressRingProps {
  percent: number;
  size?: number;
  label?: string;
}

export function ProgressRing({ percent, size = 120, label }: ProgressRingProps) {
  const [animated, setAnimated] = useState(false);
  const radius = size / 2 - 12;
  const circumference = 2 * Math.PI * radius;
  const center = size / 2;

  useEffect(() => {
    const t = setTimeout(() => setAnimated(true), 100);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={center} cy={center} r={radius} fill="none" stroke="#E2E8F0" strokeWidth={10} />
        <circle
          cx={center}
          cy={center}
          r={radius}
          fill="none"
          stroke="#14B8A6"
          strokeWidth={10}
          strokeDasharray={circumference}
          strokeDashoffset={animated ? circumference - (percent / 100) * circumference : circumference}
          strokeLinecap="round"
          style={{ transition: 'stroke-dashoffset 1s ease-out' }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-xl font-display font-bold text-ink-900">{Math.round(percent)}%</span>
        {label && <span className="text-[10px] text-ink-500 font-medium">{label}</span>}
      </div>
    </div>
  );
}
