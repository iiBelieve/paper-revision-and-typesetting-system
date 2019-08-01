// import { stringify } from 'qs';
import request from '@/utils/request';

// 老师获取所绑定的学生
export async function getStudent() {
  return request(`/api/lunwen/getStudent`);
}

// 获取老师的个人信息
export async function getTeacher() {
  return request(`/api/teacher/myself`);
}

// 老师获取学生论文
export async function getThesis(params) {
  return request(`/api/lunwen/teacherGet?studentNum=${params}`);
}

// 老师获取学生留言
export async function getMessages(params) {
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
