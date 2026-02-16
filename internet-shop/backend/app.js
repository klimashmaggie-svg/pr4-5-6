const express = require('express');
const cors = require('cors');
const { nanoid } = require('nanoid');

const app = express();
const port = 3001;

let products = [
    { id: nanoid(6), name: 'Смартфон Xiaomi', category: 'Электроника', description: '6.5" экран, 128GB', price: 25000, stock: 15 },
    { id: nanoid(6), name: 'Ноутбук Lenovo', category: 'Электроника', description: '15.6", 8GB RAM, 512GB SSD', price: 55000, stock: 8 },
    { id: nanoid(6), name: 'Наушники JBL', category: 'Аксессуары', description: 'Беспроводные, шумоподавление', price: 4500, stock: 25 },
    { id: nanoid(6), name: 'Клавиатура Logitech', category: 'Аксессуары', description: 'Механическая, RGB', price: 3800, stock: 12 },
    { id: nanoid(6), name: 'Мышь Razer', category: 'Аксессуары', description: 'Игровая, 16000 DPI', price: 3200, stock: 18 },
    { id: nanoid(6), name: 'Монитор Samsung', category: 'Электроника', description: '27", 4K, IPS', price: 28000, stock: 6 },
    { id: nanoid(6), name: 'Внешний диск', category: 'Электроника', description: '1TB, USB 3.0', price: 4200, stock: 10 },
    { id: nanoid(6), name: 'Чехол для телефона', category: 'Аксессуары', description: 'Силиконовый, прозрачный', price: 500, stock: 50 },
    { id: nanoid(6), name: 'Зарядное устройство', category: 'Аксессуары', description: 'Быстрая зарядка 30W', price: 1200, stock: 22 },
    { id: nanoid(6), name: 'Планшет Samsung', category: 'Электроника', description: '10.5", 64GB', price: 18000, stock: 7 }
];

app.use(cors({
    origin: 'http://localhost:3001',
    methods: ['GET', 'POST', 'PATCH', 'DELETE']
}));
app.use(express.json());

app.use((req, res, next) => {
    console.log(`[${new Date().toLocaleTimeString()}] ${req.method} ${req.path}`);
    next();
});

app.get('/api/products', (req, res) => {
    res.json(products);
});

app.get('/api/products/:id', (req, res) => {
    const product = products.find(p => p.id === req.params.id);
    if (!product) {
        return res.status(404).json({ error: 'Товар не найден' });
    }
    res.json(product);
});

app.post('/api/products', (req, res) => {
    const { name, category, description, price, stock } = req.body;
    
    if (!name || !category || !description || !price || !stock) {
        return res.status(400).json({ error: 'Все поля обязательны' });
    }
    
    const newProduct = {
        id: nanoid(6),
        name: name.trim(),
        category: category.trim(),
        description: description.trim(),
        price: Number(price),
        stock: Number(stock)
    };
    
    products.push(newProduct);
    res.status(201).json(newProduct);
});

app.patch('/api/products/:id', (req, res) => {
    const product = products.find(p => p.id === req.params.id);
    if (!product) {
        return res.status(404).json({ error: 'Товар не найден' });
    }
    
    const { name, category, description, price, stock } = req.body;
    
    if (name) product.name = name.trim();
    if (category) product.category = category.trim();
    if (description) product.description = description.trim();
    if (price) product.price = Number(price);
    if (stock) product.stock = Number(stock);
    
    res.json(product);
});

app.delete('/api/products/:id', (req, res) => {
    const exists = products.some(p => p.id === req.params.id);
    if (!exists) {
        return res.status(404).json({ error: 'Товар не найден' });
    }
    
    products = products.filter(p => p.id !== req.params.id);
    res.status(204).send();
});

app.listen(port, () => {
    console.log(`✅ Сервер запущен на http://localhost:${port}`);
});