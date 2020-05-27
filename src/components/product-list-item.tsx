import * as React from 'react';

interface Props {
  title: string;
  description: string;
  price: string;
}

export default ({ title, description, price}: Props) => (
  <div className="card mx-2" style={{width: '18em'}}>
    <div className="card-body">
      <h5 className="card-title">
        {title}
      </h5>
      <p className="card-text">
        {description}
      </p>

      <h6>{price}</h6>
    </div>
  </div>
);
