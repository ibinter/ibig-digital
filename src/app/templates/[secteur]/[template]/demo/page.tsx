import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { SECTORS_MAP } from '../../../templates-data'
import DemoClient from './DemoClient'

/* map secteur-template → fichier HTML */
const DEMO_FILES: Record<string, string> = {
  'restaurant-le-gourmet':'restaurant-le-gourmet.html','restaurant-street-food':'restaurant-street-food.html','restaurant-traiteur':'restaurant-traiteur.html','restaurant-brasserie':'restaurant-brasserie.html','restaurant-pizza-express':'restaurant-pizza-express.html','restaurant-afro-cuisine':'restaurant-afro-cuisine.html','restaurant-cafe-bistro':'restaurant-cafe-bistro.html','restaurant-food-delivery':'restaurant-food-delivery.html',
  'immobilier-premium-realty':'immobilier-prestige-habitat.html','immobilier-urban-habitat':'immobilier-urban-habitat.html','immobilier-villa-prestige':'immobilier-villa-prestige.html','immobilier-agence-locale':'immobilier-agence-locale.html','immobilier-invest-immo':'immobilier-invest-immo.html','immobilier-location-vacances':'immobilier-location-vacances.html',
  'sante-clinique-sante':'sante-clinique-sante-plus.html','sante-dentaire-pro':'sante-dentaire-pro.html','sante-pharmacie-plus':'sante-pharmacie-plus.html','sante-kine-sport':'sante-kine-sport.html','sante-maternite':'sante-maternite.html','sante-labo-analyse':'sante-labo-analyse.html','sante-medecine-naturelle':'sante-medecine-naturelle.html',
  'formation-ecole-business':'formation-ecole-business.html','formation-formation-pro':'formation-formation-pro.html','formation-auto-ecole':'formation-auto-ecole.html','formation-universite-privee':'formation-universite-privee.html','formation-tutorat-scolaire':'formation-tutorat-scolaire.html','formation-formation-digitale':'formation-academie-digital.html','formation-academie-langues':'formation-academie-langues.html','formation-ecole-art':'formation-ecole-art.html','formation-coaching-carriere':'formation-coaching-carriere.html',
  'ecommerce-boutique-mode':'ecommerce-boutique-mode.html','ecommerce-tech-store':'ecommerce-tech-store.html','ecommerce-cosmetique-shop':'ecommerce-cosmetique-shop.html','ecommerce-alimentaire':'ecommerce-alimentaire.html','ecommerce-artisanat':'ecommerce-artisanat.html','ecommerce-sport-fitness':'ecommerce-sport-fitness.html','ecommerce-maison-deco':'ecommerce-maison-deco.html','ecommerce-fleuriste':'ecommerce-fleuriste.html','ecommerce-livres-culture':'ecommerce-livres-culture.html','ecommerce-multi-boutique':'ecommerce-multi-boutique.html',
  'btp-construction-elite':'btp-construction-pro.html','btp-renovation-habitat':'btp-renovation-habitat.html','btp-architecture':'btp-architecture.html','btp-electricite-plomberie':'btp-electricite-plomberie.html','btp-paysagiste':'btp-paysagiste.html',
  'cabinet-cabinet-avocat':'cabinet-avocat-expert.html','cabinet-expert-comptable':'cabinet-expert-comptable.html','cabinet-consultant-rh':'cabinet-consultant-rh.html','cabinet-agence-com':'cabinet-agence-com.html','cabinet-bureau-etudes':'cabinet-bureau-etudes.html','cabinet-notariat':'cabinet-notariat.html',
  'hotel-hotel-prestige':'hotel-prestige.html','hotel-boutique-hotel':'hotel-boutique-hotel.html','hotel-resort-tropical':'hotel-resort-tropical.html','hotel-residence-affaires':'hotel-residence-affaires.html','hotel-agence-voyage':'hotel-agence-voyage.html','hotel-gite-auberge':'hotel-gite-auberge.html','hotel-safari-lodge':'hotel-safari-lodge.html',
  'beaute-salon-coiffure':'beaute-salon-coiffure.html','beaute-institut-beaute':'beaute-salon-luxe.html','beaute-spa-luxe':'beaute-spa-luxe.html','beaute-barbershop':'beaute-barbershop.html','beaute-nail-art':'beaute-nail-art.html','beaute-make-up-studio':'beaute-make-up-studio.html','beaute-centre-bien-etre':'beaute-centre-bien-etre.html','beaute-parfumerie':'beaute-parfumerie.html',
  'auto-concessionnaire':'auto-garage-elite.html','auto-garage-mecanique':'auto-garage-mecanique.html','auto-location-vehicules':'auto-location-vehicules.html','auto-transport-taxi':'auto-transport-taxi.html','auto-pieces-auto':'auto-pieces-auto.html',
  'agriculture-ferme-bio':'agriculture-ferme-bio.html','agriculture-cooperative':'agriculture-cooperative.html','agriculture-agro-industrie':'agriculture-agro-industrie.html','agriculture-pepiniere':'agriculture-pepiniere.html',
  'corporate-holding-finance':'corporate-groupe-excellence.html','corporate-banque-microfinance':'corporate-banque-microfinance.html','corporate-assurance':'corporate-assurance.html','corporate-audit-conseil':'corporate-audit-conseil.html','corporate-startup-tech':'corporate-startup-tech.html','corporate-ong-association':'corporate-ong-association.html','corporate-media-presse':'corporate-media-presse.html','corporate-institution-pub':'corporate-institution-pub.html','corporate-industrie':'corporate-industrie.html',
}

export async function generateMetadata({ params }: { params: Promise<{ secteur: string; template: string }> }): Promise<Metadata> {
  const { secteur, template } = await params
  const s = SECTORS_MAP[secteur]
  const tpl = s?.templates.find(t => t.id === template)
  if (!s || !tpl) return { title: 'Démo | IBIG DIGITAL' }
  return {
    title: `Démo live — ${tpl.name} | IBIG DIGITAL`,
    description: `Prévisualisation complète du template ${tpl.name}. Naviguez librement dans ce site démo.`,
  }
}

export function generateStaticParams() {
  return Object.values(SECTORS_MAP).flatMap(s =>
    s.templates.map(t => ({ secteur: s.id, template: t.id }))
  )
}

export default async function DemoPage({ params }: { params: Promise<{ secteur: string; template: string }> }) {
  const { secteur, template } = await params
  const s = SECTORS_MAP[secteur]
  const tpl = s?.templates.find(t => t.id === template)
  if (!s || !tpl) notFound()

  const demoFile = DEMO_FILES[`${secteur}-${template}`]

  return (
    <DemoClient
      demoFile={demoFile ?? null}
      tplName={tpl.name}
      tplId={template}
      secteurId={secteur}
      secteurLabel={s.label}
      primaryColor={tpl.primaryColor}
      basePrice={s.basePrice}
    />
  )
}
