import React from 'react';
import './ProductItem.css';

function ProductItem({ product, onEdit, onDelete }) {
    return (
        <div className="product-card">
            <div className="product-header">
                <h3 className="product-title">{product.name}</h3>
                <span className="product-category">{product.category}</span>
            </div>
            
            <p className="product-description">{product.description}</p>
            
            <div className="product-details">
                <div className="product-price">💰 {product.price} ₽</div>
                <div className="product-stock">📦 В наличии: {product.stock} шт.</div>
            </div>
            
            <div className="product-actions">
                <button 
                    className="btn btn-edit"
                    onClick={() => onEdit(product)}
                >
                    ✏️ Редактировать
                </button>
                <button 
                    className="btn btn-delete"
                    onClick={() => onDelete(product.id)}
                >
                    🗑️ Удалить
                </button>
            </div>
        </div>
    );
}

export default ProductItem;