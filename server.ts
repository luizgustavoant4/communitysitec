import express from "express";
import { createServer as createViteServer } from "vite";
import Database from "better-sqlite3";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const db = new Database("catalog.db");

// Initialize database
db.exec(`
  CREATE TABLE IF NOT EXISTS products (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    description TEXT,
    price TEXT,
    link TEXT,
    image TEXT,
    category TEXT
  );

  CREATE TABLE IF NOT EXISTS stores (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    description TEXT,
    link TEXT,
    image TEXT
  );

  CREATE TABLE IF NOT EXISTS guides (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    description TEXT,
    link TEXT,
    type TEXT -- 'video' or 'article'
  );

  CREATE TABLE IF NOT EXISTS social_links (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    platform TEXT NOT NULL,
    url TEXT NOT NULL
  );

  -- Seed data if empty
  INSERT INTO products (name, description, price, link, image, category)
  SELECT 'Tênis Jordan 4 Retro', 'O clássico Jordan 4 em diversas cores. Qualidade premium G5.', 'R$ 450,00', 'https://example.com', 'https://picsum.photos/seed/jordan4/400/400', 'Moda'
  WHERE NOT EXISTS (SELECT 1 FROM products);

  INSERT INTO products (name, description, price, link, image, category)
  SELECT 'iPhone 15 Pro Max', 'O melhor smartphone da Apple com acabamento em titânio.', 'R$ 8.999,00', 'https://example.com', 'https://picsum.photos/seed/iphone/400/400', 'Eletrônicos'
  WHERE NOT EXISTS (SELECT 1 FROM products WHERE name = 'iPhone 15 Pro Max');

  INSERT INTO products (name, description, price, link, image, category)
  SELECT 'Moletom Essentials', 'Moletom Fear of God Essentials, algodão pesado e corte boxy.', 'R$ 280,00', 'https://example.com', 'https://picsum.photos/seed/essentials/400/400', 'Moda'
  WHERE NOT EXISTS (SELECT 1 FROM products WHERE name = 'Moletom Essentials');

  INSERT INTO products (name, description, price, link, image, category)
  SELECT 'Fone Sony WH-1000XM5', 'Cancelamento de ruído líder da indústria e som impecável.', 'R$ 2.100,00', 'https://example.com', 'https://picsum.photos/seed/sony/400/400', 'Eletrônicos'
  WHERE NOT EXISTS (SELECT 1 FROM products WHERE name = 'Fone Sony WH-1000XM5');

  INSERT INTO stores (name, description, link, image)
  SELECT 'Loja Oficial China', 'Produtos direto da fábrica com garantia.', 'https://example.com', 'https://picsum.photos/seed/store1/200/200'
  WHERE NOT EXISTS (SELECT 1 FROM stores);

  INSERT INTO stores (name, description, link, image)
  SELECT 'Sneaker King', 'Especialista em calçados de alta qualidade.', 'https://example.com', 'https://picsum.photos/seed/store2/200/200'
  WHERE NOT EXISTS (SELECT 1 FROM stores WHERE name = 'Sneaker King');

  INSERT INTO guides (title, description, link, type)
  SELECT 'Como importar da China em 2024', 'Um guia completo passo a passo para iniciantes.', 'https://youtube.com', 'video'
  WHERE NOT EXISTS (SELECT 1 FROM guides);

  INSERT INTO guides (title, description, link, type)
  SELECT 'Taxação e Alfândega', 'Tudo o que você precisa saber sobre o Remessa Conforme.', 'https://example.com', 'article'
  WHERE NOT EXISTS (SELECT 1 FROM guides WHERE title = 'Taxação e Alfândega');

  INSERT INTO social_links (platform, url)
  SELECT 'Instagram', 'https://instagram.com'
  WHERE NOT EXISTS (SELECT 1 FROM social_links);

  INSERT INTO social_links (platform, url)
  SELECT 'Twitter', 'https://twitter.com'
  WHERE NOT EXISTS (SELECT 1 FROM social_links WHERE platform = 'Twitter');
`);

const app = express();
app.use(express.json());

// API Routes
app.get("/api/products", (req, res) => {
  const products = db.prepare("SELECT * FROM products").all();
  res.json(products);
});

app.post("/api/products", (req, res) => {
  const { name, description, price, link, image, category } = req.body;
  const info = db.prepare("INSERT INTO products (name, description, price, link, image, category) VALUES (?, ?, ?, ?, ?, ?)").run(name, description, price, link, image, category);
  res.json({ id: info.lastInsertRowid });
});

app.delete("/api/products/:id", (req, res) => {
  db.prepare("DELETE FROM products WHERE id = ?").run(req.params.id);
  res.json({ success: true });
});

app.get("/api/stores", (req, res) => {
  const stores = db.prepare("SELECT * FROM stores").all();
  res.json(stores);
});

app.post("/api/stores", (req, res) => {
  const { name, description, link, image } = req.body;
  const info = db.prepare("INSERT INTO stores (name, description, link, image) VALUES (?, ?, ?, ?)").run(name, description, link, image);
  res.json({ id: info.lastInsertRowid });
});

app.delete("/api/stores/:id", (req, res) => {
  db.prepare("DELETE FROM stores WHERE id = ?").run(req.params.id);
  res.json({ success: true });
});

app.get("/api/guides", (req, res) => {
  const guides = db.prepare("SELECT * FROM guides").all();
  res.json(guides);
});

app.post("/api/guides", (req, res) => {
  const { title, description, link, type } = req.body;
  const info = db.prepare("INSERT INTO guides (title, description, link, type) VALUES (?, ?, ?, ?)").run(title, description, link, type);
  res.json({ id: info.lastInsertRowid });
});

app.delete("/api/guides/:id", (req, res) => {
  db.prepare("DELETE FROM guides WHERE id = ?").run(req.params.id);
  res.json({ success: true });
});

app.get("/api/socials", (req, res) => {
  const socials = db.prepare("SELECT * FROM social_links").all();
  res.json(socials);
});

app.post("/api/socials", (req, res) => {
  const { platform, url } = req.body;
  const info = db.prepare("INSERT INTO social_links (platform, url) VALUES (?, ?)").run(platform, url);
  res.json({ id: info.lastInsertRowid });
});

app.delete("/api/socials/:id", (req, res) => {
  db.prepare("DELETE FROM social_links WHERE id = ?").run(req.params.id);
  res.json({ success: true });
});

// Vite middleware for development
if (process.env.NODE_ENV !== "production") {
  const vite = await createViteServer({
    server: { middlewareMode: true },
    appType: "spa",
  });
  app.use(vite.middlewares);
} else {
  app.use(express.static(path.join(__dirname, "dist")));
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "dist", "index.html"));
  });
}

export default app;

if (process.env.NODE_ENV !== "production") {
  const PORT = 3000;
  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}
