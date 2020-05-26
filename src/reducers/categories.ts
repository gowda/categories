export const RECEIVE_CATEGORIES = 'RECEIVE_CATEGORIES';

export interface Category {
  label: string;
}

interface CategoryAction {
  type: typeof RECEIVE_CATEGORIES;
  value: Category[];
}

export default (categories: Category[] = [], action: CategoryAction): Category[] => {
  switch (action.type) {
    case RECEIVE_CATEGORIES:
      return action.value;
    default:
      return categories;
  }
}
