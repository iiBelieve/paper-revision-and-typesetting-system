// import { stringify } from 'qs';
import request from '@/utils/request';

// 登录接口
export async function loginServer(params) {
  console.log(params);
  return request('/api/login/user', {
    method: 'POST',
    body: params,
  });
}

export async function getFakeCaptcha(mobile) {
  return request(`/api/captcha?mobile=${mobile}`);
}

// 学生注册接口
export async function studentRegister(params) {
  console.log(params);
  console.log("/student/signup");
  return request('/api/student/signup', {
    method: 'POST',
    body: params,
  });
}

// 老师注册接口
export async function teacherRegister(params) {
  console.log(params);
  console.log("/api/teacher/signup");
  return request('/api/teacher/signup', {
    method: 'POST',
    body: params,
  });
}

