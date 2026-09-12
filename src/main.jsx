import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import {
  Activity, ArrowRight, BarChart3, BriefcaseBusiness, CalendarDays, Clapperboard,
  AlertTriangle, Dice5, Film, Gauge, Globe2, LayoutDashboard, Menu, Play, Quote, Settings,
  ShieldAlert, Sparkles, Star, Ticket, TrendingUp, Users, Wallet, X, RotateCcw
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
const locations = [
  { name: 'Rustline Soundstage', tier: 'Bare bones', fee: 90000, daily: 18000, quality: 42, criticBoost: -5, internationalBoost: 0.92, delay: 0.18 },
  { name: 'Silverlake Backlot', tier: 'Professional', fee: 260000, daily: 42000, quality: 70, criticBoost: 2, internationalBoost: 1, delay: 0.08 },
  { name: 'Alpine Film Village', tier: 'Prestige', fee: 680000, daily: 90000, quality: 88, criticBoost: 7, internationalBoost: 1.12, delay: 0.04 },
  { name: 'The Meridian Opera House', tier: 'Iconic landmark', fee: 1450000, daily: 180000, quality: 98, criticBoost: 12, internationalBoost: 1.3, delay: 0.02 },
];
const cateringPackages = [
  { name: 'Budget Slop', daily: 12, morale: 38, talentBoost: -4, strike: 0.2 },
  { name: 'Standard Buffet', daily: 42, morale: 72, talentBoost: 0, strike: 0.06 },
  { name: 'Gourmet Chef Service', daily: 115, morale: 96, talentBoost: 5, strike: 0.015 },
];
const equipmentPackages = [
  { name: 'Digital cinema package', daily: 18000, reviewBonus: 0 },
  { name: 'IMAX camera package', daily: 85000, reviewBonus: 8 },
  { name: 'IMAX + specialized rigs', daily: 145000, reviewBonus: 13 },
];
const crisisScenarios = [
  { type: 'set', title: 'Storm over the backlot', description: 'A flash storm has torn through the outdoor set. Three days of work are exposed to the elements.', severity: 'SET EMERGENCY', money: 420000, quality: -13, time: 2 },
  { type: 'set', title: 'The lead will not leave the trailer', description: 'Your lead actor has locked the trailer door and is demanding a private rewrite before cameras roll again.', severity: 'TALENT HOLD', money: 680000, quality: -16, time: 1 },
  { type: 'set', title: 'VFX crew poached', description: 'A rival studio has hired away your specialized effects team overnight. Your final sequence is suddenly unfinished.', severity: 'CORPORATE SABOTAGE', money: 940000, quality: -19, time: 2 },
  { type: 'set', title: 'The script is in the papers', description: 'A leaked draft is dominating the entertainment press. The opening-weekend narrative is turning against you.', severity: 'PRESS BREACH', money: 520000, quality: -8, hype: -26, time: 1 },
];

const money = (value) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(value);
const percent = (value) => `${Math.round(value)}%`;
const randomScripts = () => [...scriptSeeds].sort(() => Math.random() - 0.5).slice(0, 3).map(([title, genre, quality, logline]) => ({ title, genre, quality, logline, cost: 160000 + quality * 6400 }));
const headlineQuotes = [
  'Audiences came for the spectacle and stayed for the snacks.',
  'Critics called it bold. The group chat called it a masterpiece.',
  'A box office rocket with just enough emotional turbulence.',
  'The public has spoken, and it would like a sequel immediately.',
  'Somehow, the marketing budget became the main character.',
];

function createRelease({ script, actor, director, marketing, quality, hype, trend, planning, loan, impact }) {
  const finalQuality = Math.max(15, Math.min(99, Math.round(quality + (planning.visualScore - 70) * 0.25 + (planning.morale - 70) * 0.1 + planning.location.criticBoost + planning.equipment.reviewBonus + planning.catering.talentBoost + impact.quality - (script.quality > 80 && planning.location.quality < 60 ? 18 : 0))));
  const marketDemand = Number((0.8 + Math.random() * 0.7).toFixed(2));
  const trendBonus = script.genre === trend ? 1.25 : 1;
  const finalHype = Math.max(0, hype + (impact.hype || 0));
  const openingGross = Math.round((finalQuality + finalHype) * 58000 * marketDemand * trendBonus * planning.location.internationalBoost);
  const lifespan = finalQuality > 80 ? 8 : finalQuality > 70 ? 6 : finalQuality > 58 ? 4 : 3;
  const weeks = Array.from({ length: lifespan }, (_, index) => {
    const decay = index === 0 ? 1 : Math.pow(0.65, index);
    const gross = Math.round(openingGross * decay);
    return { week: index + 1, domestic: Math.round(gross * 0.54), international: Math.round(gross * 0.46 * planning.location.internationalBoost) };
  });
  const productionCost = script.cost + actor.salary + director.salary + planning.total + planning.overheadTotal;
  const criticScore = Math.max(18, Math.min(99, Math.round(script.quality * 0.62 + director.talent * 0.38 + planning.location.criticBoost + planning.equipment.reviewBonus - (productionCost > 5000000 && script.quality < 70 ? 8 : 0))));
  const audienceScore = Math.max(22, Math.min(99, Math.round(actor.star * 0.58 + marketing / 25000 * 0.42)));
  return {
    title: script.title, genre: script.genre, quality: finalQuality, hype: finalHype, actor, director, marketing, planning, loan,
    productionCost, totalCost: productionCost + marketing + (loan?.interest || 0), openingGross, marketDemand,
    trendBonus, trend, trendMatched: script.genre === trend, weeks, criticScore, audienceScore,
    headline: headlineQuotes[Math.floor(Math.random() * headlineQuotes.length)],
  };
}

function createCrisis({ script, actor, director, planning, budget }) {
  const divaFactor = (actor.star / 100) * 0.55 + (director.talent / 100) * 0.2 + (actor.salary > 2000000 ? 0.2 : 0);
  const sabotageRisk = script.quality > 75 && planning.securityBudget < 400000;
  const isDiva = Math.random() < divaFactor * 0.45;
  if (isDiva) return { type: 'diva', title: `${actor.name} demands a rewrite`, description: `${actor.name} is refusing to leave the trailer until the lead has a new monologue, a private chef, and final approval. Push too hard and the star may walk.`, severity: 'DIVA FACTOR', money: Math.max(360000, Math.round(actor.salary * 0.32)), quality: -18, time: 2, walkout: actor.star > 85 };
  if (sabotageRisk && Math.random() < 0.45) return { ...crisisScenarios[Math.random() < 0.5 ? 2 : 3], sabotage: true };
  const base = crisisScenarios[Math.floor(Math.random() * 2)];
  const scale = budget > 7000000 ? 1.8 : budget > 3500000 ? 1.25 : 0.65;
  return { ...base, money: Math.round(base.money * scale), quality: Math.round(base.quality * (scale > 1 ? 1.15 : 0.8)) };
}

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
  const [year, setYear] = useState(2024);
  const [reputation, setReputation] = useState(0);
  const [scripts, setScripts] = useState(randomScripts);
  const [script, setScript] = useState(null);
  const [actor, setActor] = useState(actors[1]);
  const [director, setDirector] = useState(directors[1]);
  const [marketing, setMarketing] = useState(500000);
  const [location, setLocation] = useState(locations[1]);
  const [catering, setCatering] = useState(cateringPackages[1]);
  const [equipment, setEquipment] = useState(equipmentPackages[0]);
  const [costumeQuality, setCostumeQuality] = useState(45);
  const [propsBudget, setPropsBudget] = useState(350000);
  const [vfxBudget, setVfxBudget] = useState(450000);
  const [securityBudget, setSecurityBudget] = useState(250000);
  const [loan, setLoan] = useState(null);
  const [shootProgress, setShootProgress] = useState(0);
  const [result, setResult] = useState(null);
  const [catalog, setCatalog] = useState([]);
  const [trend, setTrend] = useState(genres[Math.floor(Math.random() * genres.length)]);
  const [visibleWeeks, setVisibleWeeks] = useState(0);
  const [dashboardTab, setDashboardTab] = useState('overview');
  const [gameOver, setGameOver] = useState(false);
  const [crisis, setCrisis] = useState(null);
  const [productionImpact, setProductionImpact] = useState({ quality: 0, hype: 0, time: 0 });

  const crewSize = 120;
  const shootDays = 10;
  const dailyOverhead = 55000 + location.daily + equipment.daily;
  const assetCost = Math.round(costumeQuality * 12000) + propsBudget + vfxBudget;
  const immersionScore = Math.min(100, Math.round(costumeQuality * 0.3 + Math.min(propsBudget / 18000, 100) * 0.35 + Math.min(vfxBudget / 22000, 100) * 0.35));
  const morale = catering.morale;
  const planning = { location, catering, equipment, securityBudget, visualScore: immersionScore, morale, delayChance: location.delay + catering.strike + (script?.quality > 80 && location.quality < 60 ? 0.18 : 0), crisisChance: Math.min(0.8, location.delay + catering.strike + (securityBudget < 200000 ? 0.12 : 0) + (actor.star > 85 ? 0.08 : 0)), overheadDaily: dailyOverhead, overheadTotal: dailyOverhead * shootDays, total: location.fee + location.daily * shootDays + catering.daily * crewSize * shootDays + equipment.daily * shootDays + assetCost + securityBudget };
  const projected = (script?.cost || 0) + actor.salary + director.salary + marketing + planning.total + planning.overheadTotal;
  const quality = script ? Math.round(script.quality * 0.45 + director.talent * 0.25 + actor.talent * 0.3) : 0;
  const hype = script ? Math.round(marketing / 10000 + actor.star * 0.8) : 0;

  const purchaseScript = (choice) => {
    if (choice.cost > budget) return;
    setScript(choice);
    setBudget((current) => current - choice.cost);
    setPhase('logistics');
  };

  const startFilming = () => {
    const castingCost = actor.salary + director.salary + marketing + planning.total + planning.overheadTotal;
    const remainingAfterProduction = budget - castingCost;
    const loanAmount = Math.max(0, planning.overheadDaily - remainingAfterProduction);
    const newLoan = loanAmount > 0 ? { principal: Math.ceil(loanAmount / 100000) * 100000, interest: Math.ceil(loanAmount / 100000) * 25000, deadline: year + 0.5 } : null;
    if (projected > budget && !newLoan) return;
    setLoan(newLoan);
    setBudget((current) => current - actor.salary - director.salary - marketing - planning.total - planning.overheadTotal + (newLoan?.principal || 0));
    setShootProgress(0);
    setPhase('filming');
  };

  useEffect(() => {
    if (phase !== 'filming') return undefined;
    const timer = setInterval(() => setShootProgress((current) => {
      if (current >= 100) { clearInterval(timer); setResult(createRelease({ script, actor, director, marketing, quality, hype, trend, planning, loan, impact: productionImpact })); setVisibleWeeks(0); setPhase('receipt'); return 100; }
      if (!crisis && Math.random() < planning.crisisChance * 0.07) { setCrisis(createCrisis({ script, actor, director, planning, budget })); setPhase('crisis'); return current; }
      if (Math.random() < planning.delayChance * 0.18) return current;
      return current + 4;
    }), 100);
    return () => clearInterval(timer);
  }, [phase, quality, hype, script, actor, director, marketing, trend, planning, loan, crisis, productionImpact, budget]);

  useEffect(() => {
    if (phase !== 'results' || !result || visibleWeeks >= result.weeks.length) return undefined;
    const timer = setTimeout(() => setVisibleWeeks((current) => current + 1), 600);
    return () => clearTimeout(timer);
  }, [phase, result, visibleWeeks]);

  const newProject = () => { setScripts(randomScripts()); setScript(null); setPhase('preproduction'); };
  const resolveCrisis = (choice) => {
    if (!crisis) return;
    if (choice === 'money') {
      setBudget((current) => current - crisis.money);
      setProductionImpact((current) => ({ ...current, hype: current.hype + (crisis.sabotage ? 0 : 0) }));
    } else if (choice === 'compromise') {
      setBudget((current) => current - Math.round(crisis.money * 0.18));
      setProductionImpact((current) => ({ quality: current.quality + crisis.quality, hype: current.hype + (crisis.hype || 0), time: current.time + crisis.time }));
    } else if (choice === 'retaliate') {
      setBudget((current) => current - 300000);
      if (Math.random() < 0.4) setReputation((current) => Math.max(0, current - 2));
      else setProductionImpact((current) => ({ ...current, hype: current.hype + 18 }));
    } else {
      const won = Math.random() >= 0.5;
      setBudget((current) => current - (won ? 0 : crisis.money * 2));
      setProductionImpact((current) => won ? current : ({ quality: current.quality + crisis.quality * 2, hype: current.hype + (crisis.hype || 0) * 2, time: current.time + crisis.time * 2 }));
    }
    setShootProgress((current) => Math.max(0, current - crisis.time * 2));
    if (crisis.type === 'diva' && choice === 'compromise' && crisis.walkout) {
      const recastFee = Math.max(1000000, Math.round(actor.salary * 1.5));
      setBudget((current) => current - recastFee);
      setActor(actors[1]);
      setProductionImpact((current) => ({ ...current, quality: current.quality - 24, time: current.time + 3 }));
    }
    setCrisis(null);
    setPhase('filming');
  };
  const wrapRelease = () => {
    const gross = result.weeks.reduce((sum, week) => sum + week.domestic + week.international, 0);
    const net = gross - result.totalCost;
    const residual = Math.round(result.audienceScore * 1550);
    setCatalog((current) => [...current, { ...result, gross, net, residual, year }]);
    setBudget((current) => current + gross - (result.loan?.principal || 0) - (result.loan?.interest || 0));
    setReputation((current) => current + (result.criticScore > 85 ? 2 : result.criticScore > 70 ? 1 : 0));
    setYear((current) => current + 0.5);
    setScripts(randomScripts());
    setScript(null);
    setResult(null);
    setDashboardTab('overview');
    setLoan(null);
    setPhase('dashboard');
    if (budget + gross - (result.loan?.principal || 0) - (result.loan?.interest || 0) < 0) setGameOver(true);
  };

  if (gameOver) return <GameOver onRestart={() => { setBudget(10000000); setYear(2024); setReputation(0); setCatalog([]); setGameOver(false); setPhase('dashboard'); }} />;
  const currentWeeks = result?.weeks.slice(0, visibleWeeks) || [];
  const domestic = currentWeeks.reduce((sum, week) => sum + week.domestic, 0);
  const international = currentWeeks.reduce((sum, week) => sum + week.international, 0);
  const currentGross = domestic + international;

  return <div className="app-shell">
    <aside className="sidebar">
      <div className="brand"><span className="brand-mark"><Film size={19} /></span><span>Silver Screen<span className="muted-brand"> Studios</span></span></div>
      <div className="nav-label">Workspace</div>
      <nav>
        <button className={phase === 'dashboard' && dashboardTab === 'overview' ? 'nav-item active' : 'nav-item'} onClick={() => { setDashboardTab('overview'); setPhase('dashboard'); }}><LayoutDashboard size={18} /> Overview</button>
        <button className={phase === 'preproduction' || phase === 'logistics' || phase === 'casting' ? 'nav-item active' : 'nav-item'} onClick={() => setPhase('preproduction')}><Clapperboard size={18} /> Production</button>
        <button className={phase === 'results' ? 'nav-item active' : 'nav-item'} onClick={() => result && setPhase('results')}><BarChart3 size={18} /> Box Office</button>
      </nav>
      <div className="sidebar-bottom"><div className="nav-label">Studio</div><button className="nav-item" onClick={() => { setDashboardTab('catalog'); setPhase('dashboard'); }}><BriefcaseBusiness size={18} /> Catalog Profits</button><button className="nav-item"><Settings size={18} /> Settings</button><div className="user-card"><div className="avatar">JD</div><div><strong>Jordan Davis</strong><small>Studio Owner</small></div><Menu size={16} className="user-menu" /></div></div>
    </aside>
    <main className="main-content">
      <header className="topbar"><div className="mobile-logo"><Film size={18} /></div><div className="breadcrumb"><span>Studio</span><span>/</span><strong>{phase === 'dashboard' ? (dashboardTab === 'catalog' ? 'Catalog Profits' : 'Overview') : phase === 'preproduction' ? 'Pre-Production' : phase === 'logistics' ? 'Logistics & Assets' : phase === 'casting' ? 'Casting Department' : phase === 'filming' ? 'Principal Photography' : phase === 'receipt' ? 'Production Receipt' : 'Box Office Results'}</strong></div><div className="header-metrics"><Metric icon={<Wallet size={16} />} label="Studio budget" value={<AnimatedNumber value={budget} />} /><Metric icon={<Star size={16} />} label="Reputation" value={reputation.toFixed(1)} suffix=" stars" /><Metric icon={<CalendarDays size={16} />} label="Current year" value={year.toFixed(1)} /></div><button className="icon-button"><Activity size={18} /></button></header>
      {phase === 'dashboard' && <Dashboard onNewProject={newProject} catalog={catalog} dashboardTab={dashboardTab} setDashboardTab={setDashboardTab} year={year} />}
      {phase === 'preproduction' && <PreProduction scripts={scripts} budget={budget} trend={trend} onPurchase={purchaseScript} onBack={() => setPhase('dashboard')} />}
      {phase === 'logistics' && <><LogisticsPlanner script={script} budget={budget} location={location} setLocation={setLocation} catering={catering} setCatering={setCatering} equipment={equipment} setEquipment={setEquipment} costumeQuality={costumeQuality} setCostumeQuality={setCostumeQuality} propsBudget={propsBudget} setPropsBudget={setPropsBudget} vfxBudget={vfxBudget} setVfxBudget={setVfxBudget} planning={planning} onContinue={() => setPhase('casting')} onBack={() => setPhase('preproduction')} /><SecurityDock securityBudget={securityBudget} setSecurityBudget={setSecurityBudget} /></>}
      {phase === 'casting' && <Casting script={script} actor={actor} setActor={setActor} director={director} setDirector={setDirector} marketing={marketing} setMarketing={setMarketing} budget={budget} projected={projected} allowLoan={projected > budget} onStart={startFilming} onBack={() => setPhase('logistics')} />}
      {phase === 'filming' && <Filming progress={shootProgress} />}
      {phase === 'crisis' && <CrisisModal crisis={crisis} actor={actor} onResolve={resolveCrisis} />}
      {phase === 'receipt' && <ReceiptModal result={result} budget={budget} onContinue={() => setPhase('results')} />}
      {phase === 'results' && <Results result={result} visibleWeeks={visibleWeeks} currentGross={currentGross} domestic={domestic} international={international} onWrap={wrapRelease} />}
    </main>
  </div>;
}

