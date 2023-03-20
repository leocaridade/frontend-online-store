import React from 'react';
import { Link } from 'react-router-dom';
import { getCategories, getProductsFromCategoryAndQuery } from '../services/api';

class Home extends React.Component {
  state = {
    allProducts: [],
    searchedProducts: [],
    inputValue: '',
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

  render() {
    const { allProducts, inputValue, searchedProducts } = this.state;

    const listProducts = (
      searchedProducts.map((product) => (
        <li
          key={ product.id }
          data-testid="product"
        >
          <p>{ product.title }</p>
          <img src={ product.thumbnail } alt={ product.title } />
          <p>
            $
            { product.price }
          </p>
        </li>
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
