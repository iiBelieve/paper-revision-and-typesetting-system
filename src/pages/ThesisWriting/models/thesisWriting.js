import { saveThesis, stuInfo, getThesis, getMessages, sendMessage, downLoadDoc, getDoc, getHTML } from '@/services/writing';

export default {
  namespace: 'thesisWriting',

  state: {
    studentInfo: {
      studentNum: '',
      studentName: '',
      studentSex: '',
      studentBirthday: null,
      studentPassword: '',
      createTime: '',
      updateTime: '',
      majorNum: null,
      teacherName: '',
      teacherNum: null,
      status: null
    },
    thesis: {
      blocks: [],
      entityMap: {}
    },
    message: {
      list: []
    },
    html: {
      render: ''
    }
  },

  effects: {

    // 获取学生个人信息
    * fetch ({ payload, callback }, { call, put }) {
      console.log(payload);
      const response = yield call(stuInfo, payload);
      console.log(response);
      yield put({
        type: 'saveStu',
        payload: response,
      });
      if (callback) callback(response);
    },

    // post 论文
    * post({ payload, callback }, { call, put }) {
      console.log(payload);
      const response = yield call(saveThesis, payload);
      yield put({
        type: 'save',
        payload: response,
      });
      if (callback) callback();
    },

    * getThesis ({ payload, callback }, { call, put }) {
      console.log(payload);
      const response = yield call(getThesis, payload);
      console.log("论文 ");
      console.log(response);
      yield put({
        type: 'saveThesis',
        payload: response,
      });
      if (callback) callback();
    },

    * getChat ({ payload, callback }, { call, put }) {
      console.log(payload);
      const response = yield call(getMessages, payload);
      yield put({
        type: 'saveMessage',
        payload: response,
      });
      if (callback) callback();
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

    * wordDownLoad({ payload, callback }, { call, put }) {
      console.log(payload);
      const data = new FormData();
      data.append('content', payload);
      const response = yield call(downLoadDoc, data);
      yield put({
        type: 'save',
        payload: response,
      });
      if (callback) callback(response);
    },

    * doc({ payload, callback }, { call, put }) {
      console.log(payload);
      const response = yield call(getDoc, payload);
      console.log("1111");
      yield put({
        type: 'save',
        payload: response,
      });
      if (callback) callback(response);
    },

    * HTMLget ({ payload, callback }, { call, put }) {
      const response1 = yield call(getHTML, payload);
      yield put({
        type: 'saveHTML',
        payload: response1,
      });
      if (callback) callback(response1);
    },

  },

  reducers: {

    save(state, action) {
      return {
        ...state,
        data: {
          ...action.payload,
        }
      };
    },

    saveStu(state, action) {
      return {
        ...state,
        studentInfo: {
          ...action.payload,
        }
      };
    },

    saveThesis(state, action) {
      return {
        ...state,
        thesis: {
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
