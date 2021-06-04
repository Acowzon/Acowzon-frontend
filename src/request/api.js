/**
 * api接口统一管理
 */
import { postcssVersion } from 'postcss-url';
import {get, post } from './http';

export const getGoodsDetail = data => post('goods/detail', data);

export const listAllGoods = () => post('goods/list/all');

export const uploadGood = data => post('goods/add', data);

export const purchaseGood = data => post('order/add', data);

export const listAllOrders = data => post('order/list/byCustomer', data);

export const getOrderDetail = data => post('order/detail', data);

export const createOrder = data => post('order/add', data);

export const deleteOrder = data => post('order/delete', data);

//用户信息查看
export const showUserAccount = data => post('user/detail', data);
//用户注册
export const register = data => post('user/add', data);
//用户登录
export const doLogin = data => post('user/verify', data);

export const updateUserInfo = data => post('user/update', data);

export const updatePaymentStatus = data => post('order/update/paymentStatus', data);

export const searchForGoods = data => post('/search/goods', data);