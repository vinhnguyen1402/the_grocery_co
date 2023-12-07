import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./SubcategoryPage.css";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import ProductTileSet from "../../components/ProductTileSet/ProductTileSet";
// import ProductTile from "../../components/ProductTile/ProductTile";

const SubcategoryPage = ({ match }) => {
  const { categoryId } = useParams();
  const [categoryDetails, setCategoryDetails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCategoryDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/categories/${categoryId}/subcategories/`);
        //console.log(response.data);
        setCategoryDetails(response.data);
      } catch (err) {
        console.error(err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchCategoryDetails();
  }, [categoryId]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (!categoryDetails) return <div>Category not found</div>;

  return (
    <div className="masterSubCatContainer">
      <Header />
      <div className="mainContent">
        <div className="breadcrumb">{categoryDetails?.category_name}</div>

        {categoryDetails?.map((subcat) => (
          <div className="tileset-container" key={subcat.subcategory_id}>
            <h2>{subcat.subcategory_name}</h2>
            <ProductTileSet products={subcat.products} />
          </div>
        ))}
      </div>
      <Footer />
    </div>
  );
};

export default SubcategoryPage;
