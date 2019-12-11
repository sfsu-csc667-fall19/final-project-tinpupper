const DEFAULT_STATE = {
  businesses: [],
  _id: '',
  newBusiness: '',
  isRedirect: false,
  currentBusiness: '',
  businessesId: [],
  ownedBusinesses: [],
};
//THIS IS TEMPORARY IN ORDER TO DISPLAY SOMETHING
//will be replaced with an axios call and an empty array for businesses

const businessReducer = (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    case 'BUSINESS_SET_ID':
      return {
        ...state,
        _id: action._id,
      };
    case 'BUSINESS_SET_NEW_BUSINESS':
      return {
        ...state,
        newBusiness: action.newBusiness,
      };
    case 'BUSINESS_SET_BUSINESS':
      return {
        ...state,
        businesses: action.businesses,
      };
    /************************
     * JOHN (12/10/2019): This is different from SET_BUSINESSES
     ************************/
    case 'BUSINESS_GET_BUSINESS':
      return {
        ...state,
        businesses: action.businesses,
      };
    case 'SET_REDIRECT':
      return {
        ...state,
        isRedirect: action.isRedirect,
      };
    case 'BUSINESS_SET_CURRENT_BUSINESS':
      return {
        ...state,
        currentBusiness: action.currentBusiness,
      };
    case 'ADD_NEW_BUSINESS':
      return {
        ...state,
        newBusiness: action.newBusiness,
      };
    case 'SET_BUSINESS_ID':
      return {
        ...state,
        businessesId: action.businessId
      }
    case 'SET_OWNED_BUSINESS':
      return {
        ...state,
        ownedBusinesses: action.business,
      }

    default:
      return state;
  }
};

export default businessReducer;
