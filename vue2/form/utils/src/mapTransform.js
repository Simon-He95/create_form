const arr_reg = /(\w+)\[(\w+)\]/

export function mapTransform(o, map) {
  return Object.keys(map).reduce((result, key) => {
    result[map[key]] = getMapValue(key, o)
    return result
  }, {} )
}

export function mapTransformBack(o, map) {
  return Object.entries(map).reduce((result, [key, value]) => generateMapKey(key, result, o[value]), {})
}

function getMapValue(key, o) {
  return key.split('.').reduce((o, k) => arr_reg.test(k)
    ? JSON.parse(k.replace(arr_reg, (e, r, q) => JSON.stringify(o[r][q])))
    : o[k], o)
}

function generateMapKey(key, result, value) {
  const arr = key.split('.')
  arr.reduce((pre, cur, i) => {
    if (i === arr.length - 1) { pre[cur] = value }
    else if (arr_reg.test(cur)) {
      let newO
      cur.replace(arr_reg, (e, r, q) => {
        pre[r] = pre[r] ?? []
        newO = pre[r][q] = pre[r][q] ?? {}
      })
      return newO
    }
    else if (i !== arr.length - 1) { return pre[cur] = pre[cur] ?? {} }
    return pre
  }, result)
  return result
}

