import { studentRegister, teacherRegister } from '@/services/login';

export default {
  namespace: 'register',

  state: {
  },

  effects: {

    * studentSignUp ({ payload, callback }, { call, put }) {
      console.log(payload);
      const response = yield call(studentRegister, payload);
      console.log(response);
      yield put({
        type: 'saveStu',
        payload: response,
      });
      if (callback) callback(response);
    },

    * teacherSignUp ({ payload, callback }, { call, put }) {
      console.log(payload);
      const response = yield call(teacherRegister, payload);
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
