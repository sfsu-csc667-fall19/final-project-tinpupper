import axios from 'axios';

const setBusinesses = businesses => ({
  type: 'BUSINESS_SET_BUSINESS',
  businesses,
});

export const listBusinesses = () => (dispatch, getState) => {
  axios
    .get('/restaurant')
    .then(res => dispatch(setBusinesses(res.data)))
    .then(console.log)
    .catch(err => {
      console.log('ERROR');
      console.log(err.response);
    });
};



export const setId = _id => ({
  type: 'BUSINESS_SET_ID',
  _id,
});

export const setNewBusiness = newBusiness=> ({
  type: 'BUSINESS_SET_NEW_BUSINESS',
  newBusiness,
});

export const setIsRedirect = isRedirect=> ({
  type: 'SET_REDIRECT',
  isRedirect
});

export const setCurrentBusiness = currentBusiness => ({
  type: 'BUSINESS_SET_CURRENT_BUSINESS',
  currentBusiness,
});

export const updateBusiness = () => (dispatch, getState) => {
  const {_id , newBusiness} = getState().businessReducer;
 // const _id = getState().notesReducer._id;
  //const newNote  = getState().newReducer.newNote;

  axios.get(`/update?_id=${_id}&businesses=${newBusiness}`)
  .then((res) => {
    dispatch(setNewBusiness(''));
    dispatch(setId(''));
    dispatch(listBusinesses());
    dispatch(setCurrentBusiness());
  })
  .catch(console.log);
}