module.exports = function typeIndex(type, options) {
  if(!type.includes('Queja')){
    return options.fn(this);
  }
  return options.inverse(this);
}