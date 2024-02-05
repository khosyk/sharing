import {axiosInstance} from '.';

// GET: 개인화 화면
export async function fetchPersonalDisplay(params) {
  const { data } = await axiosInstance({
    method: 'get',
    url: '/api/personal',
    headers: {Authorization: `Bearer ${params}`},
  }).catch(e => e.response.data);
  return data;
}

// PUT: 다른 패밀리 선택
export async function fetchSelectAnotherFamily(token, familyId) {
  const { data } = await axiosInstance({
    method: 'put',
    url: `/api/family/${familyId}`,
    headers: {Authorization: `Bearer ${token}`},
  }).catch(e => e.response.data);
  return data;
}
