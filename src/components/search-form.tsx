import * as React from 'react';
import { RootState } from '../reducers';
import { connect } from 'react-redux';
import { UPDATE_SEARCH_QUERY } from '../reducers/search-query';
import { Dispatch } from 'redux';

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
      type="text"
      value={query}
      onChange={(e) => onQueryChange(e.target.value)}
      onKeyUp={(e) => e.key === 'Enter' && onSearch(query)}
    />
    <button className="btn btn-success" onClick={(_) => onSearch(query)}>Search</button>
  </div>
);

const mapStateToProps = (state: RootState) => {
  return { query: state.query }
}

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    onQueryChange: (q: string) => dispatch({type: UPDATE_SEARCH_QUERY, value: q}),
    onSearch: (q: string) => console.log('searching for', q),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchFormComponent);
