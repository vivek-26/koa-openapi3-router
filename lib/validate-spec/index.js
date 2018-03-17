/**
 * @author Vivek Kumar <vivek.kumar26@live.com>
 * @license MIT
 */

'use strict';

/* Module Dependencies */
const Ajv = require('ajv');
const ajv = new Ajv({ schemaId: 'auto' });
const schema = require('../openapi3-schema');
const { debug_ns } = require('../config');
const debug = require('debug')(`${debug_ns}:validate-spec`);

const validateAPISpec = async function(specObj) {
  /* Use Ajv with Draft 4 Schema */
  ajv.addMetaSchema(require('ajv/lib/refs/json-schema-draft-04.json'));
  let validate = ajv.compile(schema);
  const valid = validate(specObj);

  debug('Validation Errors:', validate.errors);
  debug('Is Spec Valid? →', valid);

  if (!valid) {
    return false;
  }
  return true;
};

module.exports = { validateAPISpec };
