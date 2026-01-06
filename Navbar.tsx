// components/Navbar.tsx
'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, ShoppingBag, Search, Phone } from 'lucide-react';
import { cart } from '@/lib/cart';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [itemCount, setItemCount] = useState(0);

  useEffect(() => {
    cart.loadFromStorage();
    const unsubscribe = cart.subscribe(() => {
      setItemCount(cart.getItemCount());
    });
    setItemCount(cart.getItemCount());

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      unsubscribe();
    };
  }, []);

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-black/95 backdrop-blur-lg border-b border-gold/20 py-2' 
        : 'bg-transparent py-4'
    }`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* Логотип */}
          <Link href="/" className="flex items-center space-x-3 group z-10">
            <div className="w-12 h-12 rounded-full border-2 border-gold flex items-center justify-center bg-black/80 backdrop-blur-sm">
              <span className="text-2xl font-bold text-gold rotate-180 font-elegant">Ǝ</span>
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-bold tracking-tight font-elegant">
                EL<span className="text-gold">'RUH</span>
              </span>
              <span className="text-xs text-gray-400 italic -mt-1">Atelier des Parfums</span>
            </div>
          </Link>

          {/* Десктопное меню */}
          <div className="hidden md:flex items-center space-x-10">
            <Link href="/" className="text-gray-300 hover:text-gold text-sm font-medium transition-colors">Главная</Link>
            <Link href="/catalog" className="text-gray-300 hover:text-gold text-sm font-medium transition-colors">Каталог</Link>
            <Link href="/about" className="text-gray-300 hover:text-gold text-sm font-medium transition-colors">О нас</Link>
            <Link href="/contacts" className="text-gray-300 hover:text-gold text-sm font-medium transition-colors">Контакты</Link>
            
            <div className="flex items-center space-x-5">
              <button className="text-gray-400 hover:text-gold transition-colors">
                <Search size={20} />
              </button>
              <Link href="/cart" className="relative text-gray-400 hover:text-gold transition-colors">
                <ShoppingBag size={22} />
                {itemCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-gold text-black text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                    {itemCount}
                  </span>
                )}
              </Link>
              <a href="tel:+79292271322" className="flex items-center space-x-2 bg-gold text-black px-4 py-2 rounded-lg hover:bg-yellow-600 transition-colors">
                <Phone size={16} />
                <span className="font-semibold text-sm">Заказать</span>
              </a>
            </div>
          </div>

          {/* Мобильное меню */}
          <button 
            className="md:hidden p-2 hover:bg-gray-900/50 rounded-lg transition-colors z-10"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={26} className="text-gray-300" /> : <Menu size={26} className="text-gray-300" />}
          </button>
        </div>

        {/* Мобильное меню открытое */}
        <div className={`md:hidden fixed inset-0 bg-black/95 backdrop-blur-lg transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}>
          <div className="flex flex-col h-full pt-20 px-6">
            <div className="space-y-6">
              <Link href="/" className="block py-4 text-2xl text-gray-300 hover:text-gold border-b border-gray-800" onClick={() => setIsOpen(false)}>Главная</Link>
              <Link href="/catalog" className="block py-4 text-2xl text-gray-300 hover:text-gold border-b border-gray-800" onClick={() => setIsOpen(false)}>Каталог</Link>
              <Link href="/about" className="block py-4 text-2xl text-gray-300 hover:text-gold border-b border-gray-800" onClick={() => setIsOpen(false)}>О нас</Link>
              <Link href="/contacts" className="block py-4 text-2xl text-gray-300 hover:text-gold border-b border-gray-800" onClick={() => setIsOpen(false)}>Контакты</Link>
              <Link href="/cart" className="block py-4 text-2xl text-gray-300 hover:text-gold border-b border-gray-800" onClick={() => setIsOpen(false)}>
                Корзина {itemCount > 0 && `(${itemCount})`}
              </Link>
            </div>
            
            <div className="mt-auto pb-10">
              <div className="grid grid-cols-2 gap-4">
                <a href="tel:+79292271322" className="bg-gold text-black py-3 rounded-lg text-center font-semibold">
                  Позвонить
                </a>
                <a href="https://wa.me/79292271322" className="border border-gold text-gold py-3 rounded-lg text-center font-semibold">
                  WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;