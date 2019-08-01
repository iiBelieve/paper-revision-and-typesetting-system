import request from '@/utils/request';

export async function query() {
  return request('/api/users');
}

export async function queryCurrent() {
  return request('/api/currentUser');
}

// 修改密码
  export async function postNewPassword(params) {
  return request('/api/user/changepassword', {
    method: 'POST',
    body: params,
  });
}
