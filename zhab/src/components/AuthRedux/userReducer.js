import { ADD_PK, ADD_USER, LOGOUT} from "./actions";

const initialState = {
    isSubmitted: false,
    token: '',
    username: '',
    pk: ''
  };
  
  const userReducer = (state = initialState, action) => {
    switch (action.type) {
      case ADD_USER:
        return {
          isSubmitted:  !state.isSubmitted,
          token:  action.payload.token,
          username: action.payload.username,
          pk: state.pk
        }
        case ADD_PK:
          return{
            isSubmitted: state.isSubmitted,
            token: state.token,
            username: action.payload.username,
            pk: action.payload.id-1

          }
          case LOGOUT:
            return{
              isSubmitted: false,
              token: '',
              username: '',
              pk: ''
  
            }
      default:
        return state;
    }
  };
  
  export default userReducer;