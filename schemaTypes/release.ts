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
      name: 'releaseType',
      title: 'Release type',
      type: 'string',
      options: {
        list: [
          {title: 'Album', value: 'album'},
          {title: 'EP', value: 'ep'},
          {title: 'Single', value: 'single'},
        ],
        layout: 'radio',
      },
      initialValue: 'album',
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
      name: 'links',
      title: 'Listen links',
      type: 'array',
      of: [{type: 'socialLink'}],
      description:
        'Bandcamp, Spotify, YouTube, a Linktree, or wherever it can be heard — add as many as apply. The first one is used for the cover photo\'s click-through link.',
    }),
    defineField({
      name: 'media',
      title: 'Photos & videos',
      type: 'array',
      of: [
        defineField({
          name: 'item',
          title: 'Item',
          type: 'object',
          fields: [
            defineField({
              name: 'mediaType',
              title: 'Type',
              type: 'string',
              options: {
                list: [
                  {title: 'Image', value: 'image'},
                  {title: 'Video', value: 'video'},
                ],
                layout: 'radio',
              },
              initialValue: 'image',
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'image',
              title: 'Image',
              type: 'image',
              options: {hotspot: true},
              hidden: ({parent}) => parent?.mediaType !== 'image',
            }),
            defineField({
              name: 'videoUrl',
              title: 'Video link',
              type: 'url',
              description: 'A YouTube or Vimeo link — not an uploaded file.',
              hidden: ({parent}) => parent?.mediaType !== 'video',
              validation: (rule) =>
                rule.custom((value, context) => {
                  const parent = context.parent as {mediaType?: string} | undefined
                  if (parent?.mediaType !== 'video') return true
                  if (!value) return 'A video link is required'
                  return /^https?:\/\/([^/]*\.)?(youtube\.com|youtu\.be|vimeo\.com)\//i.test(value)
                    ? true
                    : 'Must be a YouTube or Vimeo link'
                }),
            }),
            defineField({name: 'alt', title: 'Alt text', type: 'string'}),
            defineField({
              name: 'isTitleImage',
              title: 'Use as title image',
              type: 'boolean',
              initialValue: false,
              description:
                'Feature this as the large image at the top of the release page, in place of the default Image above — works for a video too. Mark at most one item.',
            }),
          ],
          preview: {
            select: {mediaType: 'mediaType', image: 'image', isTitleImage: 'isTitleImage', alt: 'alt'},
            prepare({mediaType, image, isTitleImage, alt}) {
              const kind = mediaType === 'video' ? 'Video' : 'Image'
              return {title: isTitleImage ? `★ Title image (${kind})` : kind, subtitle: alt, media: image}
            },
          },
        }),
      ],
      description:
        'Extra press/release photos and videos shown in a gallery below the main info, with a scroll-linked wave effect on their edges.',
    }),
    defineField({
      name: 'finalNote',
      title: 'Closing note',
      type: 'text',
      rows: 3,
      description: 'e.g. catalog number and copyright line, shown under the photo gallery.',
    }),
    defineField({
      name: 'sponsors',
      title: 'Sponsors & funding',
      type: 'array',
      of: [
        defineField({
          name: 'sponsor',
          title: 'Sponsor',
          type: 'object',
          fields: [
            defineField({
              name: 'name',
              title: 'Name',
              type: 'string',
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'image',
              title: 'Logo',
              type: 'image',
              options: {hotspot: true},
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'link',
              title: 'Link',
              type: 'url',
              validation: (rule) => rule.required(),
            }),
          ],
          preview: {
            select: {title: 'name', media: 'image'},
          },
        }),
      ],
      description:
        'e.g. KODA. Shown below the extra media as a logo with the name underneath; clicking it opens the link.',
    }),
    defineField({
      name: 'featured',
      title: 'Feature in hero',
      type: 'boolean',
      description:
        'Show this release on the homepage hero, with a Listen button linking to it. Only feature one release at a time — if several are marked, the most recently updated one wins.',
      initialValue: false,
    }),
  ],
  preview: {
    select: {title: 'title', subtitle: 'project.title', media: 'image', featured: 'featured'},
    prepare({title, subtitle, media, featured}) {
      return {title, subtitle: featured ? `★ Featured — ${subtitle}` : subtitle, media}
    },
  },
})
