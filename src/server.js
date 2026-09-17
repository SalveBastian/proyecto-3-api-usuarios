const express = require('express');
const { Pool } = require('pg');
const app = express();
app.use(express.json());
const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const emailOk = (email) => typeof email === 'string' && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
const validate = (body) => typeof body?.name === 'string' && body.name.trim() && emailOk(body.email);

app.get('/health', async (_req, res) => {
  try { await pool.query('SELECT 1'); res.json({ status: 'ok' }); }
  catch (error) { console.error(error); res.status(500).json({ error: 'Base de datos no disponible' }); }
});
app.get('/users', async (_req, res, next) => { try { res.json((await pool.query('SELECT * FROM users ORDER BY id')).rows); } catch (e) { next(e); } });
app.get('/users/:id', async (req, res, next) => { try {
  const result = await pool.query('SELECT * FROM users WHERE id=$1', [req.params.id]);
  return result.rowCount ? res.json(result.rows[0]) : res.status(404).json({ error: 'Usuario no encontrado' });
} catch (e) { next(e); } });
app.post('/users', async (req, res, next) => { if (!validate(req.body)) return res.status(400).json({ error: 'name y email valido son obligatorios' }); try {
  const result = await pool.query('INSERT INTO users(name,email) VALUES($1,$2) RETURNING *', [req.body.name.trim(), req.body.email.toLowerCase()]);
  res.status(201).json(result.rows[0]);
} catch (e) { if (e.code === '23505') return res.status(400).json({ error: 'El email ya existe' }); next(e); } });
app.put('/users/:id', async (req, res, next) => { if (!validate(req.body)) return res.status(400).json({ error: 'name y email valido son obligatorios' }); try {
  const result = await pool.query('UPDATE users SET name=$1,email=$2 WHERE id=$3 RETURNING *', [req.body.name.trim(), req.body.email.toLowerCase(), req.params.id]);
  return result.rowCount ? res.json(result.rows[0]) : res.status(404).json({ error: 'Usuario no encontrado' });
} catch (e) { if (e.code === '23505') return res.status(400).json({ error: 'El email ya existe' }); next(e); } });
app.delete('/users/:id', async (req, res, next) => { try {
  const result = await pool.query('DELETE FROM users WHERE id=$1 RETURNING id', [req.params.id]);
  return result.rowCount ? res.status(204).send() : res.status(404).json({ error: 'Usuario no encontrado' });
} catch (e) { next(e); } });
app.use((error, _req, res, _next) => { console.error(error); res.status(500).json({ error: 'Error interno del servidor' }); });
app.listen(process.env.PORT || 3000, () => console.log('API de usuarios activa'));
