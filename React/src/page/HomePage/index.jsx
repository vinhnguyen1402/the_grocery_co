import Footer from "../../components/Footer/Footer"
import Header from "../../components/Header/Header"
import ProductTileSet from "../../components/ProductTileSet/ProductTileSet";
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import "./Home_Page.css"


const HomePage = ()=> {
  // const [productSets, setProductSets] = useState([]);
  const [division1, setDivision1] = useState([]);
  const [division2, setDivision2] = useState([]);
  const [division3, setDivision3] = useState([]);

  const distributeProducts = (products, numberOfSets, itemsPerSet) => {
    let remainingProducts = [...products];
    const sets = [];
  
    for (let i = 0; i < numberOfSets; i++) {
      sets.push(selectRandomProducts(remainingProducts, itemsPerSet));
      remainingProducts = remainingProducts.filter(p => !sets[i].includes(p));
    }
  
    return sets;
  };
  
  const selectRandomProducts = (products, count) => {
    const shuffled = [...products].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  };
  

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:8000/products/?skip=0&limit=100');
        const products = response.data;
        const sets = distributeProducts(products, 3, 8); // For example, 2 sets with 5 products each

        setDivision1(sets[0]);
        setDivision2(sets[1]);
        setDivision3(sets[2]);

      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="pre-content">
      <Header />

      <div className='splash-container'>
        <img src={require('../../images/home.png')} alt='Home' />
      </div>

      <div className="primary-content">

        
        <div className="button-container">
          <h2>Search our Categories</h2>
          <div className="buttons">
            <Link to="/categories/1"><button>Meat</button></Link>
            <Link to="/categories/2"><button>Bread & Bakery</button></Link>
            <Link to="/categories/3"><button>Fruits</button></Link>
          </div>
          
        </div>

        <div className="tileset-container">
          <h2>Local Favorites</h2>
          <ProductTileSet products={division1} />
        </div>

        <div className="tileset-container">
          <h2>All your Grocery Needs here!</h2>
          <ProductTileSet products={division2} />
        </div>

        <div className="tileset-container">
          <h2>Daily Deals</h2>
          <ProductTileSet products={division3} />
        </div>

      </div>

      <Footer />
    </div>
  )
}

export default HomePage