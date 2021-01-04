/**
 * 加法器
 * author: mathe
 * */ 

function _and(a, b) {
  return a & b
}

function _or(a, b) {
  return a | b
}

function _xor(a, b) {
  return a ^ b
}

function halfAdder(a, b) {
  return [_and(a, b), _xor(a, b)]
}

function fullAdder(a, b, inc) {
  const res1 = halfAdder(a, b)
  const res2 = halfAdder(res1[1], inc)
  return [_or(res1[0], res2[0]), res2[1]];
}

function toBinary(num) {
  return num.toString(2)
}

function toDecimal(str) {
  return parseInt(str, 2)
}

function add(numA, numB) {
  let binA = toBinary(numA)
  let binB = toBinary(numB)
  let len = Math.max(`${binA}`.length, `${binB}`.length)
  binA = ('0'.repeat(len) + binA).substr(-len)
  binB = ('0'.repeat(len) + binB).substr(-len)
  resBin = ''
  let inc = 0
  while (len >= 0) {
    res = fullAdder(+binA[len - 1] || 0, +binB[len - 1] || 0, inc)
    resBin = `${res[1]}` + resBin
    inc = res[0]
    len--
  }
  return toDecimal(resBin)
}

console.log(add(3, 4))
console.log(add(111, 234))
console.log(add(56, 22))
console.log(add(100, 3030))