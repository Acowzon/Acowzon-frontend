/**
 * api接口统一管理
 */
import { postcssVersion } from 'postcss-url';
import {get, post } from './http';

export const getGoodsDetail = data => post('goods/detail', data);

export const listAllGoods = () => post('goods/list');

export const listAllOrders = data => post('orders/orderList', data);

export const getOrderDetail = data => post('orders/orderDetail', data);

//用户信息查看
export const showUserAccount = data => post('users/myAccount', data);
//用户注册
export const register = data => post('users/register', data);
//用户登录
export const doLogin = data => post('users/doLogin', data);