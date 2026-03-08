import React, { useState, useEffect } from 'react';
import { 
  ShoppingBag, 
  Store as StoreIcon, 
  BookOpen, 
  ChevronRight, 
  Instagram, 
  Twitter, 
  Youtube, 
  Github,
  Plus,
  Trash2,
  ExternalLink,
  Settings,
  Home as HomeIcon
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from './lib/utils';
import type { Product, Store, Guide, SocialLink } from './types';

// --- Components ---

const Navbar = ({ activeTab, setActiveTab }: { activeTab: string, setActiveTab: (tab: string) => void }) => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-b border-white/5">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => setActiveTab('home')}>
          <span className="text-2xl font-black tracking-tighter text-white">COMMUNITY<span className="text-orange-600">REP</span></span>
        </div>
        
        <div className="hidden md:flex items-center gap-8">
          {[
            { id: 'home', label: 'Início' },
            { id: 'products', label: 'Produtos' },
            { id: 'stores', label: 'Lojas' },
            { id: 'guides', label: 'Guias' },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={cn(
                "text-sm font-medium transition-colors hover:text-orange-500",
                activeTab === item.id ? "text-orange-500" : "text-zinc-400"
              )}
            >
              {item.label}
              {activeTab === item.id && (
                <motion.div layoutId="nav-underline" className="h-0.5 bg-orange-500 mt-1" />
              )}
            </button>
          ))}
        </div>

        <button 
          onClick={() => setActiveTab('admin')}
          className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-2.5 rounded-full text-sm font-bold flex items-center gap-2 transition-all active:scale-95"
        >
          <Settings size={18} />
          Admin
        </button>
      </div>
    </nav>
  );
};

