/*
 * @Author       : fallen_zero
 * @Date         : 2024-08-14 10:32:47
 * @LastEditors  : fallen_zero
 * @LastEditTime : 2024-08-16 10:00:44
 * @FilePath     : /earthworm/src/apis/config/index.ts
 * @FileName     :
 */
// import { Axios } from 'axios';

// const http = new Axios({
//   baseURL: process.env.NEXT_BASE_PATH,
//   headers: {
//     'Access-Control-Allow-Origin': '*',
//     'Access-Control-Allow-Private-Network': true,
//   },
// });

// http.interceptors.request.use(
//   (config) => {
//     console.log(config);
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

// http.interceptors.response.use(
//   (response) => {
//     return response;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

const http = {
  async get<T>(url: string): Promise<T> {
    return {
      data: [],
    } as unknown as T;
    // const res = await fetch(`${process.env.NEXT_BASE_PATH}${url}`);
    // if (!res.ok) {
    //   throw new Error(res.statusText);
    // }
    // const data = await res.json();
    // return data;
  },
};

export default http;
