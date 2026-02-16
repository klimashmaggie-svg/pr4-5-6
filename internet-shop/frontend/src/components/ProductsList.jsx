import React from 'react';
import ProductItem from './ProductItem';
import './ProductsList.css';

function ProductsList({ products, onEdit, onDelete }) {
    if (products.length === 0) {
        return <div className="empty">Товаров пока нет</div>;
    }

    return (
        <div className="products-grid">
            {products.map(product => (
                <ProductItem
                    key={product.id}
                    product={product}
                    onEdit={onEdit}
                    onDelete={onDelete}
                />
            ))}
        </div>
    );
}

export default ProductsList;