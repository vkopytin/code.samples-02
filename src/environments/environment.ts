export const environment = {
  issuer: 'https://localhost:5000',
  //issuer: 'https://idm2.azurewebsites.net',
  clientId: 'local-dev',
  idm: {
    //domain: 'https://idm2.azurewebsites.net',
    domain: 'https://localhost:5000',
  },
  account: {
    //domain: 'https://account1.azurewebsites.net',
    domain: 'https://localhost:3001',
  },
  catalog: {
    //domain: 'https://catalog3.azurewebsites.net',
    domain: 'http://localhost:3000',
  },
};
