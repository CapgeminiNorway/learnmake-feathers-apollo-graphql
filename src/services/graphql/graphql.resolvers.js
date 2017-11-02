'use strict';

import request from 'request-promise';
import GraphQLJSON from 'graphql-type-json';
import { GraphQLScalarType } from 'graphql';
import { Kind } from 'graphql/language';
import logger from 'winston';

const isDev = process.env.NODE_ENV !== 'production' ? true : false; // eslint-disable-line
export default function Resolvers() {

  let app = this;

  let Users = app.service('users');

  const localRequest = request.defaults({
    baseUrl: `http://${app.get('host')}:${app.get('port')}`,
    json: true
  });

  return {
    JSON: GraphQLJSON,
    Date: new GraphQLScalarType({
      name: 'Date',
      description: 'Date as custom scalar type',
      parseValue(value) {
        return new Date(value); // value from the client
      },
      serialize(value) {
        return value.getTime(); // value sent to the client
      },
      parseLiteral(ast) {
        if (ast.kind === Kind.INT) {
          return parseInt(ast.value, 10); // ast value is always in string format
        }
        return null;
      },
    }),
    AuthPayload: {
      data(auth, args, context) {
        return auth.data;
      }
    },
    Query: {
      /* user(root, { userid }, context) {
        return Users.get(userid);
      }, */
      user(root, { userid }, context) {
        return Users.find({
          query: {
            userid
          }
        })
        //.then(results => logger.info('results', JSON.stringify(results)))
        .then(results => {
          if (results.data && results.data.length>0) {
            return results.data[0];
          }
          else {
            return {}
          }
        })

      },
      users(root, args, context) {
        return Users.find({}).then(results => results.data)
      }
    },

    Mutation: {
      signUp(root, args, context) {
        return Users.create(args)
      },
      logIn(root, {userid, password}, context) {
        return localRequest({
          uri: '/authentication',
          method: 'POST',
          body: {
            strategy: 'local',
            userid, password
          }
        });
      }
    }

  }
}
