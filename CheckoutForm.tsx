// components/CheckoutForm.tsx
'use client';
import { useState } from 'react';
import { CreditCard, Wallet, Smartphone, Check, ArrowLeft } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { CartItem } from '@/lib/cart';

interface CheckoutFormProps {
  items: CartItem[];
  subtotal: number;
  deliveryOption: any;
  deliveryPrice: number;
  total: number;
  selectedPayment: string;
  setSelectedPayment: (method: string) => void;
  name: string;
  setName: (name: string) => void;
  phone: string;
  setPhone: (phone: string) => void;
  email: string;
  setEmail: (email: string) => void;
  comments: string;
  setComments: (comments: string) => void;
  onPayment: () => void;
  onBack: () => void;
}

const paymentMethods = [
  { 
    id: 'online', 
    name: 'Картой онлайн', 
    description: 'Visa, Mastercard, МИР',
    icon: <CreditCard size={24} />,
    available: true
  },
  { 
    id: 'cash', 
    name: 'Наличные', 
    description: 'При получении',
    icon: <Wallet size={24} />,
    available: true
  },
  { 
    id: 'card_courier', 
    name: 'Картой курьеру', 
    description: 'При доставке',
    icon: <CreditCard size={24} />,
    available: true
  },
  { 
    id: 'sbp', 
    name: 'СБП', 
    description: 'Система быстрых платежей',
    icon: <Smartphone size={24} />,
    available: false
  },
];

