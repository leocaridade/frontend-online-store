import React from 'react';
import { Link } from 'react-router-dom';
import { getCategories } from '../services/api';
// import { getProductsFromCategoryAndQuery } from '../services/api';

class Home extends React.Component {
  state = {
    listagemProdutos: [],
  };

  async componentDidMount() {
    const productList = await getCategories();

    this.setState({
      listagemProdutos: productList,
    });
  }

  // getProductList = async (category, query) => {
  //   const productList = await getProductsFromCategoryAndQuery(category, query);
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
      </div>

    );
  }
}

export default Home;
