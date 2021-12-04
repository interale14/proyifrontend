import { privateAxios } from "../../utils/Axios";
export const fetchMessageData = (dispatch, page, pageItem, text)=>{
  dispatch(
    {
      type:"MESSAGE_START_FETCH",
      payload:null
    }
  )
  privateAxios.get(`/api/swot/facet/${page}/${pageItem}`)
  .then(({data})=>{
    console.log(data);
    dispatch(
      {
        type:"MESSAGE_FETCH_SUCCESS",
        payload: data
      }
    )
  })
  .catch((err)=>{
    console.log(err);
    dispatch(
      {
        type:"MESSAGE_FETCH_ERROR",
        payload: ["Error al obtener la información."]
      }
    )
  });
}
