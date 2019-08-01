import {
  postHTML,
  postCnTitle,
  getCnTitle,
  postCnAbstract,
  getCnAbstract,
  postCnKeyWords,
  getCnKeyWords,
  postFirst,
  getFirst,
  postSecond,
  getSecond,
  postThird,
  getThird,
  postReference,
  getReference,
  postEgTitle,
  getEgTitle,
  postEgAbstract,
  getEgAbstract,
  postEgKeyWords,
  getEgKeyWords
} from '@/services/addThesisFormat';

export default {
  namespace: 'addThesisFormat',

  state: {
    formTitle: {
      title: ''
    },
    formCnAbstract: {
      text: '',
      cnAbstract: ''
    },
    formCnKeyWords: {
      cnKeyWords: ''
    },
    bodyFirst:{
      first: []
    },
    bodySecond:{
      second: []
    },
    bodyThird:{
      third: []
    },
    reference: {
      formReference:[]
    },
    formEgTitle: {
      egTitle: ''
    },
    formEgAbstract: {
      text: '',
      egAbstract: '',
    },
    formEgKeyWords: {
      egKeyWords: ''
    },
  },

  effects: {
    // 整篇文章的 HTML
    * pHTML({ payload, callback }, { call, put }) {
      const response = yield call(postHTML, payload);
      yield put({
        type: 'save',
        payload: response,
      });
      if (callback) callback(response);
    },

    // post论文中文题目
    * thesisCnTitle({ payload, callback }, { call, put }) {
      const response = yield call(postCnTitle, payload);
      yield put({
        type: 'save',
        payload: response,
      });
      if (callback) callback();
    },

    // get论文中文题目
    * getThesisCnTitle({ payload, callback }, { call, put }) {
      const response = yield call(getCnTitle, payload);
      yield put({
        type: 'saveCnTitle',
        payload: response,
      });
      if (callback) callback(response);
    },

    // post论文中文摘要
    * thesisCnAbstract({ payload, callback }, { call, put }) {
      const response = yield call(postCnAbstract, payload);
      yield put({
        type: 'save',
        payload: response,
      });
      if (callback) callback();
    },

    // get论文中文摘要
    * getThesisCnAbstract({ payload, callback }, { call, put }) {
      const response = yield call(getCnAbstract, payload);
      yield put({
        type: 'saveCnAbstract',
        payload: response,
      });
      if (callback) callback(response);
    },

    // post论文中文关键字
    * thesisCnKeyWords({ payload, callback }, { call, put }) {
      const response = yield call(postCnKeyWords, payload);
      yield put({
        type: 'save',
        payload: response,
      });
      if (callback) callback();
    },

    // get论文中文关键字
    * getThesisCnKeyWords({ payload, callback }, { call, put }) {
      const response = yield call(getCnKeyWords, payload);
      yield put({
        type: 'saveCnKeyWords',
        payload: response,
      });
      if (callback) callback(response);
    },

    // post论文一级标题
    * thesisFirst({ payload, callback }, { call, put }) {
      const response = yield call(postFirst, payload);
      yield put({
        type: 'save',
        payload: response,
      });
      if (callback) callback();
    },

    // get论文一级标题
    * getThesisFirst({ payload, callback }, { call, put }) {
      const response = yield call(getFirst, payload);
      yield put({
        type: 'saveFirst',
        payload: response,
      });
      if (callback) callback(response);
    },

    // post论文二级标题
    * thesisSecond({ payload, callback }, { call, put }) {
      const response = yield call(postSecond, payload);
      yield put({
        type: 'save',
        payload: response,
      });
      if (callback) callback();
    },

    // get论文二级标题
    * getThesisSecond({ payload, callback }, { call, put }) {
      const response = yield call(getSecond, payload);
      yield put({
        type: 'saveSecond',
        payload: response,
      });
      if (callback) callback(response);
    },

    // post论文三级标题
    * thesisThird({ payload, callback }, { call, put }) {
      const response = yield call(postThird, payload);
      yield put({
        type: 'save',
        payload: response,
      });
      if (callback) callback();
    },

    // get论文三级标题
    * getThesisThird({ payload, callback }, { call, put }) {
      const response = yield call(getThird, payload);
      yield put({
        type: 'saveThird',
        payload: response,
      });
      if (callback) callback(response);
    },

    // post论文参考文献
    * thesisReference({ payload, callback }, { call, put }) {
      const response = yield call(postReference, payload);
      yield put({
        type: 'save',
        payload: response,
      });
      if (callback) callback();
    },

    // get论文参考文献
    * getThesisReference({ payload, callback }, { call, put }) {
      const response = yield call(getReference, payload);
      yield put({
        type: 'saveReference',
        payload: response,
      });
      if (callback) callback(response);
    },

    // post论文英文题目
    * thesisEgTitle({ payload, callback }, { call, put }) {
      const response = yield call(postEgTitle, payload);
      yield put({
        type: 'save',
        payload: response,
      });
      if (callback) callback();
    },

    // get论文英文题目
    * getThesisEgTitle({ payload, callback }, { call, put }) {
      const response = yield call(getEgTitle, payload);
      yield put({
        type: 'saveEgTitle',
        payload: response,
      });
      if (callback) callback(response);
    },

    // post论文英文摘要
    * thesisEgAbstract({ payload, callback }, { call, put }) {
      const response = yield call(postEgAbstract, payload);
      yield put({
        type: 'save',
        payload: response,
      });
      if (callback) callback();
    },

    // get论文英文摘要
    * getThesisEgAbstract({ payload, callback }, { call, put }) {
      const response = yield call(getEgAbstract, payload);
      yield put({
        type: 'saveEgAbstract',
        payload: response,
      });
      if (callback) callback(response);
    },

    // post论文英文关键字
    * thesisEgKeyWords({ payload, callback }, { call, put }) {
      const response = yield call(postEgKeyWords, payload);
      yield put({
        type: 'save',
        payload: response,
      });
      if (callback) callback();
    },

    // get论文英文关键字
    * getThesisEgKeyWords({ payload, callback }, { call, put }) {
      const response = yield call(getEgKeyWords, payload);
      yield put({
        type: 'saveEgKeyWords',
        payload: response,
      });
      if (callback) callback(response);
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

    saveCnTitle(state, action) {
      return {
        ...state,
        formTitle: {
          ...action.payload,
        }
      };
    },

    saveCnAbstract(state, action) {
      return {
        ...state,
        formCnAbstract: {
          ...action.payload,
        }
      };
    },

    saveCnKeyWords(state, action) {
      return {
        ...state,
        formCnKeyWords: {
          ...action.payload,
        }
      };
    },

    saveFirst(state, action) {
      return {
        ...state,
        bodyFirst: {
          ...action.payload,
        }
      };
    },

    saveSecond(state, action) {
      return {
        ...state,
        bodySecond: {
          ...action.payload,
        }
      };
    },

    saveThird(state, action) {
      return {
        ...state,
        bodyThird: {
          ...action.payload,
        }
      };
    },

    saveReference(state, action) {
      return {
        ...state,
        reference: {
          ...action.payload,
        }
      };
    },

    saveEgTitle(state, action) {
      return {
        ...state,
        formEgTitle: {
          ...action.payload,
        }
      };
    },

    saveEgAbstract(state, action) {
      return {
        ...state,
        formEgAbstract: {
          ...action.payload,
        }
      };
    },

    saveEgKeyWords(state, action) {
      return {
        ...state,
        formEgKeyWords: {
          ...action.payload,
        }
      };
    },

  },
};
