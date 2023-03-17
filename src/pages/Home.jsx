import React from 'react';
import { getProductsFromCategoryAndQuery } from '../services/api'

class Home extends React.Component {
  state = {
    listagemProdutos: [],
  }

  getProductList = async (category, query) => {
    const productList = await getProductsFromCategoryAndQuery(category, query);
    this.setState({
      listagemProdutos: productList
    })
  }

 render() {
  const { listagemProdutos } = this.state;
    return (
      <div>
        <label>
        <input type="text" />
        </label>
        {
          listagemProdutos.length === 0 ? (<p data-testid="home-initial-message">Digite algum termo de pesquisa ou escolha uma categoria.</p>) : <ul>
          <li></li>
        </ul>   
        }
      </div>

    );
 }
};

export default Home;