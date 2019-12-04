module.exports = function typeIndex(type, options) {
  console.log(type)
  if(!type.includes('Queja')){
    return options.fn(this);
  }
  return options.inverse(this);
}