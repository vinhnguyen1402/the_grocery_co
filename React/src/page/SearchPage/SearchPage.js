import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
// import ProductTile from "../../components/ProductTile/ProductTile";
import ItemContainer from "../../components/ItemContainer/ItemContainer";

import "./SearchPage.css";

const SearchPage = () => {
  const [searchResults, setSearchResults] = useState([]);
  const [totalResults, setTotalResults] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const totalPages = Math.ceil(totalResults / itemsPerPage);

  //Filters
  const [isFilterActive, setIsFilterActive] = useState(false);
  const [priceFilter, setPriceFilter] = useState({ min: 0, max: 1000 });
  const [activePriceFilter, setActivePriceFilter] = useState({ min: 0, max: Infinity });

  // Query params
  const location = useLocation();
  const searchQuery = new URLSearchParams(location.search).get("query");

  useEffect(() => {
    const fetchSearchResults = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/products/search?query=${searchQuery}&page=${currentPage}`);
        setSearchResults(response.data.products);
        setTotalResults(response.data.total);
      } catch (error) {
        console.error("Error fetching search results:", error);
      }
    };

    if (searchQuery) {
      fetchSearchResults();
    }
  }, [searchQuery, currentPage]);

  const applyPriceFilter = () => {
    const minPrice = Math.max(0, Number(priceFilter.min));
    const maxPrice = Math.max(minPrice, Number(priceFilter.max));
    setActivePriceFilter({ min: minPrice, max: maxPrice });
    setIsFilterActive(true);
  };

  const resetFilters = () => {
    setPriceFilter({ min: 0, max: 1000 });
    setActivePriceFilter({ min: 0, max: 1000 });
    setIsFilterActive(false);
  };

  return (
    <div className="pre-content">
      <Header />
      <div className="primary-container">
        <div className="filter-sidebar">
          <div className="price-filter">
            <h5>Search Filter</h5>
            {isFilterActive && (
              <div className="filter-status">
                <span>Filter Active </span>
                <button onClick={resetFilters}>Reset Filter</button>
              </div>
            )}
            <div className="filter-group">
              <input
                className="priceFilterInput"
                type="number"
                placeholder="Min "
                onChange={(e) => setPriceFilter({ ...priceFilter, min: e.target.value })}
              />
              <input
                className="priceFilterInput"
                type="number"
                placeholder="Max "
                onChange={(e) => setPriceFilter({ ...priceFilter, max: e.target.value })}
              />
              <button className="buttonGoFilter" onClick={applyPriceFilter}>Go</button>
            </div>
          </div>
        </div>
        <div className="results-container">
          <p>
            {totalResults} item(s) found for "{searchQuery}"
          </p>
          <div className="tiles-container">
            {searchResults
              .filter((product) => product.price >= activePriceFilter.min && product.price <= activePriceFilter.max)
              // Include additional filters here
              .map((product) => (
                // <ProductTile key={product.product_id} product={product} />
                <ItemContainer product={product} />
              ))}
          </div>
          {totalResults > 0 && (
            <div className="pagination">
              <button onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))} disabled={currentPage === 1}>
                Previous
              </button>
              <span>
                Page {currentPage} of {totalPages}
              </span>
              <button onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))} disabled={currentPage === totalPages}>
                Next
              </button>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default SearchPage;
