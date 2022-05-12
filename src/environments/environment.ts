// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
//"Principal": { "AWS": "arn:aws:sts::AWS-account-ID:federated-user/user-name" }
export const environment = {
  production: false,
  amplifyConfig: {
    Auth: {
      identityPoolId: 'eu-central-1:a88308ad-3458-45e1-8b1b-dbb5c18ce8ef',
      region: "eu-central-1",
      userPoolId: "eu-central-1_bvqkheaWe",
      userPoolWebClientId: "773dkf7cj8eita3qplror81ptg"
    },
    AWSS3: {
      bucket: 'ctsapprentice', //REQUIRED -  Amazon S3 bucket name
      region: 'eu-central-1', //OPTIONAL -  Amazon service region
      identityPoolId: "eu-central-1_bvqkheaWe"
    },
  },
  S3: {
    region: 'eu-central-1',
    bucketName: 'ctsapprentice'
  },
  api_url : "http://localhost:3001/"
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
