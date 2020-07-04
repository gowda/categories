import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';

import { Category } from '../reducers/categories';
import { POP_FROM_SELECTED_CATEGORIES } from '../reducers/selected-categories';
import { getProductsFor } from '../actions/products';
import { getCategoriesFor } from '../actions/categories';
import { RootState } from '../reducers';

import Breadcrumbs from '../components/breadcrumbs';

interface StateProps {
  categories: Category[];
}

interface DispatchProps {
  handleClick: (id: string, index: number) => void;
}

const mapStateToProps = (state: RootState): StateProps => {
  return {
    categories: state.selectedCategories,
  }
};

const mapDispatchToProps = (dispatch: ThunkDispatch<{}, {}, any>): DispatchProps => {
  return {
    handleClick: (id, index) => {
      dispatch({type: POP_FROM_SELECTED_CATEGORIES, value: index});
      dispatch(getCategoriesFor(id));
      dispatch(getProductsFor(id));
    }
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Breadcrumbs)
