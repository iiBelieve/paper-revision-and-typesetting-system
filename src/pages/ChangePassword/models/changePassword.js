import { postNewPassword } from '../../../services/user';

export default {
  namespace: 'changePassword',

  state: {
  },

  effects: {

    * revisePassword ({ payload, callback }, { call, put }) {
      console.log(payload);
      const response = yield call(postNewPassword, payload);
      console.log(response);
      yield put({
        type: 'saveStu',
        payload: response,
      });
      if (callback) callback(response);
    },

  },

  reducers: {
    saveStu(state, action) {
      return {
        ...state,
        studentInfo: {
          ...action.payload,
        }
      };
    },
  },
};
