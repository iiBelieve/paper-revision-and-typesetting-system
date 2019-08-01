import { stringify } from 'qs';
import request from '@/utils/request';

// 学生查看所有老师
export async function stuGetAllTeacher() {
  return request(`/api/StudentChoseTeacher/studentSeeAllTeachers`);
}

// 学生选择老师
export async function stuSelectTeacher(params) {
  return request(`/api/StudentChoseTeacher/studentChoseTeacher?teacherNum=${params}`);
}

// 学生获取自己是否已经选择老师的状态
export async function getStuStatus() {
  return request(`/api/StudentChoseTeacher/studentGetStatus`);
}

// 老师查看哪些学生选择了他
export async function teacherGetAllStu() {
  return request(`/api/StudentChoseTeacher/teacherSeeWhoChoseHe`);
}

// 老师 选择学生/拒绝学生
export async function teacherSelectStu(params) {
  return request(`/api/StudentChoseTeacher/teacherChoseStudent?${stringify(params)}`);
}
