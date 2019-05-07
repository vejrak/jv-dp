const withCss = require('@zeit/next-css')
const { parsed } = require('dotenv').config()
const withImages = require('next-images')
const env = require('./env-config.js')

module.exports = withImages(
  withCss({
    publicRuntimeConfig: {
      ...env,
      ...parsed,
    },
  }),
)
