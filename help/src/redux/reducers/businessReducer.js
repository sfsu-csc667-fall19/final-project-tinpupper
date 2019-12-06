const DEFAULT_STATE = {
    businesses: [],
    _id: '',
    newBusiness: '',
    isRedirect: false,
    currentBusiness: '',
};
//THIS IS TEMPORARY IN ORDER TO DISPLAY SOMETHING
//will be replaced with an axios call and an empty array for businesses

const businessReducer = (state = DEFAULT_STATE, action) => {
    switch (action.type) {
        case 'BUSINESS_SET_ID':
            return {
                ...state,
                _id: action._id
            }
        case 'BUSINESS_SET_NEW_BUSINESS':
            return {
                ...state,
                newBusiness: action.newBusiness
            }
        case 'BUSINESS_SET_BUSINESS':
            return {
                ...state,
                businesses: action.businesses
            }
        case 'SET_REDIRECT':
            return {
                ...state,
                isRedirect: action.isRedirect
            }
        case 'BUSINESS_SET_CURRENT_BUSINESS':
            return {
                ...state,
                currentBusiness: action.currentBusiness
            }
        default:
            return state;
    }
};

export default businessReducer;
