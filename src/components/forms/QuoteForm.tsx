'use client'
import { useState } from 'react'
import { ArrowRight, CheckCircle, Loader2 } from 'lucide-react'
import { PROJECT_TYPES, BUDGET_RANGES } from '@/lib/constants'

const initialState = {
  name: '', company: '', role: '', email: '', phone: '', whatsapp: '',
  country: 'Côte d\'Ivoire', city: '', project_type: '', product_id: '',
  budget: '', deadline: '', message: '', consent: false,
}

export default function QuoteForm() {
  const [form, setForm] = useState(initialState)
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    setForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const res = await fetch('/api/devis', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error ?? 'Erreur lors de l\'envoi')
      setSuccess(true)
      setForm(initialState)
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Erreur. Réessayez ou contactez-nous directement.')
    } finally {
      setLoading(false)
    }
  }

  if (success) {
    return (
      <div className="text-center py-10">
        <CheckCircle size={64} className="mx-auto mb-4" style={{ color: 'var(--orange)' }} />
        <h2 className="text-2xl font-bold mb-3" style={{ color: 'var(--dark)' }}>Demande reçue !</h2>
        <p className="text-gray-500 mb-6">
          Votre demande de devis a bien été enregistrée. Notre équipe vous contactera sous 48h ouvrées.
        </p>
        <button
          onClick={() => setSuccess(false)}
          className="text-sm px-6 py-3 rounded-xl font-semibold text-white"
          style={{ background: 'var(--blue)' }}
        >
          Nouvelle demande
        </button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <h2 className="text-xl font-bold mb-6" style={{ color: 'var(--dark)' }}>Votre contact</h2>

      <div className="grid sm:grid-cols-2 gap-5">
        <Field label="Nom & prénom *" name="name" value={form.name} onChange={handleChange} required />
        <Field label="Entreprise / Organisation" name="company" value={form.company} onChange={handleChange} />
        <Field label="Fonction / Rôle" name="role" value={form.role} onChange={handleChange} />
        <Field label="E-mail *" name="email" type="email" value={form.email} onChange={handleChange} required />
        <Field label="Téléphone" name="phone" type="tel" value={form.phone} onChange={handleChange} />
        <Field label="WhatsApp" name="whatsapp" type="tel" value={form.whatsapp} onChange={handleChange} />
        <Field label="Pays" name="country" value={form.country} onChange={handleChange} />
        <Field label="Ville" name="city" value={form.city} onChange={handleChange} />
      </div>

      <div className="border-t pt-6">
        <h2 className="text-xl font-bold mb-6" style={{ color: 'var(--dark)' }}>Votre projet</h2>
        <div className="grid sm:grid-cols-2 gap-5">
          <SelectField
            label="Type de projet"
            name="project_type"
            value={form.project_type}
            onChange={handleChange}
            options={PROJECT_TYPES}
          />
          <SelectField
            label="Budget indicatif"
            name="budget"
            value={form.budget}
            onChange={handleChange}
            options={BUDGET_RANGES}
          />
          <Field label="Délai souhaité" name="deadline" value={form.deadline} onChange={handleChange} placeholder="Ex : 1 mois, avant décembre..." />
        </div>
        <div className="mt-5">
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Description de votre besoin *
          </label>
          <textarea
            name="message"
            value={form.message}
            onChange={handleChange}
            required
            rows={6}
            placeholder="Décrivez votre projet, vos objectifs, le public cible, les fonctionnalités souhaitées..."
            className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:border-transparent resize-none"
            style={{ '--tw-ring-color': 'var(--orange)' } as React.CSSProperties}
          />
        </div>
      </div>

      {/* Consentement */}
      <div className="flex items-start gap-3">
        <input
          type="checkbox"
          name="consent"
          id="consent"
          checked={form.consent}
          onChange={handleChange}
          required
          className="mt-1 w-4 h-4 shrink-0"
        />
        <label htmlFor="consent" className="text-sm text-gray-600">
          J&apos;accepte que mes données soient utilisées pour le traitement de ma demande. *
        </label>
      </div>

      {error && (
        <div className="p-4 rounded-xl text-sm text-red-700 bg-red-50 border border-red-200">{error}</div>
      )}

      <button
        type="submit"
        disabled={loading}
        className="w-full inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-bold text-white transition-all hover:opacity-90 disabled:opacity-60"
        style={{ background: 'var(--orange)' }}
      >
        {loading ? <><Loader2 size={20} className="animate-spin" /> Envoi en cours...</> : <>Envoyer ma demande <ArrowRight size={20} /></>}
      </button>
    </form>
  )
}

function Field({ label, name, value, onChange, type = 'text', required = false, placeholder }: {
  label: string; name: string; value: string; onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string; required?: boolean; placeholder?: string;
}) {
  return (
    <div>
      <label className="block text-sm font-semibold text-gray-700 mb-2">{label}</label>
      <input
        type={type} name={name} value={value} onChange={onChange} required={required}
        placeholder={placeholder}
        className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:border-transparent"
      />
    </div>
  )
}

function SelectField({ label, name, value, onChange, options }: {
  label: string; name: string; value: string; onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void; options: string[];
}) {
  return (
    <div>
      <label className="block text-sm font-semibold text-gray-700 mb-2">{label}</label>
      <select
        name={name} value={value} onChange={onChange}
        className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:border-transparent bg-white"
      >
        <option value="">Sélectionner...</option>
        {options.map((opt) => <option key={opt} value={opt}>{opt}</option>)}
      </select>
    </div>
  )
}
