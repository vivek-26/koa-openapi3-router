/**
 * @author Vivek Kumar <vivek.kumar26@live.com>
 * @license MIT
 */

'use strict';

/**
 * Module Dependencies
 */
const defaultsdeep = require('lodash.defaultsdeep');
const { extname } = require('path');
const { debug_ns } = require('./config');
const debug = require('debug')(`${debug_ns}:index`);

const { resolveRefsYaml, resolveRefsJson } = require('./load-spec');
const defaultOptions = {
  specFile: '',
};

/**
 * Represents OpenAPI 3 Router
 * @constructor
 * @param {Object} options - Options Object
 * @param {string} options.specFile - Path to the API Specification File (yaml or json)
 * @returns {Object} OAIRouter Instance
 * @api public
 */
const OAIRouter = function(options) {
  return new OAIRouter.init(options);
};

/**
 * Initializes OpenAPI 3 Instance
 * @param {Object} options - Options Object
 * @param {string} options.specFile - Path to the API Specification File (yaml or json)
 * @returns {void} Undefined
 */
OAIRouter.init = function(options) {
  this.options = defaultsdeep(options, defaultOptions);
  debug('Options:', this.options);
};

OAIRouter.prototype.getRouter = async function() {
  /* TODO: Remove this, just for testing */
  await _loadSpec.call(this, this.options.specFile);
  return this.specObj;
};

OAIRouter.init.prototype = OAIRouter.prototype;

/**
 * Load & Parse the API Specification
 * @async
 * @function _loadSpec
 * @param {string} specFile - Path to API Specification File
 * @returns {void} Undefined
 * @api private
 */
const _loadSpec = async function(specFile) {
  const fileExtn = extname(specFile);
  debug('API Doc file extension:', fileExtn);
  debug('API Spec File Path:', specFile);

  if (!fileExtn.slice(1).match(/^(yaml|json)$/)) {
    debug('Invalid API Doc file extension:', fileExtn);
    throw new Error(`Invalid API Doc file extension - ${fileExtn}`);
  }

  const resolveRefs = { yaml: resolveRefsYaml, json: resolveRefsJson };
  this.specObj = await resolveRefs[fileExtn.slice(1)](specFile);
};

module.exports = { OAIRouter };
