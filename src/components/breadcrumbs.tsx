import * as React from 'react';

interface Props {
  labels: string[];
}

export default ({ labels }: Props) => (
  <nav aria-label="breadcrumb">
    <ol className="breadcrumb">
      {labels.slice(0, labels.length - 1).map((label, index) => <li key={`${label}-${index}`} className="breadcrumb-item"><a href="#">{label}</a></li>)}
      <li className="breadcrumb-item active" aria-current="page">{labels[labels.length - 1]}</li>
    </ol>
  </nav>
);
