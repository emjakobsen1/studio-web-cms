import {defineField, defineType} from 'sanity'

export const newsPost = defineType({
  name: 'newsPost',
  title: 'News',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {source: 'title'},
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published at',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {hotspot: true},
      description:
        'Shown at its own natural proportions — upload a wide photo or a tall poster and it displays uncropped either way.',
    }),
    defineField({
      name: 'mainText',
      title: 'Main text',
      type: 'array',
      of: [{type: 'block'}],
      description: 'Optional — leave empty for an image-only post, e.g. a tour poster.',
    }),
  ],
  orderings: [
    {
      title: 'Published date, new to old',
      name: 'publishedAtDesc',
      by: [{field: 'publishedAt', direction: 'desc'}],
    },
  ],
  preview: {
    select: {title: 'title', subtitle: 'publishedAt', media: 'image'},
  },
})
