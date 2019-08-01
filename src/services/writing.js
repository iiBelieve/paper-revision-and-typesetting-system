// import { stringify } from 'qs';
import request from '@/utils/request';

// 保存论文
export async function saveThesis(params) {
  console.log(params);
  return request('/api/lunwen/save', {
    method: 'POST',
    body: params,
  });
}

// 获取论文
export async function getThesis(params) {
  console.log(params);
  return request(`/api/lunwen/get?key=${params}`);
}

// 获取学生的个人信息
export async function stuInfo() {
  return request(`/api/student/myself`);
}

// 获取学生/老师的个人信息
export async function getUserName() {
  return request(`/api/lunwen/userName`);
}


// 学生获取老师留言
export async function getMessages(params) {
  console.log(params);
  return request(`/api/chat/view?recipient=${params}`);
}

// 发送留言
export async function sendMessage(params) {
  console.log(params);
  return request('/api/chat/send', {
    method: 'POST',
    body: params,
  });
}

// 下载
export async function getDoc(params) {
  console.log(params);
  return request(`/api/lunwen/downLoacDoc?path=${params}`);
}

// 下载 word.doc
// 发送留言
export async function downLoadDoc(params) {
  console.log(params);
  return request('/api/lunwen/htmltoWord', {
    method: 'POST',
    body: params,
  });
}

// 获取学生个人的论文HTML
export async function getHTML() {
  return request(`/api/lunwen/get`);
}




