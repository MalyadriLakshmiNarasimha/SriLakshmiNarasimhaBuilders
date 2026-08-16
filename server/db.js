import Database from 'better-sqlite3';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const db = new Database(path.join(__dirname, 'leads.db'));

db.pragma('journal_mode = WAL');

db.exec(`
  CREATE TABLE IF NOT EXISTS submissions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT NOT NULL,
    subject TEXT NOT NULL,
    message TEXT NOT NULL,
    project_name TEXT,
    email_sent INTEGER NOT NULL DEFAULT 0,
    status TEXT NOT NULL DEFAULT 'pending',
    created_at TEXT NOT NULL DEFAULT (datetime('now'))
  )
`);

// Backward-compatible migration for existing SQLite databases.
try { db.exec("ALTER TABLE submissions ADD COLUMN status TEXT NOT NULL DEFAULT 'pending'"); } catch (err) {
  if (!String(err.message || '').includes('duplicate column name')) throw err
}

export function insertSubmission({ name, email, phone, subject, message, projectName, emailSent }) {
  const stmt = db.prepare(`
    INSERT INTO submissions (name, email, phone, subject, message, project_name, email_sent)
    VALUES (@name, @email, @phone, @subject, @message, @projectName, @emailSent)
  `);
  const result = stmt.run({
    name,
    email,
    phone,
    subject,
    message,
    projectName: projectName || null,
    emailSent: emailSent ? 1 : 0,
  });
  return result.lastInsertRowid;
}

export function getAllSubmissions() {
  return db.prepare('SELECT * FROM submissions ORDER BY created_at DESC').all();
}

export function updateSubmissionStatus(id, status) {
  const normalized = status === 'completed' ? 'completed' : status === 'pending' ? 'pending' : null
  if (!normalized) throw new Error('Invalid submission status.')
  return db.prepare('UPDATE submissions SET status = ? WHERE id = ?').run(normalized, id)
}

export function deleteSubmission(id) {
  return db.prepare('DELETE FROM submissions WHERE id = ?').run(id);
}

export default db;
