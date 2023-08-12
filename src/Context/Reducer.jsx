export const reducer = (state, action) => {
  switch (action.type) {
    case "NEW-LIST":
      return {
        ...state,
        list:[...state.list, action.payload]
      };

    case "DELETE-LIST":
      return { ...state,
         list: state.list.filter((_, i) => i !== action.payload) };

     case "EDIT-LIST":
      const updatedList = [...state.list];
      updatedList[action.payload.index].list = action.payload.text;
      updatedList[action.payload.index].complete = action.payload.complete;
      return {
        ...state,
        list: updatedList
      };

      case "COMPLETE-LIST":
        const completedList = [...state.list];
        completedList[action.payload.index].complete = action.payload.complete;
        return {
          ...state,
          list: completedList
        };
    default:
      return state; // Return state if no action type matches
  }
};
