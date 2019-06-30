const aws4 = require('aws4')
const axios = require('axios')
const { parse: parseUrl } = require('url')

const credentials = {
  sessionToken: process.env.AWS_SESSION_TOKEN,
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
}

const configureDb = (url, options = {}) => {
  const { host } = parseUrl(url)
  const elasticsearch = axios.create()
  elasticsearch.interceptors.request.use(config => ({
    ...config,
    ...aws4.sign(
      {
        host,
        path: config.url,
        method: config.method.toUpperCase(),
        url: `${url}${config.url}`,
        body: typeof config.data === 'string'
          ? config.data
          : JSON.stringify(config.data),
        headers: { 'Content-Type': 'application/json' }
      },
      credentials
    )
  }))

  return {
    ...elasticsearch,
    bulk: (index, jobs) => elasticsearch.post(
      options.refresh
        ? `${index}/doc/_bulk?refresh=${options.refresh}`
        : `${index}/doc/_bulk`,
      jobs.map(JSON.stringify).join('\n') + '\n'
    )
  }
}

module.exports = configureDb
