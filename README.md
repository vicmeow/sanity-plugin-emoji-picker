![Emoji picker example](/docs/sanity-emoji.png)

# Emoji Picker

An emoji picker for Sanity that uses [Emoji Mart](https://github.com/missive/emoji-mart).

## Installation

```
cd my-sanity-studio
sanity install emoji-picker
```

## Usage

To use the emoji picker, add `emoji` as the type of a field in your schema.

```js
export default {
  name: 'mySchema',
  title: 'My Schema',
  type: 'document',
  fields: [
    {
      name: 'myField',
      title: 'My field',
      type: 'emoji'
    }
  ]
}
```

This will render a field where you can select an emoji using the emoji-mart picker, and see information about the emoji you pick. The schema for the emoji type fields you can query specific emoji info for looks like this:

```
export default {
  name: "emoji",
  title: "Emoji",
  type: "object",
  inputComponent: EmojiInput,
  fields: [
    {
      name: "id",
      title: "ID",
      type: "string"
    },
    {
      name: "name",
      title: "Name",
      type: "string"
    },
    {
      name: "colons",
      title: "Colons",
      type: "string"
    },
    {
      name: "text",
      title: "Text",
      type: "string"
    },
    {
      name: "emoticons",
      title: "Emoticons",
      type: "array",
      of: [{ type: "string" }]
    },
    {
      name: "short_names",
      title: "Short-names",
      type: "array",
      of: [{ type: "string" }]
    },
    {
      name: "skin",
      title: "Skin",
      type: "number"
    },
    {
      name: "unified",
      title: "Unified",
      type: "string"
    },
    {
      name: "native",
      title: "Native",
      type: "string"
    }
  ]
}
```

If you have a document called `mySchema` that has an `emoji` field with the `house` emoji picked:

```
const query = `*[_type == 'mySchema'][0]`
client.get(query).then(result => {
  console.log(result)
})

// returns:
// {
//   ...,
//   "emoji": {
//     "colons": ":house:",
//     "emoticons": [],
//     "id": "house",
//     "name": "House Building",
//     "native": "🏠",
//     "short_names": ["house"],
//     "unified": "1f3e0"
//   }
// }

```


### Customization

To hide the summary info about the picked emoji, you can add `hideSummary` to the options:

```js
{
  name: 'myFieldName',
  title: 'My Field',
  type: 'emoji',
  options: {
    hideSummary: true
  }
}
```


To customize the picker, you can pass the same options as the emoji-mart picker accepts in a picker `object`. [Full list of options.](https://github.com/missive/emoji-mart#picker)


```js
{
  name: 'myFieldName',
  title: 'My Field',
  type: 'emoji',
  options: {
    picker: {
      title: 'My Emojis',
      color: 'red',
      defaultSkin: 3
    }
  }
}
```