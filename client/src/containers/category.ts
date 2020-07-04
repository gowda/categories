import { PUSH_TO_SELECTED_CATEGORIES } from '../reducers/selected-categories';
import { connect } from 'react-redux';
import { getProductsFor } from '../actions/products';
import { ThunkDispatch } from 'redux-thunk';
import { getCategoriesFor } from '../actions/categories';

import CategoryListItem from '../components/category-list-item';

interface OwnProps {
  id: string;
  label: string;
}

interface DispatchProps {
  handleClick: () => void;
}

type Props = OwnProps & DispatchProps;

const mapDispatchToProps = (dispatch: ThunkDispatch<{}, {}, any>, ownProps: OwnProps): Props => {
  return {
    ...ownProps,
    handleClick: () => {
      dispatch({type: PUSH_TO_SELECTED_CATEGORIES, value: {...ownProps}});
      dispatch(getCategoriesFor(ownProps.id));
      dispatch(getProductsFor(ownProps.id));
    }
  }
};

export default connect(null, mapDispatchToProps)(CategoryListItem)
