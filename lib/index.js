/**
 * Module dependencies
 */

/* eslint-disable import/no-unresolved */
/* eslint-disable no-unused-vars */

// Public node modules.
const ImageKit = require("imagekit");
const fs = require("fs");

module.exports = {
  init: (config) => {
    console.log(`CONFIG 1: ${JSON.stringify(config, null, 4)}`);
    // Init
    const imagekit = new ImageKit({
      publicKey: config.publicKey,
      privateKey: config.privateKey,
      urlEndpoint: config.urlEndpoint,
    });

    return {
      upload: (file) => {
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
                strapi.log.info("File uploaded: %s", resp.url);
                file.url = resp.url; // Set the file url
                return resolve();
              },
              function (err) {
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
        let imagePath = getImagePath(file.url);
        strapi.log.info("Deleting file: %s", imagePath);

        return new Promise((resolve, reject) => {
          const deletePromise = imagekit.deleteFile(imagePath);

          deletePromise.then(
            function () {
              strapi.log.info("File deleted: %s", imagePath);
              return resolve();
            },
            function (err) {
              strapi.log.error("File deletion error: %j", err);
              return reject(err);
            }
          );
        });
      },
    };
  },
};
