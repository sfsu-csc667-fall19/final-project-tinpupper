/*
* @Author: aadityac15
* @Date:   2019-11-27 23:56:55
* @Last Modified by:   aadityac15
* @Last Modified time: 2019-12-02 13:00:27
*/

// Step 1 initialize state
const INITIAL_STATE = {
  username: '',
  isLoggedIn: false,
};

const userReducer = (state = INITIAL_STATE, action) => {

	 switch (action.type) {
    case 'SET_IS_LOGGED_IN':
      return {
        ...state,
        isLoggedIn: action.isLoggedIn,
      };
    case 'SET_USERNAME':
      return {
        ...state, // spread operator
        username: action.username,
      };
    

    default:
      return state;
  }
};

// don't forget to export
export default userReducer;
