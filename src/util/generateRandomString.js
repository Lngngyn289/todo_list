module.exports = function generate (length){
  const characters = "abcdefghijklmnopqrstuvwABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
  let result = ""
  for(let i = 0; i < length; i++){
    result += characters.charAt(Math.floor(Math.random() * characters.length))
  }
  return result;
}