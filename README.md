![Emoji picker example](/docs/sanity-emoji.png)

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

To use the emoji picker in your schema you need to enable it on a field with a type of `string`. You can do this by setting `emoji: true` under the field's options.

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

`emoji` can also be an object. You can choose how you want to display the emoji by defining a `type`.

```js
{
  name: 'emoji',
  title: 'Emoji',
  type: 'string',
  description: 'Pick an emoji',
  options: {
    emoji: {
      type: 'native'
    }
  }
}
```

Available type options are: `native` (default), `colons`, `name`, `unified`.

You can also customize the emoji picker further with the options available in [Emoji Mart](https://github.com/missive/emoji-mart) under a `picker` option, including:

- `set`: The emoji set: `apple`, `google`, `twitter`, `emojione`, `messenger`, `facebook`. Default is `apple`.
- `include`/`exclude`: only load included or don't load excluded emoji categories
- `color`: The top bar anchors select and hover color
- `recent`: Pass your own frequently used emojis as array of string IDs

And more! See all [available options](https://github.com/missive/emoji-mart#picker).

```js
// schemas/name.js
{
  name: 'emoji',
  title: 'Emoji',
  type: 'string',
  description: 'Pick an emoji',
  options: {
    emoji: {
      picker: {
        set: 'messenger',
        emoji: 'heart',
        title: 'Sanity + Emojis'
      }
    }
  }
}
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