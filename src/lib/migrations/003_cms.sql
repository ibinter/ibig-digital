-- ============================================================
-- CMS PROPRIÉTAIRE IBIG DIGITAL — Contenu éditables par site
-- Requiert que schema-espace-client.sql ait été exécuté d'abord
-- ============================================================

-- Contenu éditable par site, organisé par sections
CREATE TABLE IF NOT EXISTS site_content (
  id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id   UUID NOT NULL REFERENCES client_orders(id) ON DELETE CASCADE,
  section    TEXT NOT NULL,         -- hero | about | contact | services | gallery | hours | menu | team | faq | cta
  content    JSONB NOT NULL DEFAULT '{}',
  updated_by TEXT NOT NULL DEFAULT 'client',  -- client | ibig
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(order_id, section)
);

-- Médias uploadés par les clients
CREATE TABLE IF NOT EXISTS cms_media (
  id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id   UUID NOT NULL REFERENCES client_orders(id) ON DELETE CASCADE,
  filename   TEXT NOT NULL,
  url        TEXT NOT NULL,
  size_bytes INTEGER,
  mime_type  TEXT,
  uploaded_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Journal des modifications (audit trail)
CREATE TABLE IF NOT EXISTS cms_history (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id    UUID NOT NULL REFERENCES client_orders(id) ON DELETE CASCADE,
  section     TEXT NOT NULL,
  old_content JSONB,
  new_content JSONB NOT NULL,
  changed_by  TEXT NOT NULL DEFAULT 'client',
  changed_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_site_content_order   ON site_content(order_id);
CREATE INDEX IF NOT EXISTS idx_cms_media_order       ON cms_media(order_id);
CREATE INDEX IF NOT EXISTS idx_cms_history_order     ON cms_history(order_id);
