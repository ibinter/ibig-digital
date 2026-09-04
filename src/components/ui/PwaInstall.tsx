'use client'
import { useEffect, useState } from 'react'

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>
}

export default function PwaInstall() {
  const [prompt, setPrompt] = useState<BeforeInstallPromptEvent | null>(null)
  const [show, setShow] = useState(false)

  useEffect(() => {
    // Enregistrement du service worker
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js').catch(() => {})
    }

    // Capture de l'événement d'installation
    const handler = (e: Event) => {
      e.preventDefault()
      setPrompt(e as BeforeInstallPromptEvent)
      const dismissed = sessionStorage.getItem('pwa-dismissed')
      if (!dismissed) setShow(true)
    }
    window.addEventListener('beforeinstallprompt', handler)
    return () => window.removeEventListener('beforeinstallprompt', handler)
  }, [])

  const install = async () => {
    if (!prompt) return
    await prompt.prompt()
    const { outcome } = await prompt.userChoice
    if (outcome === 'accepted') setShow(false)
  }

  const dismiss = () => {
    setShow(false)
    sessionStorage.setItem('pwa-dismissed', '1')
  }

  if (!show) return null

  return (
    <div
      className="fixed bottom-20 left-4 right-4 md:left-auto md:right-6 md:w-80 z-50 rounded-2xl shadow-2xl p-4 flex items-center gap-3"
      style={{ background: '#003B7A', color: '#fff', border: '1px solid rgba(255,154,77,0.4)' }}
    >
      <img src="/logo-icon.png" alt="IBIG DIGITAL" className="w-12 h-12 rounded-xl flex-shrink-0" />
      <div className="flex-1 min-w-0">
        <p className="font-bold text-sm leading-tight">Installer IBIG DIGITAL</p>
        <p className="text-xs mt-0.5" style={{ color: 'rgba(255,255,255,0.7)' }}>
          Accès rapide depuis votre écran d&apos;accueil
        </p>
        <div className="flex gap-2 mt-2">
          <button
            onClick={install}
            className="px-3 py-1.5 text-xs font-semibold rounded-lg"
            style={{ background: '#FF6B00', color: '#fff' }}
          >
            Installer
          </button>
          <button
            onClick={dismiss}
            className="px-3 py-1.5 text-xs font-semibold rounded-lg"
            style={{ background: 'rgba(255,255,255,0.15)', color: '#fff' }}
          >
            Plus tard
          </button>
        </div>
      </div>
    </div>
  )
}
