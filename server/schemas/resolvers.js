const { AuthenticationError } = require('apollo-server-express');
const { signToken } = require('../utils/auth');
const { User, Book } = require('../models');

const resolvers = {
  Query: {

  }
};


module.exports = resolvers;