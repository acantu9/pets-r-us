const express = require('express');
const { ApolloServer } = require('@apollo/server');
const { expressMiddleware } = require('@apollo/server/express4');
const path = require('path');

const { typeDefs, resolvers } = require('./schemas');
const db = require('./config/connection');

const PORT = process.env.PORT || 3001;

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const app = express();
// Create a new instance of an Apollo server with the GraphQL schema
const startApolloServer = async () => {
  await server.start();

  app.use(express.urlencoded({ extended: false }));
  app.use(express.json());

  // Serve up static assets
  app.use('/images', express.static(path.join(__dirname, '../client/images')));

  app.use('/graphql', expressMiddleware(server, {
    //context: authMiddleware
  }));

  app.get('/get-pets', async (req, res) => {
    console.log("get pets");

    // const APITOKEN = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiJPclFrMVI4bDk5QnI4N2toSlRLM2VZcFhPeVhYVTdvZTh0N2dQNG1RTHJjNjg4VFFVaCIsImp0aSI6IjhiZDJiMGZlNjQyNTAwYjBmOGU4YTY1MWJkMjQ5MmZiMWEwOTE1OWI3Mjc4NTFkMGU5YzZkODgxMjFlNDAzOTMzYjRkNGU0YWVjYmFkM2FjIiwiaWF0IjoxNzA2MjQ0NTgyLCJuYmYiOjE3MDYyNDQ1ODIsImV4cCI6MTcwNjI0ODE4Miwic3ViIjoiIiwic2NvcGVzIjpbXX0.FmPjg961O298Leili5zFHf7zwnkidyb66JD_IOab3jMzb0vyfhe3gDmjAxjhzbPNbEutFPT6fQSQAwORUXaBn-Ui4o6QD6VLAkqjohszVy4BxQshdL1IT2qztKLnsRD3uFSH4ILtARlR2pzmQEFtXqZfOlcIAkiU2-1Kyo8ZxEzzXV1Yl1I-oZBy_ADE552rtoEkqNnaJzGnC4O5Fj5lZCtOCpUOLMrSdpwnxsUwX1CSlvMA46Td1mFzBgYcTrYSKy95e-jBedwcMgdACN3hTnLc0sH7w_KIlWEQWg4qSdUDjp6hGtATnOBi0hrCE9m_O68KXqftt9kv9k3s6FE6Nw";
    const APITOKEN = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiJPclFrMVI4bDk5QnI4N2toSlRLM2VZcFhPeVhYVTdvZTh0N2dQNG1RTHJjNjg4VFFVaCIsImp0aSI6Ijk4MDQyNTI2YzAxZTc2ZWE4ZjgyZDQzMmZhMjA3NzZlZGYwMTc3NDdkNmEwOTM0ZThjOTE5YmIxNDYyM2RlMGE4ZDk0NGE5NWNmMmFlOGY0IiwiaWF0IjoxNzA2MjQ1MzgyLCJuYmYiOjE3MDYyNDUzODIsImV4cCI6MTcwNjI0ODk4Miwic3ViIjoiIiwic2NvcGVzIjpbXX0.CHo8bwN2uC4-C0S17C8PJ_flqAUrP5K6MUnq7ttz3sI3jfyhJbBGhU_ZkP5M7T99rVL84uj7Fsj7eeVEqU1-MnWDTTPIrSqOh5VPSn8FMapJQ8jDFyyyiH7sKuVlo0wvIhGDIzcKQsbdEDjuyh4rehGO0YTy7lzBjSN0ZZEDc5XgOuOgHxWE0GalMAoKyiTKVg4GBZ0RGqgaBlzUh8TuA1Hqx0aIhw5yTVWiY1UE3ElxAM0xr5AVODmHW0H-lm2Lf1XHiacTCRsqJ7suj7M9-lDTy1wbdVItlSMEauAnQlOmwULbgBL3AoBmPgCjjqAB2QRKvxU_l6dh5czFaJxJhA";
    const apiUrl = `https://api.petfinder.com/v2/animals?type=dog`;
    const response = await fetch(apiUrl, { 
      headers: {
        "Content-Type": "application/json",
        'Authorization': `Bearer ${APITOKEN}`,
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
    });
    const data = await response.json();
    console.log(data);
  });

  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../client/dist')));

    app.get('*', (req, res) => {
      res.sendFile(path.join(__dirname, '../client/dist/index.html'));
    });
  }

  db.once('open', () => {
    app.listen(PORT, () => {
      console.log(`API server running on port ${PORT}!`);
      console.log(`Use GraphQL at http://localhost:${PORT}/graphql`);
    });
  });
};

// Call the async function to start the server
startApolloServer();