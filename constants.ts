export const DELIVERY_OPTIONS = [
  { id: 'yandex', name: 'Яндекс Доставка', price: 300, time: '1-2 дня', icon: '🚗', minFree: 5000 },
  { id: 'cdek', name: 'СДЭК', price: 350, time: '2-3 дня', icon: '📦', minFree: 5000 },
  { id: 'pickup', name: 'Самовывоз', price: 0, time: 'Сегодня', icon: '🏢', minFree: 0 },
];

export const PAYMENT_METHODS = [
  { id: 'online', name: 'Картой онлайн', description: 'Visa, Mastercard, МИР', icon: '💳', available: true },
  { id: 'cash', name: 'Наличные', description: 'При получении', icon: '💰', available: true },
  { id: 'card_courier', name: 'Картой курьеру', description: 'При доставке', icon: '💳', available: true },
];

export const CITIES = [
  'Москва', 'Санкт-Петербург', 'Новосибирск', 'Екатеринбург', 'Казань',
  'Нижний Новгород', 'Челябинск', 'Самара', 'Омск', 'Ростов-на-Дону'
];

export const PICKUP_POINTS = {
  yandex: ['Яндекс Маркет', 'Яндекс Доставка Пункт'],
  cdek: ['СДЭК ПВЗ', 'СДЭК Постамат'],
  boxberry: ['Boxberry ПВЗ', 'Boxberry Постамат'],
  pickpoint: ['PickPoint', 'PickPoint Постамат'],
};