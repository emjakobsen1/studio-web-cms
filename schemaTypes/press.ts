import {defineField, defineType} from 'sanity'

export const press = defineType({
  name: 'press',
  title: 'Press',
  type: 'document',
  fields: [
    defineField({
      name: 'quotes',
      title: 'Quotes',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'quote',
          fields: [
            defineField({name: 'quote', title: 'Quote', type: 'text', rows: 3, validation: (rule) => rule.required()}),
            defineField({name: 'source', title: 'Source', type: 'string', description: 'e.g. publication or critic name'}),
          ],
          preview: {
            select: {title: 'quote', subtitle: 'source'},
          },
        },
      ],
    }),
    defineField({
      name: 'pressKit',
      title: 'Press kit',
      type: 'file',
      description: 'Downloadable PDF press kit.',
    }),
  ],
  preview: {
    prepare() {
      return {title: 'Press'}
    },
  },
})
