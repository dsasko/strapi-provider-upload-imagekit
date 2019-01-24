'use strict';

/**
 * Module dependencies
 */

/* eslint-disable import/no-unresolved */
/* eslint-disable no-unused-vars */

// Public node modules.
const ImageKit = require('imagekit');

module.exports = {
    provider: 'imagekit',
    name: 'ImageKit',
    auth: {
        imagekitId: {
            label: 'User ID',
            type: 'text'
        },
        apiKey: {
            label: 'API Key',
            type: 'text'
        },
        apiSecret: {
            label: 'API Secret',
            type: 'text'
        },
        useSubdomain: {
            label: 'Subdomain (yourID.imagekit.io) - Paid accounts only',
            type: 'enum',
            values: ['Yes', 'No']
        },
        useSecure: {
            label: 'Use SSL',
            type: 'enum',
            values: ['Yes', 'No']
        },
        imageRoot: {
            label: 'Image path (eg. `/`, `/strapi/`)',
            type: 'text',
        },
        pathStructure: {
            label: 'Additional path structure (eg. `/strapi/year/month/`)',
            type: 'enum',
            values: [
                '0) None',
                '1) /Year/',
                '2) /YearMonth/',
                '3) /Year/Month/'
            ]
        }
    },
    init: (config) => {

        // Init
        const imagekit = new ImageKit({
            "imagekitId": config.imagekitId,
            "apiKey": config.apiKey,
            "apiSecret": config.apiSecret,
            "useSubdomain": config.useSubdomain == 'No' ? false : true,
            "useSecure": config.useSecure == 'No' ? false : true
        });

        const imageRoot = config.imageRoot ? config.imageRoot : '/';
        const pathStructure = config.pathStructure.replace(/(?=\)).*$/gi,'');   // Get the pathStructure number

        /**
         * Build path for uploaded images
         *
         * @return {string} path
         */
        const getPath = () => {
            if (pathStructure != '0') {
                let currentTime = new Date();                                   // Current datetime
                let year = currentTime.getFullYear();                           // Year
                let month = ('0' + (currentTime.getMonth() + 1)).slice(-2);     // Month with leading 0
                if (pathStructure == '1') {
                    // Add Year folder to the path
                    return imageRoot + year + '/'
                } else if (pathStructure == '2') {
                    // Add YearMonth folder to the path
                    return imageRoot + year + month + '/';
                } else if (pathStructure == '3') {
                    // Add Year and Month folders to the path
                    return imageRoot + year + '/' + month + '/';
                }
            }

            return imageRoot;
        }

        /**
         * Get Image Path
         *
         * Split the url via the users ID and take the remaining string as the image path
         *
         * @param {string} url
         *
         * @return {string} imagePath
         */
        const getImagePath = (url) => {
            return url.split(config.imagekitId)[1];
        }

        return {
            upload: (file) => {
                strapi.log.info('File upload initiated...');

                return new Promise((resolve, reject) => {
                    const uploadPromise = imagekit.upload(Buffer.from(file.buffer, 'binary').toString('base64'), {
                        "filename": file.hash,
                        "folder": getPath()
                    });

                    uploadPromise.then(function (resp) {
                        strapi.log.info('File uploaded: %s', resp.url);
                        file.url = resp.url;    // Set the file url
                        return resolve();
                    }, function (err) {
                        strapi.log.error('File upload error: %j', err);
                        return reject(err);
                    });
                });
            },
            delete: (file) => {
                let imagePath = getImagePath(file.url);
                strapi.log.info('Deleting file: %s', imagePath);

                return new Promise((resolve, reject) => {
                    const deletePromise = imagekit.deleteFile(imagePath);

                    deletePromise.then(function() {
                        strapi.log.info('File deleted: %s', imagePath);
                        return resolve();
                    }, function(err) {
                        strapi.log.error('File deletion error: %j', err);
                        return reject(err);
                    });
                });
            }
        };
    }
};
