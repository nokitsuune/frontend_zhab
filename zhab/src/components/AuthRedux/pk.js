import { ADD_PK } from "./actions"

const addPK = (data) => {
  return {
    type: ADD_PK,
    payload: data,
  }
}


export default addPK; 