import * as React from 'react';

interface Props {
  label: string;
}

export default ({ label }: Props) => (<h6 className="mb-4">{label}</h6>);
