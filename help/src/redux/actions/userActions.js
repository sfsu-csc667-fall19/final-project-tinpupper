/*
 * @Author: aadityac15
 * @Date:   2019-12-02 12:53:10
 * @Last Modified by:   aadityac15
 * @Last Modified time: 2019-12-03 03:23:15
 */

export const setUsername = username => ({
  type: "SET_USERNAME",
  username
});

export const setIsLoggedIn = isLoggedIn => ({
  type: "SET_IS_LOGGED_IN",
  isLoggedIn
});

export const setIsSignedUp = isSignedUp => ({
	type: "SET_IS_SIGNED_UP",
	isSignedUp
})

export const setIsBusiness = isBusiness => ({
	type: "SET_IS_BUSINESS",
	isBusiness,
})