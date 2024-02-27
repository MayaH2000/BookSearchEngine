import './App.css';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { Outlet } from 'react-router-dom';

import Navbar from './components/Navbar';

// Create an instance of ApolloClient
const client = new ApolloClient({
  uri: 'your_graphql_endpoint_here',
  cache: new InMemoryCache(),
});

function App() {
  return (
    // Wrap your application with the ApolloProvider
    <ApolloProvider client={client}>
      <>
        <Navbar />
        <Outlet />
      </>
    </ApolloProvider>
  );
}

export default App;
