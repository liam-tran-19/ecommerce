import React, { useEffect, useState } from "react";
import formatCurrency from "../util";
import Fade from "react-reveal/Fade";
import Modal from "react-modal";
import Zoom from "react-reveal/Zoom";
import { useSelector, useDispatch } from "react-redux";
import { fetchProducts } from "../actions/productActions";
import { addToCart } from "../actions/cartActions";
import Pagination from "./Pagination";

export const Products = (props) => {
  const [product, setProduct] = useState(null);

  const [posts, setPosts] = useState([]);
  // const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(9);

  const products = useSelector((state) => state.products);
  const { filteredItems } = products;
  // setPosts(filteredItems);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProducts());
  }, []);

  const openModal = (product) => {
    setProduct(product);
  };

  const closeModal = () => {
    setProduct(null);
  };

  // Get current posts
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  let currentPosts = [];
  if (filteredItems) {
    currentPosts = filteredItems.slice(indexOfFirstPost, indexOfLastPost);
  }

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div>
      <Fade bottom cascade>
        {!filteredItems ? (
          <div>Loading...</div>
        ) : (
          <div>
            <ul className="products">
              {currentPosts.map((product) => (
                <li key={product._id}>
                  <div className="product">
                    <a
                      href={"#" + product._id}
                      onClick={() => openModal(product)}
                    >
                      <img src={product.image} alt={product.title}></img>
                      <p>{product.title}</p>
                    </a>
                    <div className="product-price">
                      <div>{"$" + formatCurrency(product.price)}</div>
                      <button
                        onClick={() => dispatch(addToCart(product))}
                        className="button primary"
                      >
                        Add To Cart
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
            <Pagination
              postsPerPage={postsPerPage}
              totalPosts={filteredItems.length}
              paginate={paginate}
            />
          </div>
        )}
      </Fade>
      {product && (
        <Modal isOpen={true} onRequestClose={closeModal}>
          <Zoom>
            <button className="close-modal" onClick={closeModal}>
              x
            </button>
            <div className="product-details">
              <img src={product.image} alt={product.title}></img>
              <div className="product-details-description">
                <p>
                  <strong>{product.title}</strong>
                </p>
                <p>{product.description}</p>
                <p>
                  Avaiable Sizes:{" "}
                  {product.availableSizes.map((x) => (
                    <span>
                      {" "}
                      <button className="button">{x}</button>
                    </span>
                  ))}
                </p>
                <div className="product-price">
                  <div>{"$" + formatCurrency(product.price)}</div>
                  <button
                    className="button primary"
                    onClick={() => {
                      dispatch(addToCart(product));
                      closeModal();
                    }}
                  >
                    Add To Cart
                  </button>
                </div>
              </div>
            </div>
          </Zoom>
        </Modal>
      )}
    </div>
  );
};
