import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { getProductById } from '../services/api';

class ProductDetails extends React.Component {
  state = {
    infoProduct: {},

  };

  async componentDidMount() {
    const { match: { params: { id } } } = this.props;
    const product = await getProductById(id);
    this.setState({
      infoProduct: product,
    });
  }

  addToCart = () => {
    const { infoProduct } = this.state;
    const cartProducts = JSON.parse(localStorage.getItem('cart-products')) || [];
    const newCartProducts = [...cartProducts, infoProduct];
    localStorage.setItem('cart-products', JSON.stringify(newCartProducts));
  };

  render() {
    const { infoProduct } = this.state;
    return (
      <>
        <Link
          data-testid="shopping-cart-button"
          to="/shopping-cart"
        >
          Carrinho de Compras
        </Link>
        <h1>Product Details</h1>
        <p data-testid="product-detail-name">{ infoProduct.title }</p>
        <img
          data-testid="product-detail-image"
          src={ infoProduct.thumbnail }
          alt={ infoProduct.title }
        />
        <p data-testid="product-detail-price">{ infoProduct.price }</p>
        <button
          data-testid="product-detail-add-to-cart"
          onClick={ () => this.addToCart() }
        >
          Adicionar ao Carrinho
        </button>
      </>
    );
  }
}

ProductDetails.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};
export default ProductDetails;
