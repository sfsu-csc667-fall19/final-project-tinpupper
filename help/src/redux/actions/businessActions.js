import axios from 'axios';

const setBusinesses = businesses => ({
  type: 'BUSINESS_SET_BUSINESS',
  businesses,
});

export const listBusinesses = () => (dispatch, getState) => {
  axios.get('/list')
    .then((res) => dispatch(setBusinesses( res.data)))
    .then(console.log);
};

export const setId = _id => ({
  type: 'BUSINESS_SET_ID',
  _id,
});

export const setNewBusiness = newBusiness=> ({
  type: 'BUSINESS_SET_NEW_BUSINESS',
  newBusiness,
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
  })
  .catch(console.log);
}