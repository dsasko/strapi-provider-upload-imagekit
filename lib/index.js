/* global strapi */

const ImageKit = require('@imagekit/nodejs')

module.exports = {
    init: config => {
        const uploadFolder = config.params?.folder || '/';

        const imagekitProvider = new ImageKit({
            publicKey: config.publicKey,
        });


        const uploadFile = async (file) => {
            const fileData = file.stream || file.buffer;

            try {
                const response = await imagekitProvider.files.upload({
                    file: fileData,
                    fileName: `${file.hash}${file.ext}`,
                    folder: uploadFolder,
                    useUniqueFileName: false,
                });

                const { fileId, url } = response;

                file.url = url;
                file.provider_metadata = {
                    fileId: fileId,
                };

                strapi.log.info(`File uploaded. ID:${fileId}`);

                if (file.buffer) {
                    delete file.buffer;
                }

            } catch (error) {
                strapi.log.error('Unable to upload file.');
            }
        };

        const deleteFile = async (file) => {
            if (!file?.provider_metadata?.fileId) {
                strapi.log.warn('File ID not found. Skipping deletion.');
                return;
            }

            const { fileId } = file?.provider_metadata;

            try {
                await imagekitProvider.files.delete(fileId);
                strapi.log.info(`File deleted. ID: ${fileId}`);
            } catch (error) {
                if (error.$ResponseMetadata?.statusCode === 404) {
                    strapi.log.warn(`File not found. Proceeding with deletion. ID:${fileId}`);
                } else {
                    strapi.log.error(`Unable to delete file. ID: ${fileId}`);
                }
            }
        };

        return {
            upload: uploadFile,
            uploadStream: uploadFile,
            delete: deleteFile,
        }
    },
};
