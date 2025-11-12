import { useState, useEffect } from 'react';
import ProductCard from './components/ProductCard';
import { products as initialProducts } from './data/products';
import './App.css';

function App() {
  const [products, setProducts] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    category: 'Eletronicos',
    image: '',
    description: '',
    inStock: true
  });

  
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        
        await new Promise(resolve => setTimeout(resolve, 2000));
        
      
        setProducts(initialProducts);
      } catch (error) {
        console.error('Erro ao carregar produtos:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.name || !formData.price || !formData.description) {
      alert('Preencha todos os campos obrigatorios!');
      return;
    }

    const newProduct = {
      id: products.length + 1,
      name: formData.name,
      price: parseFloat(formData.price),
      category: formData.category,
      image: formData.image || 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=300&h=300&fit=crop',
      description: formData.description,
      inStock: formData.inStock
    };

    setProducts([...products, newProduct]);
    setFormData({
      name: '', price: '', category: 'Eletronicos', image: '', description: '', inStock: true
    });
    setShowForm(false);
    alert('Produto cadastrado!');
  };

  
  if (loading) {
    return (
      <div className="App">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <h2>Carregando produtos...</h2>
          <p>Aguarde enquanto buscamos os melhores produtos para você!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="App">
      <header className="app-header">
        <h1>Catalogo de Produtos</h1>
        <p>Encontre os melhores produtos com os melhores precos</p>
        
        <button className="add-btn" onClick={() => setShowForm(!showForm)}>
          {showForm ? 'Cancelar' : '+ Add Produto'}
        </button>
      </header>

      {showForm && (
        <div className="form-container">
          <form onSubmit={handleSubmit}>
            <h2>Novo Produto</h2>
            
            <div className="input-group">
              <label>Nome *</label>
              <input type="text" name="name" value={formData.name} onChange={handleInputChange} required />
            </div>
            
            <div className="input-group">
              <label>Preco *</label>
              <input type="number" name="price" value={formData.price} onChange={handleInputChange} required />
            </div>
            
            <div className="input-group">
              <label>Categoria</label>
              <select name="category" value={formData.category} onChange={handleInputChange}>
                <option value="Eletronicos">Eletronicos</option>
                <option value="Informatica">Informatica</option>
                <option value="Audio">Audio</option>
              </select>
            </div>
            
            <div className="input-group">
              <label>Descricao *</label>
              <textarea name="description" value={formData.description} onChange={handleInputChange} required />
            </div>
            
            <div className="checkbox-group">
              <label>
                <input type="checkbox" name="inStock" checked={formData.inStock} onChange={handleInputChange} />
                Em estoque
              </label>
            </div>
            
            <button type="submit" className="submit-btn">Cadastrar</button>
          </form>
        </div>
      )}

      <div className="products-grid">
        {products.length > 0 ? (
          products.map(product => (
            <ProductCard key={product.id} product={product} />
          ))
        ) : (
          <div className="no-products">
            <h3>Nenhum produto encontrado</h3>
            <p>Adicione alguns produtos para comecar!</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;