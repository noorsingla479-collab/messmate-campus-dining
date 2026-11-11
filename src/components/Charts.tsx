import { useEffect, useState } from 'react';

interface BarChartProps {
  data: { label: string; value: number }[];
  maxValue?: number;
  unit?: string;
  color?: string;
  height?: number;
}

export function BarChart({ data, maxValue, unit = '', height = 200 }: BarChartProps) {
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
              {d.value}{unit}
            </span>
            <div
              className="w-full max-w-[48px] rounded-t-lg bg-gradient-to-t from-orange-500 to-orange-300 transition-all duration-700 ease-out relative group"
              style={{ height: h, minHeight: animated ? 4 : 0 }}
            >
              <div className="absolute inset-0 rounded-t-lg bg-gradient-to-t from-green-500/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
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
}

export function DonutChart({ segments, size = 180 }: DonutChartProps) {
  const [animated, setAnimated] = useState(false);
  const total = segments.reduce((s, seg) => s + seg.value, 0) || 1;
  const radius = size / 2 - 20;
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
        <circle cx={center} cy={center} r={radius} fill="none" stroke="#F5EDD8" strokeWidth={16} />
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
              strokeWidth={16}
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
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-2xl font-display font-bold text-ink-900">{total}</span>
        <span className="text-xs text-ink-500 font-medium">Total</span>
      </div>
    </div>
  );
}

interface LineChartProps {
  data: { label: string; value: number }[];
  height?: number;
  unit?: string;
}

export function LineChart({ data, height = 220, unit = '' }: LineChartProps) {
  const [animated, setAnimated] = useState(false);
  const max = Math.max(...data.map((d) => d.value), 1);
  const width = 100; // percentage-based
  const points = data.map((d, i) => {
    const x = (i / (data.length - 1)) * width;
    const y = 100 - (d.value / max) * 85;
    return { x, y, ...d };
  });

  useEffect(() => {
    const t = setTimeout(() => setAnimated(true), 100);
    return () => clearTimeout(t);
  }, []);

  const pathD = points
    .map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`)
    .join(' ');
  const areaD = `${pathD} L 100 100 L 0 100 Z`;

  return (
    <div className="w-full" style={{ height }}>
      <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-full overflow-visible">
        <defs>
          <linearGradient id="lineArea" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#FB923C" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#FB923C" stopOpacity="0" />
          </linearGradient>
        </defs>
        {[0, 25, 50, 75, 100].map((y) => (
          <line key={y} x1="0" y1={y} x2="100" y2={y} stroke="#F5EDD8" strokeWidth="0.3" />
        ))}
        <path
          d={areaD}
          fill="url(#lineArea)"
          style={{ opacity: animated ? 1 : 0, transition: 'opacity 0.8s ease-out 0.3s' }}
        />
        <path
          d={pathD}
          fill="none"
          stroke="#F97316"
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
            r="1.2"
            fill="#F97316"
            stroke="white"
            strokeWidth="0.5"
            style={{ opacity: animated ? 1 : 0, transition: `opacity 0.3s ease-out ${0.5 + i * 0.1}s` }}
          />
        ))}
      </svg>
      <div className="flex justify-around mt-2">
        {data.map((d) => (
          <div key={d.label} className="text-center">
            <span className="text-xs font-medium text-ink-500 block">{d.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
