/*
* @Author: aadityac15
* @Date:   2019-11-27 23:56:55
* @Last Modified by:   aadityac15
* @Last Modified time: 2019-11-28 00:00:05
*/

// Step 1 initialize state
const INITIAL_STATE = {
  email: 'temp',
  isLoggedIn: false,
  activeUsers: 0,
  notes : []
};

const userReducer = (state = INITIAL_STATE, action) => {

	 switch (action.type) {
    case 'SET_IS_LOGGED_IN':
      return {
        ...state,
        isLoggedIn: action.isLoggedIn,
      };
    case 'SET_EMAIL':
      return {
        ...state, // spread operator
        // email: state.email,
        // isLoggedIn: state.isLoggedIn,
        email: action.email,
      };
    case 'SET_ACTIVE_USERS':
      return {
        ...state,
        activeUsers: action.activeUsers,
      };

    default:
      return state;
  }
};

// don't forget to export
export default userReducer;
