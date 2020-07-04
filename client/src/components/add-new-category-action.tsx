import * as React from 'react';
import { useRef } from 'react';

interface Props {
  onAction: (label: string, parentId?: string) => void;
}

export default ({ onAction }: Props) => {
  const labelElement = useRef<HTMLInputElement>(null);
  const parentElement = useRef<HTMLInputElement>(null);

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();

    onAction(labelElement.current!.value, parentElement.current!.value);
  }

  return (
    <div className="row">
      <div key="new-category" className="col-auto">
        <h4>Add new category</h4>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="label">Label</label>
            <input ref={labelElement} type="text" className="form-control" id="label" placeholder="Category label"></input>
            <small id="labelHelp" className="form-text text-muted">This is useful in identifyin the category by users</small>
          </div>
          <div className="form-group">
            <label htmlFor="parent">Parent category</label>
            <input ref={parentElement} type="text" className="form-control" id="parent" placeholder="Electronics"></input>
          </div>
          <button type="submit" className="btn btn-secondary mr-2">Discard</button>
          <button type="submit" className="btn btn-primary">Submit</button>
        </form>
      </div>
    </div>
  );
}
