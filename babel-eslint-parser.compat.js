const babelEslintParser = require('@babel/eslint-parser');

function addGlobals(scopeManager, names) {
  const globalScope = scopeManager.globalScope ?? scopeManager.scopes?.[0];

  if (!globalScope || typeof globalScope.__defineGeneric !== 'function') {
    return;
  }

  const nameSet = new Set(names);

  for (const name of names) {
    if (!globalScope.set.has(name)) {
      globalScope.__defineGeneric(
        name,
        globalScope.set,
        globalScope.variables,
        null,
        null
      );
    }
  }

  if (Array.isArray(globalScope.through)) {
    globalScope.through = globalScope.through.filter((reference) => {
      if (!nameSet.has(reference.identifier.name)) {
        return true;
      }

      const variable = globalScope.set.get(reference.identifier.name);

      if (!variable) {
        return true;
      }

      reference.resolved = variable;
      variable.references.push(reference);
      return false;
    });
  }

  if (globalScope.implicit) {
    if (globalScope.implicit.set instanceof Map) {
      for (const name of names) {
        globalScope.implicit.set.delete(name);
      }
    }

    if (Array.isArray(globalScope.implicit.variables)) {
      globalScope.implicit.variables = globalScope.implicit.variables.filter(
        (variable) => !nameSet.has(variable.name)
      );
    }

    if (Array.isArray(globalScope.implicit.left)) {
      globalScope.implicit.left = globalScope.implicit.left.filter(
        (reference) => !nameSet.has(reference.identifier.name)
      );
    }
  }
}

function parseForESLint(code, options) {
  const result = babelEslintParser.parseForESLint(code, options);

  if (
    result?.scopeManager &&
    typeof result.scopeManager.addGlobals !== 'function'
  ) {
    result.scopeManager.addGlobals = (names) =>
      addGlobals(result.scopeManager, names);
  }

  return result;
}

module.exports = {
  ...babelEslintParser,
  parseForESLint,
};
