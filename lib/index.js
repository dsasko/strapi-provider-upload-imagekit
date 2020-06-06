/**
 * Module dependencies
 */

/* eslint-disable no-unused-vars */

// Public node modules.
const ImageKit = require("imagekit");

module.exports = {
  init: (config) => {
    console.log(`CONFIG: ${JSON.stringify(config, null, 4)}`);
    // Init
    const imagekit = new ImageKit({
      publicKey: config.publicKey,
      privateKey: config.privateKey,
      urlEndpoint: config.urlEndpoint,
    });

    return {
      upload: (file) => {
        /* eslint-disable-next-line no-undef */
        strapi.log.info("File upload initiated...");

        return new Promise((resolve, reject) => {
          try {
            const fileName = file.name || "TEST";
            console.log(`File: ${JSON.stringify(Object.keys(file))}`);
            console.log(`file name: ${file.name}`);
            console.log(`file path: ${file.path}`);
            const uploadPromise = imagekit.upload({
              file: file.buffer,
              fileName: file.hash,
            });
            uploadPromise.then(
              function (resp) {
                console.log(`UPLOAD: ${JSON.stringify(resp, null, 4)}`);

                /* eslint-disable-next-line no-undef */
                strapi.log.info("File uploaded: %s", resp.url);
                file.url = resp.url; // Set the file url
                file.provider_metadata = {
                  fileId: resp.fileId
                };

                return resolve();
              },
              function (err) {
                /* eslint-disable-next-line no-undef */
                strapi.log.error("File upload error: %j", err);
                return reject(err);
              }
            );
          } catch (error) {
            console.log(`THIS IS MY ERROR THAT WAS CAUGHT: ${error}`);
          }
        });
      },
      delete: (file) => {
        console.log(`CONFIG: ${JSON.stringify(file, null, 4)}`);

        console.log(`File: ${JSON.stringify(Object.keys(file))}`);

        /* eslint-disable-next-line no-undef */
        strapi.log.info("Deleting file: %s", file.hash);

        return new Promise((resolve, reject) => {
          const { fileId } = file.provider_metadata;
          const deletePromise = imagekit.deleteFile(fileId);

          deletePromise.then(
            function () {
              /* eslint-disable-next-line no-undef */
              strapi.log.info("File deleted: %s", file.hash);
              return resolve();
            },
            function (err) {

              /* eslint-disable-next-line no-undef */
              strapi.log.error("File deletion error: %j", err);
              return reject(err);
            }
          );
        });
      },
    };
  },
};
