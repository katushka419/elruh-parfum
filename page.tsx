// app/page.tsx
'use client';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { ChevronRight, Star, Award, Globe, Users, Shield } from 'lucide-react';
import Link from 'next/link';

export default function Home() {
  const categories = [
    {
      title: "Масляные духи",
      description: "Концентрированные аттары ручной работы",
      count: "12 ароматов",
      image: "https://i.pinimg.com/736x/e9/e7/39/e9e7397646685c10d37a66e51596c963.jpg",
      link: "/catalog#perfumes"
    },
    {
      title: "Автоароматы",
      description: "Пахучки для машины с клипсой",
      count: "8 вариантов",
      image: "https://i.pinimg.com/736x/34/3a/36/343a363b4d4f0b50ef84e8a191263804.jpg",
      link: "/catalog#car"
    },
    {
      title: "Диффузоры",
      description: "Ароматы для дома и офиса",
      count: "6 композиций",
      image: "https://i.pinimg.com/736x/77/01/78/770178dc21ab70e511229f88792a8e62.jpg",
      link: "/catalog#diffusers"
    }
  ];

  const features = [
    { icon: <Award className="w-8 h-8" />, title: "Премиум качество", desc: "Натуральные масла высшей категории" },
    { icon: <Globe className="w-8 h-8" />, title: "Доставка по РФ", desc: "Быстрая отправка в любой город" },
    { icon: <Users className="w-8 h-8" />, title: "10 000+ клиентов", desc: "Довольные покупатели по всей стране" },
    { icon: <Shield className="w-8 h-8" />, title: "Гарантия 30 дней", desc: "Возврат и обмен без вопросов" },
  ];

  return (
    <>
      <Navbar />
      
      {/* Герой-секция */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
        <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black opacity-90"></div>
        <div className="absolute inset-0 bg-[url('https://i.pinimg.com/1200x/bc/c2/31/bcc2314a6a1ea00b53403cd948a04b6e.jpg')] opacity-20 bg-cover bg-center"></div>
        
        <div className="container relative z-20 mx-auto px-4 py-24 text-center">
          <div className="mb-12">
            <div className="w-40 h-40 mx-auto rounded-full border-4 border-gold/30 flex items-center justify-center p-2 animate-pulse">
              <div className="w-full h-full rounded-full border-2 border-gold/20 flex items-center justify-center">
                <span className="text-8xl font-bold text-gold rotate-180 font-elegant">Ǝ</span>
              </div>
            </div>
          </div>
          
          <h1 className="text-6xl md:text-8xl font-bold mb-8 font-elegant">
            EL<span className="text-gold">'RUH</span>
          </h1>
          
          <p className="text-2xl md:text-3xl text-gray-300 italic mb-12 max-w-3xl mx-auto font-elegant">
            Шепот Востока, воплощенный в масле
          </p>
          
          <p className="text-gray-400 mb-16 max-w-2xl mx-auto leading-relaxed text-lg">
            Создаем элитные масляные духи, автоароматы и диффузоры ручной работы. 
            Каждый продукт — это синтез древних традиций восточной парфюмерии и современного дизайна.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-20">
            <Link
              href="/catalog"
              className="group px-12 py-5 bg-gold text-black font-semibold rounded-lg hover:bg-yellow-600 transition-all duration-300 flex items-center justify-center space-x-3 shadow-2xl hover:shadow-gold/30"
            >
              <span className="text-lg">Исследовать коллекцию</span>
              <ChevronRight className="group-hover:translate-x-2 transition-transform" />
            </Link>
            
            <Link
              href="/about"
              className="px-12 py-5 border-2 border-gray-700 text-gray-300 font-semibold rounded-lg hover:border-gold hover:text-gold transition-colors"
            >
              Узнать нашу историю
            </Link>
          </div>

          {/* Преимущества */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {features.map((feature, index) => (
              <div key={index} className="bg-black/50 backdrop-blur-sm border border-gray-800 rounded-xl p-6 hover:border-gold/50 transition-colors">
                <div className="text-gold mb-4 flex justify-center">{feature.icon}</div>
                <h3 className="text-white font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-400 text-sm">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Категории */}
      <section className="py-24 bg-black/60">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4 font-elegant">Коллекции EL'RUH</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">Выберите категорию, которая вас интересует</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {categories.map((category, index) => (
              <Link
                key={index}
                href={category.link}
                className="group relative overflow-hidden rounded-2xl border border-gray-800 hover:border-gold transition-all duration-500"
              >
                <div className="h-64 overflow-hidden">
                  <div 
                    className="w-full h-full bg-cover bg-center group-hover:scale-110 transition-transform duration-700"
                    style={{ backgroundImage: `url(${category.image})` }}
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="text-2xl font-bold text-white mb-2 font-elegant">{category.title}</h3>
                  <p className="text-gray-300 mb-3">{category.description}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-gold text-sm font-semibold">{category.count}</span>
                    <span className="text-white group-hover:text-gold transition-colors">Подробнее →</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Отзывы */}
      <section className="py-24 bg-black/40">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-white mb-16 text-center font-elegant">Отзывы клиентов</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { name: "Анна, Москва", text: "OUD ROYAL — это любовь с первого вздоха! Стойкость невероятная, аромат меняется в течение дня. Заказала уже второй флакон.", rating: 5 },
              { name: "Михаил, Санкт-Петербург", text: "Пахучка для машины просто бомба! Держится месяц, машина пахнет как дорогой бутик. Беру третий раз уже.", rating: 5 },
              { name: "Елена, Казань", text: "Диффузор для спальни создал идеальную атмосферу. Аромат Sandalwood успокаивает и помогает засыпать. Супер качество!", rating: 5 },
            ].map((review, index) => (
              <div key={index} className="bg-black/50 border border-gray-800 rounded-xl p-6">
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={16} className="text-gold fill-gold" />
                  ))}
                </div>
                <p className="text-gray-300 mb-6 italic">"{review.text}"</p>
                <p className="text-white font-semibold">{review.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-r from-black via-gray-900 to-black border-y border-gold/10">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-white mb-8 font-elegant">Готовы найти свой аромат?</h2>
          <p className="text-gray-300 mb-12 max-w-2xl mx-auto text-lg">
            Оформите заказ прямо сейчас с бесплатной доставкой по Москве при заказе от 5000₽
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link
              href="/catalog"
              className="px-10 py-4 bg-gold text-black font-semibold rounded-lg hover:bg-yellow-600 transition-colors text-lg"
            >
              Выбрать аромат
            </Link>
            <a
              href="https://wa.me/79292271322"
              target="_blank"
              rel="noopener noreferrer"
              className="px-10 py-4 border-2 border-gold text-gold font-semibold rounded-lg hover:bg-gold/10 transition-colors text-lg"
            >
              Консультация в WhatsApp
            </a>
          </div>
        </div>
      </section>
      
      <Footer />
    </>
  );
}
