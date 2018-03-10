/**
 * @author Vivek Kumar <vivek.kumar26@live.com>
 * @license MIT
 */

'use strict';

/* Module Dpepndencies */
const { resolveRefs } = require('json-refs');
const { safeLoad } = require('js-yaml');
const { readFileSync } = require('fs');
const { debug_ns } = require('../config');
const debug = require('debug')(`${debug_ns}:load-spec`);

const resolveRefsYaml = async function(specFile) {
  const root = safeLoad(readFileSync(specFile).toString());
  const options = {
    filter: ['relative', 'remote'],
    loaderOptions: {
      processContent: function(res, callback) {
        callback(null, safeLoad(res.text));
      },
    },
  };
  debug('Resolving YAML Refs');
  const result = await resolveRefs(root, options);
  debug('Finished resolving YAML Refs');
  return result.resolved;
};

const resolveRefsJson = async function(specFile) {
  const fileContents = readFileSync(specFile, 'utf8');
  const root = JSON.parse(fileContents);
  const options = {
    filter: ['relative', 'remote'],
  };
  debug('Resolving JSON Refs');
  const result = await resolveRefs(root, options);
  debug('Finished resolving JSON Refs');
  return result.resolved;
};

module.exports = { resolveRefsYaml, resolveRefsJson };
