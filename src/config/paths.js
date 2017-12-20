import { resolve, join } from 'path'

const projectRoot = resolve(__dirname, '..', '..')

export default {
  projectRoot,
  distribution: join(projectRoot, 'dist'),
  // Metalsmith
  metalsmithSource: 'content',
  metalsmithDestination: join('dist', 'site'),
  // Webpack
  webpackSource: join(projectRoot, 'src', 'assets'),
  webpackDestination: join(projectRoot, 'dist', 'assets'),
  webpackPublicPath: '/assets/',
  // Server
  serverRoot: join(projectRoot, 'dist', 'site'),
  pageBasePath:
    process.env.NODE_ENV !== 'production' ? '' : '/metalsmith-webpack-suite'
}
