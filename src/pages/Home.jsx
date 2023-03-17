import React from 'react';
import { Link } from 'react-router-dom';
// import { getProductsFromCategoryAndQuery } from '../services/api';

class Home extends React.Component {
  state = {
    listagemProdutos: [],
  };

  // getProductList = async (category, query) => {
  //   const productList = await getProductsFromCategoryAndQuery(category, query);
  //   this.setState({
  //     listagemProdutos: productList,
  //   });
  // };

  render() {
    const { listagemProdutos } = this.state;
    return (
      <div>
        <Link
          data-testid="shopping-cart-button"
          to="/shopping-cart"
        >
          Carrinho de Compras
        </Link>
        <label>
          <input type="text" />
        </label>
        {
          listagemProdutos.length === 0
            ? (
              <p data-testid="home-initial-message">
                Digite algum termo de pesquisa ou escolha uma categoria.
              </p>
            )
            : (
              <ul>
                <li />
              </ul>
            )
        }
      </div>

    );
  }
}

export default Home;
