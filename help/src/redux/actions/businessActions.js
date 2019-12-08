import axios from 'axios';

export const setBusinesses = businesses => ({
  type: 'BUSINESS_SET_BUSINESS',
  businesses,
});

export const setId = _id => ({
  type: 'BUSINESS_SET_ID',
  _id,
});

export const setNewBusiness = newBusiness => ({
  type: 'BUSINESS_SET_NEW_BUSINESS',
  newBusiness,
});

export const setIsRedirect = isRedirect => ({
  type: 'SET_REDIRECT',
  isRedirect,
});

export const setCurrentBusiness = currentBusiness => ({
  type: 'BUSINESS_SET_CURRENT_BUSINESS',
  currentBusiness,
});


