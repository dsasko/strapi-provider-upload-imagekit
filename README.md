ImageKit provider for the Strapi Upload plugin
- Current version: `5.10.0`
- Compatible with Strapi version: `^5.10.0`
  - Latest tested version `5.10.1`

> [!IMPORTANT]
> `MAYOR` and `MINOR` versions of the provider are representing compatability with Strapi, while the `PATCH` version is used to denote changes in the provider itself.

> [!TIP]
> For Strapi `v3` please use `v0.2.5` of this provider.

> [!TIP]
> For Strapi `v4` please use `v4.25.0` of this provider.

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

**3. Define global variables**

Example `.env`:

```dotenv
IMAGEKIT_PUBLIC_KEY=ed6445336472aef39084720adcf903b9
IMAGEKIT_PRIVATE_KEY=afbca80df2ec032de664aefb3a8579b7
IMAGEKIT_URL_ENDPOINT=https://ik.imagekit.io/username
IMAGEKIT_FOLDER=/production/images
IMAGEKIT_BASE_URL=ik.imagekit.io
```

**4. Add plugin configuration**

Example `./config/plugins.js`:

```js
export default ({env}) => ({
  upload: {
    config: {
      provider: "strapi-provider-upload-imagekit",  // Community providers need to have the full package name
      providerOptions: {
        publicKey: env('IMAGEKIT_PUBLIC_KEY'),
        privateKey: env('IMAGEKIT_PRIVATE_KEY'),
        urlEndpoint: env('IMAGEKIT_URL_ENDPOINT'),

        // Optional
        params: {
            folder: env('IMAGEKIT_FOLDER'),
        }
      }
    }
  }
});
```

**5. Setting up `strapi::security` middlewares to prevent `contentSecurityPolicy` URL blocking**

Modify `./config/middleware.js`:

```js
export default ({env}) => ([
    // ...
    {
        name: 'strapi::security',
        config: {
            contentSecurityPolicy: {
                useDefaults: true,
                directives: {
                    'connect-src': ["'self'", 'https:'],
                    'img-src': ["'self'", 'data:', 'blob:', env('IMAGEKIT_BASE_URL')],
                    'media-src': ["'self'", 'data:', 'blob:', env('IMAGEKIT_BASE_URL')],
                    upgradeInsecureRequests: null,
                },
            },
        },
    },
]);
```

## Resources
- [MIT License](LICENSE.md)

## Links
- [Strapi website](https://strapi.io/)
- [Strapi community on Discord](https://discord.strapi.io/)
- [Strapi news on Twitter](https://twitter.com/strapijs)

## Imagekit links
- [Imagekit node library](https://www.npmjs.com/package/imagekit)
- [Imagekit API Docs](https://docs.imagekit.io/api-reference/api-introduction)
