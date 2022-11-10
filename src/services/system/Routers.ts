/* eslint-disable */
/* tslint:disable */
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

import { ResponseListRouterVo } from './data-contracts';
import { HttpClient, RequestParams } from './http-client';

export class Routers<SecurityDataType = unknown> {
  http: HttpClient<SecurityDataType>;

  constructor(http: HttpClient<SecurityDataType>) {
    this.http = http;
  }

  /**
   * No description
   *
   * @tags SysLoginService
   * @name SysLoginGetRouters
   * @summary 获取菜单路由信息
   * @request GET:/routers
   * @secure
   */
  sysLoginGetRouters = (params: RequestParams = {}) =>
    this.http.request<ResponseListRouterVo, void>({
      path: `/routers`,
      method: 'GET',
      secure: true,
      ...params,
    });
}
