const { authenticate } = require('@feathersjs/authentication').hooks;
const commonHooks = require('feathers-hooks-common');
const { restrictToOwner } = require('feathers-authentication-hooks');

const { hashPassword } = require('@feathersjs/authentication-local').hooks;
const restrict = [
  authenticate('jwt'),
  restrictToOwner({
    idField: '_id',
    ownerField: '_id'
  })
];

module.exports = {
  before: {
    all: [],
    find: [ authenticate('jwt') ],
    get: [ ...restrict ],
    create: [ hashPassword() ],
    update: [ ...restrict, hashPassword() ],
    patch: [ ...restrict, hashPassword() ],
    remove: [ ...restrict ]
  },

  after: {
    all: [
      commonHooks.when(
        hook => hook.params.provider,
        commonHooks.discard('password')
      )
    ],
    find: [
      /* hook => { // TODO force this only when the caller is internal (graphql)
        if (hook.result && hook.result.data) {
          hook.result = hook.result.data;
        }
      } */
    ],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
};
