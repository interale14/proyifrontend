const initialState = {
  hasMore:false,
  items:[],
  fetching:false,
  hasErrors:false,
  errors:[],
  currentPage:0,
  pageSize:10,
  totalPages:0
}

const messageReducer = (state=initialState, action)=>{
  const {type, payload} = action;
  switch( type ){
    case "MESSAGE_START_FETCH":
      return {
        ...state,
        fetching:true,
        hasErrors:false,
        errors:[]
      }
    case "MESSAGE_FETCH_SUCCESS":
      const totalPages = (Math.floor(payload.docsMatched / payload.itemsPerPage));
      const hasMore = payload.page !== totalPages;
      return {
        ...state,
        fetching:false,
        hasErrors:false,
        errors:[],
        totalPages: totalPages,
        currentPage: payload.page,
        items: [state.items, ...payload.documents],
        hasMore: hasMore,
      }
  default:
    return state;
  }
}

export default messageReducer;
