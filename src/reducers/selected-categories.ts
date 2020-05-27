import { Category } from "./categories";

export const PUSH_TO_SELECTED_CATEGORIES = 'PUSH_TO_SELECTED_CATEGORIES';
export const POP_FROM_SELECTED_CATEGORIES = 'POP_FROM_SELECTED_CATEGORIES';
export const RESET_SELECTED_CATEGORIES = 'RESET_SELECTED_CATEGORIES';

interface PushToSelectedCategories {
  type: typeof PUSH_TO_SELECTED_CATEGORIES;
  value: Category;
}

interface PopFromSelectedCategories {
  type: typeof POP_FROM_SELECTED_CATEGORIES;
  downto?: number;
}

interface ResetSelectedCategories {
  type: typeof RESET_SELECTED_CATEGORIES;
}

type SelectedCategoriesAction = PushToSelectedCategories | PopFromSelectedCategories | ResetSelectedCategories;

export default (categories: Category[] = [], action: SelectedCategoriesAction): Category[] => {
  switch (action.type) {
    case PUSH_TO_SELECTED_CATEGORIES:
      return [...categories, action.value];
    case POP_FROM_SELECTED_CATEGORIES:
      const endIndex = action.downto ? action.downto : categories.length - 1;
      return [...categories.slice(0, endIndex)];
    case RESET_SELECTED_CATEGORIES:
      return [];
    default:
      return categories;
  }
}
