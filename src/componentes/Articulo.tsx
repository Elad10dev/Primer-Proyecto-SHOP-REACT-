import React from 'react';

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
  setCart: React.Dispatch<React.SetStateAction<Product[]>>;
  cart: Product[];
}

const Articulo: React.FC<ArticuloProps> = ({ guitar, setCart, cart }) => {
  const handleClick = (guitar: Product) => {
    setCart([...cart, guitar]);
  }

  return (
    <div>
      <div className="col-md-6 col-lg-4 my-4 row align-items-center">
        <div className="col-4">
          <img className="img-fluid" src={`./public/img/${guitar.image}.jpg`} alt="imagen guitarra" />
        </div>
        <div className="col-8">
          <h3 className="text-black fs-4 fw-bold text-uppercase">{guitar.name}</h3>
          <p>{guitar.description}</p>
          <p className="fw-black text-primary fs-3">${guitar.price}</p>
          <button 
            type="button"
            className="btn btn-dark w-100"
            onClick={() => handleClick(guitar)}
          >Agregar al Carrito</button>
        </div>
      </div>
    </div>
  );
};

export default Articulo;
