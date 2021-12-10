# strapi-provider-upload-imagekit
![version v4.0.0](https://img.shields.io/badge/Version-4.0.0-956fff "version v4.0.0")

## Notes
### ImageKit provider for the Strapi Upload plugin
- Current version: `4.0.0`
- Compatible with Strapi version: `^4.0.0`
  - Latest tested version `4.0.0`

For Strapi `v3` please use `v0.2.5` of this provider.

## Installation

**1. Install via npm or yarn**

```
npm install strapi-provider-upload-imagekit --save
```

or

```
yarn add strapi-provider-upload-imagekit
```

**2. Add or modify the plugins configuration file**

Global configuration file is located in `./config/plugins.js`

Environment configuration files are located in `./config/env/{env}/plugins.js`

For more information please check the [official documentation](https://docs.strapi.io/developer-docs/latest/plugins/upload.html#using-a-provider).

**3. Add your configuration**

Example `./config/plugins.js`:

```js
module.exports = ({ env }) => ({
  upload: {
    config: {
      provider: "strapi-provider-upload-imagekit",  // Community providers need to have the full package name
      providerOptions: {
        publicKey: "publicKey",
        privateKey: "privateKey",
        urlEndpoint: "urlEndPoint",  // Example: https://ik.imagekit.io/username

        // Optional
        params: {
          folder: "/production/images"  // Defaults to "/" if value is not supplied
        }
      }
    }
  }
});
```

**4. Setting up `strapi::security` middlewares to prevent `contentSecurityPolicy` URL blocking**

Modify `./config/middleware.js`:

```js
// ...
{
    name: 'strapi::security',
    config: {
      contentSecurityPolicy: {
        useDefaults: true,
        directives: {
          'connect-src': ["'self'", 'https:'],
          'img-src': ["'self'", 'data:', 'blob:', 'ik.imagekit.io'],
          'media-src': ["'self'", 'data:', 'blob:', 'ik.imagekit.io'],
          upgradeInsecureRequests: null,
        },
      },
    },
},
// ...
```

## Resources
- [MIT License](LICENSE.md)

## Links
- [Strapi website](http://strapi.io/)
- [Strapi community on Discord](https://discord.strapi.io/)
- [Strapi news on Twitter](https://twitter.com/strapijs)

## Imagekit links
- [Imagekit node library](https://www.npmjs.com/package/imagekit)
- [Imagekit API Docs](https://docs.imagekit.io/api-reference/api-introduction)
