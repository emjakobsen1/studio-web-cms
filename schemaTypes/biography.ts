import {defineField, defineType} from 'sanity'

export const biography = defineType({
  name: 'biography',
  title: 'Biography',
  type: 'document',
  fields: [
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {hotspot: true},
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'pullQuote',
      title: 'Pull quote',
      type: 'string',
      description: 'Short highlighted line shown above the biography text.',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'array',
      of: [{type: 'block'}],
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: {media: 'image'},
    prepare({media}) {
      return {title: 'Biography', media}
    },
  },
})
