// components/AddressPicker.tsx - ОБНОВЛЕННЫЙ
'use client';
import { useState, useEffect, useRef } from 'react';
import { X, Search, MapPin, Navigation, Package, Building } from 'lucide-react';

// Типы
interface AddressSuggestion {
  value: string;
  unrestricted_value: string;
  data: {
    city?: string;
    street?: string;
    house?: string;
    flat?: string;
    postal_code?: string;
  };
}

interface PickupPoint {
  id: string;
  name: string;
  address: string;
  provider: 'yandex' | 'cdek' | 'boxberry' | 'pickpoint';
  coordinates: [number, number];
  workHours: string;
}

interface AddressPickerProps {
  onSelect: (address: string) => void;
  onClose: () => void;
}

const AddressPicker = ({ onSelect, onClose }: AddressPickerProps) => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState<AddressSuggestion[]>([]);
  const [pickupPoints, setPickupPoints] = useState<PickupPoint[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<'address' | 'pickup'>('address');
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<any>(null);

  // Поиск адресов через DaData
  const searchAddresses = async (searchQuery: string) => {
    if (!searchQuery.trim() || searchQuery.length < 3) {
      setSuggestions([]);
      return;
    }

    setIsLoading(true);
    try {
      const apiKey = process.env.NEXT_PUBLIC_DADATA_API_KEY;
      
      const response = await fetch('https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/address', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': `Token ${apiKey}`
        },
        body: JSON.stringify({
          query: searchQuery,
          count: 8,
          from_bound: { value: "city" },
          to_bound: { value: "house" },
          locations: [
            { country: "Россия" }
          ]
        })
      });
      
      const data = await response.json();
      setSuggestions(data.suggestions || []);
      
      // Если есть город, ищем пункты выдачи
      if (data.suggestions?.[0]?.data?.city) {
        const city = data.suggestions[0].data.city;
        searchPickupPoints(city);
      }
    } catch (error) {
      console.error('Error fetching addresses:', error);
      // Fallback: использовать тестовые данные
      setSuggestions(getMockSuggestions(searchQuery));
    } finally {
      setIsLoading(false);
    }
  };

  // Моковые данные для разработки
  const getMockSuggestions = (query: string): AddressSuggestion[] => {
    const mockData = [
      { value: `г Москва, ул Тверская, д ${Math.floor(Math.random() * 100)}`, unrestricted_value: `Москва, Тверская ул., д. ${Math.floor(Math.random() * 100)}`, data: { city: 'Москва', street: 'Тверская' } },
      { value: `г Москва, ул Арбат, д ${Math.floor(Math.random() * 100)}`, unrestricted_value: `Москва, Арбат ул., д. ${Math.floor(Math.random() * 100)}`, data: { city: 'Москва', street: 'Арбат' } },
      { value: `г Санкт-Петербург, Невский пр-кт, д ${Math.floor(Math.random() * 100)}`, unrestricted_value: `Санкт-Петербург, Невский пр., д. ${Math.floor(Math.random() * 100)}`, data: { city: 'Санкт-Петербург', street: 'Невский проспект' } },
      { value: `г Казань, ул Баумана, д ${Math.floor(Math.random() * 100)}`, unrestricted_value: `Казань, Баумана ул., д. ${Math.floor(Math.random() * 100)}`, data: { city: 'Казань', street: 'Баумана' } },
    ];
    
    return mockData.filter(item => 
      item.value.toLowerCase().includes(query.toLowerCase()) ||
      item.unrestricted_value.toLowerCase().includes(query.toLowerCase())
    );
  };

  // Поиск пунктов выдачи (моковые данные)
  const searchPickupPoints = async (city: string) => {
    // В реальном приложении здесь будет API запрос
    const mockPoints: PickupPoint[] = [
      {
        id: '1',
        name: 'Яндекс Маркет ПВЗ',
        address: `${city}, ул. Центральная, 1`,
        provider: 'yandex',
        coordinates: [55.7558 + Math.random() * 0.1, 37.6173 + Math.random() * 0.1],
        workHours: '10:00-22:00'
      },
      {
        id: '2',
        name: 'СДЭК Пункт выдачи',
        address: `${city}, пр. Ленина, 25`,
        provider: 'cdek',
        coordinates: [55.7558 + Math.random() * 0.1, 37.6173 + Math.random() * 0.1],
        workHours: '09:00-20:00'
      },
      {
        id: '3',
        name: 'Boxberry ПВЗ',
        address: `${city}, ул. Победы, 15`,
        provider: 'boxberry',
        coordinates: [55.7558 + Math.random() * 0.1, 37.6173 + Math.random() * 0.1],
        workHours: '08:00-21:00'
      },
      {
        id: '4',
        name: 'PickPoint Постамат',
        address: `${city}, ТРЦ "Мега", 2 этаж`,
        provider: 'pickpoint',
        coordinates: [55.7558 + Math.random() * 0.1, 37.6173 + Math.random() * 0.1],
        workHours: 'круглосуточно'
      },
    ];
    
    setPickupPoints(mockPoints);
  };

  // Инициализация карты
  useEffect(() => {
    if (activeTab === 'pickup' && mapContainerRef.current && !map) {
      const initMap = () => {
        const apiKey = process.env.NEXT_PUBLIC_YANDEX_MAPS_API_KEY;
        
        if (!apiKey) {
          console.warn('Yandex Maps API key not found');
          return;
        }

        // Динамически загружаем Яндекс Карты
        const script = document.createElement('script');
        script.src = `https://api-maps.yandex.ru/2.1/?apikey=${apiKey}&lang=ru_RU`;
        script.async = true;
        
        script.onload = () => {
          // @ts-ignore
          window.ymaps.ready(() => {
            // @ts-ignore
            const newMap = new window.ymaps.Map(mapContainerRef.current, {
              center: [55.7558, 37.6173], // Москва
              zoom: 10,
              controls: ['zoomControl', 'fullscreenControl']
            });
            
            setMap(newMap);
            
            // Добавляем метки пунктов выдачи
            pickupPoints.forEach(point => {
              // @ts-ignore
              const placemark = new window.ymaps.Placemark(
                point.coordinates,
                {
                  balloonContent: `
                    <div style="padding: 10px;">
                      <strong>${point.name}</strong><br>
                      ${point.address}<br>
                      Часы работы: ${point.workHours}
                    </div>
                  `
                },
                {
                  preset: 'islands#blueCircleIcon'
                }
              );
              
              placemark.events.add('click', () => {
                onSelect(`${point.name}, ${point.address}`);
                onClose();
              });
              
              newMap.geoObjects.add(placemark);
            });
          });
        };
        
        document.head.appendChild(script);
        
        return () => {
          document.head.removeChild(script);
        };
      };
      
      initMap();
    }
  }, [activeTab, map, pickupPoints, onSelect, onClose]);

  // Поиск с задержкой
  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      if (query.length > 2) {
        searchAddresses(query);
      }
    }, 500);

    return () => clearTimeout(delayDebounce);
  }, [query]);

  // Определение местоположения
  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      setIsLoading(true);
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          
          try {
            // Geocoding через Яндекс
            const apiKey = process.env.NEXT_PUBLIC_YANDEX_GEOCODER_API_KEY;
            const response = await fetch(
              `https://geocode-maps.yandex.ru/1.x/?apikey=${apiKey}&geocode=${longitude},${latitude}&format=json&results=1`
            );
            
            const data = await response.json();
            const address = data.response.GeoObjectCollection.featureMember[0]?.GeoObject?.metaDataProperty?.GeocoderMetaData?.text;
            
            if (address) {
              onSelect(address);
              onClose();
            } else {
              // Fallback
              onSelect(`Широта: ${latitude.toFixed(4)}, Долгота: ${longitude.toFixed(4)}`);
              onClose();
            }
          } catch (error) {
            console.error('Geocoding error:', error);
            onSelect(`Широта: ${latitude.toFixed(4)}, Долгота: ${longitude.toFixed(4)}`);
            onClose();
          } finally {
            setIsLoading(false);
          }
        },
        (error) => {
          console.error('Location error:', error);
          alert('Не удалось определить местоположение. Проверьте разрешения браузера.');
          setIsLoading(false);
        }
      );
    } else {
      alert('Геолокация не поддерживается вашим браузером');
    }
  };

  const providerIcons = {
    yandex: '🟦',
    cdek: '🟧',
    boxberry: '🟩',
    pickpoint: '🟪'
  };

  return (
    <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
      <div className="bg-gray-900 border border-gray-800 rounded-xl w-full max-w-4xl max-h-[90vh] overflow-hidden">
        {/* Заголовок и вкладки */}
        <div className="p-6 border-b border-gray-800">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-2xl font-bold text-white">Выберите адрес доставки</h2>
              <p className="text-gray-400 text-sm mt-1">Или пункт выдачи заказов</p>
            </div>
            <button 
              onClick={onClose}
              className="text-gray-400 hover:text-white p-2 hover:bg-gray-800 rounded-lg"
            >
              <X size={24} />
            </button>
          </div>
          
          {/* Вкладки */}
          <div className="flex border-b border-gray-800 mb-4">
            <button
              className={`px-6 py-3 font-medium ${activeTab === 'address' 
                ? 'text-gold border-b-2 border-gold' 
                : 'text-gray-400 hover:text-gray-300'}`}
              onClick={() => setActiveTab('address')}
            >
              Адрес
            </button>
            <button
              className={`px-6 py-3 font-medium ${activeTab === 'pickup' 
                ? 'text-gold border-b-2 border-gold' 
                : 'text-gray-400 hover:text-gray-300'}`}
              onClick={() => setActiveTab('pickup')}
            >
              Пункты выдачи
            </button>
          </div>
          
          {/* Поисковая строка */}
          <div className="relative">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={activeTab === 'address' 
                ? "Введите адрес, улицу или город" 
                : "Введите город для поиска пунктов выдачи"}
              className="w-full bg-black border border-gray-700 text-white px-4 py-3 pl-12 rounded-lg focus:border-gold focus:outline-none"
              autoFocus
            />
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          </div>
        </div>

        <div className="flex h-[500px]">
          {/* Левая панель - результаты */}
          <div className="w-1/2 border-r border-gray-800 overflow-y-auto">
            {activeTab === 'address' ? (
              // Результаты поиска адресов
              <div className="p-4">
                {isLoading ? (
                  <div className="p-8 text-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gold mx-auto"></div>
                    <p className="text-gray-400 mt-4">Поиск адресов...</p>
                  </div>
                ) : suggestions.length > 0 ? (
                  <div className="space-y-2">
                    <h3 className="text-white font-medium mb-3 px-2">Найденные адреса:</h3>
                    {suggestions.map((addr, index) => (
                      <div
                        key={index}
                        onClick={() => {
                          onSelect(addr.value);
                          onClose();
                        }}
                        className="p-3 border border-gray-800 rounded-lg hover:border-gold hover:bg-gray-800/50 cursor-pointer transition-colors group"
                      >
                        <div className="flex items-start">
                          <MapPin size={16} className="text-gold mr-3 mt-1 flex-shrink-0" />
                          <div className="flex-grow">
                            <div className="text-white font-medium group-hover:text-gold">
                              {addr.value}
                            </div>
                            {addr.data.street && addr.data.house && (
                              <div className="text-gray-400 text-sm mt-1">
                                {addr.data.city}, {addr.data.street}, д. {addr.data.house}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : query ? (
                  <div className="p-8 text-center text-gray-400">
                    <p>Ничего не найдено. Попробуйте другой адрес.</p>
                    <p className="text-sm mt-2">Пример: "Москва, Тверская"</p>
                  </div>
                ) : (
                  <div className="p-8">
                    <button
                      onClick={getCurrentLocation}
                      className="w-full p-4 border-2 border-dashed border-gray-700 rounded-xl hover:border-gold hover:bg-gray-800/30 transition-colors group"
                    >
                      <div className="flex items-center justify-center">
                        <Navigation size={24} className="text-gold mr-3 group-hover:animate-pulse" />
                        <div className="text-left">
                          <div className="text-white font-medium">Определить местоположение</div>
                          <div className="text-gray-400 text-sm">Автоматически найдем ваш адрес</div>
                        </div>
                      </div>
                    </button>
                    
                    <div className="mt-6">
                      <h3 className="text-white font-medium mb-3">Популярные города:</h3>
                      <div className="grid grid-cols-2 gap-2">
                        {['Москва', 'Санкт-Петербург', 'Казань', 'Екатеринбург', 'Новосибирск', 'Краснодар'].map((city) => (
                          <button
                            key={city}
                            onClick={() => setQuery(city)}
                            className="p-3 text-left border border-gray-800 rounded-lg hover:border-gold text-gray-300 hover:text-gold"
                          >
                            {city}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              // Пункты выдачи
              <div className="p-4">
                {isLoading ? (
                  <div className="p-8 text-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gold mx-auto"></div>
                    <p className="text-gray-400 mt-4">Поиск пунктов выдачи...</p>
                  </div>
                ) : pickupPoints.length > 0 ? (
                  <div className="space-y-3">
                    <h3 className="text-white font-medium mb-3 px-2">Доступные пункты выдачи:</h3>
                    {pickupPoints.map((point) => (
                      <div
                        key={point.id}
                        onClick={() => {
                          onSelect(`${point.name}, ${point.address}`);
                          onClose();
                        }}
                        className="p-4 border border-gray-800 rounded-lg hover:border-gold hover:bg-gray-800/50 cursor-pointer transition-colors group"
                      >
                        <div className="flex items-start">
                          <div className="text-2xl mr-3">{providerIcons[point.provider]}</div>
                          <div className="flex-grow">
                            <div className="flex justify-between items-start">
                              <div>
                                <div className="text-white font-medium group-hover:text-gold">
                                  {point.name}
                                </div>
                                <div className="text-gray-400 text-sm mt-1">
                                  {point.address}
                                </div>
                              </div>
                              <span className="px-2 py-1 bg-gray-800 text-xs rounded">
                                {point.workHours}
                              </span>
                            </div>
                            <div className="flex items-center mt-2 text-gray-500 text-sm">
                              <Package size={12} className="mr-1" />
                              <span>Бесплатный самовывоз</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="p-8 text-center text-gray-400">
                    <Building size={48} className="mx-auto mb-4 opacity-50" />
                    <p>Введите город для поиска пунктов выдачи</p>
                    <p className="text-sm mt-2">Пример: "Москва" или "Санкт-Петербург"</p>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Правая панель - карта */}
          <div className="w-1/2 p-4">
            {activeTab === 'pickup' ? (
              <div className="h-full border border-gray-800 rounded-lg overflow-hidden">
                <div ref={mapContainerRef} className="w-full h-full bg-gray-900">
                  {!process.env.NEXT_PUBLIC_YANDEX_MAPS_API_KEY && (
                    <div className="h-full flex items-center justify-center text-gray-500">
                      <div className="text-center p-8">
                        <div className="text-4xl mb-4">🗺️</div>
                        <p className="font-medium mb-2">Карта пунктов выдачи</p>
                        <p className="text-sm">Для работы карты нужен API ключ Яндекс Карт</p>
                        <p className="text-xs mt-4 text-gray-600">
                          В режиме разработки показываются тестовые пункты выдачи
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-gray-500 p-8">
                <div className="text-4xl mb-4">📍</div>
                <p className="font-medium mb-2">Карта доставки</p>
                <p className="text-center text-sm">
                  Выберите пункт выдачи чтобы увидеть его на карте
                </p>
                <button
                  onClick={() => setActiveTab('pickup')}
                  className="mt-6 px-6 py-2 border border-gold text-gold rounded-lg hover:bg-gold/10 transition-colors"
                >
                  Посмотреть пункты выдачи на карте
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Подвал */}
        <div className="p-4 border-t border-gray-800 bg-black/50">
          <div className="text-sm text-gray-400">
            <div className="flex items-center justify-center space-x-6">
              <div className="flex items-center">
                <span className="mr-2">🟦</span>
                <span>Яндекс Маркет</span>
              </div>
              <div className="flex items-center">
                <span className="mr-2">🟧</span>
                <span>СДЭК</span>
              </div>
              <div className="flex items-center">
                <span className="mr-2">🟩</span>
                <span>Boxberry</span>
              </div>
              <div className="flex items-center">
                <span className="mr-2">🟪</span>
                <span>PickPoint</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddressPicker;