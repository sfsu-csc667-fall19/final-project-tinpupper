/*
 * @Author: aadityac15
 * @Date:   2019-12-02 12:53:10
 * @Last Modified by:   aadityac15
 * @Last Modified time: 2019-12-02 12:54:39
 */

export const setUsername = username => ({
  type: "SET_USERNAME",
  username
});

export const setIsLoggedIn = isLoggedIn => ({
  type: "SET_IS_LOGGED_IN",
  isLoggedIn
});
