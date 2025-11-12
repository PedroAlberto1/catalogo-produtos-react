import './ProductCard.css';

const ProductCard = ({ product }) => {
  return (
    <div className="product-card">
      <div className="product-image">
        <img src={product.image} alt={product.name} />
        {!product.inStock && <div className="out-of-stock">Fora de Estoque</div>}
      </div>
      
      <div className="product-info">
        <h3 className="product-name">{product.name}</h3>
        <p className="product-category">{product.category}</p>
        <p className="product-description">{product.description}</p>
        
        <div className="product-footer">
          <span className="product-price">R$ {product.price.toFixed(2)}</span>
          <button 
            className={`buy-button ${!product.inStock ? 'disabled' : ''}`}
            disabled={!product.inStock}
          >
            {product.inStock ? 'Comprar' : 'Indisponível'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;