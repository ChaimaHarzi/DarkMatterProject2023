/** @type {import('next').NextConfig} */
const nextConfig = {
  // Pin the project root: a stray lockfile in a parent folder would otherwise
  // be picked up as the workspace root.
  outputFileTracingRoot: __dirname,
}

module.exports = nextConfig
