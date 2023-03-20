import React, { Component } from 'react';

class ShoppingCart extends Component {
  state = {
    cartProduct: JSON.parse(localStorage.getItem('cart-products')),
  };

  render() {
    const { cartProduct } = this.state;
    console.log(cartProduct);
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
