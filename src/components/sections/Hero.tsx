'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { ArrowRight, CheckCircle, Play, Star } from 'lucide-react'
import { SITE } from '@/lib/constants'

const words = ['sites web', 'applications', 'e-commerce', 'stratégies IA', 'identités visuelles']

export default function Hero() {
  const [wordIndex, setWordIndex] = useState(0)
  const [fade, setFade] = useState(true)
  const waUrl = `https://wa.me/${SITE.whatsappNumber}?text=${encodeURIComponent('Bonjour IBIG DIGITAL, je souhaite discuter de mon projet digital.')}`

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false)
      setTimeout(() => {
        setWordIndex((i) => (i + 1) % words.length)
        setFade(true)
      }, 400)
    }, 2800)
    return () => clearInterval(interval)
  }, [])

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden" style={{ background: '#001D3D' }}>

      {/* Orbes animés */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(0,91,187,0.5) 0%, transparent 70%)', animation: 'pulse 8s ease-in-out infinite' }} />
        <div className="absolute bottom-[-10%] left-[-5%] w-[500px] h-[500px] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(255,107,0,0.25) 0%, transparent 70%)', animation: 'pulse 6s ease-in-out infinite 2s' }} />
        <div className="absolute top-[40%] left-[30%] w-[300px] h-[300px] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(0,86,179,0.2) 0%, transparent 70%)', animation: 'pulse 10s ease-in-out infinite 1s' }} />
        {/* Grille */}
        <div className="absolute inset-0 opacity-[0.04]"
          style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)', backgroundSize: '60px 60px' }} />
      </div>

      <style>{`
        @keyframes pulse { 0%,100%{transform:scale(1);opacity:0.7} 50%{transform:scale(1.15);opacity:1} }
        @keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-12px)} }
        @keyframes fadeIn { from{opacity:0;transform:translateY(10px)} to{opacity:1;transform:translateY(0)} }
        .float-1{animation:float 5s ease-in-out infinite}
        .float-2{animation:float 7s ease-in-out infinite 1s}
        .float-3{animation:float 6s ease-in-out infinite 2s}
        .float-4{animation:float 8s ease-in-out infinite 0.5s}
        .word-fade{transition:opacity 0.4s,transform 0.4s}
      `}</style>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-20 w-full">
        <div className="grid lg:grid-cols-2 gap-12 items-center">

          {/* COLONNE GAUCHE */}
          <div style={{ animation: 'fadeIn 0.8s ease both' }}>

            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold mb-8 border"
              style={{ background: 'rgba(255,107,0,0.12)', borderColor: 'rgba(255,107,0,0.3)', color: '#FF8C42' }}>
              <span className="w-2 h-2 rounded-full inline-block animate-pulse" style={{ background: '#FF6B00' }} />
              Agence Digitale N°1 – Côte d&apos;Ivoire &amp; Afrique
            </div>

            {/* Titre */}
            <h1 className="text-5xl sm:text-6xl lg:text-6xl font-black text-white leading-[1.1] mb-6" style={{ letterSpacing: '-0.02em' }}>
              Nous créons des{' '}
              <span className="block mt-1 word-fade" style={{
                background: 'linear-gradient(90deg, #FF6B00, #FF8C42)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                opacity: fade ? 1 : 0,
                transform: fade ? 'translateY(0)' : 'translateY(8px)',
              }}>
                {words[wordIndex]}
              </span>
              <span className="block mt-1">qui convertissent.</span>
            </h1>

            <p className="text-lg text-blue-200 mb-10 leading-relaxed max-w-lg" style={{ opacity: 0.85 }}>
              IBIG DIGITAL transforme vos idées en solutions digitales performantes. Sites web, applications, marketing et IA — tout ce dont votre entreprise a besoin pour dominer son marché.
            </p>

            {/* Checkpoints */}
            <div className="flex flex-col gap-3 mb-10">
              {[
                'Devis gratuit en moins de 24h',
                'Livrables professionnels garantis',
                'Support dédié après livraison',
              ].map((item) => (
                <div key={item} className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full flex items-center justify-center shrink-0" style={{ background: 'rgba(255,107,0,0.2)' }}>
                    <CheckCircle size={14} style={{ color: '#FF6B00' }} />
                  </div>
                  <span className="text-sm text-blue-100">{item}</span>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <Link href="/devis"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl font-bold text-white transition-all hover:-translate-y-1"
                style={{ background: 'linear-gradient(135deg, #FF6B00, #FF4500)', boxShadow: '0 8px 30px rgba(255,107,0,0.4)' }}>
                Démarrer mon projet <ArrowRight size={20} />
              </Link>
              <Link href="/realisations"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl font-semibold text-white border transition-all hover:bg-white/10"
                style={{ borderColor: 'rgba(255,255,255,0.2)' }}>
                <Play size={18} />
                Voir nos réalisations
              </Link>
            </div>

            {/* Social proof */}
            <div className="flex items-center gap-4">
              <div className="flex -space-x-2">
                {['🧑🏾‍💼','👩🏽‍💻','🧑🏿‍🏫','👨🏽‍💼'].map((emoji, i) => (
                  <div key={i} className="w-9 h-9 rounded-full border-2 flex items-center justify-center text-sm"
                    style={{ borderColor: '#001D3D', background: 'rgba(255,255,255,0.1)' }}>
                    {emoji}
                  </div>
                ))}
              </div>
              <div>
                <div className="flex items-center gap-1 mb-0.5">
                  {[...Array(5)].map((_, i) => <Star key={i} size={12} fill="#FF6B00" style={{ color: '#FF6B00' }} />)}
                </div>
                <p className="text-xs text-blue-300">+40 clients satisfaits en Afrique</p>
              </div>
            </div>
          </div>

          {/* COLONNE DROITE – Cards flottantes */}
          <div className="hidden lg:flex flex-col gap-4" style={{ animation: 'fadeIn 1s ease 0.3s both' }}>

            {/* Card principale */}
            <div className="p-6 rounded-3xl border float-1"
              style={{ background: 'rgba(255,255,255,0.05)', borderColor: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(20px)' }}>
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="text-xs text-blue-300 mb-1 font-medium uppercase tracking-wider">Projet en cours</div>
                  <div className="text-white font-bold text-lg">Site E-commerce Premium</div>
                  <div className="text-blue-300 text-sm mt-1">Livraison dans 12 jours</div>
                </div>
                <div className="px-3 py-1 rounded-full text-xs font-bold" style={{ background: 'rgba(0,200,100,0.15)', color: '#00C864' }}>
                  ● En cours
                </div>
              </div>
              <div className="w-full rounded-full h-2 mb-2" style={{ background: 'rgba(255,255,255,0.1)' }}>
                <div className="h-2 rounded-full" style={{ width: '72%', background: 'linear-gradient(90deg, #003B7A, #FF6B00)' }} />
              </div>
              <div className="text-xs text-blue-300">72% complété</div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {[
                { icon: '🌐', label: 'Sites web', count: '30+', desc: 'projets livrés', cls: 'float-2' },
                { icon: '📱', label: 'Applications', count: '10+', desc: 'apps mobiles', cls: 'float-3' },
                { icon: '🛒', label: 'E-commerce', count: '15+', desc: 'boutiques créées', cls: 'float-4' },
                { icon: '🎨', label: 'Branding', count: '50+', desc: 'identités visuelles', cls: 'float-1' },
              ].map((card) => (
                <div key={card.label}
                  className={`p-5 rounded-2xl border ${card.cls}`}
                  style={{ background: 'rgba(255,255,255,0.05)', borderColor: 'rgba(255,255,255,0.08)' }}>
                  <div className="text-2xl mb-2">{card.icon}</div>
                  <div className="text-2xl font-black text-white">{card.count}</div>
                  <div className="text-xs text-blue-300 mt-0.5">{card.desc}</div>
                </div>
              ))}
            </div>

            {/* Badge IBIG PARTNERS */}
            <div className="flex items-center gap-4 p-4 rounded-2xl border"
              style={{ background: 'rgba(255,107,0,0.1)', borderColor: 'rgba(255,107,0,0.2)' }}>
              <div className="w-10 h-10 rounded-xl flex items-center justify-center font-black text-sm"
                style={{ background: 'linear-gradient(135deg, #FF6B00, #FF4500)', color: 'white' }}>
                IP
              </div>
              <div>
                <div className="text-white font-bold text-sm">IBIG PARTNERS</div>
                <div className="text-orange-300 text-xs">Gagnez des commissions en recommandant nos services</div>
              </div>
              <ArrowRight size={16} style={{ color: '#FF6B00', marginLeft: 'auto', flexShrink: 0 }} />
            </div>
          </div>
        </div>
      </div>

      {/* Vague */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
          <path d="M0 80L1440 80L1440 30C1100 80 600 5 0 50L0 80Z" fill="white"/>
        </svg>
      </div>
    </section>
  )
}
