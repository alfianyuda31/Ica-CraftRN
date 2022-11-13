const initHome = {
  craft: [],
  newCraft: [],
  popular: [],
  recommended: [],
};

export const homeReducer = (state = initHome, action) => {
  if (action.type === 'SET_CRAFT') {
    return {
      ...state,
      craft: action.value,
    };
  }
  if (action.type === 'SET_NEW_CRAFT') {
    return {
      ...state,
      newCraft: action.value,
    };
  }
  if (action.type === 'SET_POPULAR') {
    return {
      ...state,
      popular: action.value,
    };
  }
  if (action.type === 'SET_RECOMMENDED') {
    return {
      ...state,
      recommended: action.value,
    };
  }
  return state;
};
