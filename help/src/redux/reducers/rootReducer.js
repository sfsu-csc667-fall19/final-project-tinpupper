/*
* @Author: aadityac15
* @Date:   2019-11-27 22:11:36
 * @Last Modified by: aadityac15
 * @Last Modified time: 2019-12-10 01:40:50
*/

import {combineReducers} from 'redux';
import userReducer from './userReducer';
import businessReducer from './businessReducer';
export default combineReducers({
  userReducer,
  businessReducer,
});



