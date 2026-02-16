import React, { useState, useEffect } from 'react';
import ProductsList from '../components/ProductsList';
import ProductModal from '../components/ProductModal';
import { api } from '../api';
import './ProductsPage.css';

function ProductsPage() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [modalOpen, setModalOpen] = useState(false);
    const [modalMode, setModalMode] = useState('create'); // 'create' или 'edit'
    const [editingProduct, setEditingProduct] = useState(null);

    // Загрузка товаров при монтировании
    useEffect(() => {
        loadProducts();
    }, []);

    const loadProducts = async () => {
        try {
            setLoading(true);
            const data = await api.getProducts();
            setProducts(data);
        } catch (error) {
            console.error('Ошибка загрузки:', error);
            alert('Не удалось загрузить товары');
        } finally {
            setLoading(false);
        }
    };

    const openCreateModal = () => {
        setModalMode('create');
        setEditingProduct(null);
        setModalOpen(true);
    };

    const openEditModal = (product) => {
        setModalMode('edit');
        setEditingProduct(product);
        setModalOpen(true);
    };

    const closeModal = () => {
        setModalOpen(false);
        setEditingProduct(null);
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Удалить товар?')) return;

        try {
            await api.deleteProduct(id);
            setProducts(prev => prev.filter(p => p.id !== id));
        } catch (error) {
            console.error('Ошибка удаления:', error);
            alert('Не удалось удалить товар');
        }
    };

    const handleSubmit = async (productData) => {
        try {
            if (modalMode === 'create') {
                const newProduct = await api.createProduct(productData);
                setProducts(prev => [...prev, newProduct]);
            } else {
                const updatedProduct = await api.updateProduct(productData.id, productData);
                setProducts(prev => prev.map(p => 
                    p.id === productData.id ? updatedProduct : p
                ));
            }
            closeModal();
        } catch (error) {
            console.error('Ошибка сохранения:', error);
            alert('Не удалось сохранить товар');
        }
    };

    return (
        <div className="page">
            <header className="header">
                <div className="container">
                    <div className="header-content">
                        <h1>🛒 Интернет-магазин</h1>
                        <button className="btn btn-primary" onClick={openCreateModal}>
                            + Добавить товар
                        </button>
                    </div>
                </div>
            </header>

            <main className="main">
                <div className="container">
                    {loading ? (
                        <div className="loading">Загрузка...</div>
                    ) : (
                        <ProductsList 
                            products={products}
                            onEdit={openEditModal}
                            onDelete={handleDelete}
                        />
                    )}
                </div>
            </main>

            <footer className="footer">
                <div className="container">
                    <p>© 2024 Интернет-магазин. Все права защищены.</p>
                </div>
            </footer>

            <ProductModal
                open={modalOpen}
                mode={modalMode}
                initialProduct={editingProduct}
                onClose={closeModal}
                onSubmit={handleSubmit}
            />
        </div>
    );
}

export default ProductsPage;