// Application hooks that run for every service
const logger = require('./hooks/logger');
const commonHooks = require('feathers-hooks-common');
const winstonLogger = require('winston');

module.exports = {
  before: {
    all: [],
    find: [],
    get: [],
    create: [ commonHooks.setNow('createdAt') ],
    update: [ commonHooks.setNow('updatedAt') ],
    patch: [ commonHooks.setNow('updatedAt') ],
    remove: []
  },

  after: {
    all: [
      logger(),
      hook => {
        if (hook.result && hook.result.meta_data) {
          commonHooks.discard('meta_data');
        }
      }
    ],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  error: {
    all: [ logger() ],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
};
