import produce from 'immer';

const INITIAL_STATE = {
  token: null,
  signed: false,
  loading: false,
};

export default function auth(state = INITIAL_STATE, {type, payload}) {
  return produce(state, draft=> {
    switch(type) {
      case '@auth/LOGIN_REQUEST':{
        draft.loading = true;
        break;
      }
      case '@auth/LOGIN_SUCCESS':{
        draft.token = payload.token;
        draft.signed = true;
        draft.loading = false;
        break;
      }
      case '@auth/LOGIN_FAILURE':{
        draft.loading = false;
        break;
      }
      case '@auth/LOGOUT': {
        draft.token = null;
        draft.signed = false;
        break;
      }
      default:
    }
  });
}
