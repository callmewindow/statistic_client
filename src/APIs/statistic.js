// 数据有关接口
import axios from 'axios'
// import { QS } from './global'

// 获得商家排名
export const getBusinessRanking = () => {
  return axios({
    method: 'GET',
    url: "/shangjia",
  })
}

// 获取商品排名
export const getProductRanking = () => {
  return axios({
    method: 'GET',
    url: "/shangpin",
  });
}

// 获取全部数据
export const getAllData = () => {
  return axios({
    method: 'GET',
    url: `/alldata`
  })
}

// 获取不同类型的总数
export const getTypeNum = () => {
  return axios({
    method: 'GET',
    url: `/typenum`
  })
}