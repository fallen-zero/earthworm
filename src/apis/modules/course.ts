/*
 * @Author       : fallen_zero
 * @Date         : 2024-08-14 10:36:40
 * @LastEditors  : fallen_zero
 * @LastEditTime : 2024-08-14 10:55:00
 * @FilePath     : /earthworm/src/apis/modules/course..ts
 * @FileName     :
 */
import http from '@http';
import { AxiosResult } from '../interface/axios';
import { Course } from '@prisma/client';

export const coursesApi = () => http.get<AxiosResult<Course[]>>('/course/api');
