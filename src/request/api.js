/**   
 * api接口统一管理
 */
import { postcssVersion } from 'postcss-url';
import {get, post } from './http';

export const getGoodsDetail = data => post('goods/detail', data);

export const listAllGoods = () => post('goods/list/all');

export const addOrder = data => post('order/add', data);