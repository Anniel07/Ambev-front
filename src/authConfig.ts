import { LogLevel, PublicClientApplication } from '@azure/msal-browser';

// Config object to be passed to Msal on creation
export const msalConfig = {
  auth: {
    clientId: 'd41b4f1c-b1d8-44c7-b04a-0ddbf8d66c4d', //
    authority: 'https://login.microsoftonline.com/common', //default
    redirectUri: 'http://localhost:8080', //
    postLogoutRedirectUri: '/', // Must be registered as a SPA redirectURI on your app registration
    //scopeUri: ['api://0d08f220-ad9d-4de5-a6fd-71c657529a05/readAll'],
    //scope: 'api://0d08f220-ad9d-4de5-a6fd-71c657529a05/readAll'
  },
  cache: {
    cacheLocation: 'localStorage'
  },
  system: {
      loggerOptions: {
          loggerCallback: (level: LogLevel, message: string, containsPii: boolean) => {
              if (containsPii) {
                  return;
              }
              switch (level) {
                  case LogLevel.Error:
                      console.error(message);
                      return;
                  case LogLevel.Info:
                      console.info(message);
                      return;
                  case LogLevel.Verbose:
                      console.debug(message);
                      return;
                  case LogLevel.Warning:
                      console.warn(message);
                      return;
                  default:
                      return;
              }
          },
          logLevel: LogLevel.Verbose
      }
  }
};

export const msalInstance = new PublicClientApplication(msalConfig);

// Add here scopes for id token to be used at MS Identity Platform endpoints.
export const loginRequest = {
  scopes: ['openid api://0d08f220-ad9d-4de5-a6fd-71c657529a05/readAll'], //'User.Read', 'openid', 'profile', 'offline_access', 'readAll', 
};

// Add here the endpoints for MS Graph API services you would like to use.
export const graphConfig = {
  //graphMeEndpoint: 'https://graph.microsoft.com/v1.0/me'
  graphMeEndpoint: 'https://localhost:7033/api/Event/GetFarolAntingimento',
};
