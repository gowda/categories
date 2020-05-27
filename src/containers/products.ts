import { connect } from "react-redux";

import { Product } from "../reducers/products";
import { RootState } from "../reducers";

import ProductList from '../components/product-list';

interface Props {
  items: Product[];
}

const mapStateToProps = (state: RootState): Props => {
  return {
    items: state.products,
  }
};

export default connect(mapStateToProps)(ProductList);