const CheckoutForm = ({
  items,
  subtotal,
  deliveryOption,
  deliveryPrice,
  total,
  selectedPayment,
  setSelectedPayment,
  name,
  setName,
  phone,
  setPhone,
  email,
  setEmail,
  comments,
  setComments,
  onPayment,
  onBack
}: CheckoutFormProps) => {
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCVC, setCardCVC] = useState('');
  const [agreed, setAgreed] = useState(false);

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = matches && matches[0] || '';
    const parts = [];
    
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    
    if (parts.length) {
      return parts.join(' ');
    } else {
      return value;
    }
  };

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCardNumber(formatCardNumber(e.target.value));
  };

  const handleExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length > 2) {
      value = value.substring(0, 2) + '/' + value.substring(2, 4);
    }
    setCardExpiry(value);
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-black/50 pt-20">
        <div className="container mx-auto px-4 py-8">
          <button
            onClick={onBack}
            className="text-gray-400 hover:text-gold flex items-center mb-8"
          >
            <ArrowLeft size={18} className="mr-2" />
            Вернуться к корзине
          </button>

          <h1 className="text-4xl font-bold text-white mb-2 font-elegant">Оформление заказа</h1>
          <p className="text-gray-400 mb-8">Проверьте данные и выберите способ оплаты</p>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Левый блок - товары и данные */}
            <div className="lg:col-span-2 space-y-6">
              {/* Товары */}
              <div className="bg-black/50 border border-gray-800 rounded-xl p-6">
                <h2 className="text-xl font-semibold text-white mb-4">Ваш заказ</h2>
                <div className="space-y-4">
                  {items.map((item) => (
                    <div key={`${item.id}-${item.ml}`} className="flex justify-between items-center">
                      <div>
                        <div className="text-white">{item.name} {item.ml}мл</div>
                        <div className="text-gray-400 text-sm">x{item.quantity}</div>
                      </div>
                      <div className="text-gold font-bold">
                        {item.price * item.quantity} ₽
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="border-t border-gray-800 mt-6 pt-6 space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Стоимость товаров</span>
                    <span className="text-white">{subtotal} ₽</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Доставка</span>
                    <span className="text-white">
                      {subtotal >= deliveryOption.minFree || deliveryPrice === 0 
                        ? 'Бесплатно' 
                        : `${deliveryPrice} ₽`}
                    </span>
                  </div>
                  <div className="flex justify-between text-lg pt-3 border-t border-gray-800">
                    <span className="font-semibold text-white">Итого к оплате</span>
                    <span className="text-2xl font-bold text-gold">{total} ₽</span>
                  </div>
                </div>
              </div>

              {/* Данные доставки */}
              <div className="bg-black/50 border border-gray-800 rounded-xl p-6">
                <h2 className="text-xl font-semibold text-white mb-4">Данные для доставки</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-300 mb-2">Имя *</label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full bg-black border border-gray-800 text-white px-4 py-3 rounded-lg focus:border-gold focus:outline-none"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-gray-300 mb-2">Телефон *</label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full bg-black border border-gray-800 text-white px-4 py-3 rounded-lg focus:border-gold focus:outline-none"
                      required
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-gray-300 mb-2">Email</label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-black border border-gray-800 text-white px-4 py-3 rounded-lg focus:border-gold focus:outline-none"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-gray-300 mb-2">Комментарий к заказу</label>
                    <textarea
                      value={comments}
                      onChange={(e) => setComments(e.target.value)}
                      rows={3}
                      placeholder="Пожелания по доставке, время звонка и т.д."
                      className="w-full bg-black border border-gray-800 text-white px-4 py-3 rounded-lg focus:border-gold focus:outline-none resize-none"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Правый блок - оплата */}
            <div className="lg:col-span-1">
              <div className="sticky top-24">
                <div className="bg-black/50 border border-gray-800 rounded-xl p-6">
                  <h2 className="text-xl font-semibold text-white mb-6">Способ оплаты</h2>
                  
                  <div className="space-y-3 mb-6">
                    {paymentMethods.map((method) => (
                      <div
                        key={method.id}
                        onClick={() => method.available && setSelectedPayment(method.id)}
                        className={`border rounded-lg p-4 cursor-pointer transition-all ${
                          selectedPayment === method.id
                            ? 'border-gold bg-gold/10'
                            : 'border-gray-800 hover:border-gray-600'
                        } ${!method.available && 'opacity-50 cursor-not-allowed'}`}
                      >
                        <div className="flex items-center">
                          <div className="mr-3 text-gold">
                            {method.icon}
                          </div>
                          <div className="flex-grow">
                            <div className="flex justify-between items-center">
                              <h3 className="text-white font-medium">{method.name}</h3>
                              {selectedPayment === method.id && (
                                <Check size={18} className="text-gold" />
                              )}
                            </div>
                            <p className="text-gray-400 text-sm">{method.description}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Форма оплаты картой */}
                  {selectedPayment === 'online' && (
                    <div className="mb-6 border border-gray-800 rounded-lg p-4">
                      <h3 className="text-white font-medium mb-4">Данные карты</h3>
                      <div className="space-y-4">
                        <div>
                          <label className="block text-gray-300 text-sm mb-2">Номер карты</label>
                          <input
                            type="text"
                            value={cardNumber}
                            onChange={handleCardNumberChange}
                            placeholder="1234 5678 9012 3456"
                            maxLength={19}
                            className="w-full bg-black border border-gray-800 text-white px-4 py-3 rounded-lg focus:border-gold focus:outline-none"
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-gray-300 text-sm mb-2">Срок действия</label>
                            <input
                              type="text"
                              value={cardExpiry}
                              onChange={handleExpiryChange}
                              placeholder="ММ/ГГ"
                              maxLength={5}
                              className="w-full bg-black border border-gray-800 text-white px-4 py-3 rounded-lg focus:border-gold focus:outline-none"
                            />
                          </div>
                          <div>
                            <label className="block text-gray-300 text-sm mb-2">CVC</label>
                            <input
                              type="password"
                              value={cardCVC}
                              onChange={(e) => setCardCVC(e.target.value.replace(/\D/g, ''))}
                              placeholder="123"
                              maxLength={3}
                              className="w-full bg-black border border-gray-800 text-white px-4 py-3 rounded-lg focus:border-gold focus:outline-none"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="mb-6">
                    <label className="flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={agreed}
                        onChange={(e) => setAgreed(e.target.checked)}
                        className="mr-3 w-5 h-5 bg-black border border-gray-700 rounded"
                      />
                      <span className="text-gray-300 text-sm">
                        Я соглашаюсь с <a href="/privacy" className="text-gold hover:underline">правилами обработки персональных данных</a> и <a href="/terms" className="text-gold hover:underline">публичной офертой</a>
                      </span>
                    </label>
                  </div>

                  <button
                    onClick={onPayment}
                    disabled={!agreed || (selectedPayment === 'online' && (!cardNumber || !cardExpiry || !cardCVC))}
                    className="w-full py-4 bg-gold text-black font-bold rounded-lg hover:bg-yellow-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center"
                  >
                    <Check size={20} className="mr-2" />
                    Оплатить {total} ₽
                  </button>

                  <p className="text-gray-400 text-xs text-center mt-4">
                    Все платежи защищены SSL-шифрованием
                  </p>
                </div>

                <div className="mt-6 bg-black/50 border border-gray-800 rounded-xl p-6">
                  <h3 className="text-white font-semibold mb-4">Гарантии безопасности</h3>
                  <ul className="space-y-2 text-sm text-gray-400">
                    <li className="flex items-center">
                      <Check size={16} className="text-green-500 mr-2" />
                      SSL-шифрование данных
                    </li>
                    <li className="flex items-center">
                      <Check size={16} className="text-green-500 mr-2" />
                      Соответствие PCI DSS
                    </li>
                    <li className="flex items-center">
                      <Check size={16} className="text-green-500 mr-2" />
                      Данные карт не хранятся на сервере
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default CheckoutForm;