import { useState } from 'react';
import './App.css';
import Header from './componentes/Header';
import Articulo from './componentes/Articulo';
import { db } from './data/db';
import useCart, { Product } from './hooks/useCart';

// Define el tipo para los datos
interface ProductData {
  id: number;
  name: string;
  image: string;
  description: string;
  price: number;
  quantity?: number;
}

function App() {
  const {
    cart,
    addToCart,
    incrementQuantity,
    decrementQuantity,
    itemDelete,
    clearCart,
    totalAmount,
  } = useCart();

  const [data] = useState<ProductData[]>(db);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6; // Ajustado para mostrar 6 elementos por página

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  console.log(data);

  function checkout() {
    console.log("Checkout iniciado");
    // Aquí puedes agregar la lógica para el checkout
  }

  return (
    <>
      <Header 
        cart={cart} 
        totalAmount={totalAmount} 
        itemDelete={itemDelete}
        incrementQuantity={incrementQuantity}
        decrementQuantity={decrementQuantity}
        clearCart={clearCart}
        checkout={checkout}
      />

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
