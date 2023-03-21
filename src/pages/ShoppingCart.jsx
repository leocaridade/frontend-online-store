import React, { Component } from 'react';

class ShoppingCart extends Component {
  state = {
    cartProduct: JSON.parse(localStorage.getItem('cart-products')),
    quantity: 1,
  };

  render() {
    const { cartProduct, quantity } = this.state;
    return (
      <div>
        {
          cartProduct.length === 0
            ? (
              <p data-testid="home-initial-message">
                Seu carrinho está vazio
              </p>
            )
            : (
              <section>
                {
                  cartProduct.map((produto) => (
                    <div key={ produto.id }>
                      <p
                        data-testid="shopping-cart-product-name"
                      >
                        {produto.title}
                      </p>
                      <p>
                        $
                        {produto.price}
                      </p>
                      <p data-testid="shopping-cart-product-quantity">
                        {quantity}
                      </p>
                    </div>
                  ))
                }
              </section>
            )
        }
      </div>
    );
  }
}

export default ShoppingCart;
