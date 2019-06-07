![Emoji picker example](/docs/emoji-picker-example.png)

# Emoji Picker

An emoji picker for Sanity that uses [Emoji Mart](https://github.com/missive/emoji-mart).

## **Usage as a Sanity plugin**

```
cd my-sanity-studio
sanity install sanity-emoji
mkdir parts
touch parts/inputResolver.js
```

### **1. Add an input resolver**

Add this to `parts/inputResolver.js`:

```
import EmojiPicker from '../../src/components/EmojiPicker'
import {get} from 'lodash'

export default function resolveInput(type) {
  if (type.name === 'string' && get(type, 'options.emoji')) {
    return EmojiPicker
  }
  return false
}
```

See the [inputResolver.js](/example/parts/inputResolver.js) file for the full code.

### **2. Configure `sanity.json`**

Add this to the `parts` array in your `sanity.json` file:

```
{
  "implements": "part:@sanity/form-builder/input-resolver",
  "path": "./parts/inputResolver"
}
```

See the [sanity.json](/example/sanity.json) file for the full code.


### **3. Use in a schema**

Add this to one of your schema types. You should now be able to pick an emoji for this field when you start the Sanity Studio.

```
{
  name: 'emoji',
  title: 'Emoji',
  type: 'string',
  description: 'Pick an emoji',
  options: {
    emoji: true
  }
}
```

See the [name.js](/example/schemas/name.js) file for the full code.

### **4. Preview emoji in the Studio (optional)**

![Emoji picker example](/docs/emoji-picker-example.png)

To create a custom preview using the emoji in the Studio, add this to your schema:

```js 
import React from 'react'
export default {
  ..., 
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
        // For this to work you must import React from 'react' like above:
        media: <div style={styles}>{emoji}</div>
      }
    }
  }
}
```

See the [name.js](/example/schemas/name.js) file for the full code.

## Display emojis

This plugin saves the emoji as an encoded URI. In order to display the emoji, you need to decode the value first.

```js
/* 

Example schema field:
  {
    name: 'emoji',
    title: 'Emoji',
    type: 'string',
    options: {
      emoji: true
    }
  }

  JSON output:
  {
    "_createdAt":"2019-06-07T15:08:17Z",
    "_id":"7427f7c6-9e2b-44b2-8f77-f579f8adcc88",
    "_rev":"sDUck3VVFHMoLo5ZCNesFG",
    "_type":"emoji",
    "_updatedAt":"2019-06-07T15:08:17Z",
    "emoji":"%F0%9F%98%98", // same as 😘
    "name":"emoji",
  } 

*/
// %F0%9F%98%98 > 😘
const emoji = decodeURI(emoji) // 😘

```

## **Usage, standalone**

```bash
git clone // this repo
yarn install // or npm install
yarn build // or npm run build
cd example/
yarn install // or npm install
sanity start
open http://localhost:3333
```