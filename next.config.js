/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    config.externals.push({
      knex: 'commonjs knex'
    })

    return config
  }
}

module.exports = nextConfig
