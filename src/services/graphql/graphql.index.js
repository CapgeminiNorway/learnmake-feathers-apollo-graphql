'use strict';

import { apolloExpress, graphiqlExpress } from 'apollo-server';
//import { graphqlExpress } from 'apollo-server-express';
import { makeExecutableSchema, addMockFunctionsToSchema } from 'graphql-tools';
import Resolvers from  './graphql.resolvers';
import Schema from './graphql.schema';

const { authenticate } = require('@feathersjs/authentication').hooks;
const logger = require('winston');
const isDev = process.env.NODE_ENV !== 'production' ? true : false; // eslint-disable-line

module.exports = function () {
  const app = this;

  const executableSchema = makeExecutableSchema({
    typeDefs: Schema,
    resolvers: Resolvers.call(app)
  });

  // Initialize our service with any options it requires
  app.use('/graphql', apolloExpress((req) => {
    if (isDev) {
      logger.info('req.params', JSON.stringify(req.params));
      logger.info('req.data', JSON.stringify(req.data));
      logger.info('req.feathers', JSON.stringify(req.feathers));
    }
    let {token, provider} = req.feathers;
    return {
      schema: executableSchema,
      context: {
        token,
        provider
      }
    }
  })).hooks({
    before: {
      all: [
        hook => {
          if (isDev) {
            logger.info('hook.params', JSON.stringify(hook.params));
            logger.info('hook.data', JSON.stringify(hook.data));
          }
        },
        authenticate('jwt')
      ]
    },
    after: {
      all: []
    }
  });

  app.use('/graphiql', graphiqlExpress({
    endpointURL: '/graphql',
  }));

};
