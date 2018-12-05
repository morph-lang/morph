const build = require('./build');

const morphString = (string) => {
  return build(string);
};

module.exports = morphString;