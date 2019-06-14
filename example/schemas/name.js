import React from 'react'
export default {
  name: 'name',
  title: 'Name',
  type: 'document',
  fields: [
    {
      name: 'emoji',
      title: 'Emoji',
      type: 'string',
      description: 'Pick an emoji, any emoji.',
      options: {
        emoji: {
          type: 'name',
          picker: {
            showSkinTones: true,
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
      emoji: 'emoji'
    },
    prepare(selection) {
      const { title, emoji } = selection
      const styles = {
        fontSize: '1.8rem'
      }
      return {
        title: `${emoji} ${title}`,
        // media: <div style={styles}>{emoji}</div>
      }
    }
  }
}
