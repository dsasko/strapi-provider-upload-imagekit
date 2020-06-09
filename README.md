# strapi-provider-upload-imagekit

## Configurations

Your configuration is passed down to the cloudinary configuration. (e.g: `cloudinary.config(config)`). You can see the complete list of options [here](https://cloudinary.com/documentation/cloudinary_sdks#configuration_parameters)

**Example**

`./extensions/upload/config/settings.json`

```jsonc
{
  "provider": "imagekit",
  "providerOptions": {
    "publicKey": "publicKey",  // put your publicKey here
    "privateKey": "privateKey", // put your privateKey here
    "urlEndpoint": "urlEndPoint", // put your urlEndpoint
    "params": {  // optional section
      "folder": "/production/images" // folder location in imagekit.  Defaults to "/" if value is not supplied
    }
  }
}

```

ImageKit provider for strapi upload

## Resources

- [MIT License](LICENSE.md)

## Links

- [Strapi website](http://strapi.io/)
- [Strapi community on Slack](http://slack.strapi.io)
- [Strapi news on Twitter](https://twitter.com/strapijs)
