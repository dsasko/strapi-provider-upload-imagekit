# strapi-provider-upload-imagekit
![version v0.2.5](https://img.shields.io/badge/Version-0.2.5-956fff "version v0.2.5")
![Strapi v3.6.0](https://img.shields.io/badge/Strapi_version-3.6.0-956fff "Strapi v3.6.0")

ImageKit provider for strapi upload

- Current version: `0.2.5`
- Compatible with Strapi version: `^3.6.0`
  - Latest tested version `3.6.6`

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

For more information please check the [official documentation](https://strapi.io/documentation/developer-docs/latest/development/plugins/upload.html#using-a-provider).

**3. Add your configuration**

Example code:

```js
module.exports = ({ env }) => ({
  upload: {
    provider: "imagekit",
    providerOptions: {
      publicKey: "publicKey",
      privateKey: "privateKey",
      urlEndpoint: "urlEndPoint",
      // Optional
      params: {
        // Defaults to "/" if value is not supplied
        folder: "/production/images"
      }
    }
  }
});
```

For a more detailed and updated documentation on upload providers, please visit [the official documentation](https://strapi.io/documentation/v3.x/plugins/upload.html#using-a-provider).

## Resources

- [MIT License](LICENSE.md)

## Links
- [Strapi website](http://strapi.io/)
- [Strapi community on Slack](http://slack.strapi.io)
- [Strapi news on Twitter](https://twitter.com/strapijs)

## Imagekit links
- [Imagekit node library](https://www.npmjs.com/package/imagekit)
- [Imagekit API Docs](https://docs.imagekit.io/api-reference/api-introduction)
