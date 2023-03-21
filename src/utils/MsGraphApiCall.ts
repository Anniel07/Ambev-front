import { api } from "src/boot/axios";
//import { graphConfig } from "../authConfig";

export async function callGetApi(accessToken: string, endPoint: string) {
  const bearer = `Bearer ${accessToken}`;
  const config = {
    headers : {
      Authorization: bearer
    }
  };
  return api.get(endPoint, config)
    .then(response => response)
    .catch(err => {
      //console.error(err);
      return err;
     });
}

export async function callPostApi(accessToken: string, endPoint: string, data: any) {
  const bearer = `Bearer ${accessToken}`;
  const config = {
    headers : {
      Authorization: bearer
    }
  };
  return api.post(endPoint, data, config)
    .then(response => response)
    .catch(err => {
      //console.error(err);
      return err;
     });
}


// export async function callMsGraph(accessToken: string) {
//   //console.log("doneee");
//   //const headers = new Headers();
//   ///accessToken = `eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6ImJXOFpjTWpCQ25KWlMtaWJYNVVRRE5TdHZ4NCJ9.eyJ2ZXIiOiIyLjAiLCJpc3MiOiJodHRwczovL2xvZ2luLm1pY3Jvc29mdG9ubGluZS5jb20vOTE4ODA0MGQtNmM2Ny00YzViLWIxMTItMzZhMzA0YjY2ZGFkL3YyLjAiLCJzdWIiOiJBQUFBQUFBQUFBQUFBQUFBQUFBQUFNcWVvZGpCVzd0aTlCNkdJS05KMUtJIiwiYXVkIjoiMGQwOGYyMjAtYWQ5ZC00ZGU1LWE2ZmQtNzFjNjU3NTI5YTA1IiwiZXhwIjoxNjc5NDA5NDQ5LCJpYXQiOjE2Nzk0MDU1NDksIm5iZiI6MTY3OTQwNTU0OSwibmFtZSI6IkFubmllbCBNYXJyZXJvIiwicHJlZmVycmVkX3VzZXJuYW1lIjoiYW5uaWVsbWFycmVyb0BnbWFpbC5jb20iLCJvaWQiOiIwMDAwMDAwMC0wMDAwLTAwMDAtMjFlMS03MmNjN2EzZTQyNjMiLCJ0aWQiOiI5MTg4MDQwZC02YzY3LTRjNWItYjExMi0zNmEzMDRiNjZkYWQiLCJhenAiOiIwZDA4ZjIyMC1hZDlkLTRkZTUtYTZmZC03MWM2NTc1MjlhMDUiLCJzY3AiOiJyZWFkQWxsIiwiYXpwYWNyIjoiMCIsImFpbyI6IkRmb0N4IW1HMXlPbDJJQm9ycG5FKk5LMDdxZTltVVk5YyFaMlBuMVVVVWlHaUxzMWtTKkpJSXIqY2FsMFRWOTZFdngyT3Vwb1IqM3B0WTdodkVpaHMqZEw5OVRydHdDU0dsQjdIaDFDbXFIM3BaVTZPaEE4QzE0WlRBQzk3N3BtNUo0RUZlZmRjUnNhUWJJNXhlUVZZY1kkIn0.V9uC5NKOZSTQPdhqv34GeSf2kV3H5jEYw7IKzVfKbz1TBPnjZ42ejrQ4eTFUT8UHO3p1Gq9-R8DolkQ73KIYBcM5aIPs6vLa6XKTN8s894SAAG_9l9MTQXhpKE49OfTElPiXAP775MCsmSE_5eQP0sjKTvZD-8wgTdNDAouCnyxejk-leXOo8sPBCgG9qx_YjEilGFo0aTjedQu52TVxgOt4kCekeS02agj1y-FD5FFGvl8fAq1l51NP_10VJah25hLlTULdlBQ79yoSnvgVWWDxddblF6Y6XYxkcfk9plAbxpKsdhcRuzGYetAEWGbsH285OnFq9MxKkxPm7am6Iw`;
//   const bearer = `Bearer ${accessToken}`;

//   //headers.append("Authorization", bearer);
// /*
//   const options = {
//     headers: headers
//   };
// */
//   const config = {
//     headers : {
//       Authorization: bearer
//     }
//   };
// /*
//       return fetch(graphConfig.graphMeEndpoint, options)
//           .then(response => response.json())
//           .catch(error => {
//               console.log(error);
//               throw error;
//           });
// */
//   return api.get('/api/Event/GetFarolAntingimento', config)
//     .then(response => response.data)
//     .catch(err => { throw err; });
// }
