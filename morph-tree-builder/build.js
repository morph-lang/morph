const extensions = require('./extensions');
const {
  openTagRegex,
  closeTagRegex,
  importTagRegex,
} = require('./extensions/helper');

const functionRegex = /([^\(]+)\(([^)]+)\)/;

function addToQueue(group) {
  if (!extensions[group.type]) {
    group.notTransformed = true;
    return;
  }
  const inputVariables = extensions[group.type].getInputVariables(group)
  const OutputVariables = extensions[group.type].getOutputVariables(group)
  group.inputVariables = inputVariables.map((reqVar) => {
    const functionReqRes = functionRegex.exec(reqVar);

    if (functionReqRes) {
      return {
        token: reqVar,
        requiredVars: [functionReqRes[1]],
        function: functionReqRes[1],
        argument: functionReqRes[2],
      }
    }

    return {
      token: reqVar,
      requiredVars: [reqVar]
    }
  });
  group.OutputVariables = OutputVariables;
}


function getNameAndType(regexRes) {
  let type = regexRes[1]
  let name = 'unknown'
  if (regexRes[2]) {
    type = regexRes[2]
    name = regexRes[1]
  }
  return { type, name }
}

const errors = []

module.exports = (input) => {
  const output = []
  let openGroup;
  input.split('\n').forEach((line) => {
    const openRegexResult = openTagRegex.exec(line)
    if (!openGroup && openRegexResult) {
      openGroup = {
        ...getNameAndType(openRegexResult),
        code: '',
        errors: [],
        index: output.length,
        params: openRegexResult[3],
      }
      output.push(openGroup)
      return;
    }
    const closeRegexResult = closeTagRegex.exec(line)
    if (closeRegexResult && !openGroup) {
      errors.push('Random closee?')
      return;
    }

    if (closeRegexResult) {
      const nameType = getNameAndType(closeRegexResult);
      if (nameType.type === openGroup.type && nameType.name === openGroup.name) {
        addToQueue(openGroup);
        openGroup = null;
        return;
      }
    }
    if (openGroup) {
      openGroup.code += line + '\n';
      return;
    }

    const importRegexResult = importTagRegex.exec(line);
    if (importRegexResult) {
      const importing = importRegexResult[1].split(',').map(a => a.trim());
      const from = importRegexResult[2]
      output.push({
        type: 'import',
        code: '',
        file: from,
        errors: [],
        index: output.length,
        OutputVariables: importing,
      })
    }

  })


  return {
    blocks: output
  };
}