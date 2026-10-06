import {defineField, defineType} from 'sanity'

export const event = defineType({
  name: 'event',
  title: 'Agenda',
  type: 'document',
  fields: [
    defineField({
      name: 'date',
      title: 'Date',
      type: 'datetime',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'e.g. band or project name',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'location',
      title: 'Location',
      type: 'string',
      description: 'e.g. "Jazzhus Montmartre, Copenhagen"',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'link',
      title: 'Link',
      type: 'url',
      description: 'Tickets, event page, etc.',
    }),
    defineField({
      name: 'project',
      title: 'Project',
      type: 'reference',
      to: [{type: 'project'}],
      description: 'Shown in that project’s own agenda list, in addition to the main one.',
    }),
  ],
  orderings: [
    {
      title: 'Date, soonest first',
      name: 'dateAsc',
      by: [{field: 'date', direction: 'asc'}],
    },
  ],
  preview: {
    select: {title: 'title', subtitle: 'location', date: 'date'},
    prepare({title, subtitle, date}) {
      return {
        title,
        subtitle: date ? `${new Date(date).toLocaleDateString()} — ${subtitle}` : subtitle,
      }
    },
  },
})
