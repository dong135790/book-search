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
                const userData = await User.findOne({ _id: context.user._id}).select('-__v -password');
                return userData;
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
            const correctPw = await user.isCorrectPassword(password);
            if (!correctPw) {
                throw AuthenticationError;
            }

            const token = signToken(user);
            return { token, user };
        },
        addUser: async (parent, { username, email, password }) => {
            const user = await User.create({ username, email, password });
            const token = signToken(user);

            return { token, user };
        },
        saveBook: async (parent, { authors, description, title, bookId , image, link }, context) => {
            if (context.user) {
                const updatedUser = await User.findByIdAndUpdate(
                    { _id: context.user._id },
                    { $push: { savedBooks: authors, description, title, bookId, image, link }},
                    { new: true }
                )
                return updatedUser;
            }
        },
        removeBook: async (parent, { bookId }, context) => {
            if (context.user) {
                const removeBook = await User.findOneAndUpdate(
                    { _id: context.user._id },
                    { $pull: {savedBooks: { bookId }}},
                    { new: true}
                );
                return removeBook;
            }
            throw AuthenticationError
        }
    },

}

module.exports = resolvers;