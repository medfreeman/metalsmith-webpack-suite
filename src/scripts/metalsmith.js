/* eslint-disable import/max-dependencies */
import Metalsmith from 'metalsmith'
import assets from 'metalsmith-assets'
import layouts from 'metalsmith-layouts'
import ldschema from 'metalsmith-ldschema'
import markdown from 'metalsmith-markdownit'
import navigation from 'metalsmith-navigation'
import fingerprint from 'metalsmith-fingerprint-ignore'
import permalinks from 'metalsmith-permalinks'
import R from 'ramda'

import paths from '../config/paths'

import { StatisticsPlugin } from './metalsmith-helpers'

const __PROD__ = process.env.NODE_ENV === 'production'

export default new Metalsmith(paths.projectRoot)
  .clean(__PROD__)
  .source(paths.metalsmithSource)
  .destination(paths.metalsmithDestination)
  .use(
    ldschema({
      classLayout: 'class.html',
      propertyLayout: 'property.html',
      base: 'http://schema.example.com'
    })
  )
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
    permalinks({
      pattern: ':title',
      relative: false
    })
  )
  .use(
    navigation(
      {
        primary: {
          sortByNameFirst: true,
          filterProperty: false,
          filterValue: false,
          breadcrumbProperty: 'breadcrumb_path',
          pathProperty: 'nav_path',
          childrenProperty: 'nav_children',
          mergeMatchingFilesAndDirs: true,
          includeDirs: true
        }
      },
      {
        navListProperty: 'navs',
        permalinks: true
      }
    )
  )
  .use(
    layouts({
      engine: 'qejs',
      default: 'default.html',
      // to avoid conflics, we match only html files
      pattern: '**/*.html',
      title: 'schema.example.com',
      R: R
    })
  )
  // Display statistics of generated files at the end
  .use(StatisticsPlugin())
// Import above and use the debug plugin to get more detailed information
// .use(DebugPlugin())
