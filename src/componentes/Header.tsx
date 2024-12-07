import React from 'react';

// Define el tipo para los datos
interface Product {
  id: number;
  name: string;
  image: string;
  description: string;
  price: number;
  quantity?: number;
}

interface HeaderProps {
  cart: Product[];
  totalAmount: number;
  itemDelete: (id: number) => void;
  incrementQuantity: (id: number) => void;
  decrementQuantity: (id: number) => void;
  clearCart: () => void;
  checkout: () => void;
}

const Header: React.FC<HeaderProps> = ({ cart, totalAmount, itemDelete, incrementQuantity, decrementQuantity, clearCart, checkout }) => {
  return (
    <header className="py-5 header">
      <div className="container-xl">
        <div className="row justify-content-center justify-content-md-between">
          <div className="col-8 col-md-3">
            <a href="index.html">
              <img className="img-fluid" src="./public/img/logo.svg" alt="imagen logo" />
            </a>
          </div>
          <nav className="col-md-6 a mt-5 d-flex align-items-start justify-content-end">
            <div className="carrito">
              <img className="img-fluid" src="./public/img/carrito.png" alt="imagen carrito" />

              <div id="carrito" className="bg-white p-3">
                {cart.length === 0 ? (
                  <p className="text-center">El carrito está vacío..!</p>
                ) : (
                  <>
                    <table className="w-100 table">
                      <thead>
                        <tr>
                          <th>Imagen</th>
                          <th>Nombre</th>
                          <th>Precio</th>
                          <th>Cantidad</th>
                          <th></th>
                        </tr>
                      </thead>
                      <tbody>
                        {cart.map((guitar) => (
                          <tr key={guitar.id}>
                            <td>
                              <img className="img-fluid" src={`/img/${guitar.image}.jpg`} alt="imagen guitarra" />
                            </td>
                            <td>{guitar.name}</td>
                            <td className="fw-bold">${guitar.price}</td>
                            <td className="d-flex align-items-center">
                              <button
                                className="btn btn-dark btn-sm"
                                type="button"
                                onClick={() => decrementQuantity(guitar.id)}
                              >-</button>
                              <span className="quantity mx-2">{guitar.quantity}</span>
                              <button
                                className="btn btn-dark btn-sm"
                                type="button"
                                onClick={() => incrementQuantity(guitar.id)}
                              >+</button>
                            </td>
                            <td>
                              <button
                                className="btn btn-danger btn-sm"
                                type="button"
                                onClick={() => itemDelete(guitar.id)}
                              >X</button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    <p className="text-end"><span className="highlight">Total a pagar: ${totalAmount}</span></p>
                    <div className="d-flex justify-content-between">
                      <button className="btn btn-del w-100 mt-3 p-2 mx-1" onClick={clearCart}>Clean</button>
                      <button className="btn btn-add w-100 mt-3 p-2 mx-1" onClick={checkout}>Check</button>
                    </div>
                  </>
                )}
              </div>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
