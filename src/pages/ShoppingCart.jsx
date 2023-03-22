import React, { Component } from 'react';

const cartProductsLs = 'cart-products';
class ShoppingCart extends Component {
  state = {
    cartProduct: [],
    produto: [],
  };

  componentDidMount() {
    this.handleProduct();
  }

  handleProduct = () => {
    let arrProd = [];
    const cartProduct = JSON.parse(localStorage.getItem(cartProductsLs));
    this.setState({
      cartProduct,
    });
    // verifica se existe algo no carrinho de compras, se nao existir, a funçao nao continua
    if (!cartProduct) return;
    const productIds = cartProduct.map((element) => element.id);
    const filteredIds = [...new Set(productIds)];
    console.log(filteredIds);
    filteredIds.forEach((id) => {
      const product = cartProduct.filter((products) => products.id === id);
      console.log(product);
      arrProd = [...arrProd, { product: product[0], quantity: product.length }];
    });
    this.setState({ produto: arrProd });
  };

  removeProduct = (product) => {
    const { cartProduct } = this.state;
    const newCart = cartProduct.filter(({ id }) => id !== product.id);
    localStorage.setItem(cartProductsLs, JSON.stringify(newCart));
    this.setState({
      cartProduct: newCart,
    }, this.handleProduct());
  };

  increaseProduct = (product) => {
    const { cartProduct } = this.state;
    localStorage.setItem(cartProductsLs, JSON.stringify([...cartProduct, product]));
    this.handleProduct();
  };

  decreaseProduct = (product, index) => {
    const { cartProduct, produto } = this.state;
    if (produto[index].quantity === 1) return;
    const ids = cartProduct.map((element) => element.id);
    const indexId = ids.lastIndexOf(product.id);
    const remove = cartProduct.filter((_algo, removeIndex) => removeIndex !== indexId);
    localStorage.setItem(cartProductsLs, JSON.stringify(remove));
    this.handleProduct();
  };

  render() {
    const { produto, cartProduct } = this.state;
    return (
      <div>
        {
          !cartProduct
            ? (
              <p data-testid="shopping-cart-empty-message">
                Seu carrinho está vazio
              </p>
            )
            : (
              <section>
                {
                  produto.map(({ product, quantity }, index) => (
                    <div key={ product.id }>
                      <p
                        data-testid="shopping-cart-product-name"
                      >
                        {product.title}
                      </p>
                      <button
                        data-testid="remove-product"
                        onClick={ () => this.removeProduct(product) }
                      >
                        Remove
                      </button>
                      <p>
                        $
                        {product.price}
                      </p>
                      <button
                        data-testid="product-decrease-quantity"
                        onClick={ () => this.decreaseProduct(product, index) }
                      >
                        -
                      </button>
                      <p data-testid="shopping-cart-product-quantity">
                        {quantity}
                      </p>
                      <button
                        data-testid="product-increase-quantity"
                        onClick={ () => this.increaseProduct(product) }
                      >
                        +
                      </button>
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
