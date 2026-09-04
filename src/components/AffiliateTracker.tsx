'use client'
import { useEffect } from 'react'
import { useSearchParams } from 'next/navigation'

export default function AffiliateTracker() {
  const searchParams = useSearchParams()

  useEffect(() => {
    const ref = searchParams.get('ref')
    if (ref && /^[A-Z0-9\-]{4,30}$/i.test(ref)) {
      try {
        localStorage.setItem('ibig_affiliate_ref', ref)
        localStorage.setItem('ibig_affiliate_ref_at', Date.now().toString())
      } catch { /* ignore */ }
    }
  }, [searchParams])

  return null
}
