// This is the actual metalsmith configuration script.
import Metalsmith from 'metalsmith'
import assets from 'metalsmith-assets'
import layouts from 'metalsmith-layouts'
import markdown from 'metalsmith-markdownit'
import fingerprint from 'metalsmith-fingerprint-ignore'

import paths from '../config/paths'

import { StatisticsPlugin } from './metalsmith-helpers'

const __PROD__ = process.env.NODE_ENV === 'production'

export default new Metalsmith(paths.projectRoot)
  .clean(__PROD__)
  .source(paths.metalsmithSource)
  .destination(paths.metalsmithDestination)
  .use(
    assets({
      source: './dist/assets',
      destination: './assets'
    })
  )
  .use(fingerprint({ pattern: 'assets/page.css' }))
  .use(fingerprint({ pattern: 'assets/immediate.js' }))
  .use(fingerprint({ pattern: 'assets/page.js' }))
  .use(
    markdown({
      html: true
    })
  )
  .use(
    layouts({
      engine: 'qejs',
      default: 'default.html',
      // to avoid conflics, we match only html files
      pattern: '**/*.html'
    })
  )
  // Display statistics of generated files at the end
  .use(StatisticsPlugin())
// Import above and use the debug plugin to get more detailed information
// .use(DebugPlugin())
