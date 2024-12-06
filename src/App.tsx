import { useState, useEffect, useMemo } from 'react';
import './App.css';
import Header from './componentes/Header';
import Articulo from './componentes/Articulo';
import { db } from './data/db';

// Define el tipo para los datos
interface Product {
  id: number;
  name: string;
  image: string;
  description: string;
  price: number;
  quantity?: number; // Añadido para manejar la cantidad
}

function App() {
  const [data, setData] = useState<Product[]>([]);
  const [cart, setCart] = useState<Product[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6; // Ajustado para mostrar 6 elementos por página

  const addToCart = (item: Product) => {
    const itemExists = cart.find((guitar) => guitar.id === item.id);

    if (itemExists) { // Existe en el carrito
      const updatedCart = cart.map((guitar) =>
        guitar.id === item.id ? { ...guitar, quantity: (guitar.quantity || 1) + 1 } : guitar
      );
      setCart(updatedCart);
      console.log('El item ya existe en el carrito');
    } else {
      console.log('El item no existe, agregando...!');
      setCart([...cart, { ...item, quantity: 1 }]);
    }
  };

  useEffect(() => {
    setData(db);
  }, []);

  const totalAmount = useMemo(() => {
    return cart.reduce((total, item) => total + (item.price * (item.quantity || 1)), 0);
  }, [cart]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  console.log(data);

  return (
    <>
      <Header cart={cart} totalAmount={totalAmount} />

      <main className="container-xl mt-5">
        <h2 className="text-center">Nuestra Colección</h2>

        <div className="row mt-5">
          {currentItems.map((guitar) => (
            <div className="col-lg-4 col-md-6 mb-4" key={guitar.id}>
              <Articulo
                guitar={guitar}
                addToCart={addToCart}
              />
            </div>
          ))}
        </div>

        <div className="pagination">
          {[...Array(Math.ceil(data.length / itemsPerPage)).keys()].map(number => (
            <button key={number + 1} onClick={() => paginate(number + 1)}>
              {number + 1}
            </button>
          ))}
        </div>
      </main>

      <footer className="bg-dark mt-5 py-5">
        <div className="container-xl">
          <p className="text-white text-center fs-4 mt-4 m-md-0">GuitarLA - Todos los derechos Reservados</p>
        </div>
      </footer>
    </>
  );
}

export default App;
