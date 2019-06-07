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
      options: {
        emoji: true
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
      emojiCode: 'emoji'
    },
    prepare(selection) {
      const { title, emojiCode } = selection
      const emoji = decodeURI(emojiCode)
      const styles = {
        fontSize: '1.8rem'
      }
      return {
        title: title,
        media: <div style={styles}>{emoji}</div>
      }
    }
  }
}
