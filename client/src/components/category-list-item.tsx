import * as React from 'react';

interface Props {
  id: string;
  label: string;
  handleClick: () => void;
}

export default ({ label, handleClick }: Props) => (
  <a href='#' onClick={(e) => { e.preventDefault(); handleClick() }}>
    <h6 className="mb-4">{label}</h6>
  </a>
);
