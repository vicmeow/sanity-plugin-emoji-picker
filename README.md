# Emoji Picker

An emoji picker for Sanity that uses [Emoji Mart](https://github.com/missive/emoji-mart).

![Emoji picker example](/docs/emoji-input.png)

## Installation

```
cd my-sanity-studio
sanity install emoji-picker
```

## Usage

To use the emoji picker, add `emoji` as the type of a field in your schema. This will render a field where you can select an emoji using the emoji-mart picker, and see a summary of the emoji you selected.

```js
export default {
  name: "mySchema",
  title: "My Schema",
  type: "document",
  fields: [
    {
      name: "myField",
      title: "My field",
      type: "emoji",
    },
  ],
}
```

The emoji picker saves all the details about the emoji you selected\*. This allows you to query specific emoji info when you need the emoji elsewhere.

(\*) Please note that this means you will see all the related emoji information when reviewing the changes of a document with the emoji type using the Review Changes feature.

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
    },
    {
      name: "imageUrl",
      title: "Image URL",
      type: "url"
    },
    {
      name: "keywords",
      title: "Keywords",
      type: "array",
      of: [{ type: "string" }]
    },
    {
      name: "customCategory",
      title: "Custom Category",
      type: "string"
    }
  ]
}
```

If you query for a document that uses the `emoji` type and has the `house` emoji selected, it will return:

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

The emoji input accepts a`picker` option that accepts the same options as the emoji-mart picker. [Full list of options.](https://github.com/missive/emoji-mart#picker)

```js
{
  name: 'myFieldName',
  title: 'My Field',
  type: 'emoji',
  options: {
    picker: {
      title: 'My Custom Title',
      color: 'hotpink',
      skin: 5,
      emoji: 'cat'
    }
  }
}
```

## Options

| Prop            | Required | Default | Description                                                                                                   |
| --------------- | :------: | ------- | ------------------------------------------------------------------------------------------------------------- |
| **hideSummary** |          | `false` | Hides the emoji summary from the form                                                                         |
| **picker**      |          |         | For a full list of options, see the [emoji-mart](https://github.com/missive/emoji-mart#picker) documentation. |
