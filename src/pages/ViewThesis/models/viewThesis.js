import { getThesis, getStudent, getMessages, getTeacher, sendMessage } from '@/services/teacherInfo';

export default {
  namespace: 'viewThesis',

  state: {
    html: {
      render: ''
    },
    teach: {
      guidance:[]
    },
    message: {
      list: []
    },
    teacherInfo: {
      teacherNum: "",
      deptNum: null,
      teacherSex: null,
      teacherName: "",
      teacherBirthday: null,
      teacherPassword: "",
      teacherTitle: null,
      createTime: "",
      updateTime: null,
      status: null
    },
  },

  effects: {

    * fetch ({ payload, callback }, { call, put }) {
      const response1 = yield call(getThesis, payload);
      console.log(response1 === undefined);
      if (response1 !== undefined) {
        yield put({
          type: 'saveHTML',
          payload: response1,
        });
        if (callback) callback(response1);
        console.log(response1)
      }

      if (response1 === undefined) {
        const noData = "noData";
        yield put({
          type: 'save',
          payload: noData,
        });
        if (callback) callback(noData);
        console.log(noData)
      }

    },

    * getStuInfo ({ payload, callback }, { call, put }) {
      const response = yield call(getStudent, payload);
      console.log("response");
      console.log(response);
      yield put({
        type: 'saveStuInfo',
        payload: response,
      });
      if (callback) callback(response);
    },

    * getChat ({ payload, callback }, { call, put }) {
      console.log(payload);
      const response = yield call(getMessages, payload);
      console.log(response);
      yield put({
        type: 'saveMessage',
        payload: response,
      });
      if (callback) callback(response);
    },

    // 获取老师个人信息
    * getTeacherMyself ({ payload, callback }, { call, put }) {
      console.log(payload);
      const response2 = yield call(getTeacher, payload);
      console.log(response2);
      yield put({
        type: 'saveTea',
        payload: response2,
      });
      if (callback) callback(response2);
    },

    * sendChat({ payload, callback }, { call, put }) {
      console.log(payload);
      const response = yield call(sendMessage, payload);
      yield put({
        type: 'save',
        payload: response,
      });
      if (callback) callback();
    },

  },

  reducers: {

    save(state, action) {
      return {
        ...state,
        data: action.payload,
      };
    },

    saveTea(state, action) {
      return {
        ...state,
        teacherInfo: {
          ...action.payload,
        }
      };
    },

    saveStuInfo(state, action) {
      return {
        ...state,
        teach: {
          ...action.payload,
        }
      };
    },

    saveMessage(state, action) {
      return {
        ...state,
        message: {
          ...action.payload,
        }
      };
    },

    saveHTML(state, action) {
      return {
        ...state,
        html: {
          ...action.payload,
        }
      };
    },

  },
};
