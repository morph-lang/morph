const openTagRegex = /<([^\>\/\s\.]+)\.?([^\>\/\s]*)\s*([^\>\/\s]*)[^>]*>/;
const closeTagRegex = /<\/([^\>\/\s\.]+)\.?([^\>\/\s]*)[^>]*>/;
const importTagRegex = /import {\s*([^}]+)+} from '([^']+)'/;

const getInputVariables = (group) => {
  return (group.code.match(/\${([^\}]+)}/g) || []).map((a) => a.slice(2, a.length - 1));
};

const getOutputVariables = (group) => {
  return group.name !== 'unknown' ? [group.name] : [];
};

const defaultExtension = () => ({
  getInputVariables,
  getOutputVariables,
});

module.exports = {
  openTagRegex,
  closeTagRegex,
  importTagRegex,
  defaultExtension,
  getInputVariables,
  getOutputVariables,
};