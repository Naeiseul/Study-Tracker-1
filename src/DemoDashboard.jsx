import { useState } from 'react';
import './Dashboard.css';
import './DemoDashboard.css';

const DEMO_DATA = {
  dbe: {
    label: 'NSC — DBE',
    subjects: [
      { name: 'Mathematics', pct: 72, grade: 'B', color: '#4DA8DA', hours: 38 },
      { name: 'Physical Sciences', pct: 58, grade: 'C', color: '#E63946', hours: 29 },
      { name: 'English Home Language', pct: 81, grade: 'A', color: '#2ECC71', hours: 22 },
      { name: 'Life Sciences', pct: 65, grade: 'C', color: '#F5A623', hours: 18 },
      { name: 'Geography', pct: 74, grade: 'B', color: '#9B59B6', hours: 15 },
      { name: 'Afrikaans FAL', pct: 69, grade: 'B', color: '#1ABC9C', hours: 12 },
      { name: 'Life Orientation', pct: 88, grade: 'A', color: '#3498DB', hours: 5 },
    ],
    trends: [
      { term: 'Term 1', avg: 62 },
      { term: 'Term 2', avg: 67 },
      { term: 'Term 3', avg: 72 },
      { term: 'Term 4', avg: 75 },
    ],
  },
  ieb: {
    label: 'NSC — IEB',
    subjects: [
      { name: 'Mathematics', pct: 78, grade: 'A', color: '#4DA8DA', hours: 42 },
      { name: 'Physical Sciences', pct: 62, grade: 'C', color: '#E63946', hours: 31 },
      { name: 'English Home Language', pct: 85, grade: 'A', color: '#2ECC71', hours: 25 },
      { name: 'Accounting', pct: 71, grade: 'B', color: '#F5A623', hours: 20 },
      { name: 'Business Studies', pct: 66, grade: 'C', color: '#9B59B6', hours: 14 },
      { name: 'Afrikaans FAL', pct: 73, grade: 'B', color: '#1ABC9C', hours: 10 },
      { name: 'Life Orientation', pct: 91, grade: 'A', color: '#3498DB', hours: 4 },
    ],
    trends: [
      { term: 'Term 1', avg: 70 },
      { term: 'Term 2', avg: 73 },
      { term: 'Term 3', avg: 75 },
      { term: 'Term 4', avg: 78 },
    ],
  },
  cambridge: {
    label: 'Cambridge',
    levels: {
      igcse: {
        label: 'IGCSE',
        subjects: [
          { name: 'Mathematics (0580)', pct: 74, grade: 'A', color: '#4DA8DA', hours: 42 },
          { name: 'English Language (0500)', pct: 69, grade: 'B', color: '#2ECC71', hours: 30 },
          { name: 'Physics (0625)', pct: 61, grade: 'B', color: '#E63946', hours: 34 },
          { name: 'Chemistry (0620)', pct: 66, grade: 'B', color: '#F5A623', hours: 28 },
          { name: 'Biology (0610)', pct: 72, grade: 'A', color: '#1ABC9C', hours: 22 },
          { name: 'Economics (0455)', pct: 78, grade: 'A', color: '#9B59B6', hours: 18 },
          { name: 'Business Studies (0450)', pct: 70, grade: 'B', color: '#3498DB', hours: 15 },
          { name: 'Computer Science (0478)', pct: 58, grade: 'C', color: '#E67E22', hours: 20 },
        ],
        trends: [
          { term: 'Mock 1', avg: 60 },
          { term: 'Mock 2', avg: 65 },
          { term: 'Mock 3', avg: 69 },
          { term: 'Final', avg: 72 },
        ],
      },
      as: {
        label: 'AS Level',
        subjects: [
          { name: 'Mathematics (9709)', pct: 76, grade: 'A', color: '#4DA8DA', hours: 45 },
          { name: 'Physics (9702)', pct: 63, grade: 'B', color: '#E63946', hours: 35 },
          { name: 'Chemistry (9701)', pct: 59, grade: 'C', color: '#F5A623', hours: 28 },
          { name: 'Economics (9708)', pct: 82, grade: 'A', color: '#2ECC71', hours: 20 },
          { name: 'English Language (9093)', pct: 77, grade: 'A', color: '#9B59B6', hours: 15 },
        ],
        trends: [
          { term: 'Mock 1', avg: 58 },
          { term: 'Mock 2', avg: 65 },
          { term: 'Mock 3', avg: 71 },
          { term: 'Final', avg: 74 },
        ],
      },
      al: {
        label: 'A Level',
        subjects: [
          { name: 'Mathematics (9709)', pct: 71, grade: 'A', color: '#4DA8DA', hours: 55 },
          { name: 'Physics (9702)', pct: 58, grade: 'B', color: '#E63946', hours: 48 },
          { name: 'Chemistry (9701)', pct: 54, grade: 'C', color: '#F5A623', hours: 42 },
          { name: 'Further Mathematics (9231)', pct: 62, grade: 'B', color: '#9B59B6', hours: 50 },
          { name: 'Economics (9708)', pct: 75, grade: 'A', color: '#2ECC71', hours: 30 },
        ],
        trends: [
          { term: 'Mock 1', avg: 52 },
          { term: 'Mock 2', avg: 58 },
          { term: 'Mock 3', avg: 63 },
          { term: 'Final', avg: 67 },
        ],
      },
    },
  },
  university: {
    label: 'University',
    subjects: [
      { name: 'Financial Accounting', pct: 68, grade: 'B', color: '#4DA8DA', hours: 40 },
      { name: 'Microeconomics', pct: 74, grade: 'B', color: '#E63946', hours: 32 },
      { name: 'Statistics 101', pct: 55, grade: 'C', color: '#F5A623', hours: 26 },
      { name: 'Business Law', pct: 82, grade: 'A', color: '#2ECC71', hours: 18 },
      { name: 'Information Systems', pct: 71, grade: 'B', color: '#9B59B6', hours: 14 },
      { name: 'Academic Literacy', pct: 89, grade: 'A', color: '#1ABC9C', hours: 6 },
    ],
    trends: [
      { term: 'Test 1', avg: 60 },
      { term: 'Test 2', avg: 66 },
      { term: 'Test 3', avg: 70 },
      { term: 'Exam', avg: 73 },
    ],
  },
};

