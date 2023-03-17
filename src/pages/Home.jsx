import React from 'react';
import { Link } from 'react-router-dom';
import { getCategories, getProductsFromQuery } from '../services/api';

class Home extends React.Component {
  state = {
    listagemProdutos: [],
    searchedProducts: [],
    inputValue: '',
  };

  async componentDidMount() {
    const productList = await getCategories();

    this.setState({
      listagemProdutos: productList,
    });
  }

  onInputChange = ({ target }) => {
    const { name, value } = target;

    this.setState({
      [name]: value,
    });
  };

  getProductList = async (query) => {
    const data = await getProductsFromQuery(query);

    this.setState({
      searchedProducts: data.results,
    });
  };

  render() {
    const { listagemProdutos, inputValue, searchedProducts } = this.state;

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
          onClick={ () => this.getProductList(inputValue) }
        >
          pesquisar
        </button>
        <div className="contaner-home">
          {
            listagemProdutos.length === 0
              ? (
                <p data-testid="home-initial-message">
                  Digite algum termo de pesquisa ou escolha uma categoria.
                </p>
              )
              : (
                <aside>
                  <ul className="product-list">
                    {
                      listagemProdutos.map((produto) => (
                        <button
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