function Metric({ icon, label, value, suffix = '' }) { return <div className="metric"><span className="metric-icon">{icon}</span><span><small>{label}</small><strong>{value}{suffix}</strong></span></div>; }
function PageTitle({ eyebrow, title, detail, children }) { return <div className="page-title"><div><div className="eyebrow">{eyebrow}</div><h1>{title}</h1><p>{detail}</p></div>{children}</div>; }
function Dashboard({ onNewProject, catalog, dashboardTab, setDashboardTab, year }) { const totalResidual = catalog.reduce((sum, item) => sum + item.residual, 0); return <div className="view fade-in"><div className="dashboard-tabs"><button className={dashboardTab === 'overview' ? 'tab active' : 'tab'} onClick={() => setDashboardTab('overview')}><LayoutDashboard size={15} /> Overview</button><button className={dashboardTab === 'catalog' ? 'tab active' : 'tab'} onClick={() => setDashboardTab('catalog')}><TrendingUp size={15} /> Catalog Profits <span>{catalog.length}</span></button></div>{dashboardTab === 'overview' ? <><PageTitle eyebrow={`Season ${year.toFixed(1)} / Tuesday, October 15`} title="Good morning, Jordan" detail="Your studio is ready for its next big story." /><section className="hero-panel"><div className="hero-copy"><span className="section-tag"><Sparkles size={14} /> Studio command center</span><h2>Make something<br /><em>worth watching.</em></h2><p>Every great studio starts with one courageous greenlight. Find your next story and turn it into a cultural moment.</p><button className="primary-button pulse" onClick={onNewProject}><Film size={18} /> New Project <ArrowRight size={17} /></button></div><div className="hero-visual"><div className="orbital orbital-one"></div><div className="orbital orbital-two"></div><div className="hero-reel"><Clapperboard size={44} /><span>SS</span></div><div className="visual-caption"><span className="live-dot"></span> Studio status <strong>Ready to produce</strong></div></div></section><div className="section-heading"><div><h3>Studio pulse</h3><p>Your key performance indicators at a glance.</p></div><span className="period"><CalendarDays size={14} /> {catalog.length} releases</span></div><div className="stat-grid"><StatCard icon={<Ticket />} label="Audience sentiment" value={catalog.length ? `${Math.round(catalog.reduce((sum, item) => sum + item.audienceScore, 0) / catalog.length)}%` : '—'} note={catalog.length ? 'Across your catalog' : 'No releases yet'} /><StatCard icon={<Gauge />} label="Catalog value" value={money(totalResidual)} note="Weekly residual estimate" /><StatCard icon={<Users />} label="Active projects" value="0" note="Your slate is clear" /></div></> : <CatalogProfits catalog={catalog} />}</div>; }
function StatCard({ icon, label, value, note }) { return <div className="stat-card"><div className="stat-icon">{icon}</div><small>{label}</small><strong>{value}</strong><span>{note}</span></div>; }
function PreProduction({ scripts, budget, trend, onPurchase, onBack }) { return <div className="view fade-in"><PageTitle eyebrow="Phase 01 / Pre-production" title="Choose your next story" detail="Acquire a script to begin building your next box office contender."><button className="text-button" onClick={onBack}><X size={16} /> Exit project</button></PageTitle><div className="intel-bar"><span><Activity size={17} /> Market intelligence</span><p>Genre momentum is shifting this quarter. Some stories travel further than others.</p><strong><span className="trend-dot"></span>{trend} is trending</strong></div><div className="section-heading script-heading"><div><h3>Available scripts</h3><p>Each opportunity has its own risk and upside.</p></div><span className="budget-chip"><Wallet size={15} /> {money(budget)} available</span></div><div className="script-grid">{scripts.map((item, index) => <button className="script-card" key={item.title} onClick={() => onPurchase(item)}><div className={`poster poster-${index}`}><span>{item.genre}</span><Film size={30} /></div><div className="script-info"><div className="script-top"><span>SCREENPLAY 0{index + 1}</span><span className="quality"><Star size={13} fill="currentColor" /> {item.quality}</span></div><h3>{item.title}</h3><p>{item.logline}</p><div className="script-footer"><span>Acquire rights</span><strong>{money(item.cost)}</strong></div></div></button>)}</div></div>; }
function LogisticsPlanner({ script, budget, location, setLocation, catering, setCatering, equipment, setEquipment, costumeQuality, setCostumeQuality, propsBudget, setPropsBudget, vfxBudget, setVfxBudget, planning, onContinue, onBack }) { const [tab, setTab] = useState('locations'); const visualLabel = planning.visualScore >= 86 ? 'Cinematic Masterpiece' : planning.visualScore >= 65 ? 'Theatrical Finish' : planning.visualScore >= 45 ? 'B-Movie Cheap' : 'Barely Released'; const moraleLabel = planning.morale >= 85 ? 'Excellent' : planning.morale >= 60 ? 'Steady' : 'Critical'; const overBlock = planning.total + planning.overheadTotal > budget; return <div className="view fade-in"><PageTitle eyebrow="Phase 01B / Production planning" title={`Build ${script.title}`} detail="Every operational choice changes the look, morale, and financial runway of your production."><button className="text-button" onClick={onBack}><ArrowRight size={16} className="flip" /> Change script</button></PageTitle><div className="planning-tabs"><button className={tab === 'locations' ? 'planning-tab active' : 'planning-tab'} onClick={() => setTab('locations')}><Globe2 size={15} /> Logistics & locations</button><button className={tab === 'welfare' ? 'planning-tab active' : 'planning-tab'} onClick={() => setTab('welfare')}><Users size={15} /> Crew welfare</button><button className={tab === 'assets' ? 'planning-tab active' : 'planning-tab'} onClick={() => setTab('assets')}><Sparkles size={15} /> Production assets</button></div>{tab === 'locations' && <><div className="planning-intro"><div><div className="eyebrow">Location rental</div><h2>Choose where the story lives</h2><p>Landmarks raise critic approval and international reach, but daily rent compounds fast.</p></div><div className="impact-meter"><small>Planning impact</small><strong>{money(planning.total + planning.overheadTotal)}</strong><span>before casting · {money(planning.overheadDaily)} daily overhead</span></div></div><div className="location-grid">{locations.map((item) => <button className={location.name === item.name ? 'location-card selected' : 'location-card'} key={item.name} onClick={() => setLocation(item)}><div className="location-art"><Globe2 size={26} /><span>{item.tier}</span></div><div className="location-copy"><h3>{item.name}</h3><p>Space quality cap <strong>{item.quality}/100</strong></p><div className="location-cost"><span>{money(item.fee)} upfront</span><strong>{money(item.daily)}/day</strong></div><small>{item.internationalBoost > 1 ? `+${Math.round((item.internationalBoost - 1) * 100)}% international reach` : 'Reliable domestic reach'}</small></div></button>)}</div></>}{tab === 'welfare' && <div className="planning-panel"><div className="planning-intro"><div><div className="eyebrow">Crew & talent welfare</div><h2>Keep the company happy</h2><p>Daily catering is calculated for {planning.catering ? 120 : 120} crew and talent across {10} shoot days.</p></div><MoraleMeter morale={planning.morale} label={moraleLabel} /></div><div className="package-grid">{cateringPackages.map((item) => <button className={catering.name === item.name ? 'package-card selected' : 'package-card'} key={item.name} onClick={() => setCatering(item)}><div><h3>{item.name}</h3><p>{money(item.daily)} per person / day</p></div><strong>{item.morale}<small> morale</small></strong><span>{item.strike < 0.03 ? 'Walkout resistant' : item.strike < 0.1 ? 'Union steady' : 'Strike risk elevated'}</span></button>)}</div></div>}{tab === 'assets' && <div className="planning-panel"><div className="planning-intro"><div><div className="eyebrow">Production assets</div><h2>Shape the visual language</h2><p>{script.genre} stories have different visual demands. Your live preview updates as you spend.</p></div><div className="visual-badge"><small>Visual presentation</small><strong>{planning.visualScore}</strong><span>{visualLabel}</span></div></div><AssetSlider label="Costume & wardrobe quality" value={costumeQuality} setValue={setCostumeQuality} max={100} suffix={`${money(Math.round(costumeQuality * 12000))} allocation`} /><AssetSlider label="Props department" value={propsBudget} setValue={setPropsBudget} max={1800000} step={50000} suffix={`${money(propsBudget)} allocation`} /><AssetSlider label="Visual effects" value={vfxBudget} setValue={setVfxBudget} max={2200000} step={50000} suffix={`${money(vfxBudget)} allocation`} /></div>}<div className={`planning-footer ${overBlock ? 'over' : ''}`}><div><span className={`morale-dot ${planning.morale >= 85 ? 'good' : planning.morale >= 60 ? 'warn' : 'bad'}`}></span><strong>Morale: {moraleLabel}</strong><small>{planning.delayChance > 0.2 ? 'High delay / walkout risk' : 'Production team is steady'}</small></div><div className="planning-total"><small>Location + operations total</small><strong>{money(planning.total + planning.overheadTotal)}</strong></div><button className="primary-button" onClick={onContinue}><ArrowRight size={17} /> Lock planning</button></div></div>; }
function MoraleMeter({ morale, label }) { return <div className="morale-meter"><small>Morale meter</small><strong>{label}</strong><div><i className={morale >= 85 ? 'good' : morale >= 60 ? 'warn' : 'bad'} style={{ width: `${morale}%` }}></i></div></div>; }
function SecurityDock({ securityBudget, setSecurityBudget }) { return <div className="security-dock"><div><ShieldAlert size={17} /><span><strong>Studio Security & PR</strong><small>Preemptive defense against rival sabotage</small></span></div><strong>{money(securityBudget)}</strong><input type="range" min="0" max="1200000" step="50000" value={securityBudget} onChange={(event) => setSecurityBudget(Number(event.target.value))} /></div>; }
function AssetSlider({ label, value, setValue, max, step = 1, suffix }) { return <div className="asset-slider"><div><label>{label}</label><strong>{suffix}</strong></div><input type="range" min="0" max={max} step={step} value={value} onChange={(event) => setValue(Number(event.target.value))} /><div className="range-labels"><span>Minimal</span><span>Premium</span></div></div>; }
function ReceiptModal({ result, budget, onContinue }) { const overhead = result.planning.overheadTotal; return <div className="receipt-screen"><div className="receipt-modal"><div className="eyebrow">Production closeout / Audit required</div><h1>Operating receipt</h1><p>Review the costs charged during principal photography before opening night.</p><div className="receipt-paper"><div className="receipt-row"><span>Location rental + maintenance</span><strong>{money(result.planning.location.fee + result.planning.location.daily * 10)}</strong></div><div className="receipt-row"><span>Catering & hospitality</span><strong>{money(result.planning.catering.daily * 120 * 10)}</strong></div><div className="receipt-row"><span>Assets & wardrobe</span><strong>{money(result.planning.total - result.planning.location.fee - result.planning.location.daily * 10 - result.planning.catering.daily * 120 * 10 - result.planning.equipment.daily * 10)}</strong></div><div className="receipt-row"><span>{result.planning.equipment.name}</span><strong>{money(result.planning.equipment.daily * 10)}</strong></div><div className="receipt-row"><span>Studio overhead · {10} days</span><strong>{money(overhead)}</strong></div>{result.loan && <div className="receipt-row loan-row"><span>Emergency loan + interest</span><strong>{money(result.loan.principal + result.loan.interest)}</strong></div>}<div className="receipt-total"><span>Total charged</span><strong>{money(result.totalCost)}</strong></div></div><div className="receipt-balance"><span>Balance after production</span><strong>{money(budget)}</strong></div><button className="primary-button full" onClick={onContinue}><Ticket size={17} /> Open box office report <ArrowRight size={17} /></button></div></div>; }
function Casting({ script, actor, setActor, director, setDirector, marketing, setMarketing, budget, projected, allowLoan, onStart, onBack }) { const overBudget = projected > budget && !allowLoan; return <div className="view fade-in"><PageTitle eyebrow="Phase 02 / Casting department" title="Assemble your cast" detail={`Bring ${script.title} to life with the right creative chemistry.`}><button className="text-button" onClick={onBack}><ArrowRight size={16} className="flip" /> Change planning</button></PageTitle><div className="casting-layout"><div className="casting-form"><TalentSelect label="Lead actor" value={actor} options={actors} onChange={setActor} showStar /><TalentSelect label="Director" value={director} options={directors} onChange={setDirector} /><div className="marketing-block"><div className="control-heading"><div><label>Marketing investment</label><p>Fuel the opening weekend hype.</p></div><strong>{money(marketing)}</strong></div><input type="range" min="0" max="2500000" step="50000" value={marketing} onChange={(event) => setMarketing(Number(event.target.value))} /><div className="range-labels"><span>$0</span><span>$2.5M</span></div></div></div><aside className={`cost-summary ${overBudget ? 'over' : ''}`}><div className="summary-label">Production estimate</div><div className="summary-total">{money(projected)}</div><div className="summary-line"><span>Script + planning</span><strong>{money(projected - actor.salary - director.salary - marketing)}</strong></div><div className="summary-line"><span>Talent & crew</span><strong>{money(actor.salary + director.salary)}</strong></div><div className="summary-line"><span>Marketing</span><strong>{money(marketing)}</strong></div><div className="summary-divider"></div><div className="summary-line balance"><span>Remaining after shoot</span><strong>{money(budget - projected)}</strong></div><button className="primary-button full" disabled={overBudget} onClick={onStart}><Play size={17} fill="currentColor" /> {allowLoan ? 'Secure emergency loan & film' : overBudget ? 'Over budget' : 'Start filming'} <ArrowRight size={17} /></button>{allowLoan && <div className="warning loan-warning">Bank loan available with escalating interest.</div>}{overBudget && <div className="warning">Your choices exceed the available studio budget.</div>}</aside></div></div>; }
function TalentSelect({ label, value, options, onChange, showStar }) { return <div className="talent-field"><div className="field-heading"><label>{label}</label><span>{value.role}</span></div><select value={value.name} onChange={(event) => onChange(options.find((option) => option.name === event.target.value))}>{options.map((option) => <option value={option.name} key={option.name}>{option.name} · {money(option.salary)}</option>)}</select><div className="talent-meta"><span>{showStar && <><Star size={13} fill="currentColor" /> {optionLabel(value.star)} star power</>}</span><span><Gauge size={13} /> {value.talent} talent</span><span className="salary">{money(value.salary)} salary</span></div></div>; }
function optionLabel(score) { return score >= 90 ? 'A-list' : score >= 70 ? 'Strong' : 'Indie'; }
function CrisisModal({ crisis, actor, onResolve }) { if (!crisis) return null; const diva = crisis.type === 'diva'; const sabotage = crisis.sabotage; return <div className="crisis-screen"><div className="crisis-modal"><div className="crisis-warning"><AlertTriangle size={19} /><span>Production halted · Emergency response required</span><i></i><i></i><i></i></div><div className="crisis-kicker">{crisis.severity}</div><h1>{crisis.title}</h1><p className="crisis-description">{crisis.description}</p>{diva && <div className="walkout-meter"><span>Diva factor / {actor.name}</span><strong>{crisis.walkout ? 'WALKOUT THREAT: HIGH' : 'VOLATILITY: ELEVATED'}</strong><div><i style={{ width: `${actor.star}%` }}></i></div></div>}<div className="crisis-options"><button onClick={() => onResolve('money')}><strong>{sabotage ? 'Deploy security & PR' : diva ? 'Give in to the demands' : 'Throw money at it'}</strong><span>-{money(crisis.money)} · preserve movie quality</span></button><button onClick={() => onResolve('compromise')}><strong>{diva ? 'Stand firm' : 'Take the cost-saving compromise'}</strong><span>{diva ? `-${crisis.quality * -1} quality${crisis.walkout ? ' · walkout risk' : ''}` : `-${Math.round(crisis.money * 0.18)} · ${crisis.quality} quality · +${crisis.time} days`}</span></button><button className="risky" onClick={() => onResolve(sabotage ? 'retaliate' : 'gamble')}><strong>{sabotage ? 'Retaliate with a smear campaign' : 'Roll the dice'}</strong><span>{sabotage ? '-$300k · 60% hype boost, 40% reputation hit' : '50% clear · 50% double penalty'}</span><Dice5 size={16} /></button></div></div></div>; }
function Filming({ progress }) { return <div className="filming-screen fade-in"><div className="film-glow"></div><div className="clapper"><div className="clapper-top"><i></i><i></i><i></i><i></i><i></i></div><div className="clapper-body"><Clapperboard size={46} /><strong>SS</strong><span>PRODUCTION<br />2024</span></div></div><div className="eyebrow">Phase 03 / Principal photography</div><h1>Rolling camera...</h1><p>Your production team is bringing this story to life.</p><div className="progress-track"><div style={{ width: `${progress}%` }}></div></div><div className="progress-readout"><span>Day {Math.max(1, Math.ceil(progress / 10))} of 10</span><strong>{progress}%</strong></div></div>; }
function CatalogProfits({ catalog }) { const streaming = catalog.reduce((sum, item) => sum + item.residual * 0.55, 0); const homeMedia = catalog.reduce((sum, item) => sum + item.residual * 0.25, 0); const merch = catalog.reduce((sum, item) => sum + item.residual * 0.2, 0); return <><PageTitle eyebrow="Long-tail revenue / Active catalog" title="Catalog profits" detail="Your finished films keep earning after the lights come up." /><div className="catalog-total"><div><small>Weekly passive income</small><strong>{money(streaming + homeMedia + merch)}</strong><p>Streaming rights, home media, and merchandise</p></div><TrendingUp size={35} /></div><div className="revenue-breakdown"><div><span className="breakdown-dot streaming"></span><small>Streaming rights</small><strong>{money(streaming)}</strong></div><div><span className="breakdown-dot home"></span><small>Home media</small><strong>{money(homeMedia)}</strong></div><div><span className="breakdown-dot merch"></span><small>Merchandise</small><strong>{money(merch)}</strong></div></div><div className="catalog-list">{catalog.length ? catalog.map((item) => <div className="catalog-row" key={`${item.title}-${item.year}`}><div className="catalog-poster"><Film size={18} /></div><div><strong>{item.title}</strong><small>{item.genre} · Released {item.year.toFixed(1)}</small></div><div className="catalog-rating"><Star size={13} fill="currentColor" /> {item.audienceScore}%</div><div className="catalog-residual"><small>Weekly residual</small><strong>{money(item.residual)}</strong></div></div>) : <div className="empty-catalog"><Film size={24} /><strong>Your catalog is waiting.</strong><span>Wrap your first release to start collecting passive income.</span></div>}</div></>; }
function Results({ result, visibleWeeks, currentGross, domestic, international, onWrap }) { const breakEven = currentGross >= result.totalCost; const net = currentGross - result.totalCost; return <div className="results-view view fade-in"><div className="marquee"><div className="marquee-stars">✦　✦　✦</div><div className="eyebrow">Now playing / Phase 04</div><h1>{result.title}</h1><span>{result.genre} · {result.weeks.length} week theatrical run</span><div className="marquee-sign">{breakEven && <div className="particles"><i></i><i></i><i></i><i></i></div>}<small>Global box office</small><strong><AnimatedNumber value={currentGross} /></strong><em>{breakEven ? '✦ BREAK-EVEN ACHIEVED ✦' : `Week ${Math.max(1, visibleWeeks)} in release`}</em></div></div><div className="results-body"><div className="results-main"><div className="results-head"><div><div className="eyebrow">Financial performance</div><h2>Release report</h2></div><div className="demand-chip"><Activity size={14} /> {result.marketDemand}x market demand</div></div><div className="revenue-columns"><div><small><span className="breakdown-dot domestic"></span>Domestic theatrical</small><strong><AnimatedNumber value={domestic} /></strong></div><div><small><span className="breakdown-dot international"></span>International receipts</small><strong><AnimatedNumber value={international} /></strong></div></div><div className="week-table"><div className="week-table-head"><span>Week</span><span>Domestic</span><span>International</span><span>Total</span></div>{result.weeks.map((week, index) => <div className={index < visibleWeeks ? 'week-row shown' : 'week-row'} key={week.week}><span>WEEK {String(week.week).padStart(2, '0')}</span><span>{money(week.domestic)}</span><span>{money(week.international)}</span><strong>{money(week.domestic + week.international)}</strong></div>)}</div><div className="reception"><div className="results-head"><div><div className="eyebrow">The conversation</div><h2>Reception report</h2></div><Quote size={22} /></div><div className="reception-scores"><div><small>Critic consensus</small><strong>{percent(result.criticScore)}</strong><div className="score-bar"><i style={{ width: `${result.criticScore}%` }}></i></div><span>Script + director craft</span></div><div><small>Audience rating</small><strong>{percent(result.audienceScore)}</strong><div className="score-bar audience"><i style={{ width: `${result.audienceScore}%` }}></i></div><span>Star power + marketing</span></div></div><blockquote>“{result.headline}”</blockquote></div></div><aside className={`finance-card ${net >= 0 ? 'profit' : 'loss'}`}><div className="summary-label">Final financial summary</div><h3>{net >= 0 ? 'A profitable premiere' : 'A costly lesson'}</h3><div className="finance-line"><span>Production cost</span><strong>{money(result.productionCost)}</strong></div><div className="finance-line"><span>Marketing</span><strong>{money(result.marketing)}</strong></div><div className="finance-line"><span>Gross collected</span><strong><AnimatedNumber value={currentGross} /></strong></div><div className="finance-divider"></div><div className="finance-net"><span>Net {net >= 0 ? 'profit' : 'loss'}</span><strong>{net >= 0 ? '+' : ''}{money(net)}</strong></div><div className="trend-result"><Globe2 size={14} />{result.trendMatched ? `+25% ${result.trend} trend bonus applied` : 'No genre trend bonus this release'}</div><button className="primary-button full" disabled={visibleWeeks < result.weeks.length} onClick={onWrap}><Ticket size={17} /> Wrap up release <ArrowRight size={17} /></button></aside></div></div>; }
function GameOver({ onRestart }) { return <div className="game-over"><div className="result-icon"><X size={30} /></div><div className="eyebrow">Studio insolvency</div><h1>The house lights<br /><em>have gone dark.</em></h1><p>Your studio balance fell below zero. Every great mogul gets one restart.</p><button className="primary-button" onClick={onRestart}><RotateCcw size={17} /> Restart studio</button></div>; }

createRoot(document.getElementById('root')).render(<App />);