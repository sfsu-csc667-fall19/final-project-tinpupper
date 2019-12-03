/*
* @Author: aadityac15
* @Date:   2019-11-27 22:11:36
* @Last Modified by:   aadityac15
* @Last Modified time: 2019-11-27 23:54:05
*/

import {combineReducers} from 'redux';
// import notesReducer from './notesReducer';
import userReducer from './userReducer';
import businessReducer from './businessReducer';
export default combineReducers({
  userReducer,
  businessReducer,
});



