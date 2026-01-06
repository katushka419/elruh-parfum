// app/about/page.tsx
'use client';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { ChevronLeft, Users, Award, Clock, Heart } from 'lucide-react';

export default function AboutPage() {
  return (
    <>
      <Navbar />
      
      <div className="min-h-screen bg-black/50 pt-20">
        <div className="container mx-auto px-4 py-8">
          {/* Хлебные крошки */}
          <div className="mb-8">
            <Link href="/" className="text-gray-400 hover:text-gold flex items-center">
              <ChevronLeft size={18} className="mr-2" />
              На главную
            </Link>
          </div>

          <div className="mb-16">
            <h1 className="text-5xl font-bold text-white mb-6">О нас</h1>
            <p className="text-xl text-gray-300 max-w-3xl">
              EL'RUH — это философия, воплощенная в ароматах. 
              Каждая композиция создается с уважением к древним традициям.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
            <div>
              <h2 className="text-3xl font-bold text-white mb-6">Наша история</h2>
              <div className="space-y-4 text-gray-400">
                <p>
                  Все началось с путешествия по Востоку, где я открыл древнее искусство аттаров — 
                  масляных духов, которые веками создавались мастерами арабского мира.
                </p>
                <p>
                  Вернувшись в Москву, я посвятил годы изучению традиционных рецептов, 
                  поиску лучшего сырья и разработке собственных композиций.
                </p>
                <p>
                  Сегодня EL'RUH — это мастерская, где каждый аромат создается вручную, 
                  с вниманием к каждой детали.
                </p>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-gray-900 to-black border border-gray-800 p-8">
              <h3 className="text-2xl font-bold text-white mb-6">Наши принципы</h3>
              <div className="space-y-6">
                {[
                  { icon: <Users className="text-[#FFD700]" />, title: "Индивидуальный подход", text: "Каждый аромат создается с учетом предпочтений" },
                  { icon: <Award className="text-[#FFD700]" />, title: "Качество превыше всего", text: "Только натуральные ингредиенты высшего качества" },
                  { icon: <Clock className="text-[#FFD700]" />, title: "Традиции и время", text: "Соблюдаем старинные технологии созревания" },
                  { icon: <Heart className="text-[#FFD700]" />, title: "Создано с любовью", text: "В каждую каплю вложена энергия мастера" },
                ].map((item, index) => (
                  <div key={index} className="flex items-start space-x-4">
                    <div className="mt-1">{item.icon}</div>
                    <div>
                      <h4 className="text-white font-semibold mb-1">{item.title}</h4>
                      <p className="text-gray-400 text-sm">{item.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-gray-900 to-black border border-gray-800 p-12 text-center">
            <h3 className="text-2xl font-bold text-white mb-6">Готовы найти свой аромат?</h3>
            <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
              Каждый аромат EL'RUH — это история, которая ждет, чтобы ее рассказали.
            </p>
            <Link
              href="/catalog"
              className="inline-block px-8 py-3 bg-[#FFD700] text-black font-semibold hover:bg-[#E6C200] transition-colors"
            >
              Перейти в каталог
            </Link>
          </div>
        </div>
      </div>
      
      <Footer />
    </>
  );
}