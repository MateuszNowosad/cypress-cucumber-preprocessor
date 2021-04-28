const { TagExpressionParser } = require("cucumber-tag-expressions");

function getEnvTags() {
  return Cypress.env("TAGS") || "";
}

function shouldProceedCurrentStep(tags = [], envTags = getEnvTags()) {
  const parser = new TagExpressionParser();
  try {
    const expressionNode = parser.parse(envTags);
    const mappedTags = tags.map((tag) => tag.name);
    return expressionNode.evaluate(mappedTags);
  } catch (e) {
    /* eslint-disable-next-line no-console */
    console.log(`Error parsing tags: '${envTags}'. Message: ${e.message}`);
    return false;
  }
}

function getFilteredCLIArguments(arrOfArgsToRemove = []) {
  const processArgv = process.argv.slice(2);

  let prevValue = null;
  for (let i = processArgv.length - 1; i >= 0; i -= 1) {
    const isArgBlacklisted = arrOfArgsToRemove.some(
      (arg) => processArgv[i] === arg
    );
    if (isArgBlacklisted) {
      processArgv.splice(i, prevValue && /^--?/.test(prevValue) ? 1 : 2);
      prevValue = null;
    } else {
      prevValue = processArgv[i];
    }
  }
  console.log(`56, processArgv mateusz: `, processArgv);
  return processArgv;
}

module.exports = {
  shouldProceedCurrentStep,
  getEnvTags,
  getFilteredCLIArguments,
};
