import React, { useEffect, useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import {
  Activity, ArrowRight, BarChart3, BriefcaseBusiness, CalendarDays, Clapperboard,
  Film, Gauge, LayoutDashboard, Menu, Play, Settings, Sparkles, Star, Ticket, Users,
  Wallet, X
} from 'lucide-react';
import './styles.css';

const genres = ['Action', 'Sci-Fi', 'Horror', 'Comedy'];
const scriptSeeds = [
  ['Neon Horizon', 'Sci-Fi', 78, 'A last transmission. A city beyond time.'],
  ['The Last Encore', 'Drama', 62, 'Every legend gets one final act.'],
  ['Blackwater', 'Horror', 46, 'The lake remembers what the town forgot.'],
  ['Velocity', 'Action', 88, 'The fastest way out is straight through.'],
  ['Good Company', 'Comedy', 54, 'The worst team in business goes public.'],
  ['Afterlight', 'Sci-Fi', 71, 'Somewhere in the dark, tomorrow is waiting.'],
];
const actors = [
  { name: 'Dorian Vale', role: 'A-list lead', salary: 2700000, star: 94, talent: 88 },
  { name: 'Maya Okafor', role: 'Rising star', salary: 1200000, star: 76, talent: 82 },
  { name: 'Theo Brooks', role: 'Indie favorite', salary: 520000, star: 53, talent: 72 },
];
const directors = [
  { name: 'Nora Chen', role: 'Visionary auteur', salary: 1600000, talent: 93 },
  { name: 'Marcus Bell', role: 'Genre specialist', salary: 850000, talent: 79 },
  { name: 'Inez Park', role: 'New voice', salary: 360000, talent: 68 },
];

const money = (value) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(value);
const randomScripts = () => [...scriptSeeds].sort(() => Math.random() - 0.5).slice(0, 3).map(([title, genre, quality, logline]) => ({ title, genre, quality, logline, cost: 160000 + quality * 6400 }));

function AnimatedNumber({ value, format = money }) {
  const [shown, setShown] = useState(value);
  useEffect(() => {
    const start = shown;
    const distance = value - start;
    let frame;
    const began = performance.now();
    const tick = (now) => {
      const progress = Math.min((now - began) / 650, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setShown(Math.round(start + distance * eased));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [value]);
  return <>{format(shown)}</>;
}

function App() {
  const [phase, setPhase] = useState('dashboard');
  const [budget, setBudget] = useState(10000000);
  const [scripts, setScripts] = useState(randomScripts);
  const [script, setScript] = useState(null);
  const [actor, setActor] = useState(actors[1]);
  const [director, setDirector] = useState(directors[1]);
  const [marketing, setMarketing] = useState(500000);
  const [shootProgress, setShootProgress] = useState(0);
  const [result, setResult] = useState(null);
  const [trend] = useState(genres[Math.floor(Math.random() * genres.length)]);

  const projected = (script?.cost || 0) + actor.salary + director.salary + marketing;
  const quality = script ? Math.round(script.quality * 0.45 + director.talent * 0.25 + actor.talent * 0.3) : 0;
  const hype = script ? Math.round(marketing / 10000 + actor.star * 0.8) : 0;

  const purchaseScript = (choice) => {
    if (choice.cost > budget) return;
    setScript(choice);
    setBudget((current) => current - choice.cost);
    setPhase('casting');
  };

  const startFilming = () => {
    if (projected > budget) return;
    setBudget((current) => current - actor.salary - director.salary - marketing);
    setShootProgress(0);
    setPhase('filming');
  };

  useEffect(() => {
    if (phase !== 'filming') return undefined;
    const timer = setInterval(() => setShootProgress((current) => {
      if (current >= 100) { clearInterval(timer); setResult({ quality, hype, revenue: Math.round((quality * 84000 + hype * 31000) * (script?.genre === trend ? 1.18 : 1)) }); setPhase('results'); return 100; }
      return current + 4;
    }), 100);
    return () => clearInterval(timer);
  }, [phase, quality, hype, script, trend]);

  const newProject = () => { setScripts(randomScripts()); setScript(null); setPhase('preproduction'); };
  const resetGame = () => { setBudget(10000000); setPhase('dashboard'); setResult(null); setScript(null); setMarketing(500000); };

  return <div className="app-shell">
    <aside className="sidebar">
      <div className="brand"><span className="brand-mark"><Film size={19} /></span><span>Silver Screen<span className="muted-brand"> Studios</span></span></div>
      <div className="nav-label">Workspace</div>
      <nav>
        <button className={phase === 'dashboard' ? 'nav-item active' : 'nav-item'} onClick={() => setPhase('dashboard')}><LayoutDashboard size={18} /> Overview</button>
        <button className={phase === 'preproduction' || phase === 'casting' ? 'nav-item active' : 'nav-item'} onClick={() => setPhase('preproduction')}><Clapperboard size={18} /> Production</button>
        <button className="nav-item" onClick={() => setPhase('results')}><BarChart3 size={18} /> Box Office</button>
      </nav>
      <div className="sidebar-bottom"><div className="nav-label">Studio</div><button className="nav-item"><BriefcaseBusiness size={18} /> Portfolio</button><button className="nav-item"><Settings size={18} /> Settings</button><div className="user-card"><div className="avatar">JD</div><div><strong>Jordan Davis</strong><small>Studio Owner</small></div><Menu size={16} className="user-menu" /></div></div>
    </aside>
    <main className="main-content">
      <header className="topbar"><div className="mobile-logo"><Film size={18} /></div><div className="breadcrumb"><span>Studio</span><span>/</span><strong>{phase === 'dashboard' ? 'Overview' : phase === 'preproduction' ? 'Pre-Production' : phase === 'casting' ? 'Casting Department' : phase === 'filming' ? 'Principal Photography' : 'Box Office Results'}</strong></div><div className="header-metrics"><Metric icon={<Wallet size={16} />} label="Studio budget" value={<AnimatedNumber value={budget} />} /><Metric icon={<Star size={16} />} label="Reputation" value="0.0" suffix=" stars" /><Metric icon={<CalendarDays size={16} />} label="Current year" value="2024" /></div><button className="icon-button"><Activity size={18} /></button></header>
      {phase === 'dashboard' && <Dashboard onNewProject={newProject} />}
      {phase === 'preproduction' && <PreProduction scripts={scripts} budget={budget} trend={trend} onPurchase={purchaseScript} onBack={() => setPhase('dashboard')} />}
      {phase === 'casting' && <Casting script={script} actor={actor} setActor={setActor} director={director} setDirector={setDirector} marketing={marketing} setMarketing={setMarketing} budget={budget} projected={projected} onStart={startFilming} onBack={() => setPhase('preproduction')} />}
      {phase === 'filming' && <Filming progress={shootProgress} />}
      {phase === 'results' && <Results result={result} script={script} onNew={resetGame} />}
    </main>
  </div>;
}

function Metric({ icon, label, value, suffix = '' }) { return <div className="metric"><span className="metric-icon">{icon}</span><span><small>{label}</small><strong>{value}{suffix}</strong></span></div>; }
function PageTitle({ eyebrow, title, detail, children }) { return <div className="page-title"><div><div className="eyebrow">{eyebrow}</div><h1>{title}</h1><p>{detail}</p></div>{children}</div>; }
function Dashboard({ onNewProject }) { return <div className="view fade-in"><PageTitle eyebrow="Tuesday, October 15, 2024" title="Good morning, Jordan" detail="Your studio is ready for its next big story." /><section className="hero-panel"><div className="hero-copy"><span className="section-tag"><Sparkles size={14} /> Studio command center</span><h2>Make something<br /><em>worth watching.</em></h2><p>Every great studio starts with one courageous greenlight. Find your next story and turn it into a cultural moment.</p><button className="primary-button pulse" onClick={onNewProject}><Film size={18} /> New Project <ArrowRight size={17} /></button></div><div className="hero-visual"><div className="orbital orbital-one"></div><div className="orbital orbital-two"></div><div className="hero-reel"><Clapperboard size={44} /><span>SS</span></div><div className="visual-caption"><span className="live-dot"></span> Studio status <strong>Ready to produce</strong></div></div></section><div className="section-heading"><div><h3>Studio pulse</h3><p>Your key performance indicators at a glance.</p></div><span className="period"><CalendarDays size={14} /> 2024 season</span></div><div className="stat-grid"><StatCard icon={<Ticket />} label="Audience sentiment" value="—" note="No releases yet" /><StatCard icon={<Gauge />} label="Avg. production" value="$0" note="Start your first project" /><StatCard icon={<Users />} label="Active projects" value="0" note="Your slate is clear" /></div></div>; }
function StatCard({ icon, label, value, note }) { return <div className="stat-card"><div className="stat-icon">{icon}</div><small>{label}</small><strong>{value}</strong><span>{note}</span></div>; }
function PreProduction({ scripts, budget, trend, onPurchase, onBack }) { return <div className="view fade-in"><PageTitle eyebrow="Phase 01 / Pre-production" title="Choose your next story" detail="Acquire a script to begin building your next box office contender."><button className="text-button" onClick={onBack}><X size={16} /> Exit project</button></PageTitle><div className="intel-bar"><span><Activity size={17} /> Market intelligence</span><p>Genre momentum is shifting this quarter. Some stories travel further than others.</p><strong><span className="trend-dot"></span>{trend} is trending</strong></div><div className="section-heading script-heading"><div><h3>Available scripts</h3><p>Each opportunity has its own risk and upside.</p></div><span className="budget-chip"><Wallet size={15} /> {money(budget)} available</span></div><div className="script-grid">{scripts.map((item, index) => <button className="script-card" key={item.title} onClick={() => onPurchase(item)}><div className={`poster poster-${index}`}><span>{item.genre}</span><Film size={30} /></div><div className="script-info"><div className="script-top"><span>SCREENPLAY 0{index + 1}</span><span className="quality"><Star size={13} fill="currentColor" /> {item.quality}</span></div><h3>{item.title}</h3><p>{item.logline}</p><div className="script-footer"><span>Acquire rights</span><strong>{money(item.cost)}</strong></div></div></button>)}</div></div>; }
function Casting({ script, actor, setActor, director, setDirector, marketing, setMarketing, budget, projected, onStart, onBack }) { const overBudget = projected > budget; return <div className="view fade-in"><PageTitle eyebrow="Phase 02 / Casting department" title="Assemble your cast" detail={`Bring ${script.title} to life with the right creative chemistry.`}><button className="text-button" onClick={onBack}><ArrowRight size={16} className="flip" /> Change script</button></PageTitle><div className="casting-layout"><div className="casting-form"><TalentSelect label="Lead actor" value={actor} options={actors} onChange={setActor} showStar /><TalentSelect label="Director" value={director} options={directors} onChange={setDirector} /><div className="marketing-block"><div className="control-heading"><div><label>Marketing investment</label><p>Fuel the opening weekend hype.</p></div><strong>{money(marketing)}</strong></div><input type="range" min="0" max="2500000" step="50000" value={marketing} onChange={(event) => setMarketing(Number(event.target.value))} /><div className="range-labels"><span>$0</span><span>$2.5M</span></div></div></div><aside className={`cost-summary ${overBudget ? 'over' : ''}`}><div className="summary-label">Production estimate</div><div className="summary-total">{money(projected)}</div><div className="summary-line"><span>Script rights</span><strong>{money(script.cost)}</strong></div><div className="summary-line"><span>Talent & crew</span><strong>{money(actor.salary + director.salary)}</strong></div><div className="summary-line"><span>Marketing</span><strong>{money(marketing)}</strong></div><div className="summary-divider"></div><div className="summary-line balance"><span>Remaining after shoot</span><strong>{money(budget - projected)}</strong></div><button className="primary-button full" disabled={overBudget} onClick={onStart}><Play size={17} fill="currentColor" /> {overBudget ? 'Over budget' : 'Start filming'} <ArrowRight size={17} /></button>{overBudget && <div className="warning">Your choices exceed the available studio budget.</div>}</aside></div></div>; }
function TalentSelect({ label, value, options, onChange, showStar }) { return <div className="talent-field"><div className="field-heading"><label>{label}</label><span>{value.role}</span></div><select value={value.name} onChange={(event) => onChange(options.find((option) => option.name === event.target.value))}>{options.map((option) => <option value={option.name} key={option.name}>{option.name} · {money(option.salary)}</option>)}</select><div className="talent-meta"><span>{showStar && <><Star size={13} fill="currentColor" /> {optionLabel(value.star)} star power</>}</span><span><Gauge size={13} /> {value.talent} talent</span><span className="salary">{money(value.salary)} salary</span></div></div>; }
function optionLabel(score) { return score >= 90 ? 'A-list' : score >= 70 ? 'Strong' : 'Indie'; }
function Filming({ progress }) { return <div className="filming-screen fade-in"><div className="film-glow"></div><div className="clapper"><div className="clapper-top"><i></i><i></i><i></i><i></i><i></i></div><div className="clapper-body"><Clapperboard size={46} /><strong>SS</strong><span>PRODUCTION<br />2024</span></div></div><div className="eyebrow">Phase 03 / Principal photography</div><h1>Rolling camera...</h1><p>Your production team is bringing this story to life.</p><div className="progress-track"><div style={{ width: `${progress}%` }}></div></div><div className="progress-readout"><span>Day {Math.max(1, Math.ceil(progress / 10))} of 10</span><strong>{progress}%</strong></div></div>; }
function Results({ result, script, onNew }) { return <div className="results-screen fade-in"><div className="result-icon"><Ticket size={30} /></div><div className="eyebrow">Phase 04 / Box office results</div><h1>Your story is ready<br /><em>for an audience.</em></h1><p className="result-copy">The opening weekend report is being prepared. Here is the early signal from your production.</p><div className="result-grid"><div><small>Movie quality</small><strong>{result?.quality || '—'}<span>/ 100</span></strong></div><div><small>Hype score</small><strong>{result?.hype || '—'}<span> pts</span></strong></div><div><small>Projected gross</small><strong>{result ? money(result.revenue) : '—'}</strong></div></div><button className="primary-button" onClick={onNew}><Film size={18} /> Start another project <ArrowRight size={17} /></button><p className="result-footnote">{script ? `${script.title} is now in your studio portfolio.` : 'No production has been completed yet.'}</p></div>; }

createRoot(document.getElementById('root')).render(<App />);