import { useState, useEffect } from "react";
import "./Header.css";
import { Link, useNavigate } from "react-router-dom";

const Header = () => {
  const [cartCount, setCartCount] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = (event) => {
    // Product search redirect
    event.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?query=${encodeURIComponent(searchQuery)}`);
    }
  };

  useEffect(() => {
    // Global cart awareness
    // Function to calculate Cart items
    const calculateCartCount = () => {
      const cart = JSON.parse(localStorage.getItem("cart")) ?? [];
      const count = cart.reduce((total, item) => total + item.quantity, 0);
      setCartCount(count);
    };

    // Initialize cart count
    calculateCartCount();

    // Event listener for cart updates
    const handleCartUpdate = () => calculateCartCount();
    window.addEventListener("cartUpdated", handleCartUpdate);

    // Cleanup
    return () => window.removeEventListener("cartUpdated", handleCartUpdate);
  }, []);


  return (
    <header className="header">
      <div className="top-section">
        <div className="logo-section">
          {/*<img src='' alt='The Grocery Co.'/>*/}
          <Link to="/home">
            <h1>The Grocery Co.</h1>
          </Link>
        </div>

        <form className="search-section" onSubmit={handleSearch}>
          <input type="text" placeholder="Search" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
          <button type="submit">🔍</button>
        </form>

        <div className="top-right">
          <div className="location-section">
            <div className="location-icon">📍</div>
            <div className="location-text">
              <span>Shopping at San Jose 95133</span>
              <p>Choose Shopping Location</p>
            </div>
          </div>

          <Link to="/cart">
            <div className="cart-section">🛒 {cartCount > 0 && <span className="cart-count">{cartCount}</span>}</div>
          </Link>
        </div>
      </div>

      <nav>
        <div>
          <ul>
            <li>
              <Link to="/categories/1">Meat</Link>
            </li>
            <li>
              <Link to="/categories/2">Bread & Bakery</Link>
            </li>
            <li>
              <Link to="/categories/3">Fruits</Link>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Header;
