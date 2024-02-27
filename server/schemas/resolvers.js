const { User, Book } = require('../models');
const { AuthenticationError } = require('@apollo/server');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    // Resolver for the "me" query to fetch the currently authenticated user
    me: async (_, __, context) => {
      if (context.user) {
        const userData = await User.findOne({ _id: context.user._id }).populate('savedBooks');
        return userData;
      }
      throw new AuthenticationError('You are not logged in');
    },
  },
  Mutation: {
    // Resolver for the "login" mutation to authenticate a user
    login: async (_, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError('Incorrect email or password');
      }

      const correctPassword = await user.isCorrectPassword(password);

      if (!correctPassword) {
        throw new AuthenticationError('Incorrect email or password');
      }

      const token = signToken(user);
      return { token, user };
    },
    // Resolver for the "addUser" mutation to create a new user
    addUser: async (_, { username, email, password }) => {
      const user = await User.create({ username, email, password });
      const token = signToken(user);
      return { token, user };
    },
    // Resolver for the "saveBook" mutation to save a book to a user's list of saved books
    saveBook: async (_, { input }, context) => {
      if (context.user) {
        const updatedUser = await User.findByIdAndUpdate(
          context.user._id,
          { $push: { savedBooks: input } },
          { new: true }
        ).populate('savedBooks');
        return updatedUser;
      }
      throw new AuthenticationError('You need to be logged in to save a book');
    },
    // Resolver for the "removeBook" mutation to remove a book from a user's list of saved books
    removeBook: async (_, { bookId }, context) => {
      if (context.user) {
        const updatedUser = await User.findByIdAndUpdate(
          context.user._id,
          { $pull: { savedBooks: { bookId } } },
          { new: true }
        ).populate('savedBooks');
        return updatedUser;
      }
      throw new AuthenticationError('You need to be logged in to remove a book');
    },
  },
};

module.exports = resolvers;
