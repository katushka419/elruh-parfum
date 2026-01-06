// lib/cart.ts - ИСПРАВЛЕННЫЙ ВАРИАНТ
export interface CartItem {
  id: number;
  name: string;
  category: 'perfume' | 'car' | 'diffuser';
  price: number;
  ml: number;
  quantity: number;
  image: string;
  notes: string[];
}

class Cart {
  private items: CartItem[] = [];
  private listeners: (() => void)[] = [];

  // Добавить товар
  addItem(item: Omit<CartItem, 'quantity'>) {
    const existing = this.items.find(i => i.id === item.id && i.ml === item.ml);
    
    if (existing) {
      existing.quantity += 1;
    } else {
      this.items.push({ ...item, quantity: 1 });
    }
    
    this.saveToStorage();
    this.notifyListeners();
  }

  // Удалить товар
  removeItem(id: number, ml: number) {
    this.items = this.items.filter(item => !(item.id === id && item.ml === ml));
    this.saveToStorage();
    this.notifyListeners();
  }

  // Обновить количество
  updateQuantity(id: number, ml: number, quantity: number) {
    const item = this.items.find(i => i.id === id && i.ml === ml);
    if (item) {
      item.quantity = quantity;
      if (item.quantity <= 0) {
        this.removeItem(id, ml);
      }
    }
    this.saveToStorage();
    this.notifyListeners();
  }

  // Очистить корзину
  clearCart() {
    this.items = [];
    this.saveToStorage();
    this.notifyListeners();
  }

  // Получить все товары (МЕТОД, а не свойство)
  getItems(): CartItem[] {
    return [...this.items];
  }

  // Получить общую сумму
  getTotal(): number {
    return this.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  }

  // Получить количество товаров
  getItemCount(): number {
    return this.items.reduce((sum, item) => sum + item.quantity, 0);
  }

  // Подписка на изменения
  subscribe(listener: () => void) {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }

  // Уведомить подписчиков
  private notifyListeners() {
    this.listeners.forEach(listener => listener());
  }

  // Сохранить в localStorage
  private saveToStorage() {
    if (typeof window !== 'undefined') {
      localStorage.setItem('elruh-cart', JSON.stringify(this.items));
    }
  }

  // Загрузить из localStorage
  loadFromStorage() {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('elruh-cart');
      if (saved) {
        this.items = JSON.parse(saved);
        this.notifyListeners();
      }
    }
  }
}

export const cart = new Cart();