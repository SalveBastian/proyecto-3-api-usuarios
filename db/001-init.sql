CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
INSERT INTO users (name, email) VALUES
  ('Ana Torres', 'ana@example.com'),
  ('Luis Gomez', 'luis@example.com')
ON CONFLICT (email) DO NOTHING;
