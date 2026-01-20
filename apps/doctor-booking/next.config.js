/** @type {import('next').NextConfig} */
const nextConfig = {
  sassOptions: {
    includePaths: ['./src/styles'],
  },
  transpilePackages: ['@doctor-booking/necktie-ui'],
}

module.exports = nextConfig
