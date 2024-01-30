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

  app.get('/get-animals', async (req, res) => {
    console.log("get pets");

    // const APITOKEN = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiJPclFrMVI4bDk5QnI4N2toSlRLM2VZcFhPeVhYVTdvZTh0N2dQNG1RTHJjNjg4VFFVaCIsImp0aSI6IjhiZDJiMGZlNjQyNTAwYjBmOGU4YTY1MWJkMjQ5MmZiMWEwOTE1OWI3Mjc4NTFkMGU5YzZkODgxMjFlNDAzOTMzYjRkNGU0YWVjYmFkM2FjIiwiaWF0IjoxNzA2MjQ0NTgyLCJuYmYiOjE3MDYyNDQ1ODIsImV4cCI6MTcwNjI0ODE4Miwic3ViIjoiIiwic2NvcGVzIjpbXX0.FmPjg961O298Leili5zFHf7zwnkidyb66JD_IOab3jMzb0vyfhe3gDmjAxjhzbPNbEutFPT6fQSQAwORUXaBn-Ui4o6QD6VLAkqjohszVy4BxQshdL1IT2qztKLnsRD3uFSH4ILtARlR2pzmQEFtXqZfOlcIAkiU2-1Kyo8ZxEzzXV1Yl1I-oZBy_ADE552rtoEkqNnaJzGnC4O5Fj5lZCtOCpUOLMrSdpwnxsUwX1CSlvMA46Td1mFzBgYcTrYSKy95e-jBedwcMgdACN3hTnLc0sH7w_KIlWEQWg4qSdUDjp6hGtATnOBi0hrCE9m_O68KXqftt9kv9k3s6FE6Nw";
    // const APITOKEN = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiJPclFrMVI4bDk5QnI4N2toSlRLM2VZcFhPeVhYVTdvZTh0N2dQNG1RTHJjNjg4VFFVaCIsImp0aSI6IjAxNmI5MGQyOTE0MWI4YWQ1M2U5YjIzNThmZmQ1ODlhOTM3MThlYTZhNTBlYTYxNWNmNjVlODBiZDFkNmNjZWQyZWRlNGM2NzRhMzJhZGU1IiwiaWF0IjoxNzA2NTg3MTE2LCJuYmYiOjE3MDY1ODcxMTYsImV4cCI6MTcwNjU5MDcxNiwic3ViIjoiIiwic2NvcGVzIjpbXX0.dIYl_yrNw2RXcGZ2sEOqkksKRgDshTrzRSOxar33k3_KvaRSgoxlMmnUtkfy_AzzSICOwv-bxkGzi6E2H8shEK8deYvDPgGu6QQYsW_sNHZZb2bZmsypnWi3AY0IrACYfMsmH23hT4odjP1BizazC5aURyC6fxONMlIxcLOVf9UGkIs4FYLmqyOyoxo9jBmQDI8rAGAoXD9_sd3Xfua8imRQm1JpvczV6FBYgqCOSED8Kf4wuay1rJHUwngX4LroJW_R2ZJBGNN_JBuSiWOqLySQOOfSWJUrDcTXAE1E_F5dQHp3bFQ-SN9m6FbRQR4yJFiOyYTeBVX3FAg8X2_l2g";
    //const APITOKEN = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiJPclFrMVI4bDk5QnI4N2toSlRLM2VZcFhPeVhYVTdvZTh0N2dQNG1RTHJjNjg4VFFVaCIsImp0aSI6IjcxNjJmYWQ5YWQ2ODE2ODJiZDdjMWY4NjExNDdlNzhmMjdlZTJlMGE4ZmZiYTRkNTI3Yzg3YTJmYmUwNWY2MjZiYjI1ZDEzNWJiMDYzNjdmIiwiaWF0IjoxNzA2NjM4NDM3LCJuYmYiOjE3MDY2Mzg0MzcsImV4cCI6MTcwNjY0MjAzNywic3ViIjoiIiwic2NvcGVzIjpbXX0.SijIN8Bx7_Yk2jysyRe3CwkMPsb1dhn7pkSkmyInIXyzODvsmutxh6mE2YelLUclafLDuG6cc75v_rCU2_LtWHt5l1KypXC_eR3qpJG2wQwHqcl5z0M9eiWkKLbPuRUg1QQEm2YyoUUGheiji1oAhiEVFcLuS3M1aG2kd-oykozANIuujdYFvBtz1fXwKY1uBe0ojQbzaD84UJEnxbQd8xXXTbt8-BWnXMLfSxTHj7TpC1il9TicfU1Shr-FGFdx2vzkl6NHr2qF_364Zo8Wfy8-h-5dfcx67hP-Kivzmw7JQXE1--iECani7H748rya1uhYbDrJBajpMGgh1vaiKw"
    const APITOKEN = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiJPclFrMVI4bDk5QnI4N2toSlRLM2VZcFhPeVhYVTdvZTh0N2dQNG1RTHJjNjg4VFFVaCIsImp0aSI6Ijg0ZDMwZjEwNTZkMWQ5NjM1NDEwNDhiYzQ3YjIzODlmYzI3MTVhZGU5ZGNmY2I0MTk0ZTgwNmZiYjYyZGVjZTY1ZTkyN2RmNzUwYTNiYmZlIiwiaWF0IjoxNzA2NjQ3MjkzLCJuYmYiOjE3MDY2NDcyOTMsImV4cCI6MTcwNjY1MDg5Mywic3ViIjoiIiwic2NvcGVzIjpbXX0.WSKeqUdVggk4LHTl_CnDEITEEO8tp51i5VWw3AI3qTDo9Elex-Wvo-AdiHCYI-5ErkU59ZAHzxc6EdOZJJAiTXazYFJysoGu-GckdX9KUR_kkUir3jtdXWjYFdwUt8aF2kIZtsNDKmu0erV-Vf6fTjVwb04sCHUkuoY8xAX6Nuz3y5GGhBWTJPlMGPor0KZFWkWHfX3e1foUTNyE9ZU1mcxj0WVDEURFpkqIcuZgplWTff6WR8B3gJOaADPjgP3E7vBoOHCBmD08pxl3IwYrPGrbZ43_C0RhGh9ArBaj_fpIVXfNVUvFmxmeeZgAV_KZltMlNg5qNeTvil9ozGvHIA";
    console.log(req.query);
    const apiUrl = `https://api.petfinder.com/v2/animals?type=${req.query.type}`;
    const response = await fetch(apiUrl, { 
      headers: {
        "Content-Type": "application/json",
        'Authorization': `Bearer ${APITOKEN}`,
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
    });
    const data = await response.json();
    res.json(data);
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