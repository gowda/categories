import * as React from 'react';
import { PUSH_TO_SELECTED_CATEGORIES } from '../reducers/selected-categories';
import { connect } from 'react-redux';
import { getProductsFor } from '../actions/products';
import { ThunkDispatch } from 'redux-thunk';

interface OwnProps {
  label: string;
}

interface DispatchProps {
  handleClick: (v: string) => void;
}

type Props = OwnProps & DispatchProps;

const CategoryComponent = ({ label, handleClick }: Props) => (
  <a href='#' onClick={(e) => { e.preventDefault(); handleClick(label) }}>
    <h6 className="mb-4">{label}</h6>
  </a>
);

const mapDispatchToProps = (dispatch: ThunkDispatch<{}, {}, any>, ownProps: OwnProps): Props => {
  return {
    ...ownProps,
    handleClick: (value) => {
      dispatch({type: PUSH_TO_SELECTED_CATEGORIES, value});
      dispatch(getProductsFor(value));
    }
  }
};

export default connect(null, mapDispatchToProps)(CategoryComponent)
