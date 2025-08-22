export default {
  name: 'benefit',
  title: 'Benefit',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
    },
    {
      name: 'icon',
      title: 'Icon',
      type: 'string',
      options: {
        list: [
          { title: 'Droplets', value: 'droplets' },
          { title: 'Dollar Sign', value: 'dollar' },
          { title: 'Leaf', value: 'leaf' },
          { title: 'Tree', value: 'tree' },
          { title: 'Home', value: 'home' },
          { title: 'Users', value: 'users' },
        ],
      },
    },
    {
      name: 'order',
      title: 'Display Order',
      type: 'number',
    },
  ],
}