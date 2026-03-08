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

  CREATE TABLE IF NOT EXISTS categories (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    type TEXT NOT NULL -- 'product', 'store', or 'guide'
  );

  CREATE TABLE IF NOT EXISTS social_links (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    platform TEXT NOT NULL,
    url TEXT NOT NULL
  );

  -- Seed data if empty
  INSERT INTO categories (name, type)
  SELECT 'Eletrônicos', 'product' WHERE NOT EXISTS (SELECT 1 FROM categories WHERE name = 'Eletrônicos');
  INSERT INTO categories (name, type)
  SELECT 'Moda', 'product' WHERE NOT EXISTS (SELECT 1 FROM categories WHERE name = 'Moda');
  INSERT INTO categories (name, type)
  SELECT 'Acessórios', 'product' WHERE NOT EXISTS (SELECT 1 FROM categories WHERE name = 'Acessórios');

  INSERT INTO products (name, description, price, link, image, category)
  SELECT 'Tênis Jordan 4 Retro', 'O clássico Jordan 4 em diversas cores. Qualidade premium G5.', '¥ 450', 'https://example.com', 'https://picsum.photos/seed/jordan4/400/400', 'Moda'
  WHERE NOT EXISTS (SELECT 1 FROM products);

  INSERT INTO products (name, description, price, link, image, category)
  SELECT 'iPhone 15 Pro Max', 'O melhor smartphone da Apple com acabamento em titânio.', '¥ 8.999', 'https://example.com', 'https://picsum.photos/seed/iphone/400/400', 'Eletrônicos'
  WHERE NOT EXISTS (SELECT 1 FROM products WHERE name = 'iPhone 15 Pro Max');

  INSERT INTO products (name, description, price, link, image, category)
  SELECT 'Moletom Essentials', 'Moletom Fear of God Essentials, algodão pesado e corte boxy.', '¥ 280', 'https://example.com', 'https://picsum.photos/seed/essentials/400/400', 'Moda'
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
  SELECT 'Youtube', 'https://youtube.com'
  WHERE NOT EXISTS (SELECT 1 FROM social_links WHERE platform = 'Youtube');

  INSERT INTO social_links (platform, url)
  SELECT 'Discord', 'https://discord.gg'
  WHERE NOT EXISTS (SELECT 1 FROM social_links WHERE platform = 'Discord');
