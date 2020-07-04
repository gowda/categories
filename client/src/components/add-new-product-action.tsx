import * as React from 'react';
import { useRef } from 'react';

interface Props {
  onAction: (t: string, d: string, p: number, cs: string) => void;
}

export default ({ onAction }: Props) => {
  const titleElement = useRef<HTMLInputElement>(null);
  const descriptionElement = useRef<HTMLTextAreaElement>(null);
  const priceElement = useRef<HTMLInputElement>(null);
  const categoriesElement = useRef<HTMLInputElement>(null)

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();

    onAction(
      titleElement.current!.value,
      descriptionElement.current!.value,
      parseInt(priceElement.current!.value, 10),
      categoriesElement.current!.value,
    );
  }

  return (
    <div className="row">
      <div key="new-product" className="col-auto">
        <h4>Add new product</h4>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input ref={titleElement} type="text" className="form-control" id="title" placeholder="Enter product title"></input>
            <small className="form-text text-muted">
              This is useful for users to search for product
              </small>
          </div>
          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea ref={descriptionElement} className="form-control" id="description" placeholder="Detailed product description..."></textarea>
          </div>
          <div className="form-group">
            <label htmlFor="price">Price (in INR)</label>
            <input ref={priceElement} type="text" className="form-control" id="price" placeholder="42"></input>
          </div>
          <div className="form-group">
            <label htmlFor="categories">Categories</label>
            <input ref={categoriesElement} type="text" className="form-control" id="categories" placeholder="Electronics, Mobile, ..."></input>
            <small id="categoriesHelp" className="form-text text-muted">Categories the product belongs to. Comma-separated list</small>
          </div>
          <button type="submit" className="btn btn-secondary mr-2">Discard</button>
          <button type="submit" className="btn btn-primary">Save</button>
        </form>
      </div>
    </div>
  );
}