const Hero = ({ onExplore }: { onExplore: () => void }) => {
  return (
    <section className="pt-32 pb-20 px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <span className="text-orange-500 font-bold text-xs uppercase tracking-widest mb-4 block">Planilha de Produtos</span>
          <h1 className="text-7xl md:text-8xl font-black text-white leading-[0.9] mb-8">
            COMMUNITY<br />
            <span className="text-orange-600">REP</span>
          </h1>
          <p className="text-zinc-400 text-lg max-w-md mb-10 leading-relaxed">
            Sua planilha completa de produtos importados. Links diretos para as melhores lojas da China.
          </p>
          <button 
            onClick={onExplore}
            className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-4 rounded-xl font-bold flex items-center gap-3 transition-all group"
          >
            <ShoppingBag size={20} />
            Explorar Produtos
            <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </motion.div>

        <div className="relative grid grid-cols-2 gap-4">
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-4"
          >
            <img src="https://picsum.photos/seed/tech1/400/600" className="rounded-3xl w-full h-[300px] object-cover border border-white/10" referrerPolicy="no-referrer" />
            <img src="https://picsum.photos/seed/tech2/400/600" className="rounded-3xl w-full h-[400px] object-cover border border-white/10" referrerPolicy="no-referrer" />
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="space-y-4 pt-12"
          >
            <img src="https://picsum.photos/seed/tech3/400/600" className="rounded-3xl w-full h-[400px] object-cover border border-white/10" referrerPolicy="no-referrer" />
            <img src="https://picsum.photos/seed/tech4/400/600" className="rounded-3xl w-full h-[300px] object-cover border border-white/10" referrerPolicy="no-referrer" />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const Features = ({ setActiveTab }: { setActiveTab: (tab: string) => void }) => {
  const features = [
    { id: 'products', title: 'Produtos Selecionados', desc: 'Os melhores itens disponíveis no mercado Chinês, priorizando qualidade e preço.', icon: ShoppingBag },
    { id: 'guides', title: 'Guias Completos', desc: 'Tutoriais em vídeo para ajudar você que é iniciante, além de dicas extras.', icon: BookOpen },
    { id: 'stores', title: 'Lojas Verificadas', desc: 'As melhores lojas disponíveis, com uma enorme variedade de produtos.', icon: StoreIcon },
    { id: 'agent', title: 'Agente de Compras', desc: 'Importe direto da China com nosso agente parceiro e ganhe cupons.', icon: ShoppingBag },
  ];

  return (
    <section className="py-24 px-6 bg-zinc-950/50">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-black text-white text-center mb-16">Só aqui você encontra</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className="bg-zinc-900/50 border border-white/5 p-8 rounded-[2rem] hover:border-orange-500/30 transition-all group"
            >
              <div className="w-14 h-14 bg-orange-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <f.icon className="text-white" size={28} />
              </div>
              <h3 className="text-xl font-bold text-white mb-4">{f.title}</h3>
              <p className="text-zinc-500 text-sm leading-relaxed mb-8">{f.desc}</p>
              <button 
                onClick={() => setActiveTab(f.id)}
                className="text-orange-500 font-bold text-sm flex items-center gap-2 hover:gap-3 transition-all"
              >
                Explorar <ChevronRight size={16} />
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const OwlSection = () => {
  return (
    <section className="py-24 px-6">
      <div className="max-w-4xl mx-auto bg-zinc-900/80 border border-white/5 rounded-[3rem] p-12 text-center relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-1 bg-gradient-to-r from-transparent via-orange-500 to-transparent opacity-50" />
        
        <motion.div
          animate={{ 
            y: [0, -10, 0],
            rotate: [0, 2, -2, 0]
          }}
          transition={{ 
            duration: 4, 
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="inline-block mb-8"
        >
          <div className="text-6xl">🦉</div>
        </motion.div>

        <h2 className="text-4xl md:text-5xl font-black text-white mb-4">Registre-se na HooBuy aqui</h2>
        <p className="text-zinc-400 mb-10">Registre-se aqui e ganhe <span className="text-orange-500 font-bold">140$ em CUPONS</span></p>
        
        <button className="bg-orange-600 hover:bg-orange-700 text-white px-10 py-4 rounded-2xl font-bold flex items-center gap-3 mx-auto transition-all active:scale-95 shadow-lg shadow-orange-600/20">
          Registrar Agora
          <ShoppingBag size={20} />
        </button>
      </div>
    </section>
  );
};

const Footer = ({ setActiveTab, socials }: { setActiveTab: (tab: string) => void, socials: SocialLink[] }) => {
  const getIcon = (platform: string) => {
    switch (platform.toLowerCase()) {
      case 'instagram': return <Instagram size={20} />;
      case 'twitter': return <Twitter size={20} />;
      case 'youtube': return <Youtube size={20} />;
      case 'github': return <Github size={20} />;
      default: return <ExternalLink size={20} />;
    }
  };

  return (
    <footer className="bg-black border-t border-white/5 pt-20 pb-10 px-6">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
        <div className="lg:col-span-2">
          <span className="text-2xl font-black tracking-tighter text-white mb-6 block">COMMUNITY<span className="text-orange-600">REP</span></span>
          <p className="text-zinc-500 max-w-sm leading-relaxed">
            Planilha completa de produtos importados. Encontre as melhores peças com os melhores preços direto da China.
          </p>
        </div>
        
        <div>
          <h4 className="text-white font-bold mb-6">Categorias</h4>
          <ul className="space-y-4">
            {['Produtos', 'Lojas', 'Guias'].map(item => (
              <li key={item}>
                <button 
                  onClick={() => setActiveTab(item.toLowerCase())}
                  className="text-zinc-500 hover:text-orange-500 transition-colors text-sm"
                >
                  {item}
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-white font-bold mb-6">Redes Sociais</h4>
          <div className="flex gap-4">
            {socials.map(s => (
              <a 
                key={s.id} 
                href={s.url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 bg-zinc-900 rounded-xl flex items-center justify-center text-zinc-400 hover:text-orange-500 hover:bg-zinc-800 transition-all"
              >
                {getIcon(s.platform)}
              </a>
            ))}
          </div>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto pt-10 border-t border-white/5 text-center text-zinc-600 text-xs">
        © {new Date().getFullYear()} Community Rep. Todos os direitos reservados.
      </div>
    </footer>
  );
};

// --- Main App ---

export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [products, setProducts] = useState<Product[]>([]);
  const [stores, setStores] = useState<Store[]>([]);
  const [guides, setGuides] = useState<Guide[]>([]);
  const [socials, setSocials] = useState<SocialLink[]>([]);
  const [loading, setLoading] = useState(true);

  // Admin Form States
  const [newProduct, setNewProduct] = useState({ name: '', description: '', price: '', link: '', image: '', category: 'Eletrônicos' });
  const [newStore, setNewStore] = useState({ name: '', description: '', link: '', image: '' });
  const [newGuide, setNewGuide] = useState({ title: '', description: '', link: '', type: 'video' as const });
  const [newSocial, setNewSocial] = useState({ platform: '', url: '' });

  const fetchData = async () => {
    try {
      const [pRes, sRes, gRes, socRes] = await Promise.all([
        fetch('/api/products'),
        fetch('/api/stores'),
        fetch('/api/guides'),
        fetch('/api/socials')
      ]);
      setProducts(await pRes.json());
      setStores(await sRes.json());
      setGuides(await gRes.json());
      setSocials(await socRes.json());
    } catch (err) {
      console.error("Error fetching data:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleAddProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetch('/api/products', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newProduct)
    });
    setNewProduct({ name: '', description: '', price: '', link: '', image: '', category: 'Eletrônicos' });
    fetchData();
  };

  const handleAddStore = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetch('/api/stores', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newStore)
    });
    setNewStore({ name: '', description: '', link: '', image: '' });
    fetchData();
  };

  const handleAddGuide = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetch('/api/guides', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newGuide)
    });
    setNewGuide({ title: '', description: '', link: '', type: 'video' });
    fetchData();
  };

  const handleAddSocial = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetch('/api/socials', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newSocial)
    });
    setNewSocial({ platform: '', url: '' });
    fetchData();
  };

  const handleDelete = async (type: string, id: number) => {
    await fetch(`/api/${type}/${id}`, { method: 'DELETE' });
    fetchData();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-12 h-12 border-4 border-orange-600 border-t-transparent rounded-full"
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white font-sans selection:bg-orange-500/30">
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />

      <main className="min-h-screen">
        <AnimatePresence mode="wait">
          {activeTab === 'home' && (
            <motion.div
              key="home"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <Hero onExplore={() => setActiveTab('products')} />
              <Features setActiveTab={setActiveTab} />
              <OwlSection />
            </motion.div>
          )}

          {activeTab === 'products' && (
            <motion.div
              key="products"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="pt-32 pb-20 px-6 max-w-7xl mx-auto"
            >
              <h2 className="text-5xl font-black mb-12">Produtos <span className="text-orange-600">Importados</span></h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {products.map(p => (
                  <div key={p.id} className="bg-zinc-900 border border-white/5 rounded-3xl overflow-hidden group">
                    <div className="aspect-square overflow-hidden">
                      <img src={p.image || "https://picsum.photos/seed/prod/400/400"} alt={p.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" referrerPolicy="no-referrer" />
                    </div>
                    <div className="p-6">
                      <span className="text-[10px] uppercase tracking-widest text-orange-500 font-bold mb-2 block">{p.category}</span>
                      <h3 className="text-lg font-bold mb-2 line-clamp-1">{p.name}</h3>
                      <p className="text-zinc-500 text-sm mb-4 line-clamp-2">{p.description}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-xl font-black text-white">{p.price}</span>
                        <a 
                          href={p.link} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="bg-zinc-800 hover:bg-orange-600 p-3 rounded-xl transition-colors"
                        >
                          <ExternalLink size={18} />
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {activeTab === 'stores' && (
            <motion.div
              key="stores"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="pt-32 pb-20 px-6 max-w-7xl mx-auto"
            >
              <h2 className="text-5xl font-black mb-12">Lojas <span className="text-orange-600">Verificadas</span></h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {stores.map(s => (
                  <div key={s.id} className="bg-zinc-900 border border-white/5 rounded-3xl p-8 flex items-center gap-6 group hover:border-orange-500/30 transition-all">
                    <img src={s.image || "https://picsum.photos/seed/store/200/200"} className="w-24 h-24 rounded-2xl object-cover" referrerPolicy="no-referrer" />
                    <div className="flex-1">
                      <h3 className="text-xl font-bold mb-2">{s.name}</h3>
                      <p className="text-zinc-500 text-sm mb-4">{s.description}</p>
                      <a href={s.link} target="_blank" rel="noopener noreferrer" className="text-orange-500 font-bold text-sm flex items-center gap-2">
                        Visitar Loja <ExternalLink size={14} />
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {activeTab === 'guides' && (
            <motion.div
              key="guides"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="pt-32 pb-20 px-6 max-w-7xl mx-auto"
            >
              <h2 className="text-5xl font-black mb-12">Guias & <span className="text-orange-600">Tutoriais</span></h2>
              <div className="grid md:grid-cols-2 gap-6">
                {guides.map(g => (
                  <div key={g.id} className="bg-zinc-900 border border-white/5 rounded-3xl p-8 flex gap-6">
                    <div className="w-16 h-16 bg-orange-600/10 rounded-2xl flex items-center justify-center text-orange-500 shrink-0">
                      {g.type === 'video' ? <Youtube size={32} /> : <BookOpen size={32} />}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-2">{g.title}</h3>
                      <p className="text-zinc-500 text-sm mb-4 leading-relaxed">{g.description}</p>
                      <a href={g.link} target="_blank" rel="noopener noreferrer" className="bg-zinc-800 hover:bg-orange-600 px-6 py-2 rounded-lg text-sm font-bold transition-colors inline-block">
                        Ver Agora
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {activeTab === 'admin' && (
            <motion.div
              key="admin"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="pt-32 pb-20 px-6 max-w-7xl mx-auto"
            >
              <div className="flex items-center justify-between mb-12">
                <h2 className="text-5xl font-black">Painel <span className="text-orange-600">Admin</span></h2>
                <button onClick={() => setActiveTab('home')} className="text-zinc-500 hover:text-white flex items-center gap-2">
                  <HomeIcon size={18} /> Voltar ao Site
                </button>
              </div>

              <div className="grid lg:grid-cols-2 gap-12">
                {/* Products Admin */}
                <div className="bg-zinc-900/50 border border-white/5 p-8 rounded-[2.5rem]">
                  <h3 className="text-2xl font-bold mb-8 flex items-center gap-3">
                    <ShoppingBag className="text-orange-500" /> Adicionar Produto
                  </h3>
                  <form onSubmit={handleAddProduct} className="space-y-4 mb-12">
                    <input 
                      type="text" placeholder="Nome do Produto" required
                      className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 focus:border-orange-500 outline-none transition-all"
                      value={newProduct.name} onChange={e => setNewProduct({...newProduct, name: e.target.value})}
                    />
                    <textarea 
                      placeholder="Descrição" required
                      className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 focus:border-orange-500 outline-none transition-all h-24"
                      value={newProduct.description} onChange={e => setNewProduct({...newProduct, description: e.target.value})}
                    />
                    <div className="grid grid-cols-2 gap-4">
                      <input 
                        type="text" placeholder="Preço (Ex: R$ 199,00)" required
                        className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 focus:border-orange-500 outline-none transition-all"
                        value={newProduct.price} onChange={e => setNewProduct({...newProduct, price: e.target.value})}
                      />
                      <select 
                        className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 focus:border-orange-500 outline-none transition-all"
                        value={newProduct.category} onChange={e => setNewProduct({...newProduct, category: e.target.value})}
                      >
                        <option>Eletrônicos</option>
                        <option>Moda</option>
                        <option>Acessórios</option>
                        <option>Casa</option>
                      </select>
                    </div>
                    <input 
                      type="url" placeholder="Link do Produto" required
                      className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 focus:border-orange-500 outline-none transition-all"
                      value={newProduct.link} onChange={e => setNewProduct({...newProduct, link: e.target.value})}
                    />
                    <input 
                      type="url" placeholder="URL da Imagem" required
                      className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 focus:border-orange-500 outline-none transition-all"
                      value={newProduct.image} onChange={e => setNewProduct({...newProduct, image: e.target.value})}
                    />
                    <button type="submit" className="w-full bg-orange-600 hover:bg-orange-700 py-4 rounded-xl font-bold transition-all flex items-center justify-center gap-2">
                      <Plus size={20} /> Adicionar
                    </button>
                  </form>

                  <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                    {products.map(p => (
                      <div key={p.id} className="flex items-center justify-between bg-black/40 p-4 rounded-xl border border-white/5">
                        <div className="flex items-center gap-4">
                          <img src={p.image} className="w-12 h-12 rounded-lg object-cover" referrerPolicy="no-referrer" />
                          <div>
                            <p className="font-bold text-sm">{p.name}</p>
                            <p className="text-zinc-500 text-xs">{p.price}</p>
                          </div>
                        </div>
                        <button onClick={() => handleDelete('products', p.id)} className="text-zinc-600 hover:text-red-500 transition-colors">
                          <Trash2 size={18} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Stores Admin */}
                <div className="bg-zinc-900/50 border border-white/5 p-8 rounded-[2.5rem]">
                  <h3 className="text-2xl font-bold mb-8 flex items-center gap-3">
                    <StoreIcon className="text-orange-500" /> Adicionar Loja
                  </h3>
                  <form onSubmit={handleAddStore} className="space-y-4 mb-12">
                    <input 
                      type="text" placeholder="Nome da Loja" required
                      className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 focus:border-orange-500 outline-none transition-all"
                      value={newStore.name} onChange={e => setNewStore({...newStore, name: e.target.value})}
                    />
                    <input 
                      type="text" placeholder="Descrição Curta" required
                      className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 focus:border-orange-500 outline-none transition-all"
                      value={newStore.description} onChange={e => setNewStore({...newStore, description: e.target.value})}
                    />
                    <input 
                      type="url" placeholder="Link da Loja" required
                      className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 focus:border-orange-500 outline-none transition-all"
                      value={newStore.link} onChange={e => setNewStore({...newStore, link: e.target.value})}
                    />
                    <input 
                      type="url" placeholder="URL do Logo/Imagem" required
                      className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 focus:border-orange-500 outline-none transition-all"
                      value={newStore.image} onChange={e => setNewStore({...newStore, image: e.target.value})}
                    />
                    <button type="submit" className="w-full bg-orange-600 hover:bg-orange-700 py-4 rounded-xl font-bold transition-all flex items-center justify-center gap-2">
                      <Plus size={20} /> Adicionar
                    </button>
                  </form>

                  <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                    {stores.map(s => (
                      <div key={s.id} className="flex items-center justify-between bg-black/40 p-4 rounded-xl border border-white/5">
                        <div className="flex items-center gap-4">
                          <img src={s.image} className="w-12 h-12 rounded-lg object-cover" referrerPolicy="no-referrer" />
                          <p className="font-bold text-sm">{s.name}</p>
                        </div>
                        <button onClick={() => handleDelete('stores', s.id)} className="text-zinc-600 hover:text-red-500 transition-colors">
                          <Trash2 size={18} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Guides Admin */}
                <div className="bg-zinc-900/50 border border-white/5 p-8 rounded-[2.5rem]">
                  <h3 className="text-2xl font-bold mb-8 flex items-center gap-3">
                    <BookOpen className="text-orange-500" /> Adicionar Guia
                  </h3>
                  <form onSubmit={handleAddGuide} className="space-y-4 mb-12">
                    <input 
                      type="text" placeholder="Título do Guia" required
                      className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 focus:border-orange-500 outline-none transition-all"
                      value={newGuide.title} onChange={e => setNewGuide({...newGuide, title: e.target.value})}
                    />
                    <textarea 
                      placeholder="Descrição" required
                      className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 focus:border-orange-500 outline-none transition-all h-24"
                      value={newGuide.description} onChange={e => setNewGuide({...newGuide, description: e.target.value})}
                    />
                    <div className="grid grid-cols-2 gap-4">
                      <input 
                        type="url" placeholder="Link do Guia" required
                        className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 focus:border-orange-500 outline-none transition-all"
                        value={newGuide.link} onChange={e => setNewGuide({...newGuide, link: e.target.value})}
                      />
                      <select 
                        className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 focus:border-orange-500 outline-none transition-all"
                        value={newGuide.type} onChange={e => setNewGuide({...newGuide, type: e.target.value as any})}
                      >
                        <option value="video">Vídeo</option>
                        <option value="article">Artigo</option>
                      </select>
                    </div>
                    <button type="submit" className="w-full bg-orange-600 hover:bg-orange-700 py-4 rounded-xl font-bold transition-all flex items-center justify-center gap-2">
                      <Plus size={20} /> Adicionar
                    </button>
                  </form>

                  <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                    {guides.map(g => (
                      <div key={g.id} className="flex items-center justify-between bg-black/40 p-4 rounded-xl border border-white/5">
                        <div className="flex items-center gap-4">
                          <div className="text-orange-500">{g.type === 'video' ? <Youtube size={20} /> : <BookOpen size={20} />}</div>
                          <p className="font-bold text-sm">{g.title}</p>
                        </div>
                        <button onClick={() => handleDelete('guides', g.id)} className="text-zinc-600 hover:text-red-500 transition-colors">
                          <Trash2 size={18} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Socials Admin */}
                <div className="bg-zinc-900/50 border border-white/5 p-8 rounded-[2.5rem]">
                  <h3 className="text-2xl font-bold mb-8 flex items-center gap-3">
                    <Instagram className="text-orange-500" /> Redes Sociais
                  </h3>
                  <form onSubmit={handleAddSocial} className="space-y-4 mb-12">
                    <div className="grid grid-cols-2 gap-4">
                      <select 
                        className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 focus:border-orange-500 outline-none transition-all"
                        value={newSocial.platform} onChange={e => setNewSocial({...newSocial, platform: e.target.value})}
                        required
                      >
                        <option value="">Plataforma</option>
                        <option value="Instagram">Instagram</option>
                        <option value="Twitter">Twitter</option>
                        <option value="Youtube">Youtube</option>
                        <option value="Github">Github</option>
                        <option value="Other">Outro</option>
                      </select>
                      <input 
                        type="url" placeholder="URL da Rede" required
                        className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 focus:border-orange-500 outline-none transition-all"
                        value={newSocial.url} onChange={e => setNewSocial({...newSocial, url: e.target.value})}
                      />
                    </div>
                    <button type="submit" className="w-full bg-orange-600 hover:bg-orange-700 py-4 rounded-xl font-bold transition-all flex items-center justify-center gap-2">
                      <Plus size={20} /> Adicionar
                    </button>
                  </form>

                  <div className="space-y-4">
                    {socials.map(s => (
                      <div key={s.id} className="flex items-center justify-between bg-black/40 p-4 rounded-xl border border-white/5">
                        <div className="flex items-center gap-4">
                          <p className="font-bold text-sm">{s.platform}</p>
                          <p className="text-zinc-500 text-xs truncate max-w-[150px]">{s.url}</p>
                        </div>
                        <button onClick={() => handleDelete('socials', s.id)} className="text-zinc-600 hover:text-red-500 transition-colors">
                          <Trash2 size={18} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <Footer setActiveTab={setActiveTab} socials={socials} />
    </div>
  );
}
