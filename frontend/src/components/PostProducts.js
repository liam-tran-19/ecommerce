import React from 'react'
import { useDispatch } from 'react-redux';
import { addToCart } from '../actions/cartActions';
import formatCurrency from '../util';

const PostProducts = ({posts}) => {

   const dispatch = useDispatch();

   useEffect(() => {
     dispatch(fetchProducts());
   }, []);

   const openModal = (product) => {
     setProduct(product);
   };
  return (
    <ul className="products">
      {posts.map((product) => (
        <li key={product._id}>
          <div className="product">
            <a href={"#" + product._id} onClick={() => openModal(product)}>
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
  );
}

export default PostProducts
