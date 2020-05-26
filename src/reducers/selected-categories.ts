export const PUSH_TO_SELECTED_CATEGORIES = 'PUSH_TO_SELECTED_CATEGORIES';
export const POP_FROM_SELECTED_CATEGORIES = 'POP_FROM_SELECTED_CATEGORIES';

interface PushToSelectedCategories {
  type: typeof PUSH_TO_SELECTED_CATEGORIES;
  value: string;
}

interface PopFromSelectedCategories {
  type: typeof POP_FROM_SELECTED_CATEGORIES;
}

type SelectedCategoriesAction = PushToSelectedCategories | PopFromSelectedCategories;

export default (labels: string[] = [], action: SelectedCategoriesAction): string[] => {
  switch (action.type) {
    case PUSH_TO_SELECTED_CATEGORIES:
      return [...labels, action.value];
    case POP_FROM_SELECTED_CATEGORIES:
      return [...labels.slice(0, labels.length - 1)];
    default:
      return labels;
  }
}
