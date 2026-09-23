import {defineField, defineType} from 'sanity'

export const release = defineType({
  name: 'release',
  title: 'Release',
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
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {hotspot: true},
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'project',
      title: 'Project',
      type: 'reference',
      to: [{type: 'project'}],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'releaseDate',
      title: 'Release date',
      type: 'date',
    }),
    defineField({
      name: 'length',
      title: 'Length',
      type: 'string',
      description: 'e.g. "42:10" or "4 tracks"',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'personnel',
      title: 'Personnel',
      type: 'array',
      of: [{type: 'string'}],
      description: 'e.g. "Jesper Lørup – Drums"',
    }),
    defineField({
      name: 'link',
      title: 'Listen link',
      type: 'url',
      description: 'Bandcamp, Spotify, or wherever it can be heard.',
    }),
  ],
  preview: {
    select: {title: 'title', subtitle: 'project.title', media: 'image'},
  },
})
