module.exports = ({ env }) => ({
    upload: {
      config: {
        provider: '@strapi/provider-upload-cloudinary', // Use the correct provider name
        providerOptions: {
          cloud_name: env('CLOUDINARY_NAME'),
          api_key: env('CLOUDINARY_KEY'),
          api_secret: env('CLOUDINARY_SECRET'),
        },
        actionOptions: {
          upload: {},
          delete: {},
        },
      },
    },
  });