import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'
import {structure} from './structure'

const SINGLETON_TYPES = new Set(['biography', 'press', 'contact'])

export default defineConfig({
  name: 'default',
  title: 'web-cms',

  projectId: 'du9e045z',
  dataset: 'production',

  plugins: [structureTool({structure}), visionTool()],

  schema: {
    types: schemaTypes,
    templates: (templates) => templates.filter(({schemaType}) => !SINGLETON_TYPES.has(schemaType)),
  },

  document: {
    newDocumentOptions: (prev, {creationContext}) => {
      if (creationContext.type === 'global') {
        return prev.filter(({templateId}) => !SINGLETON_TYPES.has(templateId))
      }
      return prev
    },
    actions: (prev, {schemaType}) =>
      SINGLETON_TYPES.has(schemaType)
        ? prev.filter(({action}) => action !== 'duplicate' && action !== 'delete')
        : prev,
  },
})
