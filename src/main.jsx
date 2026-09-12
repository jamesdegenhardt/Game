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
const upgradeNodes = [
  { id: 'backlot', branch: 'Backlot Expansion', name: 'Premium Soundstage', icon: '▣', cost: 3000000, reputation: 1, prereq: [], benefit: 'Own a permanent soundstage. Future films pay no location rental fees, gain +8 visual presentation, and add $35,000 daily lot upkeep.' },
  { id: 'greenScreen', branch: 'Backlot Expansion', name: 'State-of-the-art Green Screens', icon: '◈', cost: 2200000, reputation: 2, prereq: ['backlot'], benefit: 'Add +8 visual presentation to every film shot on your owned backlot.' },
  { id: 'practical', branch: 'Backlot Expansion', name: 'Practical Effects Facility', icon: '✦', cost: 3500000, reputation: 4, prereq: ['greenScreen'], benefit: 'Add +5 visual presentation and reduce set crisis probability by 15%.' },
  { id: 'castingAgency', branch: 'Department Heads', name: 'In-house Casting Agency', icon: '♙', cost: 2500000, reputation: 2, prereq: [], benefit: 'Reduce actor salaries by 25%, reduce diva crisis frequency, and pay a $35,000 weekly executive retainer.' },
  { id: 'marketingFirm', branch: 'Department Heads', name: 'In-house Marketing Firm', icon: '✺', cost: 2800000, reputation: 2, prereq: [], benefit: 'Add +20 hype to every release and pay a $45,000 weekly executive retainer.' },
  { id: 'vfxLab', branch: 'Department Heads', name: 'VFX Laboratory', icon: '⬡', cost: 4000000, reputation: 4, prereq: [], benefit: 'Science-fiction and action films gain +8 baseline quality and pay a $60,000 weekly executive retainer.' },
  { id: 'streaming', branch: 'Studio Vault & Syndication', name: 'Streaming Platform Partnership', icon: '▤', cost: 3000000, reputation: 3, prereq: [], benefit: 'Double weekly residual payments from every completed catalog film.' },
  { id: 'cultClassic', branch: 'Studio Vault & Syndication', name: 'Cult Classic Algorithm', icon: '◎', cost: 2100000, reputation: 4, prereq: ['streaming'], benefit: 'Each release has a chance to resurrect a poorly reviewed catalog film for a major cash bonus.' },
  { id: 'merchandising', branch: 'Studio Vault & Syndication', name: 'Merchandising Licensing', icon: '◇', cost: 2600000, reputation: 5, prereq: ['streaming'], benefit: 'Action and Comedy releases receive a flat $400,000 licensing bonus.' },
];
const rivalStudios = [
  { id: 'atlas', name: 'Atlas Pictures', color: '#d58c67', base: 86, shares: 1000000, dividend: 0.018, vault: 'Orbitfall', territory: 'West Campus' },
  { id: 'monument', name: 'Monument Works', color: '#7db4c4', base: 124, shares: 1000000, dividend: 0.024, vault: 'The Glass Sea', territory: 'North Lot' },
  { id: 'lighthouse', name: 'Lighthouse Media', color: '#b3a26b', base: 63, shares: 1000000, dividend: 0.012, vault: 'Small Miracles', territory: 'East Annex' },
];
const merchTiers = [
  { id: 'plastic', name: 'Plastic Action Figures', unitCost: 8, price: 24, demand: 1, label: 'Mass market' },
  { id: 'apparel', name: 'Premium Apparel Line', unitCost: 24, price: 68, demand: 1.2, label: 'Streetwear capsule' },
  { id: 'collectible', name: 'Limited Edition Collectibles', unitCost: 75, price: 240, demand: 0.72, label: 'Numbered prestige run' },
];
const parkLands = [
  { id: 'orlando', name: 'Orlando Film Coast', cost: 45000000, guests: 18000, upkeep: 180000 },
  { id: 'osaka', name: 'Osaka Story Harbor', cost: 72000000, guests: 26000, upkeep: 260000 },
  { id: 'london', name: 'London Backlot Quarter', cost: 110000000, guests: 38000, upkeep: 380000 },
];
const universePhases = [
  { title: 'Foundation', genre: 'Action', budget: 85000000 },
  { title: 'Expansion', genre: 'Sci-Fi', budget: 120000000 },
  { title: 'Collision', genre: 'Comedy', budget: 150000000 },
  { title: 'Event Horizon', genre: 'Action', budget: 220000000 },
];
const privateEquityFunds = [
  { name: 'Blackstone Pictures Fund', cash: 250000000, equity: 0.22, backend: 0.3, target: 160000000 },
  { name: 'Apex Media Capital', cash: 500000000, equity: 0.35, backend: 0.45, target: 300000000 },
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

function createRelease({ script, actor, director, marketing, quality, hype, trend, planning, loan, impact, backendCut }) {
  const finalQuality = Math.max(15, Math.min(99, Math.round(quality + (planning.visualScore - 70) * 0.25 + (planning.morale - 70) * 0.1 + planning.location.criticBoost + planning.equipment.reviewBonus + planning.catering.talentBoost + impact.quality - (script.quality > 80 && planning.location.quality < 60 ? 18 : 0))));
  const marketDemand = Number((0.8 + Math.random() * 0.7).toFixed(2));
  const trendBonus = script.genre === trend ? 1.25 : 1;
  const finalHype = Math.max(0, hype + (impact.hype || 0));
  const openingGross = Math.round((finalQuality + finalHype) * 58000 * marketDemand * trendBonus * planning.location.internationalBoost * (1 - backendCut));
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
  const [upgrades, setUpgrades] = useState([]);
  const [upgradeCelebration, setUpgradeCelebration] = useState(null);
  const [crisis, setCrisis] = useState(null);
  const [productionImpact, setProductionImpact] = useState({ quality: 0, hype: 0, time: 0 });
  const [lastAwardsYear, setLastAwardsYear] = useState(2024);
  const [awardCeremony, setAwardCeremony] = useState(null);
  const [awardsScandal, setAwardsScandal] = useState(false);
  const [talentPrestige, setTalentPrestige] = useState({ actors: {}, directors: {} });
  const [festivalLocked, setFestivalLocked] = useState(false);
  const [festivalBackendCut, setFestivalBackendCut] = useState(0);
  const [stockHoldings, setStockHoldings] = useState({});
  const [rivalControl, setRivalControl] = useState({});
  const [corporateWar, setCorporateWar] = useState(null);
  const [poisonPillUsed, setPoisonPillUsed] = useState(false);
  const [controlLost, setControlLost] = useState(false);
  const [streamingName, setStreamingName] = useState('Silver Screen+');
  const [streamingPrice, setStreamingPrice] = useState(12);
  const [serverBudget, setServerBudget] = useState(280000);
  const [streamingFeatures, setStreamingFeatures] = useState([]);
  const [exclusiveCatalog, setExclusiveCatalog] = useState(true);
  const [subscribers, setSubscribers] = useState(0);
  const [streamingChurn, setStreamingChurn] = useState(4.2);
  const [streamingQuarter, setStreamingQuarter] = useState(0);
  const [merchLine, setMerchLine] = useState(null);
  const [merchandiseCash, setMerchandiseCash] = useState(0);
  const [merchSales, setMerchSales] = useState(0);
  const [merchWriteOff, setMerchWriteOff] = useState(0);
  const [licensedMerch, setLicensedMerch] = useState(false);
  const [park, setPark] = useState(null);
  const [parkAttraction, setParkAttraction] = useState(null);
  const [parkTicket, setParkTicket] = useState(68);
  const [parkFoodQuality, setParkFoodQuality] = useState(55);
  const [parkMaintenance, setParkMaintenance] = useState(260000);
  const [parkCrisis, setParkCrisis] = useState(null);
  const [culturalMonolith, setCulturalMonolith] = useState(false);
  const [universe, setUniverse] = useState(null);
  const [privateEquity, setPrivateEquity] = useState(null);
  const [insurance, setInsurance] = useState(false);
  const [megaDisaster, setMegaDisaster] = useState(null);
  const [boardTarget, setBoardTarget] = useState(0);
  const [corporateEnding, setCorporateEnding] = useState(null);

  const hasUpgrade = (id) => upgrades.includes(id);
  const upgradeEffects = { backlot: hasUpgrade('backlot'), greenScreen: hasUpgrade('greenScreen'), practical: hasUpgrade('practical'), castingAgency: hasUpgrade('castingAgency'), marketingFirm: hasUpgrade('marketingFirm'), vfxLab: hasUpgrade('vfxLab'), streaming: hasUpgrade('streaming'), cultClassic: hasUpgrade('cultClassic'), merchandising: hasUpgrade('merchandising') };
  const actorPrestige = talentPrestige.actors[actor.name] || 0;
  const directorPrestige = talentPrestige.directors[director.name] || 0;
  const hiredActor = { ...actor, salary: Math.round(actor.salary * (upgradeEffects.castingAgency ? 0.75 : 1) * (1 + actorPrestige * 0.4)), star: actor.star + actorPrestige * 5 };
  const crewSize = 120;
  const shootDays = 10;
  const dailyOverhead = 55000 + (upgradeEffects.backlot ? 35000 : location.daily) + equipment.daily + (upgradeEffects.castingAgency ? 35000 : 0) + (upgradeEffects.marketingFirm ? 45000 : 0) + (upgradeEffects.vfxLab ? 60000 : 0);
  const assetCost = Math.round(costumeQuality * 12000) + propsBudget + vfxBudget;
  const immersionScore = Math.min(100, Math.round(costumeQuality * 0.3 + Math.min(propsBudget / 18000, 100) * 0.35 + Math.min(vfxBudget / 22000, 100) * 0.35 + (upgradeEffects.backlot ? 8 : 0) + (upgradeEffects.greenScreen ? 8 : 0) + (upgradeEffects.practical ? 5 : 0)));
  const morale = catering.morale;
  const planning = { location, catering, equipment, securityBudget, visualScore: immersionScore, morale, delayChance: location.delay + catering.strike - (upgradeEffects.practical ? 0.15 : 0) + (script?.quality > 80 && location.quality < 60 ? 0.18 : 0), crisisChance: Math.min(0.8, location.delay + catering.strike - (upgradeEffects.practical ? 0.15 : 0) + (securityBudget < 200000 ? 0.12 : 0) + (hiredActor.star > 85 ? 0.08 : 0) - (upgradeEffects.castingAgency ? 0.1 : 0)), overheadDaily: dailyOverhead, overheadTotal: dailyOverhead * shootDays, total: (upgradeEffects.backlot ? 0 : location.fee + location.daily * shootDays) + catering.daily * crewSize * shootDays + equipment.daily * shootDays + assetCost + securityBudget };
  const projected = (script?.cost || 0) + hiredActor.salary + director.salary + marketing + planning.total + planning.overheadTotal;
  const quality = script ? Math.round(script.quality * 0.45 + (director.talent + directorPrestige * 5) * 0.25 + hiredActor.talent * 0.3 + (upgradeEffects.vfxLab && ['Sci-Fi', 'Action'].includes(script.genre) ? 8 : 0)) : 0;
  const hype = script ? Math.round(marketing / 10000 * (directorPrestige > 0 ? 2 : 1) + hiredActor.star * 0.8 + (upgradeEffects.marketingFirm ? 20 : 0) + actorPrestige * 16) : 0;
  const valuation = Math.round(budget * 5 + catalog.reduce((sum, item) => sum + item.gross, 0) + reputation * 1000000 + (upgradeEffects.backlot ? 10000000 : 0));
  const exchangeUnlocked = valuation >= 100000000;
  const streamingUnlocked = catalog.length >= 50 && budget >= 200000000;
  const exclusiveTitles = exclusiveCatalog ? catalog.length : Math.round(catalog.length * 0.25);
  const averageCriticalScore = catalog.length ? Math.round(catalog.reduce((sum, item) => sum + item.criticScore, 0) / catalog.length) : 0;
  const streamingRevenue = subscribers * streamingPrice;
  const effectiveStreamingChurn = Math.max(1.5, 8 + (streamingPrice - 12) * 0.35 - serverBudget / 500000 - streamingFeatures.length * 0.7 - (exclusiveCatalog ? averageCriticalScore / 100 : 0));
  const streamingRetention = Math.max(42, 100 - effectiveStreamingChurn);
  const merchUnlocked = Boolean(merchLine) || catalog.some((item) => ['Action', 'Sci-Fi', 'Comedy'].includes(item.genre) && item.audienceScore > 85);
  const belovedFranchises = catalog.filter((item) => item.audienceScore > 85).length;
  const parkUnlocked = valuation >= 1000000000 && belovedFranchises >= 3;
  const parkGuests = park ? Math.round(park.land.guests * (0.7 + (parkAttraction ? parkAttraction.relevance : 0.2)) * Math.max(0.4, 1 - Math.max(0, parkTicket - 65) * 0.012)) : 0;
  const parkRevenue = parkGuests * parkTicket + parkGuests * Math.round(parkFoodQuality * 0.35);
  const parkSatisfaction = Math.max(20, Math.min(99, Math.round(parkFoodQuality * 0.55 + Math.min(parkMaintenance / 7000, 100) * 0.45 - Math.max(0, parkTicket - 80) * 0.3)));
  const universeUnlocked = budget >= 250000000 && reputation >= 5;
  const megacorpUnlocked = budget >= 1000000000 && exchangeUnlocked && streamingUnlocked && parkUnlocked;
  const universeMomentum = universe?.momentum || 1;
  const stockPrices = rivalStudios.reduce((prices, rival) => ({ ...prices, [rival.id]: Number((rival.base + catalog.length * 4 + reputation * 2).toFixed(2)) }), {});

  const purchaseScript = (choice) => {
    if (choice.cost > budget) return;
    setScript(choice);
    setBudget((current) => current - choice.cost);
    setPhase('logistics');
  };

  const buyUpgrade = (node) => {
    if (upgrades.includes(node.id) || budget < node.cost || reputation < node.reputation || node.prereq.some((id) => !upgrades.includes(id))) return;
    setBudget((current) => current - node.cost);
    setUpgrades((current) => [...current, node.id]);
    setUpgradeCelebration(node.id);
    setTimeout(() => setUpgradeCelebration(null), 1400);
  };
  const buyStock = (rival, shares) => {
    const price = stockPrices[rival.id] * shares;
    if (!exchangeUnlocked || price > budget) return;
    setBudget((current) => current - price);
    setStockHoldings((current) => ({ ...current, [rival.id]: (current[rival.id] || 0) + shares }));
    if (((stockHoldings[rival.id] || 0) + shares) / rival.shares >= 0.51) setRivalControl((current) => ({ ...current, [rival.id]: true }));
  };
  const startCorporateWar = (rival) => setCorporateWar({ rival, round: 0, playerBid: 0, rivalBid: Math.round(stockPrices[rival.id] * rival.shares * 0.52) });
  const corporateBid = (amount) => {
    if (!corporateWar || amount > budget) return;
    const next = { ...corporateWar, round: corporateWar.round + 1, playerBid: corporateWar.playerBid + amount, rivalBid: corporateWar.rivalBid * (1.08 + Math.random() * 0.12) };
    if (next.round >= 3) {
      if (next.playerBid >= next.rivalBid) { setRivalControl((current) => ({ ...current, [next.rival.id]: true })); setBudget((current) => current - amount); setCorporateWar(null); }
      else { setBudget((current) => current - amount); setReputation((current) => Math.max(0, current - 3)); setCorporateWar(null); }
    } else { setBudget((current) => current - amount); setCorporateWar(next); }
  };
  const defendCorporateWar = (mode) => {
    if (mode === 'poison') { setPoisonPillUsed(true); setCorporateWar(null); setReputation((current) => Math.max(0, current - 1)); }
    else { setBudget((current) => current + 2500000); setCorporateWar(null); }
  };
  const launchPlatform = (name, price, infrastructure) => { setStreamingName(name); setStreamingPrice(price); setServerBudget(infrastructure); setSubscribers(Math.round(exclusiveTitles * Math.max(10000, averageCriticalScore * 900))); setPhase('streaming'); };
  const toggleCatalogLicense = (exclusive) => { setExclusiveCatalog(exclusive); if (!exclusive) setBudget((current) => current + catalog.reduce((sum, item) => sum + Math.round(item.gross * 0.08), 0)); };
  const startMerchLine = (tier, units, licensing) => { const cost = tier.unitCost * units + (licensing ? 1000000 : 0); if (cost > budget) return; setBudget((current) => current - cost); setMerchLine({ tier, units, remaining: units, licensing }); setLicensedMerch(licensing); setPhase('merchandising'); };
  const buyParkLand = (land) => { if (land.cost > budget || !parkUnlocked) return; setBudget((current) => current - land.cost); setPark({ land, attractions: [], quarters: 0 }); setPhase('parks'); };
  const openParkCrisis = () => { const events = [{ title: 'Hydraulic ride failure', description: 'A flagship attraction has stopped mid-loop. Guests are filming the evacuation.', cost: 650000 }, { title: 'Food court PR nightmare', description: 'A viral review calls the park lunch “an expensive crime against nachos.”', cost: 300000 }, { title: 'Extreme weather closure', description: 'A coastal storm has forced an emergency closure and refunds.', cost: 900000 }]; setParkCrisis(events[Math.floor(Math.random() * events.length)]); };
  const resolveParkCrisis = (pay) => { if (pay) setBudget((current) => current - parkCrisis.cost); else setReputation((current) => Math.max(0, current - 1)); setParkCrisis(null); };
  const startUniverse = (signingBonus) => { if (!universeUnlocked || signingBonus > budget) return; setBudget((current) => current - signingBonus); setUniverse({ phase: 0, momentum: 1, fatigue: false, actorContract: true, signingBonus }); setPhase('universe'); };
  const acceptEquity = (fund) => { if (fund.cash > 0) { setBudget((current) => current + fund.cash); setPrivateEquity({ ...fund, debt: Math.round(fund.cash * 1.45), deadline: year + 1 }); setPhase('dashboard'); } };
  const resolveMegaDisaster = (choice) => { if (choice === 'insurance') setBudget((current) => current - 12000000); else { setBudget((current) => current - 45000000); setReputation((current) => Math.max(0, current - 3)); } setMegaDisaster(null); setPhase('filming'); };
  const startMegacorp = () => { if (megacorpUnlocked) setCorporateEnding({ round: 0, rivalBid: 1400000000, playerBid: 0 }); };
  const bidMegacorp = (amount) => { if (!corporateEnding || amount > budget) return; const next = { ...corporateEnding, round: corporateEnding.round + 1, playerBid: corporateEnding.playerBid + amount, rivalBid: corporateEnding.rivalBid * 1.14 }; setBudget((current) => current - amount); if (next.round >= 4) setCorporateEnding(next.playerBid >= next.rivalBid ? { ...next, victory: true } : { ...next, defeat: true }); else setCorporateEnding(next); };

  const beginAwards = (campaign) => {
    setBudget((current) => current - campaign);
    if (campaign > 5000000 && Math.random() < 0.18) {
      setAwardsScandal(true);
      setCatalog((current) => current.map((item) => ({ ...item, awardWinner: false })));
      setReputation(0);
      setFestivalLocked(true);
      setAwardCeremony({ scandal: true, categories: [] });
      setPhase('awards');
      return;
    }
    const eligible = catalog.filter((item) => Math.floor(item.year) === Math.floor(year - 0.5) && item.criticScore > 90);
    const rival = { title: ['Empire of Dust', 'The Golden Hour', 'Titanfall: Ascension'][Math.floor(Math.random() * 3)], criticScore: 88 + Math.floor(Math.random() * 10), actor: { name: 'Rival Talent' }, director: { name: 'Rival Auteur' } };
    const scoreFor = (item, bonus) => (item.criticScore || 0) + (item.audienceScore || 0) * 0.18 + Math.sqrt(campaign / 1000000) * bonus;
    const bestPicture = [...eligible, rival].sort((a, b) => scoreFor(b, 2) - scoreFor(a, 2))[0];
    const bestDirector = [...eligible, rival].sort((a, b) => (b.director?.talent || b.criticScore) - (a.director?.talent || a.criticScore))[0];
    const bestActor = [...eligible, rival].sort((a, b) => (b.actor?.star || b.audienceScore) - (a.actor?.star || a.audienceScore))[0];
    setAwardCeremony({ scandal: false, campaign, categories: [{ name: 'Best Picture', winner: bestPicture, player: Boolean(bestPicture.title && eligible.some((item) => item.title === bestPicture.title)) }, { name: 'Best Director', winner: bestDirector, player: Boolean(bestDirector.title && eligible.some((item) => item.title === bestDirector.title)) }, { name: 'Best Lead Actor', winner: bestActor, player: Boolean(bestActor.title && eligible.some((item) => item.title === bestActor.title)) }] });
    setPhase('awards');
  };

  const finishAwards = (ceremony) => {
    if (ceremony.scandal) { setAwardCeremony(null); setPhase('dashboard'); return; }
    const wins = ceremony.categories.filter((category) => category.player);
    setCatalog((current) => current.map((item) => wins.some((win) => win.winner.title === item.title) ? { ...item, awardWinner: true, residual: item.residual * 3, gross: item.gross + 750000 } : item));
    setReputation((current) => current + wins.length * 3);
    wins.forEach((win) => {
      if (win.name === 'Best Lead Actor') setTalentPrestige((current) => ({ ...current, actors: { ...current.actors, [win.winner.actor.name]: (current.actors[win.winner.actor.name] || 0) + 1 } }));
      if (win.name === 'Best Director') setTalentPrestige((current) => ({ ...current, directors: { ...current.directors, [win.winner.director.name]: (current.directors[win.winner.director.name] || 0) + 1 } }));
    });
    setAwardCeremony(null);
    setPhase('dashboard');
  };

  const startFilming = () => {
    const castingCost = hiredActor.salary + director.salary + marketing + planning.total + planning.overheadTotal;
    const remainingAfterProduction = budget - castingCost;
    const loanAmount = Math.max(0, planning.overheadDaily - remainingAfterProduction);
    const newLoan = loanAmount > 0 ? { principal: Math.ceil(loanAmount / 100000) * 100000, interest: Math.ceil(loanAmount / 100000) * 25000, deadline: year + 0.5 } : null;
    if (projected > budget && !newLoan) return;
    setLoan(newLoan);
    setBudget((current) => current - actor.salary - director.salary - marketing - planning.total - planning.overheadTotal + (newLoan?.principal || 0));
    setShootProgress(0);
    if (script?.genre === 'Action' && !insurance && Math.random() < 0.25) { setMegaDisaster({ title: 'Uninsured stunt liability', description: 'A stunt has gone catastrophically wrong on an uninsured set. Legal counsel estimates a $45M settlement.' }); setPhase('mega-disaster'); return; }
    setPhase('filming');
  };

  const completeFestival = ({ hypeBoost, backendCut, payout, marketingFree }) => {
    setBudget((current) => current + payout);
    setProductionImpact((current) => ({ ...current, hype: current.hype + hypeBoost }));
    setFestivalBackendCut(backendCut);
    if (marketingFree) setMarketing(0);
    setPhase('casting');
  };

  useEffect(() => {
    if (phase !== 'filming') return undefined;
    const timer = setInterval(() => setShootProgress((current) => {
      if (current >= 100) { clearInterval(timer); const universeQuality = universe && universe.phase === 0 && quality < 60; if (universeQuality) setUniverse((current) => ({ ...current, fatigue: true, momentum: 0.5 })); else if (universe) setUniverse((current) => ({ ...current, phase: current.phase + 1, momentum: current.momentum * (quality > 75 ? 1.25 : 0.75) })); setResult(createRelease({ script, actor: hiredActor, director, marketing, quality: Math.round(quality * universeMomentum), hype: Math.round(hype * universeMomentum), trend, planning, loan, impact: productionImpact, backendCut: festivalBackendCut })); setVisibleWeeks(0); setPhase('receipt'); return 100; }
      if (!crisis && Math.random() < planning.crisisChance * 0.07) { setCrisis(createCrisis({ script, actor, director, planning, budget })); setPhase('crisis'); return current; }
      if (Math.random() < planning.delayChance * 0.18) return current;
      return current + 4;
    }), 100);
    return () => clearInterval(timer);
  }, [phase, quality, hype, script, hiredActor, director, marketing, trend, planning, loan, crisis, productionImpact, budget]);

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
    const dividends = rivalStudios.reduce((sum, rival) => sum + (stockHoldings[rival.id] || 0) * stockPrices[rival.id] * rival.dividend, 0);
    const licensingBonus = upgradeEffects.merchandising && ['Action', 'Comedy'].includes(result.genre) ? 400000 : 0;
    const cultBonus = upgradeEffects.cultClassic && result.criticScore < 60 && Math.random() < 0.35 ? 1200000 : 0;
    const merchandiseGross = merchLine && merchLine.tier ? Math.round(Math.min(merchLine.remaining, merchLine.units * merchLine.tier.demand * (result.audienceScore / 100)) * merchLine.tier.price) : 0;
    const merchLoss = merchLine && merchLine.tier ? Math.max(0, merchLine.remaining - Math.round(merchLine.units * merchLine.tier.demand * (result.audienceScore / 100))) * merchLine.tier.unitCost : 0;
    const parkQuarterProfit = park ? Math.max(0, parkRevenue * 90 - (park.land.upkeep + parkMaintenance) * 90) : 0;
    const finalGross = gross + licensingBonus + cultBonus + merchandiseGross + parkQuarterProfit;
    const net = finalGross - result.totalCost;
    const parkSynergy = parkAttraction && result.genre === parkAttraction.genre ? 1.25 : 1;
    const residual = Math.round(result.audienceScore * 1550 * (upgradeEffects.streaming ? 2 : 1) * parkSynergy);
    setCatalog((current) => [...current, { ...result, gross: finalGross, net, residual, year, licensingBonus, cultBonus }]);
    setMerchandiseCash((current) => current + merchandiseGross);
    setMerchSales((current) => current + merchandiseGross);
    setMerchWriteOff((current) => current + merchLoss);
    setBudget((current) => current + finalGross + dividends - (result.loan?.principal || 0) - (result.loan?.interest || 0));
    setReputation((current) => current + (result.criticScore > 85 ? 2 : result.criticScore > 70 ? 1 : 0));
    setYear((current) => current + 0.5);
    setScripts(randomScripts());
    setScript(null);
    setResult(null);
    setDashboardTab('overview');
    setLoan(null);
    const nextYear = year + 0.5;
    if (nextYear >= lastAwardsYear + 1) { setLastAwardsYear(nextYear); setPhase('awards'); } else setPhase('dashboard');
    if (budget + finalGross + dividends - (result.loan?.principal || 0) - (result.loan?.interest || 0) < 0) setGameOver(true);
    if (catalog.filter((item) => item.audienceScore > 85).length >= 3 && valuation >= 1000000000 && !culturalMonolith) setCulturalMonolith(true);
  };

  if (gameOver) return <GameOver onRestart={() => { setBudget(10000000); setYear(2024); setReputation(0); setCatalog([]); setUpgrades([]); setGameOver(false); setPhase('dashboard'); }} />;
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
        <button className={phase === 'hq' ? 'nav-item active' : 'nav-item'} onClick={() => setPhase('hq')}><BriefcaseBusiness size={18} /> Studio HQ</button>
        <button className={phase === 'universe' ? 'nav-item active' : 'nav-item'} disabled={!universeUnlocked} onClick={() => setPhase('universe')}><Sparkles size={18} /> Cinematic Universe {!universeUnlocked && <small className="nav-lock">$250M / 5★</small>}</button>
        <button className={phase === 'equity' ? 'nav-item active' : 'nav-item'} onClick={() => setPhase('equity')}><Wallet size={18} /> Venture Capital</button>
        <button className={phase === 'exchange' ? 'nav-item active' : 'nav-item'} disabled={!exchangeUnlocked} onClick={() => setPhase('exchange')}><TrendingUp size={18} /> Stock Exchange {!exchangeUnlocked && <small className="nav-lock">$100M</small>}</button>
        <button className={phase === 'streaming' ? 'nav-item active' : 'nav-item'} disabled={!streamingUnlocked} onClick={() => setPhase('streaming')}><Film size={18} /> Streaming Platform {!streamingUnlocked && <small className="nav-lock">50 films / $200M</small>}</button>
        <button className={phase === 'merchandising' ? 'nav-item active' : 'nav-item'} disabled={!merchUnlocked} onClick={() => setPhase('merchandising')}><Ticket size={18} /> Merch & Licensing {!merchUnlocked && <small className="nav-lock">85% audience hit</small>}</button>
        <button className={phase === 'parks' ? 'nav-item active' : 'nav-item'} disabled={!parkUnlocked} onClick={() => setPhase('parks')}><Sparkles size={18} /> Theme Parks {!parkUnlocked && <small className="nav-lock">$1B / 3 hits</small>}</button>
        <button className={phase === 'megacorp' ? 'nav-item active' : 'nav-item'} disabled={!megacorpUnlocked} onClick={() => setPhase('megacorp')}><Star size={18} /> Global Megacorp {!megacorpUnlocked && <small className="nav-lock">Endgame locked</small>}</button>
        <button className={phase === 'preproduction' || phase === 'logistics' || phase === 'casting' ? 'nav-item active' : 'nav-item'} onClick={() => setPhase('preproduction')}><Clapperboard size={18} /> Production</button>
        <button className={phase === 'results' ? 'nav-item active' : 'nav-item'} onClick={() => result && setPhase('results')}><BarChart3 size={18} /> Box Office</button>
      </nav>
      <div className="sidebar-bottom"><div className="nav-label">Studio</div><button className="nav-item" onClick={() => { setDashboardTab('catalog'); setPhase('dashboard'); }}><BriefcaseBusiness size={18} /> Catalog Profits</button><button className="nav-item"><Settings size={18} /> Settings</button><div className="user-card"><div className="avatar">JD</div><div><strong>Jordan Davis</strong><small>Studio Owner</small></div><Menu size={16} className="user-menu" /></div></div>
    </aside>
    <main className="main-content">
      <header className="topbar"><div className="mobile-logo"><Film size={18} /></div><div className="breadcrumb"><span>Studio</span><span>/</span><strong>{phase === 'hq' ? 'Studio Headquarters' : phase === 'universe' ? 'Cinematic Universe' : phase === 'equity' ? 'Private Equity' : phase === 'megacorp' ? 'Global Megacorp' : phase === 'mega-disaster' ? 'Production Disaster' : phase === 'awards' ? 'Awards Season' : phase === 'dashboard' ? (dashboardTab === 'catalog' ? 'Catalog Profits' : 'Overview') : phase === 'preproduction' ? 'Pre-Production' : phase === 'logistics' ? 'Logistics & Assets' : phase === 'casting' ? 'Casting Department' : phase === 'filming' ? 'Principal Photography' : phase === 'receipt' ? 'Production Receipt' : 'Box Office Results'}</strong></div><div className="header-metrics"><Metric icon={<Wallet size={16} />} label="Studio budget" value={<AnimatedNumber value={budget} />} /><Metric icon={<Star size={16} />} label="Reputation" value={reputation.toFixed(1)} suffix=" stars" /><Metric icon={<CalendarDays size={16} />} label="Current year" value={year.toFixed(1)} /></div><button className="icon-button"><Activity size={18} /></button></header>
      {phase === 'dashboard' && <Dashboard onNewProject={newProject} catalog={catalog} dashboardTab={dashboardTab} setDashboardTab={setDashboardTab} year={year} />}
      {phase === 'awards' && <AwardsSeason catalog={catalog} year={year} budget={budget} ceremony={awardCeremony} scandal={awardsScandal} onBegin={beginAwards} onFinish={finishAwards} />}
      {phase === 'hq' && <Headquarters budget={budget} reputation={reputation} upgrades={upgrades} onBuy={buyUpgrade} celebration={upgradeCelebration} onBack={() => setPhase('dashboard')} />}
      {phase === 'exchange' && <StockExchange valuation={valuation} budget={budget} prices={stockPrices} holdings={stockHoldings} control={rivalControl} poisonPillUsed={poisonPillUsed} onBuy={buyStock} onTakeover={startCorporateWar} onBack={() => setPhase('dashboard')} />}
      {phase === 'streaming' && <StreamingPlatform name={streamingName} price={streamingPrice} serverBudget={serverBudget} setName={setStreamingName} setPrice={setStreamingPrice} setServerBudget={setServerBudget} features={streamingFeatures} setFeatures={setStreamingFeatures} exclusive={exclusiveCatalog} toggleExclusive={toggleCatalogLicense} catalog={catalog} subscribers={subscribers} setSubscribers={setSubscribers} revenue={streamingRevenue} churn={effectiveStreamingChurn} retention={streamingRetention} quarter={streamingQuarter} setQuarter={setStreamingQuarter} onLaunch={launchPlatform} onBack={() => setPhase('dashboard')} />}
      {phase === 'merchandising' && <MerchandisingDashboard catalog={catalog} budget={budget} merchLine={merchLine} sales={merchSales} writeOff={merchWriteOff} onStart={startMerchLine} licensed={licensedMerch} setLicensed={setLicensedMerch} onBack={() => setPhase('dashboard')} />}
      {phase === 'parks' && <ThemeParkDashboard park={park} parkUnlocked={parkUnlocked} parkAttraction={parkAttraction} setParkAttraction={setParkAttraction} ticket={parkTicket} setTicket={setParkTicket} food={parkFoodQuality} setFood={setParkFoodQuality} maintenance={parkMaintenance} setMaintenance={setParkMaintenance} guests={parkGuests} revenue={parkRevenue} satisfaction={parkSatisfaction} onBuyLand={buyParkLand} onCrisis={openParkCrisis} onBack={() => setPhase('dashboard')} />}
      {parkCrisis && <ParkCrisis crisis={parkCrisis} onResolve={resolveParkCrisis} />}
      {culturalMonolith && <div className="monolith-celebration"><div>✦　✧　✦　✧　✦</div><h1>Cultural Monolith</h1><p>Box office. Streaming. Parks. Your studio now owns the audience.</p><button className="primary-button" onClick={() => setCulturalMonolith(false)}>Enter the golden age</button></div>}
      {corporateWar && <CorporateWar war={corporateWar} budget={budget} onBid={corporateBid} onDefend={defendCorporateWar} />}
      {phase === 'preproduction' && <PreProduction scripts={scripts} budget={budget} trend={trend} onPurchase={purchaseScript} onBack={() => setPhase('dashboard')} />}
      {phase === 'logistics' && <><LogisticsPlanner script={script} budget={budget} location={location} setLocation={setLocation} catering={catering} setCatering={setCatering} equipment={equipment} setEquipment={setEquipment} costumeQuality={costumeQuality} setCostumeQuality={setCostumeQuality} propsBudget={propsBudget} setPropsBudget={setPropsBudget} vfxBudget={vfxBudget} setVfxBudget={setVfxBudget} planning={planning} onContinue={() => setPhase('casting')} onBack={() => setPhase('preproduction')} /><SecurityDock securityBudget={securityBudget} setSecurityBudget={setSecurityBudget} /></>}
      {phase === 'casting' && <><Casting script={script} actor={actor} setActor={setActor} director={director} setDirector={setDirector} marketing={marketing} setMarketing={setMarketing} budget={budget} projected={projected} allowLoan={projected > budget} onStart={startFilming} onBack={() => setPhase('logistics')} /><InsuranceDock insured={insurance} onToggle={() => setInsurance((current) => !current)} /></>}
      {phase === 'mega-disaster' && <MegaDisaster crisis={megaDisaster} insured={insurance} onResolve={resolveMegaDisaster} />}
      {phase === 'universe' && <UniversePlanner budget={budget} universe={universe} onStart={startUniverse} onBack={() => setPhase('dashboard')} />}
      {phase === 'equity' && <EquityDashboard budget={budget} onAccept={acceptEquity} onBack={() => setPhase('dashboard')} />}
      {phase === 'megacorp' && <MegacorpFinale ending={corporateEnding} budget={budget} onStart={startMegacorp} onBid={bidMegacorp} onReset={() => setGameOver(true)} />}
      {phase === 'filming' && <Filming progress={shootProgress} />}
      {phase === 'crisis' && <CrisisModal crisis={crisis} actor={actor} onResolve={resolveCrisis} />}
      {phase === 'receipt' && <ReceiptModal result={result} budget={budget} onContinue={() => setPhase('results')} />}
      {phase === 'results' && <Results result={result} visibleWeeks={visibleWeeks} currentGross={currentGross} domestic={domestic} international={international} onWrap={wrapRelease} />}
    </main>
  </div>;
}

