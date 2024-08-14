/*
 * @Author       : fallen_zero
 * @Date         : 2024-08-14 10:39:48
 * @LastEditors  : fallen_zero
 * @LastEditTime : 2024-08-14 10:40:12
 * @FilePath     : /earthworm/src/apis/interface/axios.ts
 * @FileName     :
 */

export interface AxiosResult<T> {
  code: number;
  data: T;
  message: string;
}
