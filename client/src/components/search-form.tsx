import * as React from 'react';
import { RootState } from '../reducers';
import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { updateSearchQuery, search } from '../actions/search-query';

interface Props {
  query: string;
  onQueryChange: (q: string) => void;
  onSearch: (q: string) => void;
}

const SearchFormComponent = ({query, onQueryChange, onSearch}: Props) => (
  <div className='d-flex flex-row mt-4 mb-4'>
    <input
      className="form-control mr-4 flex-grow-1"
      autoComplete="off"
      type="search"
      value={query}
      onChange={(e) => onQueryChange(e.target.value)}
      onKeyUp={(e) => e.key === 'Enter' && onSearch(query)}
    />
    <button className="btn btn-success" onClick={(_) => onSearch(query)}>
      Search
    </button>
  </div>
);

const mapStateToProps = (state: RootState) => {
  return { query: state.query }
}


const mapDispatchToProps = (dispatch: ThunkDispatch<{}, {}, any>) => {
  return {
    onQueryChange: (q: string) => dispatch(updateSearchQuery(q)),
    onSearch: (q: string) => dispatch(search(q)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchFormComponent);