function Metric({ icon, label, value, suffix = '' }) { return <div className="metric"><span className="metric-icon">{icon}</span><span><small>{label}</small><strong>{value}{suffix}</strong></span></div>; }
function PageTitle({ eyebrow, title, detail, children }) { return <div className="page-title"><div><div className="eyebrow">{eyebrow}</div><h1>{title}</h1><p>{detail}</p></div>{children}</div>; }
function UniversePlanner({ budget, universe, onStart, onBack }) { const [signingBonus, setSigningBonus] = useState(90000000); return <div className="view fade-in"><PageTitle eyebrow="Endgame slate / Ten-picture commitment" title="Cinematic Universe" detail="Every release raises the stakes of the next."><button className="text-button" onClick={onBack}>Return to overview</button></PageTitle><div className="universe-banner"><div><div className="trophy-mark">✦</div><h2>{universe ? `Phase ${universe.phase + 1} in production` : 'Build an interconnected blockbuster slate.'}</h2><p>Sign an A-list anchor to a ten-picture contract. A phase-one bomb triggers franchise fatigue.</p></div><strong>{universe?.fatigue ? 'FRANCHISE FATIGUE' : `Momentum ${universe?.momentum?.toFixed(2) || '1.00'}x`}</strong></div><div className="universe-grid">{universePhases.map((item, index) => <div className={`universe-phase ${universe && index === universe.phase ? 'current' : ''}`} key={item.title}><span>0{index + 1}</span><strong>{item.title}</strong><small>{item.genre} blockbuster</small><em>{money(item.budget)} planned</em></div>)}</div><div className="universe-contract"><div><div className="eyebrow">Ten-picture agreement</div><h2>Secure the anchor talent</h2><p>Pay the astronomical signing bonus now for discounted future salaries.</p></div><div><label>Signing bonus <strong>{money(signingBonus)}</strong></label><input type="range" min="50000000" max="180000000" step="5000000" value={signingBonus} onChange={(event) => setSigningBonus(Number(event.target.value))} /><button className="primary-button" disabled={signingBonus > budget} onClick={() => onStart(signingBonus)}>Sign contract & lock slate</button></div></div></div>; }
function EquityDashboard({ budget, onAccept, onBack }) { return <div className="view fade-in"><PageTitle eyebrow="Private markets / Desperate capital" title="Venture Capital & Private Equity" detail="Liquidity in exchange for equity, backend revenue, and ruthless oversight."><button className="text-button" onClick={onBack}>Return to overview</button></PageTitle><div className="equity-warning"><strong>Board oversight is permanent.</strong><span>Miss targets and the board may liquidate owned facilities.</span></div><div className="equity-grid">{privateEquityFunds.map((fund) => <article className="equity-card" key={fund.name}><div className="eyebrow">Term sheet</div><h2>{fund.name}</h2><strong className="equity-cash">{money(fund.cash)} liquidity</strong><div className="equity-terms"><span>Equity surrendered <b>{Math.round(fund.equity * 100)}%</b></span><span>Backend cut <b>{Math.round(fund.backend * 100)}%</b></span><span>Quarterly target <b>{money(fund.target)}</b></span></div><button className="primary-button full" onClick={() => onAccept(fund)}>Accept oversight capital</button></article>)}</div><div className="insurance-panel"><div><div className="eyebrow">Risk management</div><h2>Action production insurance</h2><p>Premium: $12M per high-risk production. Without it, stunt liabilities can end the studio.</p></div></div></div>; }
function MegaDisaster({ crisis, insured, onResolve }) { return <div className="crisis-screen"><div className="crisis-modal mega-disaster-card"><div className="crisis-warning"><AlertTriangle size={19} /> MEGA-DISASTER / LEGAL LIABILITY</div><div className="crisis-kicker">PRODUCTION STOPPAGE</div><h1>{crisis.title}</h1><p>{crisis.description}</p><div className="crisis-options"><button onClick={() => onResolve('insurance')} disabled={!insured}><strong>Claim insurance</strong><span>{insured ? '-$12M premium · preserve reputation' : 'No policy purchased'}</span></button><button onClick={() => onResolve('settle')}><strong>Settle catastrophe</strong><span>-$45M · reputation -3 · reshoot</span></button></div></div></div>; }
function InsuranceDock({ insured, onToggle }) { return <button className={`insurance-dock ${insured ? 'active' : ''}`} onClick={onToggle}><ShieldAlert size={17} /><span><strong>{insured ? 'High-risk insurance active' : 'Insure this production'}</strong><small>{insured ? '$12M premium locked' : 'Protect Action shoots from mega-disasters'}</small></span></button>; }
function MegacorpFinale({ ending, budget, onStart, onBid, onReset }) { if (!ending) return <div className="view fade-in"><PageTitle eyebrow="Ultimate endgame" title="Global Megacorp Acquisition" detail="One final tech monopoly stands between you and total control." /><div className="mega-gate"><strong>Liquid cash: {money(budget)}</strong><p>Initiate a four-round corporate war against OmniVista Technologies.</p><button className="primary-button" onClick={onStart}>Launch final takeover</button></div></div>; if (ending.victory || ending.defeat) return <div className={`megacorp-result ${ending.victory ? 'victory' : 'defeat'}`}><div className="trophy-mark">{ending.victory ? '✦' : '×'}</div><h1>{ending.victory ? 'The Golden Age' : 'The Empire Falls'}</h1><p>{ending.victory ? 'You have absorbed the final tech monopoly and now rule global media.' : 'The rival CEO won. Your assets have been liquidated and your legacy reset.'}</p><button className="primary-button" onClick={onReset}>{ending.victory ? 'Crown the mogul' : 'Reset the studio'}</button></div>; return <div className="corporate-war"><div className="war-card"><div className="eyebrow">Final corporate war · Round {ending.round + 1} of 4</div><h1>Outbid the<br /><em>monopoly.</em></h1><p>Your catalog, soundstages, parks, and franchise rights are collateral.</p><div className="war-meter"><span>Your bid {money(ending.playerBid)}</span><span>OmniVista {money(ending.rivalBid)}</span><div><i style={{ width: `${Math.min(100, ending.playerBid / ending.rivalBid * 100)}%` }}></i></div></div><div className="war-actions"><button onClick={() => onBid(100000000)}>Bid $100M</button><button onClick={() => onBid(250000000)}>Bid $250M</button><button onClick={() => onBid(500000000)}>Liquidate assets<br /><small>Bid $500M</small></button></div></div></div>; }
function AwardsSeason({ catalog, year, budget, ceremony, scandal, onBegin, onFinish }) { const [campaign, setCampaign] = useState(1000000); const [revealed, setRevealed] = useState(0); const nominees = catalog.filter((item) => Math.floor(item.year) === Math.floor(year - 0.5) && item.criticScore > 90); if (!ceremony) return <div className="awards-screen fade-in"><div className="awards-curtain"></div><div className="awards-card campaign-card"><div className="trophy-mark">✦</div><div className="eyebrow">The 2025 Silver Screen honors</div><h1>For Your<br /><em>Consideration.</em></h1><p>Industry voters are watching your {nominees.length} eligible release{nominees.length === 1 ? '' : 's'}. Spend with restraint: lobbying has diminishing returns, and extravagant campaigns can trigger an Industry Scandal.</p><div className="campaign-meter"><div><span>Campaign budget</span><strong>{money(campaign)}</strong></div><input type="range" min="0" max="8000000" step="250000" value={campaign} onChange={(event) => setCampaign(Number(event.target.value))} /><div className="range-labels"><span>Organic</span><span>Lavish industry parties</span></div></div><button className="primary-button" disabled={campaign > budget} onClick={() => onBegin(campaign)}><Ticket size={18} /> Begin ceremony <ArrowRight size={17} /></button><small className="campaign-note">Available bank: {money(budget)} · {nominees.length} films qualify with critics above 90%</small></div></div>;
  if (scandal || ceremony.scandal) return <div className="awards-screen fade-in"><div className="awards-card scandal-card"><div className="trophy-mark">!</div><div className="eyebrow">Industry scandal</div><h1>The ballots<br /><em>are burning.</em></h1><p>Your lobbying campaign was exposed. Every trophy has been stripped, your reputation is zero, and festival doors are closed for the next season.</p><button className="primary-button" onClick={() => onFinish(ceremony)}><ArrowRight size={17} /> Leave the ceremony</button></div></div>;
  const finished = revealed >= ceremony.categories.length; return <div className="awards-screen fade-in"><div className="awards-card ceremony-card"><div className="trophy-mark">✦</div><div className="eyebrow">Live from the Orpheum Theatre · {year.toFixed(1)}</div><h1>The Silver Screen<br /><em>Honors</em></h1><p className="ceremony-subtitle">Three categories. One unforgettable night.</p><div className="award-list">{ceremony.categories.map((category, index) => <div className={`award-category ${index < revealed ? 'revealed' : ''}`} key={category.name}><span>{category.name}</span>{index < revealed ? <strong>{category.player ? `★ ${category.winner.title}` : `Rival victory · ${category.winner.title}`}</strong> : <em>And the nominees are...</em>}</div>)}</div>{!finished ? <button className="primary-button" onClick={() => setRevealed((current) => current + 1)}><Sparkles size={17} /> Reveal next winner</button> : <button className="primary-button" onClick={() => onFinish(ceremony)}><Star size={17} /> Accept the results</button>}</div></div>; }
