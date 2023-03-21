import React from 'react';
import { Link } from 'react-router-dom';
import { getCategories, getProductsFromCategoryAndQuery } from '../services/api';

class Home extends React.Component {
  state = {
    allProducts: [],
    searchedProducts: [],
    inputValue: '',
    cartProducts: [],
  };

  async componentDidMount() {
    const productList = await getCategories();

    this.setState({
      allProducts: productList,
    });
  }

  onInputChange = ({ target }) => {
    const { name, value } = target;

    this.setState({
      [name]: value,
    });
  };

  getProductList = async (categoria, termo) => {
    const data = await getProductsFromCategoryAndQuery(categoria, termo);

    this.setState({
      searchedProducts: data.results,
    });
  };

  getCategoriesList = async (categoria, termo) => {
    const response = await getProductsFromCategoryAndQuery(categoria, termo);
    const allProducts = response.results;
    this.setState({
      searchedProducts: allProducts,
    });
  };

  addCart = (product) => {
    this.setState((prevState) => ({
      cartProducts: [...prevState.cartProducts, product],
    }), () => {
      const { cartProducts } = this.state;
      localStorage.setItem('cart-products', JSON.stringify(cartProducts));
    });
  };

  render() {
    const { allProducts, inputValue, searchedProducts } = this.state;
    const listProducts = (
      searchedProducts.map((product) => (
        <div
          key={ product.id }
          data-testid="product"
        >
          <section>
            <Link
              to={ `/product-details/${product.id}` }
              data-testid="product-detail-link"
              produtos={ product }
            >
              <p>{ product.title }</p>
              <img src={ product.thumbnail } alt={ product.title } />
              <p>
                $
                { product.price }
              </p>
            </Link>
            <button
              data-testid="product-add-to-cart"
              onClick={ () => this.addCart(product) }
            >
              Adicionar ao Carrinho
            </button>
          </section>
        </div>
      ))
    );

    const textError = (
      <p>Nenhum produto foi encontrado</p>
    );

    return (
      <div>
        <Link
          data-testid="shopping-cart-button"
          to="/shopping-cart"
        >
          Carrinho de Compras
        </Link>
        <input
          data-testid="query-input"
          type="text"
          name="inputValue"
          onChange={ this.onInputChange }
        />
        <button
          data-testid="query-button"
          onClick={ () => this.getProductList('', inputValue) }
        >
          pesquisar
        </button>
        <div className="contaner-home">
          {
            allProducts.length === 0
              ? (
                <p data-testid="home-initial-message">
                  Digite algum termo de pesquisa ou escolha uma categoria.
                </p>
              )
              : (
                <aside>
                  <ul className="product-list">
                    {
                      allProducts.map((produto) => (
                        <button
                          onClick={ () => this.getCategoriesList(produto.id, '') }
                          key={ produto.id }
                          data-testid="category"
                        >
                          {produto.name}
                        </button>
                      ))
                    }
                  </ul>
                </aside>
              )
          }
          <section className="products">
            {
              searchedProducts.length === 0 ? textError : (<ul>{ listProducts }</ul>)
            }
          </section>
        </div>
      </div>
    );
  }
}

export default Home;