const TABS = [
  { id: 'overview', label: 'Overview' },
  { id: 'timer', label: 'Timer' },
  { id: 'calendar', label: 'Calendar' },
  { id: 'progress', label: 'Progress' },
  { id: 'rankings', label: 'Rankings' },
];

const MOTIVATIONAL = [
  "You're closer than you think.",
  "Consistency beats intensity.",
  "Every hour counts.",
  "Keep showing up.",
  "Trust the process.",
  "You've got this.",
  "Small steps, big results.",
  "Progress, not perfection.",
];

function generateCalendarData(subjects) {
  const days = 30;
  const data = [];
  for (let d = 0; d < days; d++) {
    const daySessions = [];
    const count = Math.floor(Math.random() * 4) + 1;
    for (let s = 0; s < count; s++) {
      const subj = subjects[Math.floor(Math.random() * subjects.length)];
      daySessions.push({ name: subj.name, color: subj.color });
    }
    data.push(daySessions);
  }
  return data;
}

function OverviewTab({ subjects }) {
  const total = subjects.reduce((sum, s) => sum + s.pct, 0);
  const avg = Math.round(total / subjects.length);
  let cumulative = 0;
  const size = 260;
  const cx = size / 2;
  const cy = size / 2;
  const r = 100;
  const stroke = 24;

  const segments = subjects.map(s => {
    const fraction = s.pct / total;
    const startAngle = cumulative * 360;
    const endAngle = (cumulative + fraction) * 360;
    cumulative += fraction;
    const startRad = ((startAngle - 90) * Math.PI) / 180;
    const endRad = ((endAngle - 90) * Math.PI) / 180;
    const largeArc = endAngle - startAngle > 180 ? 1 : 0;
    const x1 = cx + r * Math.cos(startRad);
    const y1 = cy + r * Math.sin(startRad);
    const x2 = cx + r * Math.cos(endRad);
    const y2 = cy + r * Math.sin(endRad);
    return {
      d: `M ${x1} ${y1} A ${r} ${r} 0 ${largeArc} 1 ${x2} ${y2}`,
      color: s.color,
    };
  });

  const quote = MOTIVATIONAL[Math.floor(Math.random() * MOTIVATIONAL.length)];

  return (
    <div className="demo-overview">
      <div className="demo-pie-wrap">
        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
          {segments.map((seg, i) => (
            <path key={i} d={seg.d} fill="none" stroke={seg.color} strokeWidth={stroke} strokeLinecap="round" />
          ))}
        </svg>
        <div className="demo-pie-center">
          <div className="demo-pie-avg">{avg}%</div>
          <div className="demo-pie-label">average</div>
        </div>
      </div>
      <div className="demo-motivational">{quote}</div>

      <div className="demo-subject-grid">
        {subjects.map((s, i) => (
          <div key={i} className="demo-subject-card" style={{ animationDelay: `${i * 0.06}s` }}>
            <div className="demo-card-bar" style={{ background: s.color, width: `${s.pct}%` }} />
            <div className="demo-card-body">
              <span className="demo-card-dot" style={{ background: s.color }} />
              <span className="demo-card-name">{s.name}</span>
              <div className="demo-card-right">
                <span className="demo-card-pct" style={{ color: s.color }}>{s.pct}%</span>
                <span className="demo-card-grade">{s.grade}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function TimerTab() {
  const [focusMins, setFocusMins] = useState(55);
  const [breakMins, setBreakMins] = useState(10);
  const totalMins = focusMins + breakMins;
  const size = 220;
  const cx = size / 2;
  const cy = size / 2;
  const r = 85;
  const stroke = 20;

  const focusFraction = focusMins / totalMins;
  const breakFraction = breakMins / totalMins;

  function makeArc(startFrac, endFrac) {
    const startAngle = startFrac * 360 - 90;
    const endAngle = endFrac * 360 - 90;
    const startRad = (startAngle * Math.PI) / 180;
    const endRad = (endAngle * Math.PI) / 180;
    const largeArc = endAngle - startAngle > 180 ? 1 : 0;
    const x1 = cx + r * Math.cos(startRad);
    const y1 = cy + r * Math.sin(startRad);
    const x2 = cx + r * Math.cos(endRad);
    const y2 = cy + r * Math.sin(endRad);
    return `M ${x1} ${y1} A ${r} ${r} 0 ${largeArc} 1 ${x2} ${y2}`;
  }

  return (
    <div className="demo-timer-tab">
      <div className="demo-timer-ring-wrap">
        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
          <path d={makeArc(0, focusFraction)} fill="none" stroke="#E63946" strokeWidth={stroke} strokeLinecap="round" />
          <path d={makeArc(focusFraction, 1)} fill="none" stroke="#2ECC71" strokeWidth={stroke} strokeLinecap="round" />
        </svg>
        <div className="demo-timer-center">
          <div className="demo-timer-time">{focusMins}:00</div>
          <div className="demo-timer-label">focus</div>
        </div>
      </div>

      <div className="demo-timer-controls">
        <div className="demo-timer-control">
          <label className="demo-timer-ctrl-label">Focus</label>
          <div className="demo-timer-slider-row">
            <input type="range" min="5" max="120" value={focusMins}
              onChange={(e) => setFocusMins(Number(e.target.value))}
              className="demo-timer-slider" />
            <span className="demo-timer-val">{focusMins}m</span>
          </div>
        </div>
        <div className="demo-timer-control">
          <label className="demo-timer-ctrl-label">Break</label>
          <div className="demo-timer-slider-row">
            <input type="range" min="1" max="30" value={breakMins}
              onChange={(e) => setBreakMins(Number(e.target.value))}
              className="demo-timer-slider" />
            <span className="demo-timer-val">{breakMins}m</span>
          </div>
        </div>
      </div>

      <div className="demo-timer-actions">
        <button className="demo-timer-start">Start Focus</button>
        <button className="demo-timer-reset">Reset</button>
      </div>
    </div>
  );
}

function CalendarTab({ subjects }) {
  const [calendarData] = useState(() => generateCalendarData(subjects));
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const startDay = 2;

  return (
    <div className="demo-calendar-tab">
      <div className="demo-calendar">
        <div className="demo-cal-header">
          {days.map(d => (
            <div key={d} className="demo-cal-day-label">{d}</div>
          ))}
        </div>
        <div className="demo-cal-grid">
          {Array.from({ length: startDay }, (_, i) => (
            <div key={`empty-${i}`} className="demo-cal-cell empty" />
          ))}
          {calendarData.map((sessions, i) => (
            <div key={i} className="demo-cal-cell">
              <div className="demo-cal-date">{i + 1}</div>
              <div className="demo-cal-dots">
                {sessions.slice(0, 4).map((s, j) => (
                  <span key={j} className="demo-cal-dot" style={{ background: s.color }} title={s.name} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="demo-cal-legend">
        {subjects.map(s => (
          <div key={s.name} className="demo-cal-legend-item">
            <span className="demo-cal-legend-dot" style={{ background: s.color }} />
            <span className="demo-cal-legend-name">{s.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function ProgressTab({ trends }) {
  const w = 500;
  const h = 220;
  const pad = { top: 30, right: 30, bottom: 40, left: 50 };
  const chartW = w - pad.left - pad.right;
  const chartH = h - pad.top - pad.bottom;
  const minVal = Math.min(...trends.map(t => t.avg)) - 10;
  const maxVal = Math.max(...trends.map(t => t.avg)) + 10;

  const points = trends.map((t, i) => ({
    x: pad.left + (i / (trends.length - 1)) * chartW,
    y: pad.top + chartH - ((t.avg - minVal) / (maxVal - minVal)) * chartH,
    label: t.term,
    val: t.avg,
  }));

  const linePath = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ');
  const areaPath = linePath + ` L ${points[points.length - 1].x} ${pad.top + chartH} L ${points[0].x} ${pad.top + chartH} Z`;

  return (
    <div className="demo-progress-tab">
      <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} className="demo-trend-svg">
        {[0, 0.25, 0.5, 0.75, 1].map((f, i) => {
          const y = pad.top + chartH - f * chartH;
          const val = Math.round(minVal + f * (maxVal - minVal));
          return (
            <g key={i}>
              <line x1={pad.left} y1={y} x2={pad.left + chartW} y2={y} stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
              <text x={pad.left - 10} y={y + 4} textAnchor="end" fill="#55556a" fontSize="11" fontFamily="Space Grotesk">{val}</text>
            </g>
          );
        })}
        <path d={areaPath} fill="url(#trendGrad)" />
        <defs>
          <linearGradient id="trendGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#E63946" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#E63946" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path d={linePath} fill="none" stroke="#E63946" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
        {points.map((p, i) => (
          <g key={i}>
            <circle cx={p.x} cy={p.y} r="6" fill="#E63946" stroke="#0a0a0f" strokeWidth="2.5" />
            <text x={p.x} y={p.y - 14} textAnchor="middle" fill="#fff" fontSize="13" fontWeight="700" fontFamily="Space Grotesk">{p.val}%</text>
            <text x={p.x} y={pad.top + chartH + 22} textAnchor="middle" fill="#6B6B88" fontSize="10" fontFamily="Space Grotesk">{p.label}</text>
          </g>
        ))}
      </svg>
    </div>
  );
}

function RankingsTab({ subjects }) {
  const sorted = [...subjects].sort((a, b) => b.hours - a.hours);
  const top3 = sorted.slice(0, 3);
  const rest = sorted.slice(3);
  const heights = [140, 110, 85];
  const medalEmoji = ['🥇', '🥈', '🥉'];

  return (
    <div className="demo-rankings-tab">
      <div className="demo-podium">
        {[1, 0, 2].map(pos => {
          const s = top3[pos];
          if (!s) return null;
          return (
            <div key={pos} className={`demo-podium-slot`}>
              <div className="demo-podium-emoji">{medalEmoji[pos]}</div>
              <div className="demo-podium-name">{s.name}</div>
              <div className="demo-podium-hours">{s.hours} hours</div>
              <div className="demo-podium-bar" style={{ height: heights[pos], background: s.color }}>
                <span className="demo-podium-medal">{pos + 1}</span>
              </div>
            </div>
          );
        })}
      </div>
      {rest.length > 0 && (
        <div className="demo-rankings-rest">
          {rest.map((s, i) => (
            <div key={i} className="demo-rank-row">
              <span className="demo-rank-pos">{i + 4}</span>
              <span className="demo-rank-dot" style={{ background: s.color }} />
              <span className="demo-rank-name">{s.name}</span>
              <span className="demo-rank-hours">{s.hours}h</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default function DemoDashboard({ curriculum, onBack, onSubscribe }) {
  const [activeTab, setActiveTab] = useState('overview');
  const [camLevel, setCamLevel] = useState('igcse');
  const rawData = DEMO_DATA[curriculum];

  if (!rawData) return null;

  const isCambridge = curriculum === 'cambridge';
  const data = isCambridge ? rawData.levels[camLevel] : rawData;
  const displayLabel = isCambridge ? `${rawData.label} — ${data.label}` : rawData.label;

  return (
    <div className="dash dark">
      <video className="dash-bg-video" src="/assets/dash-bg.mp4" autoPlay loop muted playsInline onContextMenu={(e) => e.preventDefault()} />
      <header className="dash-header">
        <div className="dash-brand">Study Tracker</div>
        <div className="dash-header-right">
          {onSubscribe && (
            <button className="dash-subscribe-btn" onClick={onSubscribe}>Subscribe</button>
          )}
          <button className="dash-logout" onClick={onBack}>Back to login</button>
        </div>
      </header>

      <div className="dash-body">
        <div className="dash-welcome">
          <h1 className="dash-title">Demo — {displayLabel}</h1>
        </div>

        {isCambridge && (
          <div className="demo-level-picker">
            {Object.entries(rawData.levels).map(([key, level]) => (
              <button
                key={key}
                className={`demo-level-btn${camLevel === key ? ' active' : ''}`}
                onClick={() => setCamLevel(key)}
              >
                {level.label}
              </button>
            ))}
          </div>
        )}

        <div className="demo-tabs">
          {TABS.map(tab => (
            <button
              key={tab.id}
              className={`demo-tab${activeTab === tab.id ? ' active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="demo-tab-content">
          {activeTab === 'overview' && <OverviewTab subjects={data.subjects} />}
          {activeTab === 'timer' && <TimerTab />}
          {activeTab === 'calendar' && <CalendarTab subjects={data.subjects} />}
          {activeTab === 'progress' && <ProgressTab trends={data.trends} />}
          {activeTab === 'rankings' && <RankingsTab subjects={data.subjects} />}
        </div>
      </div>
    </div>
  );
}
