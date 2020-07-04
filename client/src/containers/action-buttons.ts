import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';

import Actions from '../components/actions';
import { createProduct } from '../actions/products';
import { createCategory } from '../actions/categories';

interface DispatchProps {
  handleProductCreate: (t: string, d: string, p: number, cs: string) => void;
  handleCategoryCreate: (label: string, parent?: string) => void;
}

const mapDispatchToProps = (dispatch: ThunkDispatch<{}, {}, any>): DispatchProps => {
  return {
    handleProductCreate: (title: string, description: string, price: number, categories: string) => {
      dispatch(createProduct(title, description, price, categories.split(',')));
    },
    handleCategoryCreate: (label: string, parent?: string) => {
      dispatch(createCategory(label, parent));
    }
  }
};

export default connect(null, mapDispatchToProps)(Actions);
