import { useState, useEffect } from 'react';
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
}

function App() {
  const [data, setData] = useState<Product[]>([]);
  const [cart, setCart] = useState<Product[]>([]);

  function addToCart(item: Product) {
    const itemExists = cart.find((guitar) => guitar.id === item.id);

    if (itemExists) {
      console.log('El item ya existe en el carrito');
    } else {
      console.log('El item no existe, agregando...!');
      setCart([...cart, item]);
    }
  }

  useEffect(() => {
    setData(db);
  }, []);

  console.log(data);

  return (
    <>
      <Header />

      <main className="container-xl mt-5">
        <h2 className="text-center">Nuestra Colección</h2>

        <div className="row mt-5">
          {data.map((guitar) => (
            <Articulo
              key={guitar.id}
              guitar={guitar}
              addToCart={addToCart}
            />
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
