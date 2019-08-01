// import { stringify } from 'qs';
import request from '@/utils/request';

// 发送HTML给后台
export async function postHTML(params) {
  console.log(params);
  return request('/api/lunwen/save', {
    method: 'POST',
    body: params,
  });
}

// post论文中文题目
export async function postCnTitle(params) {
  return request('/api/lunwen/saveOne', {
    method: 'POST',
    body: params,
  });
}

// get论文中文题目
export async function getCnTitle() {
  return request(`/api/lunwen/getOne`);
}

// post论文中文摘要
export async function postCnAbstract(params) {
  return request('/api/lunwen/saveTwo', {
    method: 'POST',
    body: params,
  });
}

// get论文中文题目
export async function getCnAbstract() {
  return request(`/api/lunwen/getTwo`);
}

// post论文中文关键字
export async function postCnKeyWords(params) {
  return request('/api/lunwen/saveThree', {
    method: 'POST',
    body: params,
  });
}

// get论文中文关键字
export async function getCnKeyWords() {
  return request(`/api/lunwen/getThree`);
}

// post论文一级标题
export async function postFirst(params) {
  return request('/api/lunwen/saveFour', {
    method: 'POST',
    body: params,
  });
}

// get论文一级标题
export async function getFirst() {
  return request(`/api/lunwen/getFour`);
}

// post论文二级标题
export async function postSecond(params) {
  return request('/api/lunwen/saveFive', {
    method: 'POST',
    body: params,
  });
}

// get论文二级标题
export async function getSecond() {
  return request(`/api/lunwen/getFive`);
}

// post论文三级标题
export async function postThird(params) {
  return request('/api/lunwen/saveSix', {
    method: 'POST',
    body: params,
  });
}

// get论文三级标题
export async function getThird() {
  return request(`/api/lunwen/getSix`);
}

// post论文参考文献
export async function postReference(params) {
  return request('/api/lunwen/saveSeven', {
    method: 'POST',
    body: params,
  });
}

// get论文参考文献
export async function getReference() {
  return request(`/api/lunwen/getSeven`);
}

// post论文英文题目
export async function postEgTitle(params) {
  return request('/api/lunwen/saveEight', {
    method: 'POST',
    body: params,
  });
}

// get论文英文题目
export async function getEgTitle() {
  return request(`/api/lunwen/getEight`);
}

// post论文英文摘要
export async function postEgAbstract(params) {
  return request('/api/lunwen/saveNine', {
    method: 'POST',
    body: params,
  });
}

// get论文英文摘要
export async function getEgAbstract() {
  return request(`/api/lunwen/getNine`);
}

// post论文英文关键字
export async function postEgKeyWords(params) {
  return request('/api/lunwen/saveTen', {
    method: 'POST',
    body: params,
  });
}

// get论文英文关键字
export async function getEgKeyWords() {
  return request(`/api/lunwen/getTen`);
}


