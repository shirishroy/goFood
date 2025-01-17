import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from './ContextReducer';
import { Badge } from 'react-bootstrap';
import Modal from '../Modal';
import Cart from '../screens/Cart';

export default function Navbar() {
  const [cartView, setCartView] = useState(false);
  const data = useCart(); // Using const instead of let
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/entry");
  }

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-success">
        <div className="container-fluid">
          <Link className="navbar-brand fs-1 fst-italic" to="/">Gofood</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav me-auto mb-2">
              <li className="nav-item">
                <Link className="nav-link active fs-5" aria-current="page" to="/">Home</Link>
              </li>
              {localStorage.getItem("authToken") &&
                <li className="nav-item">
                  <Link className="nav-link active fs-5" aria-current="page" to="/myOrder">MyOrders</Link>
                </li>
              }
            </ul>
            {localStorage.getItem("authToken") ?
              <div>
                <div className='btn bg-white text-success mx-2' onClick={() => { setCartView(true) }}>
                  My Cart { "  "}
                  <Badge pill bg="danger"> {data ? data.length : 0}</Badge> {/* Conditional check for data */}
                </div>
                {cartView ? <Modal onClose={() => setCartView(false)}><Cart /></Modal> : null}
                <div className='btn bg-white text-danger mx-2' onClick={handleLogout}>
                  Logout
                </div>
              </div>
              :
              <div className='d-flex'>
                <Link className="btn bg-white text-success mx-1" to="/entry">Entry</Link>
                <Link className="btn bg-white text-success mx-1" to="/createuser">Signup</Link>
              </div>
            }
          </div>
        </div>
      </nav>
    </div>
  )
}
