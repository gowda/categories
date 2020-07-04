import { RootState } from "../reducers";

import CategoryList from '../components/category-list';
import { connect } from "react-redux";
import { Category } from "../reducers/categories";

interface StateProps {
  items: Category[];
}

const mapStateToProps = (state: RootState): StateProps => {
  return {
    items: state.categories,
  }
};

export default connect(mapStateToProps)(CategoryList)
