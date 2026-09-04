import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { getBlogPosts } from '@/lib/queries'

export const metadata: Metadata = {
  title: 'Blog & Ressources',
  description: 'Articles, conseils et ressources sur le digital, le marketing, le développement web et la transformation numérique.',
}

export const dynamic = 'force-dynamic'

export default async function BlogPage() {
  const posts = await getBlogPosts().catch(() => [])

  return (
    <div className="pt-24">
      <section className="py-20" style={{ background: 'linear-gradient(135deg, var(--blue-dark) 0%, var(--blue) 100%)' }}>
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold text-white mb-4">Blog & Ressources</h1>
          <p className="text-blue-200 text-lg">Nos conseils et expertises pour votre transformation digitale.</p>
        </div>
      </section>

      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {posts.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-5xl mb-4">✍️</div>
            <h2 className="text-xl font-bold mb-2" style={{ color: 'var(--dark)' }}>Articles à venir</h2>
            <p className="text-gray-500">Notre équipe prépare des articles sur le digital, le marketing et la technologie.</p>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <Link key={post.id} href={`/blog/${post.slug}`} className="group rounded-2xl overflow-hidden bg-white border border-gray-100 hover:shadow-xl transition-all hover:-translate-y-1">
                {post.cover_image && (
                  <div className="relative h-48 overflow-hidden bg-gray-100">
                    <Image src={post.cover_image} alt={post.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                  </div>
                )}
                <div className="p-6">
                  <h2 className="font-bold text-lg mb-2 group-hover:text-blue-800 transition-colors" style={{ color: 'var(--dark)' }}>{post.title}</h2>
                  {post.excerpt && <p className="text-sm text-gray-500 line-clamp-2">{post.excerpt}</p>}
                  {post.published_at && (
                    <p className="text-xs text-gray-400 mt-3">
                      {new Date(post.published_at).toLocaleDateString('fr-FR', { year: 'numeric', month: 'long', day: 'numeric' })}
                    </p>
                  )}
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>
    </div>
  )
}
