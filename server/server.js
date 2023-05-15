const express = require('express');
const path = require('path');
const { ApolloServer } = require('apollo-server-express'); // Import ApolloServer
const { typeDefs, resolvers } = require('./schemas'); // Import your typeDefs and resolvers
const db = require('./config/connection');
const { authMiddleware } = require('./utils/auth'); // Import your auth middleware

const app = express();
const PORT = process.env.PORT || 3001;

// Set up Apollo Server
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: authMiddleware, // Add your authentication middleware to the context
});

server.applyMiddleware({ app });

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// if we're in production, serve client/build as static assets
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
}

db.once('open', () => {
  app.listen(PORT, () => console.log(`🌍 Now listening on localhost:${PORT}`));
  console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
});