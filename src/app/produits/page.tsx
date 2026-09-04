import type { Metadata } from 'next'
import { redirect } from 'next/navigation'

export const metadata: Metadata = {
  title: 'Produits & Services',
}

export default function ProduitsPage() {
  redirect('/services')
}
