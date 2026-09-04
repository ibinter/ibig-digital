'use client'
import { useState } from 'react'
import { ArrowRight, CheckCircle, Loader2 } from 'lucide-react'

const initial = { name: '', email: '', phone: '', subject: '', message: '' }

export default function ContactForm() {
  const [form, setForm] = useState(initial)
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error)
      setSuccess(true)
      setForm(initial)
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Erreur. Réessayez.')
    } finally {
      setLoading(false)
    }
  }

  if (success) {
    return (
      <div className="text-center py-8">
        <CheckCircle size={48} className="mx-auto mb-3" style={{ color: 'var(--orange)' }} />
        <h3 className="font-bold text-lg mb-2" style={{ color: 'var(--dark)' }}>Message envoyé !</h3>
        <p className="text-gray-500 text-sm">Nous vous répondrons sous 48h.</p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Nom & prénom *</label>
          <input type="text" name="name" value={form.name} onChange={handleChange} required className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2" />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">E-mail *</label>
          <input type="email" name="email" value={form.email} onChange={handleChange} required className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2" />
        </div>
      </div>
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">Téléphone</label>
        <input type="tel" name="phone" value={form.phone} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2" />
      </div>
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">Sujet</label>
        <input type="text" name="subject" value={form.subject} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2" />
      </div>
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">Message *</label>
        <textarea name="message" value={form.message} onChange={handleChange} required rows={5} className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 resize-none" />
      </div>
      {error && <div className="p-3 rounded-xl text-sm text-red-700 bg-red-50">{error}</div>}
      <button type="submit" disabled={loading} className="w-full flex items-center justify-center gap-2 py-4 rounded-xl font-bold text-white transition-all hover:opacity-90 disabled:opacity-60" style={{ background: 'var(--blue)' }}>
        {loading ? <><Loader2 size={18} className="animate-spin" /> Envoi...</> : <>Envoyer <ArrowRight size={18} /></>}
      </button>
    </form>
  )
}
