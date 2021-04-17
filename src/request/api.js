/**
 * api接口统一管理
 */
import { postcssVersion } from 'postcss-url';
import {get, post } from './http';

export const getGoodsDetail = data => post('goods/detail', data);

export const listAllGoods = () => post('goods/list/all');

export const listAllOrders = data => post('orders/orderList', data);

export const getOrderDetail = data => post('orders/orderDetail', data);

//用户信息查看
export const showUserAccount = data => post('user/detail', data);
//用户注册
export const register = data => post('user/add', data);
//用户登录
export const doLogin = data => post('user/verify', data);