// components/Footer.tsx
import { Instagram, MessageCircle, Phone, Mail, MapPin, Send } from 'lucide-react';
import Link from 'next/link';

const Footer = () => {
  const socialLinks = [
    { icon: <Instagram size={22} />, href: 'https://instagram.com', label: 'Instagram', color: 'hover:border-pink-500 hover:text-pink-500' },
    { icon: <MessageCircle size={22} />, href: 'https://wa.me/79292271322', label: 'WhatsApp', color: 'hover:border-green-500 hover:text-green-500' },
    { icon: <Send size={22} />, href: 'https://t.me/+79292271322', label: 'Telegram', color: 'hover:border-blue-400 hover:text-blue-400' },
    { icon: <Phone size={22} />, href: 'tel:+79292271322', label: 'Позвонить', color: 'hover:border-blue-500 hover:text-blue-500' },
    { icon: <Mail size={22} />, href: 'mailto:xac0550@gmail.com', label: 'Email', color: 'hover:border-red-500 hover:text-red-500' },
  ];

  return (
    <footer className="bg-black/80 backdrop-blur-sm border-t border-gold/10 mt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Бренд */}
          <div className="md:col-span-2">
            <div className="flex items-center space-x-4 mb-6">
              <div className="w-16 h-16 rounded-full border-2 border-gold flex items-center justify-center bg-black/50">
                <span className="text-3xl font-bold text-gold rotate-180 font-elegant">Ǝ</span>
              </div>
              <div>
                <span className="text-3xl font-bold font-elegant">
                  EL<span className="text-gold">'RUH</span>
                </span>
                <p className="text-gray-400 italic text-sm mt-1">Шепот Востока, воплощенный в масле</p>
              </div>
            </div>
            <p className="text-gray-400 max-w-md">
              Элитные масляные духи и аксессуары ручной работы. Минимализм форм, роскошь содержания, 
              многовековые традиции восточной парфюмерной алхимии.
            </p>
          </div>

          {/* Навигация */}
          <div>
  <h3 className="text-white font-semibold mb-6 font-elegant">Навигация</h3>
  <ul className="space-y-3">
    {[
      { name: 'Главная', href: '/' },
      { name: 'Каталог', href: '/catalog' },
      { name: 'О нас', href: '/about' },
      { name: 'Контакты', href: '/contacts' },
    ].map((item) => (
      <li key={item.name}>
        <Link
          href={item.href}
          className="text-gray-400 hover:text-gold transition-colors text-sm"
        >
          {item.name}
        </Link>
      </li>
    ))}
  </ul>
</div>
          {/* Контакты */}
          <div>
            <h3 className="text-white font-semibold mb-6 font-elegant">Контакты</h3>
            <div className="space-y-4">
              <a href="tel:+79292271322" className="flex items-center space-x-3 text-gray-400 hover:text-gold transition-colors">
                <Phone size={18} />
                <span>+7 (929) 227-13-22</span>
              </a>
              <a href="mailto:xac0550@gmail.com" className="flex items-center space-x-3 text-gray-400 hover:text-gold transition-colors">
                <Mail size={18} />
                <span>xac0550@gmail.com</span>
              </a>
              <div className="flex items-start space-x-3 text-gray-400">
                <MapPin size={18} className="mt-1" />
                <span>г. Москва, Проспект Мира, 122</span>
              </div>
            </div>

            {/* Соцсети */}
            <div className="mt-8">
              <h4 className="text-white font-semibold mb-4 font-elegant">Мы в соцсетях</h4>
              <div className="flex flex-wrap gap-3">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex items-center justify-center w-12 h-12 border border-gray-800 text-gray-400 ${social.color} transition-all duration-300 rounded-lg`}
                    aria-label={social.label}
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-900 mt-10 pt-8 text-center">
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} EL'RUH. Авторские масляные духи и аксессуары. Все права защищены.
          </p>
          <p className="text-gray-600 text-xs mt-2">
            ИП Рамазанов Эльвин Алдерович | ОГРНИП 123456789012345
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;