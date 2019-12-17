import axios from 'axios';

/************************
 * JOHN (12/10/2019)
 ************************/
export const getUpdatedBusinesses = businesses => ({
  type: 'BUSINESS_GET_BUSINESS',
  businesses,
});

/************************
 * JOHN (12/10/2019): Thunk
 ************************/
export const getUpdatedBusinessesAsync = () => dispatch => {
  console.log('inside thunk getUpdatedBusinessesAsync');
  axios
    .get('/restaurant')
    .then(res => {
      console.log('Got all restaurants');
      dispatch(getUpdatedBusinesses(res.data.restaurants));
    })
    .catch(e => {
      console.log('failed to get all restaurants');
      console.log(e);
    });
};

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

export const addNewBusiness = newBusiness => ({
  type: 'ADD_NEW_BUSINESS',
  newBusiness,
});

export const setRestaurantDescription = description => ({
  type: "SET_RESTAURANT_DESCRIPTION",
  description
});

export const setRestaurantName = name => ({
  type : "SET_RESTAURANT_NAME",
  name
})

export const setBusinessesId = businessId => ({
  type: "SET_BUSINESS_ID",
  businessId,
})


export const setOwnedBusinesses = business => ({
  type: "SET_OWNED_BUSINESS",
  business,
})