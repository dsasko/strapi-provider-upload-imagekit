/* global strapi */

const ImageKit = require('imagekit');

// https://stackoverflow.com/questions/14269233/node-js-how-to-read-a-stream-into-a-buffer/67729663#67729663
function stream2buffer(stream) {
    return new Promise((resolve, reject) => {
        const _buf = [];

        stream.on('data', (chunk) => {
            strapi.log.info('Fetching data from stream.');
            _buf.push(chunk)
        });
        stream.on('end', () => resolve(Buffer.concat(_buf)));
        stream.on('error', (err) => reject(err));
    });
}

module.exports = {
    init: config => {
        const uploadFolder = config.params?.folder || '/';

        const imagekitProvider = new ImageKit({
            publicKey: config.publicKey,
            privateKey: config.privateKey,
            urlEndpoint: config.urlEndpoint,
        });

        const uploadFile = file => {
            return new Promise((resolve, reject) => {
                imagekitProvider.upload({
                    file : file.buffer,
                    fileName : file.hash + file.ext,
                    folder: uploadFolder,
                }).then(response => {
                    const { fileId, url } = response;
                    file.url = url;
                    file.provider_metadata = {
                        fileId: fileId,
                    };
                    strapi.log.info(`File uploaded. ID:${fileId}`);
                    if (file.buffer) {
                        delete file.buffer;
                    }
                    return resolve();
                }).catch(error => {
                    strapi.log.error('Unable to upload file.');
                    return reject(error);
                });
            });
        };

        const uploadStream = async file => {
            if (!file.stream) {
                return Promise.reject(new Error('Missing file stream'));
            }

            try {
                file.buffer = await stream2buffer(file.stream);
                strapi.log.info('Stream captured, uploading file.');
                return uploadFile(file);
            } catch (error) {
                strapi.log.error('Unable to upload file from stream.');
                return Promise.reject(error);
            }
        }

        const deleteFile = file => {
            return new Promise((resolve, reject) => {
                if (!file?.provider_metadata?.fileId) {
                    strapi.log.warn('File ID not found. Skipping deletion.');
                    return resolve();
                }

                const { fileId } = file?.provider_metadata;

                imagekitProvider.deleteFile(fileId).then((_response) => {
                    strapi.log.info(`File deleted. ID:${fileId}`);
                    return resolve();
                }).catch(error => {
                    if (error.$ResponseMetadata?.statusCode === 404) {
                        strapi.log.warn(`File not found. Proceeding with deletion. ID:${fileId}`);
                        return resolve();
                    }
                    strapi.log.error(`Unable to delete file. ID:${fileId}`);
                    return reject(error);
                });
            });
        };

        return {
            upload: uploadFile,
            uploadStream: uploadStream,
            delete: deleteFile,
        }
    },
};
