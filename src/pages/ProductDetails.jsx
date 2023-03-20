import React from 'react';
import PropTypes from 'prop-types';
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

  render() {
    const { infoProduct } = this.state;
    return (
      <>
        <h1>Product Details</h1>
        <p data-testid="product-detail-name">{ infoProduct.title }</p>
        <img
          data-testid="product-detail-image"
          src={ infoProduct.thumbnail }
          alt={ infoProduct.title }
        />
        <p data-testid="product-detail-price">{ infoProduct.price }</p>
        <button data-testid="shopping-cart-button"> Carrinho de Compras</button>
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
