/* global strapi */

/**
 * Module dependencies
 */

// Public node modules.
const ImageKit = require('imagekit');

module.exports = {
    init: (config) => {
    // Init
        const imagekit = new ImageKit({
            publicKey: config.publicKey,
            privateKey: config.privateKey,
            urlEndpoint: config.urlEndpoint,
        });

        return {
            upload: (file) => {
                strapi.log.info('File upload initiated...');

                return new Promise((resolve, reject) => {
                    const uploadPromise = imagekit.upload({
                        file: file.buffer,
                        fileName: file.hash,
                        folder: (config.params && config.params.folder) ? config.params.folder : '/',
                    });

                    uploadPromise.then(
                        function (resp) {
                            strapi.log.info('File uploaded: %s', resp.url);
                            file.url = resp.url; // Set the file url
                            file.provider_metadata = {
                                fileId: resp.fileId,
                            };

                            return resolve();
                        },
                        function (err) {
                            strapi.log.error('File upload error: %j', err);
                            return reject(err);
                        }
                    );
                });
            },
            delete: (file) => {
                strapi.log.info('Deleting file: %s', file.hash);

                return new Promise((resolve, reject) => {
                    const { fileId } = file.provider_metadata;
                    const deletePromise = imagekit.deleteFile(fileId);

                    deletePromise.then(
                        function () {
                            strapi.log.info('File deleted: %s', file.hash);
                            return resolve();
                        },
                        function (err) {
                            strapi.log.error('File deletion error: %j', err);
                            return reject(err);
                        }
                    );
                });
            },
        };
    },
};
