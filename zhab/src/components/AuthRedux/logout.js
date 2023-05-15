import { LOGOUT } from "./actions"

const out = (data) => {
  return {
    type: LOGOUT,
    payload: data,
  }
}


export default out; 