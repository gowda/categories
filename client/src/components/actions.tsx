import * as React from 'react';
import { useState } from 'react';

import AddNewProductAction from './add-new-product-action';
import AddNewCategoryAction from './add-new-category-action';

interface Props {
  handleProductCreate: (t: string, d: string, p: number, cs: string) => void;
  handleCategoryCreate: (label: string, parent?: string) => void;
}

export default ({ handleProductCreate, handleCategoryCreate }: Props) => {
  const [addingProduct, setAddingProduct] = useState(false);
  const [addingCategory, setAddingCategory] = useState(false);

  function handleNewProductClick() {
    setAddingCategory(false);
    setAddingProduct(true);
  }

  function handleNewCategoryClick() {
    setAddingProduct(false);
    setAddingCategory(true);
  }

  function handleNewProductAction(t: string, d: string, p: number, cs: string) {
    setAddingProduct(false);
    handleProductCreate(t, d, p, cs);
  }

  function handleNewCategoryAction(label: string, parent?: string) {
    setAddingCategory(false);
    handleCategoryCreate(label, parent);
  }

  return (
    <div>
      <div className="row mt-4">
        <div key="new-product" className="col-auto">
          <button
            type="button"
            className="btn btn-primary"
            onClick={handleNewProductClick}
            >
            New Product
          </button>
        </div>
        <div key="new-category" className="col-auto">
          <button
            type="button"
            className="btn btn-info"
            onClick={handleNewCategoryClick}
            >
            New Category
          </button>
        </div>
      </div>
      <div className="row mt-4">
        <div className="col-auto">
          {addingProduct && <AddNewProductAction onAction={handleNewProductAction} />}
          {addingCategory && <AddNewCategoryAction onAction={handleNewCategoryAction} />}
        </div>
      </div>
    </div>
  );
}
