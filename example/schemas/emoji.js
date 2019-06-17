import React from 'react'
export default {
  name: 'emoji',
  title: 'Emoji ❤️',
  type: 'document',
  fields: [
    {
      name: 'emoji',
      title: 'Emoji',
      type: 'string',
      description: 'Pick an emoji, any emoji.',
      options: {
        emoji: {
          picker: {
            color: '#f04a39',
            emoji: 'heart',
            title: 'Sanity + Emojis'
          }
        }
      }
    },
    {
      name: 'name',
      title: 'Name',
      type: 'string'
    }
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'emoji'
    }
  }
}