function MerchandisingDashboard({ catalog, budget, merchLine, sales, writeOff, onStart, licensed, setLicensed, onBack }) { const [tierId, setTierId] = useState('plastic'); const [units, setUnits] = useState(100000); const tier = merchTiers.find((item) => item.id === tierId); const eligible = catalog.filter((item) => ['Action', 'Sci-Fi', 'Comedy'].includes(item.genre) && item.audienceScore > 85); const productionCost = tier.unitCost * units; return <div className="view fade-in"><PageTitle eyebrow="Global consumer products" title="Merchandising & Licensing" detail="Turn a breakout character into a retail ecosystem before the audience moves on."><button className="text-button" onClick={onBack}><ArrowRight size={16} className="flip" /> Return to overview</button></PageTitle><div className="merch-banner"><div><div className="eyebrow">Retail analytics</div><h2>{eligible.length ? `${eligible.length} marketable franchises ready` : 'Waiting for a marketable franchise'}</h2><p>Over-produce and write off dead stock. Under-produce and leave hit revenue on the table.</p></div><div><small>Merch sales collected</small><strong>{money(sales)}</strong><span>Inventory write-offs: {money(writeOff)}</span></div></div><div className="merch-layout"><section className="merch-panel"><div className="eyebrow">Design a product line</div><div className="merch-tier-grid">{merchTiers.map((item) => <button className={tierId === item.id ? 'selected' : ''} onClick={() => setTierId(item.id)} key={item.id}><strong>{item.name}</strong><span>{money(item.unitCost)} unit cost · {money(item.price)} retail</span><small>{item.label}</small></button>)}</div><label className="merch-label">Manufacturing run <strong>{units.toLocaleString()} units</strong></label><input className="merch-range" type="range" min="10000" max="1000000" step="10000" value={units} onChange={(event) => setUnits(Number(event.target.value))} /><div className="merch-total"><span>Upfront inventory investment</span><strong>{money(productionCost)}</strong></div><label className="license-check"><input type="checkbox" checked={licensed} onChange={(event) => setLicensed(event.target.checked)} /> License characters to fast-food and apparel partners for instant cash</label><button className="primary-button full" disabled={productionCost > budget || !eligible.length} onClick={() => onStart(tier, units, licensed)}><Ticket size={17} /> Manufacture inventory</button></section><aside className="merch-panel retail-live"><div className="eyebrow">Live franchise dashboard</div>{eligible.length ? eligible.map((item) => <div className="franchise-row" key={item.title}><span>{item.title}</span><strong>{item.audienceScore}% audience</strong><small>{item.genre} · {item.awardWinner ? 'Award Winner' : 'Current release'}</small></div>) : <div className="empty-catalog">No qualifying action, sci-fi, or comedy hit yet.</div>}<div className="licensing-contract"><strong>Third-party licensing</strong><span>{licensed ? 'Partners active · upfront fee secured' : 'No contracts currently active'}</span></div></aside></div></div>; }
function ThemeParkDashboard({ park, parkUnlocked, parkAttraction, setParkAttraction, ticket, setTicket, food, setFood, maintenance, setMaintenance, guests, revenue, satisfaction, onBuyLand, onCrisis, onBack }) { const attractionOptions = [{ name: 'Neon Horizon Dark Ride', genre: 'Sci-Fi', relevance: 0.55 }, { name: 'Velocity Stunt Coaster', genre: 'Action', relevance: 0.65 }, { name: 'Good Company Interactive Ride', genre: 'Comedy', relevance: 0.42 }]; const selected = parkAttraction || attractionOptions[0]; const land = park?.land; return <div className="view fade-in"><PageTitle eyebrow="Experiential empire / $1B valuation" title="Theme Park & Experiential" detail="Build an economic anchor that keeps the studio alive between release weekends."><button className="text-button" onClick={onBack}><ArrowRight size={16} className="flip" /> Return to overview</button></PageTitle>{!park ? <div className="park-land-grid">{parkLands.map((item) => <button className="park-land" key={item.id} disabled={!parkUnlocked} onClick={() => onBuyLand(item)}><span>▦</span><strong>{item.name}</strong><small>{money(item.cost)} land acquisition</small><em>{item.guests.toLocaleString()} base guests/day</em></button>)}</div> : <><div className="park-banner"><div><div className="eyebrow">{land.name}</div><h2>Your park is open.</h2><p>Attendance follows the cultural relevance of its featured franchises.</p></div><div><small>Daily attendance</small><strong>{guests.toLocaleString()}</strong><span>Daily revenue {money(revenue)}</span></div></div><div className="park-metrics"><div><small>Guest satisfaction</small><strong>{satisfaction}%</strong><span>Brand reputation impact</span></div><div><small>Quarterly revenue</small><strong>{money(revenue * 90)}</strong><span>Before operating costs</span></div><div><small>Operating costs</small><strong className="negative">-{money(land.upkeep + maintenance)}</strong><span>Land + maintenance</span></div></div><div className="park-layout"><section className="park-panel"><div className="eyebrow">Attractions</div><h2>Build the next reason to visit</h2><div className="attraction-grid">{attractionOptions.map((item) => <button className={selected.name === item.name ? 'selected' : ''} onClick={() => setParkAttraction(item)} key={item.name}><span>✦</span><strong>{item.name}</strong><small>{item.genre} franchise relevance {Math.round(item.relevance * 100)}%</small></button>)}</div><button className="primary-button" onClick={onCrisis}><AlertTriangle size={16} /> Simulate park crisis</button></section><section className="park-panel"><div className="eyebrow">Operations</div><label className="park-control">Ticket price <strong>${ticket}</strong><input type="range" min="35" max="140" value={ticket} onChange={(event) => setTicket(Number(event.target.value))} /></label><label className="park-control">Food & beverage quality <strong>{food}/100</strong><input type="range" min="10" max="100" value={food} onChange={(event) => setFood(Number(event.target.value))} /></label><label className="park-control">Daily maintenance budget <strong>{money(maintenance)}</strong><input type="range" min="50000" max="1200000" step="25000" value={maintenance} onChange={(event) => setMaintenance(Number(event.target.value))} /></label></section></div><div className="park-report"><div><div className="eyebrow">Quarterly earnings report</div><h2>Guest spend is your new release calendar.</h2></div><strong>Net quarterly park contribution {money(revenue * 90 - land.upkeep * 90 - maintenance * 90)}</strong></div></>}</div>; }
function ParkCrisis({ crisis, onResolve }) { return <div className="corporate-war"><div className="war-card park-crisis-card"><div className="eyebrow">Park operations emergency</div><h1>{crisis.title}</h1><p>{crisis.description}</p><div className="war-actions"><button onClick={() => onResolve(true)}>Fund emergency response<br /><small>-{money(crisis.cost)} · protect reputation</small></button><button onClick={() => onResolve(false)}>Close and absorb the hit<br /><small>$0 · reputation -1</small></button></div></div></div>; }
function StreamingPlatform({ name, price, serverBudget, setName, setPrice, setServerBudget, features, setFeatures, exclusive, toggleExclusive, catalog, subscribers, setSubscribers, revenue, churn, retention, quarter, setQuarter, onLaunch, onBack }) { const [draftName, setDraftName] = useState(name); const techGiants = [{ name: 'Nexus Prime', price: 13, threat: 'Free-trial price war' }, { name: 'Orbit Cloud', price: 9, threat: 'Talent poaching' }, { name: 'Vista Global', price: 15, threat: 'Bandwidth outbid' }]; const featureData = [{ id: '4k', name: '4K HDR streaming', cost: 550000, benefit: '+4% retention' }, { id: 'offline', name: 'Offline downloads', cost: 800000, benefit: '+7% retention' }, { id: 'recommendations', name: 'Personalized recommendations', cost: 1200000, benefit: '+11% retention' }, { id: 'bundle', name: 'Global Distribution Bundle', cost: 1800000, benefit: '+25% global reach' }]; return <div className="view fade-in streaming-view"><PageTitle eyebrow="Digital empire / 50 films + $200M capital" title={name} detail="Turn your back catalog into a recurring global media business."><button className="text-button" onClick={onBack}><ArrowRight size={16} className="flip" /> Return to overview</button></PageTitle><div className="streaming-settings"><div><label>Platform identity</label><input value={draftName} onChange={(event) => setDraftName(event.target.value)} onBlur={() => setName(draftName)} /><small>Name your network and set its public promise.</small></div><div><label>Monthly subscription</label><input type="range" min="5" max="30" value={price} onChange={(event) => setPrice(Number(event.target.value))} /><strong>${price}/month</strong></div><div><label>Server infrastructure</label><input type="range" min="100000" max="2500000" step="50000" value={serverBudget} onChange={(event) => setServerBudget(Number(event.target.value))} /><strong>{money(serverBudget)}/month upkeep</strong></div></div><div className="streaming-metrics"><div><small>Active subscribers</small><strong>{subscribers.toLocaleString()}</strong><span>Global accounts</span></div><div><small>Monthly recurring revenue</small><strong>{money(revenue)}</strong><span>Before infrastructure</span></div><div><small>Infrastructure upkeep</small><strong className="negative">-{money(serverBudget)}</strong><span>Bandwidth and delivery</span></div><div><small>Subscriber retention</small><strong className="positive">{retention.toFixed(1)}%</strong><span>{churn.toFixed(1)}% monthly churn</span></div></div><div className="streaming-columns"><section className="stream-panel"><div className="stream-panel-head"><div><div className="eyebrow">Catalog strategy</div><h2>Who gets to watch?</h2></div><span>{catalog.length} titles</span></div><div className="license-toggle"><button className={exclusive ? 'selected' : ''} onClick={() => toggleExclusive(true)}>Make catalog exclusive<br /><small>Max subscriber growth</small></button><button className={!exclusive ? 'selected' : ''} onClick={() => toggleExclusive(false)}>License third parties<br /><small>Instant cash, less retention</small></button></div><div className="stream-original"><div><div className="eyebrow">Streaming Originals</div><h3>Quarter {quarter + 1} retention project</h3><p>Low-budget, fast-turnaround content keeps subscribers engaged between theatrical releases.</p></div><button className="primary-button" onClick={() => { setSubscribers((current) => current + 35000); setQuarter((current) => current + 1); }}>Produce original</button></div></section><section className="stream-panel"><div className="stream-panel-head"><div><div className="eyebrow">Platform upgrades</div><h2>Keep the giants behind you</h2></div></div><div className="feature-list">{featureData.map((feature) => <button className={features.includes(feature.id) ? 'feature-row active' : 'feature-row'} key={feature.id} onClick={() => !features.includes(feature.id) && setFeatures((current) => [...current, feature.id])}><span>{features.includes(feature.id) ? '✓' : '＋'}</span><div><strong>{feature.name}</strong><small>{feature.benefit} · {money(feature.cost)} one-time</small></div></button>)}</div></section></div><section className="tech-war"><div><div className="eyebrow">Tech war watch</div><h2>Digital competitors</h2><p>Price cuts and free trials are pressuring the market. Adjust your platform before retention slips.</p></div>{techGiants.map((giant) => <div className="tech-giant" key={giant.name}><strong>{giant.name}</strong><span>${giant.price}/mo · {giant.threat}</span></div>)}</section></div>; }
function StockExchange({ valuation, budget, prices, holdings, control, poisonPillUsed, onBuy, onTakeover, onBack }) { return <div className="view fade-in"><PageTitle eyebrow="Public markets / $100M unlock" title="Hollywood Stock Exchange" detail="Trade the momentum of the industry. Rival hits can fund your next production."><button className="text-button" onClick={onBack}><ArrowRight size={16} className="flip" /> Return to HQ</button></PageTitle><div className="market-banner"><div><small>Your studio valuation</small><strong>{money(valuation)}</strong><span>Shareholder confidence <i></i></span></div><div><small>Liquid reserves</small><strong>{money(budget)}</strong><span>{poisonPillUsed ? 'Poison pill deployed · share price impaired' : 'Market access: unrestricted'}</span></div></div><div className="stock-grid">{rivalStudios.map((rival) => <article className={`stock-card ${control[rival.id] ? 'controlled' : ''}`} key={rival.id}><div className="stock-head"><span className="rival-logo" style={{ background: rival.color }}>{rival.name.slice(0, 1)}</span><div><h3>{rival.name}</h3><small>{control[rival.id] ? `Controlled territory · ${rival.territory}` : 'Independent rival studio'}</small></div><strong>${prices[rival.id]}</strong></div><div className="stock-chart"><i style={{ height: `${35 + prices[rival.id] % 50}%` }}></i><i style={{ height: `${45 + prices[rival.id] % 35}%` }}></i><i style={{ height: `${30 + prices[rival.id] % 60}%` }}></i><i style={{ height: `${55 + prices[rival.id] % 30}%` }}></i><i style={{ height: `${40 + prices[rival.id] % 50}%` }}></i></div><div className="stock-meta"><span>Holding <strong>{((holdings[rival.id] || 0) / rival.shares * 100).toFixed(1)}%</strong></span><span>Dividend <strong>{(rival.dividend * 100).toFixed(1)}%</strong></span></div><div className="stock-actions"><button onClick={() => onBuy(rival, 10000)}>Buy 1% · {money(prices[rival.id] * 10000)}</button><button onClick={() => onBuy(rival, 100000)}>Buy 10% · {money(prices[rival.id] * 100000)}</button></div>{control[rival.id] ? <div className="control-vault">▣ Controlled · Script vault: <strong>{rival.vault}</strong><small>Quarterly dividend active</small></div> : <button className="takeover-link" onClick={() => onTakeover(rival)}>Attempt hostile takeover</button>}</article>)}</div></div>; }
function CorporateWar({ war, budget, onBid, onDefend }) { return <div className="corporate-war"><div className="war-card"><div className="eyebrow">Corporate war / hostile takeover</div><h1>{war.rival.name} is<br /><em>coming for you.</em></h1><p>The rival CEO is bidding against your studio. Choose how to defend your control or turn the tables.</p><div className="war-meter"><span>Your bid {money(war.playerBid)}</span><span>Rival defense {money(war.rivalBid)}</span><div><i style={{ width: `${Math.min(100, war.playerBid / Math.max(war.rivalBid, 1) * 100)}%` }}></i></div></div><div className="war-actions"><button onClick={() => onBid(500000)}>Bid $500k</button><button onClick={() => onBid(2000000)}>Bid $2M</button><button onClick={() => onDefend('poison')}>Poison pill<br /><small>Dilute attack · stock crash</small></button><button onClick={() => onDefend('whiteKnight')}>White Knight<br /><small>Merge · $2.5M bridge</small></button></div><small className="war-round">Bidding round {war.round + 1} of 3 · Failure costs sunk bids and reputation</small></div></div>; }
function Headquarters({ budget, reputation, upgrades, onBuy, celebration, onBack }) { const ownedBacklot = upgrades.includes('backlot'); const branches = [...new Set(upgradeNodes.map((node) => node.branch))]; return <div className="view fade-in"><PageTitle eyebrow="Permanent studio development" title="Studio Headquarters" detail="Invest in the infrastructure that compounds every future production."><button className="text-button" onClick={onBack}><ArrowRight size={16} className="flip" /> Return to overview</button></PageTitle><div className="hq-banner"><div><div className="eyebrow">The studio footprint</div><h2>{ownedBacklot ? 'Your empire is taking shape.' : 'Build something that outlasts a release.'}</h2><p>Unlock permanent advantages with profits from the box office. Every executive and facility carries an ongoing retainer.</p></div><div className="hq-stats"><span><small>Available capital</small><strong>{money(budget)}</strong></span><span><small>Reputation gate</small><strong>{reputation.toFixed(1)} <em>stars</em></strong></span></div></div><div className="hq-footprint">{ownedBacklot && <><div className="building owned"><span>▦</span><strong>SS SOUNDSTAGE</strong><small>Owned backlot · $35k/day upkeep</small></div>{upgrades.includes('greenScreen') && <div className="building"><span>◈</span><strong>GREEN SCREEN LAB</strong><small>Visual presentation +8</small></div>}{upgrades.includes('practical') && <div className="building"><span>✦</span><strong>PRACTICAL FX</strong><small>Visual presentation +5</small></div>}</>}</div><div className="hq-tree">{branches.map((branch) => <section className="upgrade-branch" key={branch}><div className="branch-heading"><span>{branch === 'Backlot Expansion' ? '01' : branch === 'Department Heads' ? '02' : '03'}</span><div><h2>{branch}</h2><p>{branch === 'Backlot Expansion' ? 'Own the stages. Control the spectacle.' : branch === 'Department Heads' ? 'Elite operators for every wing.' : 'Make yesterday’s films earn tomorrow.'}</p></div></div><div className="upgrade-grid">{upgradeNodes.filter((node) => node.branch === branch).map((node) => <UpgradeNode key={node.id} node={node} owned={upgrades.includes(node.id)} budget={budget} reputation={reputation} upgrades={upgrades} onBuy={onBuy} />)}</div></section>)}</div>{celebration && <div className="upgrade-celebration"><div className="celebration-particles">✦　✧　✦　✧　✦</div><strong>Upgrade acquired</strong><span>Permanent advantage installed</span></div>}</div>; }
function UpgradeNode({ node, owned, budget, reputation, upgrades, onBuy }) { const missingPrereq = node.prereq.find((id) => !upgrades.includes(id)); const locked = !owned && (budget < node.cost || reputation < node.reputation || missingPrereq); const lockReason = missingPrereq ? `Requires ${upgradeNodes.find((item) => item.id === missingPrereq)?.name}` : reputation < node.reputation ? `Requires ${node.reputation} reputation stars` : budget < node.cost ? 'Insufficient capital' : 'Ready to acquire'; return <article className={`upgrade-node ${owned ? 'owned' : ''} ${locked ? 'locked' : ''}`} title={`${node.name}: ${node.benefit}`}><div className="node-top"><span className="node-icon">{node.icon}</span><span className="node-status">{owned ? 'INSTALLED' : node.branch === 'Backlot Expansion' ? 'FACILITY' : 'PERK'}</span></div><h3>{node.name}</h3><p>{node.benefit}</p><div className="node-meta"><span>{money(node.cost)}</span><span>{node.reputation}★ gate</span></div><button disabled={locked || owned} onClick={() => onBuy(node)}>{owned ? 'Owned permanently' : lockReason}</button></article>; }
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