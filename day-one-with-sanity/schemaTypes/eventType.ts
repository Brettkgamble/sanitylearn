import {defineField, defineType} from 'sanity';
import {CalendarIcon} from '@sanity/icons';

export const eventType = defineType({
  name: 'event',
  title: 'Event',
  icon: CalendarIcon,
  type: 'document',
  groups: [
    {name: 'details', title: 'Details'},
    {name: 'editorial', title: 'Editorial'},
  ],
  fields: [
    defineField({
      name: 'name',
      type: 'string',
      group: 'details',
      options: {
      list: ['in-person', 'virtual'],
      layout: 'radio',
    },
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      group: 'details',
      options: {source: 'name'},
      hidden: ({document}) => !document?.name,
      // Replace "slug" in the array of fields:
      validation: (rule) => rule
        .required()
        .error(`Required to generate a page on the website`),
    }),
    defineField({
      name: 'eventType',
      type: 'string',
      group: 'details',
    }),
    defineField({
      name: 'date',
      type: 'datetime',
      group: 'details',
    }),
    defineField({
      name: 'doorsOpen',
      description: 'Number of minutes before the start time for admission',
      group: 'details',
      type: 'number',
      initialValue: 60,
    }),
    defineField({
      name: 'venue',
      type: 'reference',
      group: 'details',
      to: [{type: 'venue'}],
      readOnly: ({value, document}) => !value && document?.eventType === 'virtual',
      validation: (rule) =>
      rule.custom((value, context) => {
        if (value && context?.document?.eventType === 'virtual') {
          return 'Only in-person events can have a venue'
        }
        return true
      }),
    }),
      defineField({
      name: 'headline',
      type: 'reference',
        group: 'details',
      to: [{type: 'artist'}]
    }),
    defineField({
      name: 'image',
      type: 'image',
      group: 'editorial',
    }),
    defineField({
      name: 'details',
      type: 'array',
      group: 'editorial',
      of: [{type: 'block'}]
    }),
    defineField({
      name: 'tickets',
      type: 'url',
      group: 'details',
    })
  ],
  preview: {
  select: {
    title: "name",
    subtitle: "headline.name",
    media: "image",
  },
},
})