`);

// --- Dados Iniciais (Sempre aparecerão na Vercel) ---
const INITIAL_PRODUCTS = [
  { id: 101, name: 'Tênis Jordan 4 Retro', description: 'O clássico Jordan 4 em diversas cores. Qualidade premium G5.', price: '¥ 450', link: 'https://example.com', image: 'https://picsum.photos/seed/jordan4/400/400', category: 'Moda' },
  { id: 102, name: 'iPhone 15 Pro Max', description: 'O melhor smartphone da Apple com acabamento em titânio.', price: '¥ 8.999', link: 'https://example.com', image: 'https://picsum.photos/seed/iphone/400/400', category: 'Eletrônicos' },
  { id: 103, name: 'Moletom Essentials', description: 'Moletom Fear of God Essentials, algodão pesado e corte boxy.', price: '¥ 280', link: 'https://example.com', image: 'https://picsum.photos/seed/essentials/400/400', category: 'Moda' },
  { id: 104, name: 'Fone Sony WH-1000XM5', description: 'Cancelamento de ruído líder da indústria e som impecável.', price: '¥ 2.100', link: 'https://example.com', image: 'https://picsum.photos/seed/sony/400/400', category: 'Eletrônicos' },
  { id: 105, name: 'Relógio Apple Watch S9', description: 'O relógio inteligente mais avançado da Apple.', price: '¥ 3.500', link: 'https://example.com', image: 'https://picsum.photos/seed/watch/400/400', category: 'Acessórios' }
];

const INITIAL_STORES = [
  { id: 201, name: 'Loja Oficial China', description: 'Produtos direto da fábrica com garantia.', link: 'https://example.com', image: 'https://picsum.photos/seed/store1/200/200' },
  { id: 202, name: 'Sneaker King', description: 'Especialista em calçados de alta qualidade.', link: 'https://example.com', image: 'https://picsum.photos/seed/store2/200/200' }
];

const INITIAL_GUIDES = [
  { id: 301, title: 'Como importar da China em 2024', description: 'Um guia completo passo a passo para iniciantes.', link: 'https://youtube.com', type: 'video' },
  { id: 302, title: 'Taxação e Alfândega', description: 'Tudo o que você precisa saber sobre o Remessa Conforme.', link: 'https://example.com', type: 'article' }
];

const INITIAL_SOCIALS = [
  { id: 401, platform: 'Instagram', url: 'https://instagram.com' },
  { id: 402, platform: 'Youtube', url: 'https://youtube.com' },
  { id: 403, platform: 'Discord', url: 'https://discord.gg' }
];

const INITIAL_CATEGORIES = [
  { id: 501, name: 'Eletrônicos', type: 'product' },
  { id: 502, name: 'Moda', type: 'product' },
  { id: 503, name: 'Acessórios', type: 'product' }
];

const app = express();
app.use(express.json());

// Helper para tentar usar o DB ou retornar os dados iniciais
const getItems = (table: string, initialData: any[]) => {
  try {
    const items = db.prepare(`SELECT * FROM ${table}`).all();
    // Se o DB estiver vazio (comum na Vercel), retorna os dados iniciais + o que tiver no DB
    return [...initialData, ...items.filter(item => !initialData.find(init => init.id === item.id))];
  } catch (e) {
    // Se o DB falhar (Vercel), retorna apenas os dados iniciais
    return initialData;
  }
};

// API Routes
app.get("/api/products", (req, res) => {
  res.json(getItems('products', INITIAL_PRODUCTS));
});

app.post("/api/products", (req, res) => {
  try {
    const { name, description, price, link, image, category } = req.body;
    const info = db.prepare("INSERT INTO products (name, description, price, link, image, category) VALUES (?, ?, ?, ?, ?, ?)").run(name, description, price, link, image, category);
    res.json({ id: info.lastInsertRowid });
  } catch (e) {
    res.status(500).json({ error: "Database write failed. This is expected on Vercel free tier without an external DB." });
  }
});

app.delete("/api/products/:id", (req, res) => {
  try {
    db.prepare("DELETE FROM products WHERE id = ?").run(req.params.id);
    res.json({ success: true });
  } catch (e) {
    res.status(500).json({ error: "Delete failed" });
  }
});

app.get("/api/stores", (req, res) => {
  res.json(getItems('stores', INITIAL_STORES));
});

app.post("/api/stores", (req, res) => {
  try {
    const { name, description, link, image } = req.body;
    const info = db.prepare("INSERT INTO stores (name, description, link, image) VALUES (?, ?, ?, ?)").run(name, description, link, image);
    res.json({ id: info.lastInsertRowid });
  } catch (e) {
    res.status(500).json({ error: "Write failed" });
  }
});

app.get("/api/guides", (req, res) => {
  res.json(getItems('guides', INITIAL_GUIDES));
});

app.post("/api/guides", (req, res) => {
  try {
    const { title, description, link, type } = req.body;
    const info = db.prepare("INSERT INTO guides (title, description, link, type) VALUES (?, ?, ?, ?)").run(title, description, link, type);
    res.json({ id: info.lastInsertRowid });
  } catch (e) {
    res.status(500).json({ error: "Write failed" });
  }
});

app.get("/api/socials", (req, res) => {
  res.json(getItems('social_links', INITIAL_SOCIALS));
});

app.post("/api/socials", (req, res) => {
  try {
    const { platform, url } = req.body;
    const info = db.prepare("INSERT INTO social_links (platform, url) VALUES (?, ?)").run(platform, url);
    res.json({ id: info.lastInsertRowid });
  } catch (e) {
    res.status(500).json({ error: "Write failed" });
  }
});

app.delete("/api/socials/:id", (req, res) => {
  try {
    db.prepare("DELETE FROM social_links WHERE id = ?").run(req.params.id);
    res.json({ success: true });
  } catch (e) {
    res.status(500).json({ error: "Delete failed" });
  }
});

app.get("/api/categories", (req, res) => {
  res.json(getItems('categories', INITIAL_CATEGORIES));
});

app.post("/api/categories", (req, res) => {
  try {
    const { name, type } = req.body;
    const info = db.prepare("INSERT INTO categories (name, type) VALUES (?, ?)").run(name, type);
    res.json({ id: info.lastInsertRowid });
  } catch (e) {
    res.status(500).json({ error: "Write failed" });
  }
});

app.delete("/api/categories/:id", (req, res) => {
  try {
    db.prepare("DELETE FROM categories WHERE id = ?").run(req.params.id);
    res.json({ success: true });
  } catch (e) {
    res.status(500).json({ error: "Delete failed" });
  }
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
