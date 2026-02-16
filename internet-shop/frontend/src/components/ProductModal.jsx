import React, { useState, useEffect } from 'react';
import './ProductModal.css';

function ProductModal({ open, mode, initialProduct, onClose, onSubmit }) {
    const [name, setName] = useState('');
    const [category, setCategory] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [stock, setStock] = useState('');

    // Заполняем форму при открытии
    useEffect(() => {
        if (open) {
            setName(initialProduct?.name || '');
            setCategory(initialProduct?.category || '');
            setDescription(initialProduct?.description || '');
            setPrice(initialProduct?.price?.toString() || '');
            setStock(initialProduct?.stock?.toString() || '');
        }
    }, [open, initialProduct]);

    if (!open) return null;

    const handleSubmit = (e) => {
        e.preventDefault();

        // Валидация
        if (!name.trim() || !category.trim() || !description.trim() || !price || !stock) {
            alert('Заполните все поля');
            return;
        }

        const priceNum = Number(price);
        const stockNum = Number(stock);

        if (isNaN(priceNum) || priceNum <= 0) {
            alert('Введите корректную цену');
            return;
        }

        if (isNaN(stockNum) || stockNum < 0) {
            alert('Введите корректное количество');
            return;
        }

        onSubmit({
            id: initialProduct?.id,
            name: name.trim(),
            category: category.trim(),
            description: description.trim(),
            price: priceNum,
            stock: stockNum
        });
    };

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal" onClick={e => e.stopPropagation()}>
                <div className="modal-header">
                    <h2>{mode === 'create' ? '➕ Добавить товар' : '✏️ Редактировать товар'}</h2>
                    <button className="modal-close" onClick={onClose}>×</button>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Название товара:</label>
                        <input
                            type="text"
                            value={name}
                            onChange={e => setName(e.target.value)}
                            placeholder="Например, Смартфон Xiaomi"
                            autoFocus
                        />
                    </div>

                    <div className="form-group">
                        <label>Категория:</label>
                        <input
                            type="text"
                            value={category}
                            onChange={e => setCategory(e.target.value)}
                            placeholder="Например, Электроника"
                        />
                    </div>

                    <div className="form-group">
                        <label>Описание:</label>
                        <textarea
                            value={description}
                            onChange={e => setDescription(e.target.value)}
                            placeholder="Описание товара"
                            rows="3"
                        />
                    </div>

                    <div className="form-row">
                        <div className="form-group">
                            <label>Цена (₽):</label>
                            <input
                                type="number"
                                value={price}
                                onChange={e => setPrice(e.target.value)}
                                placeholder="25000"
                                min="0"
                            />
                        </div>

                        <div className="form-group">
                            <label>Количество:</label>
                            <input
                                type="number"
                                value={stock}
                                onChange={e => setStock(e.target.value)}
                                placeholder="15"
                                min="0"
                            />
                        </div>
                    </div>

                    <div className="modal-footer">
                        <button type="button" className="btn" onClick={onClose}>
                            Отмена
                        </button>
                        <button type="submit" className="btn btn-primary">
                            {mode === 'create' ? 'Создать' : 'Сохранить'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default ProductModal;