-- Table commandes (paiements CinetPay)
CREATE TABLE IF NOT EXISTS commandes (
  id                    SERIAL PRIMARY KEY,
  reference             VARCHAR(64)  NOT NULL UNIQUE,
  template_id           VARCHAR(100),
  secteur_id            VARCHAR(100),
  formule               VARCHAR(50),

  -- Client
  client_nom            VARCHAR(200) NOT NULL,
  client_prenom         VARCHAR(200),
  client_email          VARCHAR(300) NOT NULL,
  client_telephone      VARCHAR(50),

  -- Paiement
  montant               INTEGER      NOT NULL,
  statut                VARCHAR(30)  NOT NULL DEFAULT 'en_attente',
  -- statut: en_attente | paye | echec | rembourse
  transaction_cinetpay  VARCHAR(128),
  moyen_paiement        VARCHAR(100),
  cinetpay_status       VARCHAR(50),
  date_paiement         TIMESTAMPTZ,

  created_at            TIMESTAMPTZ  NOT NULL DEFAULT NOW(),
  updated_at            TIMESTAMPTZ  NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_commandes_statut    ON commandes(statut);
CREATE INDEX IF NOT EXISTS idx_commandes_email     ON commandes(client_email);
CREATE INDEX IF NOT EXISTS idx_commandes_cinetpay  ON commandes(transaction_cinetpay);
