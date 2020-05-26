import * as React from 'react';

export default (_props: any) => (
<div className='d-flex flex-row mt-4 mb-4'>
    <input
      className="form-control mr-4 flex-grow-1"
      autoComplete="off"
      type="text"
    />
    <button className="btn btn-success">Search</button>
  </div>
);
