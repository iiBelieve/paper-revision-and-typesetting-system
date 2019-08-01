import { getUserName } from '@/services/writing'
import {
  stuGetAllTeacher,
  stuSelectTeacher,
  getStuStatus,
  teacherGetAllStu,
  teacherSelectStu,
} from '@/services/twoWaySelection';

export default {
  namespace: 'twoWaySelection',

  state: {
  },

  effects: {
    // 获取个人信息
    * fetch ({ payload, callback }, { call, put }) {
      const response = yield call(getUserName, payload);
      yield put({
        type: 'saveStu',
        payload: response,
      });
      if (callback) callback(response);
    },

    * stuGetTeacher ({ payload, callback }, { call, put }) {
      const response = yield call(stuGetAllTeacher, payload);
      yield put({
        type: 'saveStu',
        payload: response,
      });
      if (callback) callback(response);
    },

    * studentSelectTeacher ({ payload, callback }, { call, put }) {
      const response = yield call(stuSelectTeacher, payload);
      yield put({
        type: 'saveStu',
        payload: response,
      });
      if (callback) callback(response);
    },

    * studentGetSelectTeacherStatus ({ payload, callback }, { call, put }) {
      const response = yield call(getStuStatus, payload);
      console.log(response);
      yield put({
        type: 'saveStu',
        payload: response,
      });
      if (callback) callback(response);
    },

    * teacherGetStudent ({ payload, callback }, { call, put }) {
      const response = yield call(teacherGetAllStu, payload);
      yield put({
        type: 'saveStu',
        payload: response,
      });
      if (callback) callback(response);
    },

    * teacherSelectStudent ({ payload, callback }, { call, put }) {
      const response = yield call(teacherSelectStu, payload);
      yield put({
        type: 'saveStu',
        payload: response,
      });
      if (callback) callback(response);
    },

  },

  reducers: {

  },
};
