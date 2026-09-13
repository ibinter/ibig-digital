-- ============================================================
-- ESPACE CLIENT — IBIG DIGITAL TEMPLATES
-- À exécuter une seule fois dans Neon / PostgreSQL
-- ============================================================

CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- Comptes clients
CREATE TABLE IF NOT EXISTS clients (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email       TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  name        TEXT NOT NULL,
  phone       TEXT,
  company     TEXT,
  country     TEXT DEFAULT 'Côte d''Ivoire',
  is_active   BOOLEAN DEFAULT TRUE,
  created_at  TIMESTAMPTZ DEFAULT NOW(),
  updated_at  TIMESTAMPTZ DEFAULT NOW()
);

-- Commandes liées à un client
CREATE TABLE IF NOT EXISTS client_orders (
  id               UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id        UUID REFERENCES clients(id) ON DELETE CASCADE,
  reference        TEXT UNIQUE NOT NULL,
  quote_reference  TEXT,                          -- lien avec quote_requests.reference
  template_sector  TEXT,
  template_label   TEXT,
  formule          TEXT,
  domain_option    TEXT,
  domain           TEXT,
  hosting          TEXT,
  maintenance      TEXT,
  personalization  JSONB DEFAULT '[]',
  modules          JSONB DEFAULT '[]',
  total_initial    INTEGER DEFAULT 0,
  total_annual     INTEGER DEFAULT 0,
  total_monthly    INTEGER DEFAULT 0,
  status           TEXT DEFAULT 'pending',        -- pending | in_progress | delivered | archived
  notes            TEXT,
  delivery_date    DATE,
  site_url         TEXT,
  admin_url        TEXT,
  admin_login      TEXT,
  admin_password   TEXT,
  created_at       TIMESTAMPTZ DEFAULT NOW(),
  updated_at       TIMESTAMPTZ DEFAULT NOW()
);

-- Tickets de support
CREATE TABLE IF NOT EXISTS client_tickets (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id   UUID REFERENCES clients(id) ON DELETE CASCADE,
  order_id    UUID REFERENCES client_orders(id) ON DELETE SET NULL,
  subject     TEXT NOT NULL,
  priority    TEXT DEFAULT 'normal',              -- low | normal | high | urgent
  status      TEXT DEFAULT 'open',               -- open | in_progress | resolved | closed
  created_at  TIMESTAMPTZ DEFAULT NOW(),
  updated_at  TIMESTAMPTZ DEFAULT NOW()
);

-- Messages d'un ticket (fil de discussion)
CREATE TABLE IF NOT EXISTS ticket_messages (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  ticket_id   UUID REFERENCES client_tickets(id) ON DELETE CASCADE,
  sender_type TEXT NOT NULL,                      -- 'client' | 'ibig'
  message     TEXT NOT NULL,
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

-- Factures
CREATE TABLE IF NOT EXISTS client_invoices (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id   UUID REFERENCES clients(id) ON DELETE CASCADE,
  order_id    UUID REFERENCES client_orders(id) ON DELETE SET NULL,
  reference   TEXT UNIQUE NOT NULL,
  amount      INTEGER NOT NULL,
  type        TEXT DEFAULT 'initial',             -- initial | annual | monthly
  status      TEXT DEFAULT 'pending',             -- pending | paid | cancelled
  due_date    DATE,
  paid_at     TIMESTAMPTZ,
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

-- Index utiles
CREATE INDEX IF NOT EXISTS idx_client_orders_client   ON client_orders(client_id);
CREATE INDEX IF NOT EXISTS idx_client_tickets_client  ON client_tickets(client_id);
CREATE INDEX IF NOT EXISTS idx_ticket_messages_ticket ON ticket_messages(ticket_id);
CREATE INDEX IF NOT EXISTS idx_client_invoices_client ON client_invoices(client_id);
