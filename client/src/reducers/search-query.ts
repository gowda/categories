export const UPDATE_SEARCH_QUERY = 'UPDATE_SEARCH_QUERY';

interface UpdateSearchQueryAction {
  type: typeof UPDATE_SEARCH_QUERY;
  value: string;
}

export default (query: string = '', action: UpdateSearchQueryAction): string => {
  switch (action.type) {
    case UPDATE_SEARCH_QUERY:
      return action.value;
    default:
      return query;
  }
}
