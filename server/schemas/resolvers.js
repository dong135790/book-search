const { GraphQLError } = require('graphql');
const { User } = require('../models')
const resolvers = {
    Query: {
        getAllusers: async () => {
            const foundUsers = await User.find({});

            if(!foundUsers) {
                throw GraphQLError();
            }

            return foundUsers;
        }
    },
    // Mutation: {},

}

module.exports = resolvers;