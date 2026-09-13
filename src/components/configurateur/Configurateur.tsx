'use client'
import { useState, useMemo, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { CheckCircle, ChevronLeft, ChevronRight, Check, AlertCircle, Loader2 } from 'lucide-react'
import {
  TEMPLATE_CATEGORIES, FORMULES, DOMAIN_EXTENSIONS,
  HOSTING_PLANS, MAINTENANCE_PLANS, PERSONALIZATION_OPTIONS, MODULE_OPTIONS, COUNTRIES,
} from './data'

/* ─── TYPES ─────────────────────────────────────────────────────────────── */
interface Config {
  sector: string
  formule: 'standard' | 'premium' | 'elite'
  domainOption: 'none' | 'existing' | 'new'
  existingDomain: string
  newDomain: string
  domainExtension: string
  hosting: 'none' | 'basic' | 'business' | 'premium'
  maintenance: 'none' | 'basic' | 'pro' | 'elite'
  personalization: string[]
  modules: string[]
  name: string
  email: string
  phone: string
  company: string
  country: string
  message: string
}

const DEFAULT: Config = {
  sector: '', formule: 'premium',
  domainOption: 'none', existingDomain: '', newDomain: '', domainExtension: '.com',
  hosting: 'basic', maintenance: 'none',
  personalization: [], modules: [],
  name: '', email: '', phone: '', company: '', country: "Côte d'Ivoire", message: '',
}

const STEPS = [
  { n: 1, label: 'Template' },
  { n: 2, label: 'Formule' },
  { n: 3, label: 'Domaine' },
  { n: 4, label: 'Hébergement' },
  { n: 5, label: 'Maintenance' },
  { n: 6, label: 'Personnalisation' },
  { n: 7, label: 'Modules' },
  { n: 8, label: 'Récapitulatif' },
]

/* ─── CALCUL DES PRIX ───────────────────────────────────────────────────── */
function usePrices(c: Config) {
  return useMemo(() => {
    const cat = TEMPLATE_CATEGORIES.find((x) => x.id === c.sector)
    const base = cat?.basePrice ?? 0
    const formule = FORMULES.find((x) => x.id === c.formule)
    const templateTotal = base + (formule?.supplement ?? 0)

    const domainPrice = c.domainOption === 'new'
      ? (DOMAIN_EXTENSIONS.find((x) => x.ext === c.domainExtension)?.price ?? 0)
      : 0

    const persTotal = c.personalization.reduce((sum, id) => {
      return sum + (PERSONALIZATION_OPTIONS.find((x) => x.id === id)?.price ?? 0)
    }, 0)

    const modulesTotal = c.modules.reduce((sum, id) => {
      return sum + (MODULE_OPTIONS.find((x) => x.id === id)?.price ?? 0)
    }, 0)

    const hostingYear = HOSTING_PLANS.find((x) => x.id === c.hosting)?.priceYear ?? 0
    const maintenanceMonth = MAINTENANCE_PLANS.find((x) => x.id === c.maintenance)?.priceMonth ?? 0

    const initial = templateTotal + domainPrice + persTotal + modulesTotal
    const annual = hostingYear + (c.domainOption === 'new' ? domainPrice : 0)
    const monthly = maintenanceMonth

    return { templateTotal, domainPrice, persTotal, modulesTotal, hostingYear, maintenanceMonth, initial, annual, monthly }
  }, [c])
}

/* ─── FORMATAGE ─────────────────────────────────────────────────────────── */
const fmt = (n: number) => n.toLocaleString('fr-FR') + ' FCFA'

/* ─── COMPOSANT PRINCIPAL ───────────────────────────────────────────────── */
export default function Configurateur() {
  const searchParams = useSearchParams()
  const [step, setStep] = useState(1)
  const [config, setConfig] = useState<Config>(DEFAULT)
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errorMsg, setErrorMsg] = useState('')
  const [reference, setReference] = useState('')
  const prices = usePrices(config)

  useEffect(() => {
    const secteur = searchParams.get('secteur')
    const formule = searchParams.get('formule')
    if (secteur || formule) {
      setConfig((prev) => ({
        ...prev,
        ...(secteur ? { sector: secteur } : {}),
        ...(formule && ['standard', 'premium', 'elite'].includes(formule) ? { formule: formule as Config['formule'] } : {}),
      }))
      if (secteur) setStep(2)
    }
  }, [searchParams])

  const set = <K extends keyof Config>(key: K, val: Config[K]) =>
    setConfig((prev) => ({ ...prev, [key]: val }))

  const toggleArr = (key: 'personalization' | 'modules', id: string) =>
    setConfig((prev) => ({
      ...prev,
      [key]: prev[key].includes(id) ? prev[key].filter((x) => x !== id) : [...prev[key], id],
    }))

  const canNext = () => {
    if (step === 1) return !!config.sector
    if (step === 8) return !!(config.name && config.email)
    return true
  }

  const handleSubmit = async () => {
    setStatus('loading')
    setErrorMsg('')
    try {
      const cat = TEMPLATE_CATEGORIES.find((x) => x.id === config.sector)
      const formule = FORMULES.find((x) => x.id === config.formule)
      const hosting = HOSTING_PLANS.find((x) => x.id === config.hosting)
      const maint = MAINTENANCE_PLANS.find((x) => x.id === config.maintenance)
      const persLabels = config.personalization.map((id) => PERSONALIZATION_OPTIONS.find((x) => x.id === id)?.label).filter(Boolean)
      const modLabels = config.modules.map((id) => MODULE_OPTIONS.find((x) => x.id === id)?.label).filter(Boolean)

      const domainInfo = config.domainOption === 'new'
        ? `Nouveau domaine : ${config.newDomain}${config.domainExtension}`
        : config.domainOption === 'existing'
          ? `Domaine existant : ${config.existingDomain}`
          : 'Sans domaine'

      const message = [
        `=== COMMANDE TEMPLATE IBIG DIGITAL ===`,
        `Template : ${cat?.label ?? config.sector}`,
        `Formule : ${formule?.name}`,
        `Domaine : ${domainInfo}`,
        `Hébergement : ${hosting?.name} ${hosting?.priceYear ? `(${fmt(hosting.priceYear)}/an)` : ''}`,
        `Maintenance : ${maint?.name} ${maint?.priceMonth ? `(${fmt(maint.priceMonth)}/mois)` : ''}`,
        persLabels.length ? `Personnalisation : ${persLabels.join(', ')}` : '',
        modLabels.length ? `Modules : ${modLabels.join(', ')}` : '',
        ``,
        `TOTAUX :`,
        `  → Initial : ${fmt(prices.initial)}`,
        `  → Annuel  : ${fmt(prices.annual)}`,
        `  → Mensuel : ${fmt(prices.monthly)}`,
        config.message ? `\nMessage : ${config.message}` : '',
      ].filter(Boolean).join('\n')

      const res = await fetch('/api/devis', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: config.name,
          email: config.email,
          phone: config.phone || undefined,
          company: config.company || undefined,
          country: config.country || undefined,
          project_type: `Template ${cat?.label ?? config.sector} — Formule ${formule?.name}`,
          budget: fmt(prices.initial),
          message,
          source: 'configurateur-templates',
        }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error ?? 'Erreur serveur')
      setReference(data.reference)
      setStatus('success')
    } catch (e: unknown) {
      setErrorMsg(e instanceof Error ? e.message : 'Une erreur est survenue.')
      setStatus('error')
    }
  }

  if (status === 'success') {
    return <SuccessScreen reference={reference} config={config} prices={prices} />
  }

  return (
    <div style={{ minHeight: '100vh', background: '#06091A', color: 'white', paddingTop: '2rem', paddingBottom: '6rem' }}>
      <style>{`
        .cfg-radio { cursor:pointer; border-radius:1rem; border:2px solid rgba(255,255,255,.08); background:rgba(255,255,255,.03); transition:border-color .15s,background .15s; }
        .cfg-radio:hover { border-color:rgba(255,255,255,.2); background:rgba(255,255,255,.06); }
        .cfg-radio.selected { border-color:#FF6B00; background:rgba(255,107,0,.08); }
        .cfg-check { cursor:pointer; border-radius:.875rem; border:1px solid rgba(255,255,255,.08); background:rgba(255,255,255,.03); transition:border-color .15s,background .15s; padding:1rem; }
        .cfg-check:hover { border-color:rgba(255,255,255,.18); background:rgba(255,255,255,.05); }
        .cfg-check.checked { border-color:#FF6B00; background:rgba(255,107,0,.07); }
        .cfg-input { width:100%; padding:.75rem 1rem; border-radius:.75rem; border:1px solid rgba(255,255,255,.12); background:rgba(255,255,255,.05); color:white; font-size:.9rem; outline:none; transition:border-color .15s; }
        .cfg-input:focus { border-color:#FF6B00; background:rgba(255,107,0,.05); }
        .cfg-input::placeholder { color:rgba(255,255,255,.25); }
        .cfg-select { appearance:none; width:100%; padding:.75rem 1rem; border-radius:.75rem; border:1px solid rgba(255,255,255,.12); background:rgba(255,255,255,.05); color:white; font-size:.9rem; outline:none; cursor:pointer; }
        .cfg-select option { background:#1E293B; color:white; }
        .cfg-select:focus { border-color:#FF6B00; }
        .step-dot { width:2rem; height:2rem; border-radius:50%; display:flex; align-items:center; justify-content:center; font-size:.72rem; font-weight:800; transition:all .2s; flex-shrink:0; }
        .step-dot.done { background:#22C55E; color:white; }
        .step-dot.active { background:#FF6B00; color:white; box-shadow:0 0 0 3px rgba(255,107,0,.3); }
        .step-dot.todo { background:rgba(255,255,255,.08); color:rgba(255,255,255,.35); }
        .price-row { display:flex; align-items:center; justify-content:space-between; padding:.5rem 0; border-bottom:1px solid rgba(255,255,255,.05); font-size:.78rem; }
        .price-row:last-child { border-bottom:none; }
        .nav-btn { display:inline-flex; align-items:center; gap:.5rem; padding:.85rem 1.75rem; border-radius:1rem; font-weight:800; font-size:.9rem; cursor:pointer; border:none; transition:all .18s; }
      `}</style>

      <div style={{ maxWidth: '1140px', margin: '0 auto', padding: '0 1.25rem' }}>

        {/* ── En-tête ── */}
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '.5rem', padding: '.35rem 1rem', borderRadius: '9999px', background: 'rgba(255,107,0,.1)', border: '1px solid rgba(255,107,0,.25)', marginBottom: '1rem' }}>
            <span style={{ fontSize: '.68rem', fontWeight: 800, color: '#FF9A4D', letterSpacing: '.07em' }}>CONFIGURATEUR DE COMMANDE</span>
          </div>
          <h1 style={{ fontSize: 'clamp(1.6rem,3.5vw,2.5rem)', fontWeight: 900, letterSpacing: '-.025em', marginBottom: '.5rem' }}>
            Configurez votre site web
          </h1>
          <p style={{ color: 'rgba(255,255,255,.4)', fontSize: '.88rem' }}>
            Chaque option ajoutée met à jour le total en temps réel.
          </p>
        </div>

        {/* ── Indicateur d'étapes ── */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '.25rem', marginBottom: '2.5rem', flexWrap: 'wrap', rowGap: '.75rem' }}>
          {STEPS.map((s, i) => (
            <div key={s.n} style={{ display: 'flex', alignItems: 'center', gap: '.25rem' }}>
              <button
                onClick={() => step > s.n && setStep(s.n)}
                style={{ display: 'flex', alignItems: 'center', gap: '.5rem', background: 'none', border: 'none', cursor: step > s.n ? 'pointer' : 'default', padding: '.2rem .5rem', borderRadius: '.5rem' }}
              >
                <div className={`step-dot ${step > s.n ? 'done' : step === s.n ? 'active' : 'todo'}`}>
                  {step > s.n ? <Check size={13} /> : s.n}
                </div>
                <span style={{ fontSize: '.7rem', fontWeight: 700, color: step === s.n ? '#FF9A4D' : step > s.n ? '#4ADE80' : 'rgba(255,255,255,.25)', display: 'none', whiteSpace: 'nowrap' }}
                  className="step-label">{s.label}</span>
              </button>
              {i < STEPS.length - 1 && (
                <div style={{ width: '1.5rem', height: '1px', background: step > s.n ? 'rgba(74,222,128,.4)' : 'rgba(255,255,255,.08)' }} />
              )}
            </div>
          ))}
        </div>

        {/* ── Grille principale ── */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: '1.5rem', alignItems: 'start' }}>

          {/* Colonne gauche — Étape active */}
          <div style={{ background: 'rgba(255,255,255,.025)', border: '1px solid rgba(255,255,255,.07)', borderRadius: '1.5rem', padding: '2rem' }}>

            {/* Titre de l'étape */}
            <div style={{ marginBottom: '1.75rem', paddingBottom: '1.25rem', borderBottom: '1px solid rgba(255,255,255,.06)' }}>
              <div style={{ fontSize: '.65rem', fontWeight: 700, color: '#FF9A4D', letterSpacing: '.07em', marginBottom: '.35rem' }}>ÉTAPE {step} / {STEPS.length}</div>
              <div style={{ fontSize: '1.35rem', fontWeight: 900 }}>{STEPS[step - 1].label}</div>
            </div>

            {/* ─── ÉTAPE 1 : TEMPLATE ─── */}
            {step === 1 && (
              <div>
                <p style={{ color: 'rgba(255,255,255,.4)', fontSize: '.85rem', marginBottom: '1.5rem' }}>Choisissez le secteur d&apos;activité qui correspond à votre site.</p>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(170px,1fr))', gap: '.75rem' }}>
                  {TEMPLATE_CATEGORIES.map((cat) => (
                    <div key={cat.id} className={`cfg-radio ${config.sector === cat.id ? 'selected' : ''}`}
                      onClick={() => set('sector', cat.id)}
                      style={{ padding: '1.1rem', display: 'flex', alignItems: 'center', gap: '.75rem', position: 'relative' }}>
                      {config.sector === cat.id && (
                        <div style={{ position: 'absolute', top: '.5rem', right: '.5rem', width: '1.1rem', height: '1.1rem', borderRadius: '50%', background: '#FF6B00', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          <Check size={9} color="white" />
                        </div>
                      )}
                      <span style={{ fontSize: '1.5rem' }}>{cat.icon}</span>
                      <div>
                        <div style={{ fontSize: '.8rem', fontWeight: 700, color: 'white', lineHeight: 1.3 }}>{cat.label}</div>
                        <div style={{ fontSize: '.65rem', color: 'rgba(255,255,255,.35)', marginTop: '2px' }}>Dès {cat.basePrice.toLocaleString('fr-FR')} FCFA</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ─── ÉTAPE 2 : FORMULE ─── */}
            {step === 2 && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {FORMULES.map((f) => (
                  <div key={f.id} className={`cfg-radio ${config.formule === f.id ? 'selected' : ''}`}
                    onClick={() => set('formule', f.id)}
                    style={{ padding: '1.5rem', display: 'flex', alignItems: 'flex-start', gap: '1.25rem', position: 'relative' }}>
                    {f.popular && <span style={{ position: 'absolute', top: '1rem', right: '1rem', fontSize: '.62rem', fontWeight: 800, color: '#FF9A4D', background: 'rgba(255,107,0,.12)', border: '1px solid rgba(255,107,0,.3)', padding: '.2rem .6rem', borderRadius: '9999px' }}>⭐ Populaire</span>}
                    <div style={{ width: '2.75rem', height: '2.75rem', borderRadius: '1rem', background: config.formule === f.id ? `${f.color}25` : 'rgba(255,255,255,.05)', border: `2px solid ${config.formule === f.id ? f.color : 'rgba(255,255,255,.1)'}`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, transition: 'all .15s' }}>
                      {config.formule === f.id ? <Check size={16} color={f.color} /> : <span style={{ fontSize: '.65rem', fontWeight: 800, color: 'rgba(255,255,255,.3)' }}>{f.id[0].toUpperCase()}</span>}
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ display: 'flex', alignItems: 'baseline', gap: '.75rem', marginBottom: '.35rem' }}>
                        <span style={{ fontWeight: 900, fontSize: '1.05rem' }}>{f.name}</span>
                        <span style={{ fontSize: '.72rem', color: 'rgba(255,255,255,.4)' }}>{f.desc}</span>
                      </div>
                      <div style={{ fontSize: '.88rem', fontWeight: 800, color: f.color, marginBottom: '.75rem' }}>
                        {f.supplement === 0 ? 'Prix de base' : `+ ${f.supplement.toLocaleString('fr-FR')} FCFA`}
                      </div>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '.4rem' }}>
                        {f.features.map((feat) => (
                          <span key={feat} style={{ fontSize: '.65rem', color: 'rgba(255,255,255,.5)', background: 'rgba(255,255,255,.06)', padding: '.2rem .6rem', borderRadius: '.375rem' }}>{feat}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* ─── ÉTAPE 3 : DOMAINE ─── */}
            {step === 3 && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {([
                  { id: 'none', label: 'Sans domaine', desc: 'Je n\'ai pas encore besoin d\'un domaine', icon: '🚫' },
                  { id: 'existing', label: 'J\'ai déjà un domaine', desc: 'Je veux utiliser mon domaine existant', icon: '✅' },
                  { id: 'new', label: 'Acheter un nouveau domaine', desc: 'Je veux enregistrer un nouveau nom de domaine', icon: '🌐' },
                ] as const).map((opt) => (
                  <div key={opt.id} className={`cfg-radio ${config.domainOption === opt.id ? 'selected' : ''}`}
                    onClick={() => set('domainOption', opt.id)}
                    style={{ padding: '1.25rem 1.5rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <span style={{ fontSize: '1.5rem' }}>{opt.icon}</span>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: 700, marginBottom: '.2rem' }}>{opt.label}</div>
                      <div style={{ fontSize: '.78rem', color: 'rgba(255,255,255,.4)' }}>{opt.desc}</div>
                    </div>
                    {config.domainOption === opt.id && <Check size={18} color="#FF6B00" style={{ flexShrink: 0 }} />}
                  </div>
                ))}

                {config.domainOption === 'existing' && (
                  <div style={{ marginTop: '.5rem' }}>
                    <label style={{ fontSize: '.78rem', color: 'rgba(255,255,255,.5)', marginBottom: '.5rem', display: 'block' }}>Votre domaine actuel</label>
                    <input className="cfg-input" placeholder="ex : monentreprise.com" value={config.existingDomain} onChange={(e) => set('existingDomain', e.target.value)} />
                  </div>
                )}

                {config.domainOption === 'new' && (
                  <div style={{ marginTop: '.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <div>
                      <label style={{ fontSize: '.78rem', color: 'rgba(255,255,255,.5)', marginBottom: '.5rem', display: 'block' }}>Nom de domaine souhaité (sans extension)</label>
                      <input className="cfg-input" placeholder="ex : monentreprise" value={config.newDomain} onChange={(e) => set('newDomain', e.target.value)} />
                    </div>
                    <div>
                      <label style={{ fontSize: '.78rem', color: 'rgba(255,255,255,.5)', marginBottom: '.75rem', display: 'block' }}>Extension</label>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '.5rem' }}>
                        {DOMAIN_EXTENSIONS.map((d) => (
                          <button key={d.ext} onClick={() => set('domainExtension', d.ext)}
                            style={{ padding: '.45rem .9rem', borderRadius: '.625rem', fontSize: '.78rem', fontWeight: 700, cursor: 'pointer', border: `1px solid ${config.domainExtension === d.ext ? '#FF6B00' : 'rgba(255,255,255,.1)'}`, background: config.domainExtension === d.ext ? 'rgba(255,107,0,.12)' : 'rgba(255,255,255,.04)', color: config.domainExtension === d.ext ? '#FF9A4D' : 'rgba(255,255,255,.55)', transition: 'all .15s' }}>
                            {d.ext} <span style={{ fontSize: '.65rem', opacity: .7 }}>{d.price.toLocaleString('fr-FR')} /an</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* ─── ÉTAPE 4 : HÉBERGEMENT ─── */}
            {step === 4 && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {HOSTING_PLANS.map((h) => (
                  <div key={h.id} className={`cfg-radio ${config.hosting === h.id ? 'selected' : ''}`}
                    onClick={() => set('hosting', h.id)}
                    style={{ padding: '1.25rem 1.5rem', display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                    <div style={{ width: '2.5rem', height: '2.5rem', borderRadius: '.875rem', background: config.hosting === h.id ? 'rgba(255,107,0,.15)' : 'rgba(255,255,255,.05)', border: `2px solid ${config.hosting === h.id ? '#FF6B00' : 'rgba(255,255,255,.08)'}`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, transition: 'all .15s' }}>
                      {config.hosting === h.id ? <Check size={14} color="#FF6B00" /> : <span style={{ fontSize: '1rem' }}>🖥️</span>}
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '.25rem' }}>
                        <span style={{ fontWeight: 800, fontSize: '1rem' }}>{h.name}</span>
                        <span style={{ fontWeight: 800, fontSize: '.9rem', color: h.priceYear > 0 ? '#FF9A4D' : 'rgba(255,255,255,.3)' }}>
                          {h.priceYear > 0 ? `${h.priceYear.toLocaleString('fr-FR')} FCFA/an` : 'Gratuit'}
                        </span>
                      </div>
                      <div style={{ fontSize: '.75rem', color: 'rgba(255,255,255,.4)', marginBottom: h.specs.length ? '.6rem' : 0 }}>{h.desc}</div>
                      {h.specs.length > 0 && (
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '.35rem' }}>
                          {h.specs.map((s) => (
                            <span key={s} style={{ fontSize: '.62rem', color: 'rgba(255,255,255,.45)', background: 'rgba(255,255,255,.06)', padding: '.18rem .55rem', borderRadius: '.375rem' }}>{s}</span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* ─── ÉTAPE 5 : MAINTENANCE ─── */}
            {step === 5 && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {MAINTENANCE_PLANS.map((m) => (
                  <div key={m.id} className={`cfg-radio ${config.maintenance === m.id ? 'selected' : ''}`}
                    onClick={() => set('maintenance', m.id)}
                    style={{ padding: '1.25rem 1.5rem', display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                    <div style={{ width: '2.5rem', height: '2.5rem', borderRadius: '.875rem', background: config.maintenance === m.id ? 'rgba(255,107,0,.15)' : 'rgba(255,255,255,.05)', border: `2px solid ${config.maintenance === m.id ? '#FF6B00' : 'rgba(255,255,255,.08)'}`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, transition: 'all .15s' }}>
                      {config.maintenance === m.id ? <Check size={14} color="#FF6B00" /> : <span style={{ fontSize: '1rem' }}>🔧</span>}
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '.25rem' }}>
                        <span style={{ fontWeight: 800, fontSize: '1rem' }}>{m.name}</span>
                        <span style={{ fontWeight: 800, fontSize: '.9rem', color: m.priceMonth > 0 ? '#FF9A4D' : 'rgba(255,255,255,.3)' }}>
                          {m.priceMonth > 0 ? `${m.priceMonth.toLocaleString('fr-FR')} FCFA/mois` : 'Gratuit'}
                        </span>
                      </div>
                      <div style={{ fontSize: '.75rem', color: 'rgba(255,255,255,.4)', marginBottom: m.services.length ? '.6rem' : 0 }}>{m.desc}</div>
                      {m.services.length > 0 && (
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '.35rem' }}>
                          {m.services.map((s) => (
                            <span key={s} style={{ fontSize: '.62rem', color: 'rgba(255,255,255,.45)', background: 'rgba(255,255,255,.06)', padding: '.18rem .55rem', borderRadius: '.375rem' }}>{s}</span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* ─── ÉTAPE 6 : PERSONNALISATION ─── */}
            {step === 6 && (
              <div>
                <p style={{ color: 'rgba(255,255,255,.4)', fontSize: '.85rem', marginBottom: '1.5rem' }}>
                  Sélectionnez les options de personnalisation que vous souhaitez ajouter. Toutes sont optionnelles.
                </p>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(220px,1fr))', gap: '.75rem' }}>
                  {PERSONALIZATION_OPTIONS.map((opt) => {
                    const checked = config.personalization.includes(opt.id)
                    return (
                      <div key={opt.id} className={`cfg-check ${checked ? 'checked' : ''}`}
                        onClick={() => toggleArr('personalization', opt.id)}
                        style={{ display: 'flex', alignItems: 'center', gap: '.75rem', position: 'relative' }}>
                        <div style={{ width: '1.5rem', height: '1.5rem', borderRadius: '.4rem', border: `2px solid ${checked ? '#FF6B00' : 'rgba(255,255,255,.15)'}`, background: checked ? '#FF6B00' : 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, transition: 'all .15s' }}>
                          {checked && <Check size={11} color="white" />}
                        </div>
                        <span style={{ fontSize: '1.2rem' }}>{opt.icon}</span>
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <div style={{ fontSize: '.82rem', fontWeight: 700, color: 'white', lineHeight: 1.3 }}>{opt.label}</div>
                          <div style={{ fontSize: '.68rem', color: checked ? '#FF9A4D' : 'rgba(255,255,255,.35)', fontWeight: 700 }}>+{opt.price.toLocaleString('fr-FR')} FCFA</div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            )}

            {/* ─── ÉTAPE 7 : MODULES ─── */}
            {step === 7 && (
              <div>
                <p style={{ color: 'rgba(255,255,255,.4)', fontSize: '.85rem', marginBottom: '1.5rem' }}>
                  Ajoutez les fonctionnalités dont vous avez besoin. Chaque module est une option payante activée à la commande.
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '.75rem' }}>
                  {MODULE_OPTIONS.map((mod) => {
                    const checked = config.modules.includes(mod.id)
                    return (
                      <div key={mod.id} className={`cfg-check ${checked ? 'checked' : ''}`}
                        onClick={() => toggleArr('modules', mod.id)}
                        style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <div style={{ width: '1.5rem', height: '1.5rem', borderRadius: '.4rem', border: `2px solid ${checked ? '#FF6B00' : 'rgba(255,255,255,.15)'}`, background: checked ? '#FF6B00' : 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, transition: 'all .15s' }}>
                          {checked && <Check size={11} color="white" />}
                        </div>
                        <span style={{ fontSize: '1.3rem' }}>{mod.icon}</span>
                        <div style={{ flex: 1 }}>
                          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            <span style={{ fontSize: '.88rem', fontWeight: 700, color: 'white' }}>{mod.label}</span>
                            <span style={{ fontSize: '.78rem', fontWeight: 800, color: checked ? '#FF9A4D' : 'rgba(255,255,255,.35)', marginLeft: '1rem', flexShrink: 0 }}>+{mod.price.toLocaleString('fr-FR')} FCFA</span>
                          </div>
                          <div style={{ fontSize: '.72rem', color: 'rgba(255,255,255,.35)', marginTop: '2px' }}>{mod.desc}</div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            )}

            {/* ─── ÉTAPE 8 : RÉCAPITULATIF ─── */}
            {step === 8 && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>

                {/* Résumé de la config */}
                <div style={{ background: 'rgba(255,255,255,.03)', border: '1px solid rgba(255,255,255,.07)', borderRadius: '1rem', padding: '1.25rem' }}>
                  <div style={{ fontSize: '.72rem', fontWeight: 800, color: 'rgba(255,255,255,.3)', letterSpacing: '.06em', marginBottom: '1rem' }}>VOTRE CONFIGURATION</div>
                  {[
                    { label: 'Template', value: TEMPLATE_CATEGORIES.find((x) => x.id === config.sector)?.label ?? '—' },
                    { label: 'Formule', value: FORMULES.find((x) => x.id === config.formule)?.name ?? '—' },
                    { label: 'Domaine', value: config.domainOption === 'new' ? `${config.newDomain}${config.domainExtension}` : config.domainOption === 'existing' ? config.existingDomain || '—' : 'Sans domaine' },
                    { label: 'Hébergement', value: HOSTING_PLANS.find((x) => x.id === config.hosting)?.name ?? '—' },
                    { label: 'Maintenance', value: MAINTENANCE_PLANS.find((x) => x.id === config.maintenance)?.name ?? '—' },
                    { label: 'Personnalisation', value: config.personalization.length ? `${config.personalization.length} option(s)` : 'Aucune' },
                    { label: 'Modules', value: config.modules.length ? `${config.modules.length} module(s)` : 'Aucun' },
                  ].map(({ label, value }) => (
                    <div key={label} className="price-row">
                      <span style={{ color: 'rgba(255,255,255,.4)' }}>{label}</span>
                      <span style={{ fontWeight: 600, color: 'white' }}>{value}</span>
                    </div>
                  ))}
                </div>

                {/* Formulaire contact */}
                <div>
                  <div style={{ fontSize: '.78rem', fontWeight: 700, color: 'rgba(255,255,255,.4)', letterSpacing: '.05em', marginBottom: '1rem' }}>VOS COORDONNÉES</div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '.875rem' }}>
                    <div style={{ gridColumn: 'span 2' }}>
                      <label style={{ fontSize: '.75rem', color: 'rgba(255,255,255,.4)', marginBottom: '.4rem', display: 'block' }}>Nom complet *</label>
                      <input className="cfg-input" placeholder="Votre nom et prénom" value={config.name} onChange={(e) => set('name', e.target.value)} />
                    </div>
                    <div>
                      <label style={{ fontSize: '.75rem', color: 'rgba(255,255,255,.4)', marginBottom: '.4rem', display: 'block' }}>Email *</label>
                      <input className="cfg-input" type="email" placeholder="email@exemple.com" value={config.email} onChange={(e) => set('email', e.target.value)} />
                    </div>
                    <div>
                      <label style={{ fontSize: '.75rem', color: 'rgba(255,255,255,.4)', marginBottom: '.4rem', display: 'block' }}>Téléphone / WhatsApp</label>
                      <input className="cfg-input" placeholder="+225 07 …" value={config.phone} onChange={(e) => set('phone', e.target.value)} />
                    </div>
                    <div>
                      <label style={{ fontSize: '.75rem', color: 'rgba(255,255,255,.4)', marginBottom: '.4rem', display: 'block' }}>Entreprise / Organisation</label>
                      <input className="cfg-input" placeholder="Nom de votre structure" value={config.company} onChange={(e) => set('company', e.target.value)} />
                    </div>
                    <div>
                      <label style={{ fontSize: '.75rem', color: 'rgba(255,255,255,.4)', marginBottom: '.4rem', display: 'block' }}>Pays</label>
                      <select className="cfg-select" value={config.country} onChange={(e) => set('country', e.target.value)}>
                        {COUNTRIES.map((c) => <option key={c} value={c}>{c}</option>)}
                      </select>
                    </div>
                    <div style={{ gridColumn: 'span 2' }}>
                      <label style={{ fontSize: '.75rem', color: 'rgba(255,255,255,.4)', marginBottom: '.4rem', display: 'block' }}>Précisions sur votre projet (optionnel)</label>
                      <textarea className="cfg-input" rows={3} placeholder="Décrivez votre projet, vos besoins spécifiques…" value={config.message} onChange={(e) => set('message', e.target.value)} style={{ resize: 'vertical', minHeight: '80px' }} />
                    </div>
                  </div>
                </div>

                {status === 'error' && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '.625rem', padding: '1rem 1.25rem', borderRadius: '.875rem', background: 'rgba(239,68,68,.1)', border: '1px solid rgba(239,68,68,.25)', color: '#FCA5A5', fontSize: '.82rem' }}>
                    <AlertCircle size={16} style={{ flexShrink: 0 }} /> {errorMsg}
                  </div>
                )}
              </div>
            )}

            {/* ── Navigation ── */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '2rem', paddingTop: '1.5rem', borderTop: '1px solid rgba(255,255,255,.06)' }}>
              <button className="nav-btn"
                onClick={() => setStep((s) => s - 1)}
                disabled={step === 1}
                style={{ background: 'rgba(255,255,255,.07)', color: 'rgba(255,255,255,.5)', opacity: step === 1 ? .3 : 1, cursor: step === 1 ? 'not-allowed' : 'pointer' }}>
                <ChevronLeft size={16} /> Précédent
              </button>

              {step < 8 ? (
                <button className="nav-btn"
                  onClick={() => canNext() && setStep((s) => s + 1)}
                  disabled={!canNext()}
                  style={{ background: canNext() ? 'linear-gradient(135deg,#FF6B00,#FF4500)' : 'rgba(255,255,255,.06)', color: canNext() ? 'white' : 'rgba(255,255,255,.25)', cursor: canNext() ? 'pointer' : 'not-allowed', boxShadow: canNext() ? '0 8px 24px rgba(255,107,0,.3)' : 'none' }}>
                  Suivant <ChevronRight size={16} />
                </button>
              ) : (
                <button className="nav-btn"
                  onClick={handleSubmit}
                  disabled={!canNext() || status === 'loading'}
                  style={{ background: canNext() ? 'linear-gradient(135deg,#FF6B00,#FF4500)' : 'rgba(255,255,255,.06)', color: canNext() ? 'white' : 'rgba(255,255,255,.25)', cursor: canNext() ? 'pointer' : 'not-allowed', boxShadow: canNext() ? '0 8px 24px rgba(255,107,0,.3)' : 'none', minWidth: '180px', justifyContent: 'center' }}>
                  {status === 'loading' ? <><Loader2 size={16} style={{ animation: 'spin 1s linear infinite' }} /> Envoi…</> : <><CheckCircle size={16} /> Envoyer ma commande</>}
                </button>
              )}
            </div>
          </div>

          {/* ── Colonne droite — Prix en temps réel ── */}
          <PricePanel config={config} prices={prices} step={step} />
        </div>
      </div>
    </div>
  )
}

/* ─── PANNEAU DE PRIX ───────────────────────────────────────────────────── */
function PricePanel({ config, prices, step }: { config: Config; prices: ReturnType<typeof usePrices>; step: number }) {
  const cat = TEMPLATE_CATEGORIES.find((x) => x.id === config.sector)
  const formule = FORMULES.find((x) => x.id === config.formule)

  return (
    <div style={{ position: 'sticky', top: '120px', background: 'rgba(255,255,255,.025)', border: '1px solid rgba(255,107,0,.15)', borderRadius: '1.5rem', padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      <div style={{ fontSize: '.7rem', fontWeight: 800, color: '#FF9A4D', letterSpacing: '.07em' }}>RÉCAPITULATIF DES PRIX</div>

      {/* Lignes détail */}
      <div>
        {cat && (
          <div className="price-row">
            <span style={{ color: 'rgba(255,255,255,.5)', fontSize: '.78rem' }}>{cat.icon} {cat.label}</span>
            <span style={{ fontSize: '.78rem', fontWeight: 700 }}>{fmt(cat.basePrice)}</span>
          </div>
        )}
        {formule && formule.supplement > 0 && (
          <div className="price-row">
            <span style={{ color: 'rgba(255,255,255,.5)', fontSize: '.78rem' }}>Formule {formule.name}</span>
            <span style={{ fontSize: '.78rem', fontWeight: 700, color: '#FF9A4D' }}>+{fmt(formule.supplement)}</span>
          </div>
        )}
        {prices.domainPrice > 0 && (
          <div className="price-row">
            <span style={{ color: 'rgba(255,255,255,.5)', fontSize: '.78rem' }}>🌐 Domaine {config.domainExtension}</span>
            <span style={{ fontSize: '.78rem', fontWeight: 700 }}>{fmt(prices.domainPrice)}</span>
          </div>
        )}
        {prices.hostingYear > 0 && (
          <div className="price-row">
            <span style={{ color: 'rgba(255,255,255,.5)', fontSize: '.78rem' }}>🖥️ Hébergement /an</span>
            <span style={{ fontSize: '.78rem', fontWeight: 700 }}>{fmt(prices.hostingYear)}</span>
          </div>
        )}
        {prices.maintenanceMonth > 0 && (
          <div className="price-row">
            <span style={{ color: 'rgba(255,255,255,.5)', fontSize: '.78rem' }}>🔧 Maintenance /mois</span>
            <span style={{ fontSize: '.78rem', fontWeight: 700 }}>{fmt(prices.maintenanceMonth)}</span>
          </div>
        )}
        {prices.persTotal > 0 && (
          <div className="price-row">
            <span style={{ color: 'rgba(255,255,255,.5)', fontSize: '.78rem' }}>🎨 Personnalisation ({config.personalization.length})</span>
            <span style={{ fontSize: '.78rem', fontWeight: 700 }}>+{fmt(prices.persTotal)}</span>
          </div>
        )}
        {prices.modulesTotal > 0 && (
          <div className="price-row">
            <span style={{ color: 'rgba(255,255,255,.5)', fontSize: '.78rem' }}>🔌 Modules ({config.modules.length})</span>
            <span style={{ fontSize: '.78rem', fontWeight: 700 }}>+{fmt(prices.modulesTotal)}</span>
          </div>
        )}
      </div>

      {/* 3 Totaux */}
      <div style={{ borderTop: '1px solid rgba(255,255,255,.1)', paddingTop: '1rem', display: 'flex', flexDirection: 'column', gap: '.75rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <div style={{ fontSize: '.65rem', color: 'rgba(255,255,255,.35)', fontWeight: 700, letterSpacing: '.04em' }}>TOTAL INITIAL</div>
            <div style={{ fontSize: '.62rem', color: 'rgba(255,255,255,.25)' }}>À payer aujourd&apos;hui</div>
          </div>
          <div style={{ fontSize: '1.3rem', fontWeight: 900, color: prices.initial > 0 ? 'white' : 'rgba(255,255,255,.2)' }}>
            {prices.initial > 0 ? fmt(prices.initial) : '—'}
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '.6rem .75rem', borderRadius: '.75rem', background: prices.annual > 0 ? 'rgba(255,107,0,.07)' : 'rgba(255,255,255,.02)', border: `1px solid ${prices.annual > 0 ? 'rgba(255,107,0,.2)' : 'rgba(255,255,255,.04)'}` }}>
          <div>
            <div style={{ fontSize: '.65rem', color: 'rgba(255,255,255,.35)', fontWeight: 700, letterSpacing: '.04em' }}>TOTAL ANNUEL</div>
            <div style={{ fontSize: '.62rem', color: 'rgba(255,255,255,.25)' }}>Renouvellement /an</div>
          </div>
          <div style={{ fontSize: '.9rem', fontWeight: 800, color: prices.annual > 0 ? '#FF9A4D' : 'rgba(255,255,255,.2)' }}>
            {prices.annual > 0 ? fmt(prices.annual) : '—'}
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '.6rem .75rem', borderRadius: '.75rem', background: prices.monthly > 0 ? 'rgba(99,102,241,.07)' : 'rgba(255,255,255,.02)', border: `1px solid ${prices.monthly > 0 ? 'rgba(99,102,241,.2)' : 'rgba(255,255,255,.04)'}` }}>
          <div>
            <div style={{ fontSize: '.65rem', color: 'rgba(255,255,255,.35)', fontWeight: 700, letterSpacing: '.04em' }}>TOTAL MENSUEL</div>
            <div style={{ fontSize: '.62rem', color: 'rgba(255,255,255,.25)' }}>Abonnement /mois</div>
          </div>
          <div style={{ fontSize: '.9rem', fontWeight: 800, color: prices.monthly > 0 ? '#818CF8' : 'rgba(255,255,255,.2)' }}>
            {prices.monthly > 0 ? fmt(prices.monthly) : '—'}
          </div>
        </div>
      </div>

      {/* Barre de progression */}
      <div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '.5rem' }}>
          <span style={{ fontSize: '.65rem', color: 'rgba(255,255,255,.3)', fontWeight: 600 }}>Progression</span>
          <span style={{ fontSize: '.65rem', color: '#FF9A4D', fontWeight: 700 }}>{step} / {STEPS.length}</span>
        </div>
        <div style={{ height: '4px', borderRadius: '9999px', background: 'rgba(255,255,255,.08)' }}>
          <div style={{ height: '100%', borderRadius: '9999px', background: 'linear-gradient(90deg,#FF6B00,#FF9A4D)', width: `${(step / STEPS.length) * 100}%`, transition: 'width .3s' }} />
        </div>
      </div>

      <p style={{ fontSize: '.65rem', color: 'rgba(255,255,255,.2)', lineHeight: 1.6, textAlign: 'center' }}>
        Ce récapitulatif est indicatif. Un devis définitif vous sera transmis sous 24h par notre équipe.
      </p>
    </div>
  )
}

/* ─── ÉCRAN DE SUCCÈS ───────────────────────────────────────────────────── */
function SuccessScreen({ reference, config, prices }: { reference: string; config: Config; prices: ReturnType<typeof usePrices> }) {
  const cat = TEMPLATE_CATEGORIES.find((x) => x.id === config.sector)
  const formule = FORMULES.find((x) => x.id === config.formule)

  return (
    <div style={{ minHeight: '100vh', background: '#06091A', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
      <div style={{ maxWidth: '560px', width: '100%', textAlign: 'center' }}>
        <div style={{ width: '5rem', height: '5rem', borderRadius: '50%', background: 'rgba(74,222,128,.12)', border: '2px solid rgba(74,222,128,.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 2rem' }}>
          <CheckCircle size={40} color="#4ADE80" />
        </div>
        <h1 style={{ fontSize: '2rem', fontWeight: 900, color: 'white', marginBottom: '.75rem' }}>Commande reçue !</h1>
        <p style={{ color: 'rgba(255,255,255,.5)', marginBottom: '2rem', lineHeight: 1.75 }}>
          Votre demande a bien été transmise à notre équipe. Nous reviendrons vers vous sous <strong style={{ color: 'white' }}>24 heures</strong> pour confirmer votre commande et les prochaines étapes.
        </p>

        <div style={{ background: 'rgba(255,255,255,.03)', border: '1px solid rgba(255,255,255,.08)', borderRadius: '1.25rem', padding: '1.5rem', marginBottom: '2rem', textAlign: 'left' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
            <span style={{ fontSize: '.7rem', fontWeight: 800, color: 'rgba(255,255,255,.3)', letterSpacing: '.06em' }}>RÉFÉRENCE</span>
            <span style={{ fontSize: '.88rem', fontWeight: 900, color: '#FF9A4D', fontFamily: 'monospace' }}>{reference}</span>
          </div>
          {[
            { l: 'Template', v: `${cat?.icon} ${cat?.label ?? '—'}` },
            { l: 'Formule', v: formule?.name ?? '—' },
            { l: 'Total initial', v: fmt(prices.initial) },
            prices.annual > 0 ? { l: 'Total annuel', v: fmt(prices.annual) } : null,
            prices.monthly > 0 ? { l: 'Total mensuel', v: fmt(prices.monthly) } : null,
          ].filter(Boolean).map((row) => (
            <div key={row!.l} style={{ display: 'flex', justifyContent: 'space-between', padding: '.45rem 0', borderTop: '1px solid rgba(255,255,255,.05)', fontSize: '.82rem' }}>
              <span style={{ color: 'rgba(255,255,255,.4)' }}>{row!.l}</span>
              <span style={{ fontWeight: 700 }}>{row!.v}</span>
            </div>
          ))}
        </div>

        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <a href="/" style={{ padding: '.875rem 2rem', borderRadius: '1rem', fontWeight: 700, fontSize: '.88rem', color: 'white', background: 'linear-gradient(135deg,#FF6B00,#FF4500)', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '.5rem' }}>
            Retour à l&apos;accueil
          </a>
          <a href="/templates" style={{ padding: '.875rem 2rem', borderRadius: '1rem', fontWeight: 700, fontSize: '.88rem', color: 'rgba(255,255,255,.55)', border: '1px solid rgba(255,255,255,.1)', textDecoration: 'none' }}>
            Voir les templates
          </a>
        </div>
      </div>
    </div>
  )
}
