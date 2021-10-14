import EmojiInput from "./EmojiPicker";
export default {
  name: "emoji",
  title: "Emoji",
  type: "object",
  inputComponent: EmojiInput,
  fields: [
    {
      name: "id",
      title: "ID",
      type: "string",
    },
    {
      name: "name",
      title: "Name",
      type: "string",
    },
    {
      name: "colons",
      title: "Colons",
      type: "string",
    },
    {
      name: "text",
      title: "Text",
      type: "string",
    },
    {
      name: "emoticons",
      title: "Emoticons",
      type: "array",
      of: [{ type: "string" }],
    },
    {
      name: "short_names",
      title: "Short-names",
      type: "array",
      of: [{ type: "string" }],
    },
    {
      name: "skin",
      title: "Skin",
      type: "number",
    },
    {
      name: "unified",
      title: "Unified",
      type: "string",
    },
    {
      name: "native",
      title: "Native",
      type: "string",
    },
    {
      name: "imageUrl",
      title: "Image URL",
      type: "url",
    },
    {
      name: "keywords",
      title: "Keywords",
      type: "array",
      of: [{ type: "string" }],
    },
    {
      name: "customCategory",
      title: "Custom Category",
      type: "string",
    },
  ],
  preview: {
    select: {
      title: "native",
      subtitle: "name",
    },
  },
};
