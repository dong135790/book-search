const { GraphQLError } = require('graphql');
const { signToken, AuthenticationError } = require('../utils/auth');
const { User } = require('../models')
const resolvers = {
    Query: {
        getAllusers: async () => {
            const foundUsers = await User.find({});

            if(!foundUsers) {
                throw GraphQLError();
            }

            return foundUsers;
        },
    // By adding context to our query, we can retrieve the logged in user without specifically searching for them
        me: async (parent, args, context) => {
            if (context.user) {
                return User.findOne({ _id: context.user._id})
            }
            throw AuthenticationError
        }
    },
    Mutation: {
        login: async (parent, { email, password }) => {
            const user = await User.findOne({ email });
            if(!user) {
                throw AuthenticationError;
            }

            // Checking if password is correct
            const correctPw = await User.isCorrectPassword(password);
            if (!correctPw) {
                throw AuthenticationError;
            }

            const token = signToken(user);
            return { token, profile };
        },
        addUser: async (parent, { name, email, password }) => {
            const user = await User.create({ name, email, password });
            const token = signToken(user);

            return { token, user };
        },
        saveBook: async (parent, { authors, description, title, bookId , image, link }, context) => {
            if (context.user) {
                return User.findOneAndUpdate(
                    {  }
                )
            }
        },
        removeBook: async (parent, { bookId }, context) => {
            if (context.user) {
                return User.findOneAndUpdate(
                    { _id: context.user._id },
                    { $pull: {savedBooks: bookId}},
                    { new: true}
                );
            }
            throw AuthenticationError
        }
    },

}

module.exports = resolvers;