import request from "./request";

/**
 * 获取首页定位城市
 */
export const guessCity = () => request.get('/v1/cities', {
  type: 'guess'
});

/**
 * 获取热门城市
 */
export const hotCity = () => request.get('/v1/cities', {
  type: 'hot'
})

/**
 * 获取所有城市
 */
export const groupCity = () => request.get('/v1/cities', {
  type: 'group'
})

/**
 * 获取当前所在城市
 */
export const currentCity = number => request.get('/v1/cities/' + number)

/**
 * 获取搜索地址
 */
export const searchPlace = (cityId,value) => request.get('/v1/pois/', {
  type: 'search',
  city_id: cityId,
  keyword: value
})

/**
 * 获取msite页面地址信息
 */
export const msiteAddress = geohash => request.get('/v2/pois/' + geohash)

/**
 * 获取msite页面食品分类列表
 */
export const msiteFood = geohash => request.get('/v2/index_entry', {
  geohash,
  group_type: '1',
  'flags[]': 'F'
})

/**
 * 获取msite页面商铺信息
 * @param: latitude {string}  纬度
 * @param: longitude{string}  经度
 * @param: offset{int}  跳过多少条数据，默认0
 * @param: limit{int}  请求数据的数量，默认20
 * @param: restaurant_category_id{int}  餐馆分类id
 * @param: order_by{int}  排序方式id： 1：起送价、2：配送速度、3:评分、4: 智能排序(默认)、5:距离最近、6:销量最高
 * @param: delivery_mode{array} 配送方式id
 * @param: support_ids{array}  餐馆支持特权的id
 * @param: restaurant_category_ids{array}  餐馆分类id
 */
export const shopMsg = (latitude, longitude, offset, limit) => {
  let data = {
    latitude,
    longitude,
    offset: offset || 0,
    limit: limit || 20
  }
  return request.get('/shopping/restaurants', data)
}

/**
 *  获取验证码
**/
export const getCaptchas = () => request.post('/v1/captchas')

/**
 * 账号密码登录
 */
export const accountLogin = (username, password, captcha_code) => request.post('/v2/login', {username, password, captcha_code})
