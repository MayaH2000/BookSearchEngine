const jwt = require('jsonwebtoken');

// set token secret and expiration date
const secret = 'mysecretsshhhhh';
const expiration = '2h';

module.exports = {
  // function for our authenticated routes
  authMiddleware: function ({ context }) { // Destructure context from the GraphQL resolver function arguments
    // Get the authorization token from the context
    const token = context.req.headers.authorization;

    if (!token) {
      throw new Error('You have no token!');
    }

    // Verify token and get user data out of it
    try {
      const { data } = jwt.verify(token, secret);
      context.user = data; // Attach user data to the context for later use in resolvers
    } catch (err) {
      console.log('Invalid token');
      throw new Error('Invalid token!');
    }
  },
  signToken: function ({ username, email, _id }) {
    const payload = { username, email, _id };

    return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
  },
};
