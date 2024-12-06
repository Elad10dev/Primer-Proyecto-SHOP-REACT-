import React, { useState } from 'react';

// Define el tipo para el producto
interface Product {
  id: number;
  name: string;
  image: string;
  description: string;
  price: number;
}

// Define las props del componente
interface ArticuloProps {
  guitar: Product;
  addToCart: (item: Product) => void;
}

const Articulo: React.FC<ArticuloProps> = ({ guitar, addToCart }) => {
  const [showMore, setShowMore] = useState(false);

  const handleShowMore = () => {
    setShowMore(!showMore);
  };

  return (
    <div className="card">
      <img className="img-fluid" src={`./img/${guitar.image}.jpg`} alt={`Imagen de ${guitar.name}`} />
      <div className="card-body">
        <h3 className="card-title">{guitar.name}</h3>
        <p className="card-text">
          {showMore ? guitar.description : `${guitar.description.substring(0, 50)}...`}
          <span className="read-more" onClick={handleShowMore}>
            {showMore ? ' Leer menos' : ' Leer más'}
          </span>
        </p>
        <p className="card-price">${guitar.price}</p>
        <button 
          type="button"
          className="btn btn-dark"
          onClick={() => addToCart(guitar)}
        >Agregar al Carrito</button>
      </div>
    </div>
  );
};

export default Articulo;
