import React from "react"
import PropTypes from "prop-types"
import FormField from "part:@sanity/components/formfields/default"
import { PatchEvent, patches } from "part:@sanity/form-builder"
import styles from "./styles.css"
import "emoji-mart/css/emoji-mart.css?raw"
import { Picker, Emoji } from "emoji-mart"

export default class EmojiPicker extends React.Component {
  static propTypes = {
    type: PropTypes.shape({
      options: PropTypes.object
    }),
    value: PropTypes.string,
    onChange: PropTypes.func.isRequired
  }

  emojiPicker = React.createRef()
  inputElement = React.createRef()

  focus() {
    this.inputElement.focus()
  }

  state = {
    isPickerOpen: false
  }

  // Handle opening the emoji picker
  handleShowPicker = () => {
    this.setState({ isPickerOpen: true }, () =>
      document.addEventListener("click", this.handleHidePicker)
    )
  }

  // Handle closing the emoji picker
  handleHidePicker = event => {
    event.preventDefault()
    if (!this.emojiPicker) return
    if (this.emojiPicker && !this.emojiPicker.current.contains(event.target)) {
      this.setState({ isPickerOpen: false }, () =>
        document.removeEventListener("click", this.handleHidePicker)
      )
    }
  }

  // Handle choosing an emoji and updating the fields
  handleUpdateEmojiFields = emoji => {
    const { type, onChange, value } = this.props
    const { set, unset } = patches
    const fields = Object.keys(emoji)
      .map(key => {
        if (!emoji[key]) {
          // Unset the value if no value
          return unset([key])
        }
        // Override and set the value for strings and arrays of strings
        if (typeof emoji[key] === "string" || Array.isArray(emoji[key])) {
          return set(emoji[key], [key])
        }
        return null
      })
      .filter(Boolean)

    // Patch the fields
    onChange(PatchEvent.from(...fields))

    console.log("close picker")
    // Close emoji picker and remove event listener
    this.setState({ isPickerOpen: false }, () =>
      document.removeEventListener("click", this.handleHidePicker)
    )
  }

  componentWillUnmount() {
    document.removeEventListener("click", this.handleHidePicker)
  }

  render() {
    const { type, value } = this.props
    const { isPickerOpen } = this.state
    const options = type.options
    const customEmojis = [
      {
        name: "Octocat",
        short_names: ["octocat"],
        text: "",
        emoticons: [],
        keywords: ["github"],
        imageUrl:
          "https://github.githubassets.com/images/icons/emoji/octocat.png",
        customCategory: "GitHub"
      },
      {
        name: "Test Flag",
        short_names: ["test"],
        text: "",
        emoticons: [],
        keywords: ["test", "flag"],
        spriteUrl:
          "https://unpkg.com/emoji-datasource-twitter@4.0.4/img/twitter/sheets-256/64.png",
        sheet_x: 1,
        sheet_y: 1,
        size: 64,
        sheetColumns: 52,
        sheetRows: 52
      }
    ]
    return (
      <div className={styles.container}>
        <FormField label={type.title} description={type.description}>
          <div className={styles.emojiWrapper}>
            <div className={styles.emojiButtonWrapper}>
              <button
                aria-labelledby="button-label"
                className={styles.emojiButtonNative}
                ref={this.inputElement}
                onClick={this.handleShowPicker}
              >
                {value && value.imageUrl ? (
                  <div className={styles.emoji}>
                    <img src={value.imageUrl} alt={value.name} />
                  </div>
                ) : (
                  <div className={styles.emoji}>
                    {(value && value.native) || "🐱"}
                  </div>
                )}
              </button>
              <div id="button-label">Pick emoji</div>
              {isPickerOpen && (
                <div className={styles.pickerWrapper} ref={this.emojiPicker}>
                  <Picker
                    onSelect={this.handleUpdateEmojiFields}
                    custom={customEmojis}
                    {...options.picker}
                  />
                </div>
              )}
            </div>

            <div className={styles.fieldsWrapper}>
              {!options.hideSummary &&
                value &&
                type.fields.map(field => {
                  if (!value[field.name]) return null
                  if (Array.isArray(value[field.name])) {
                    if (value[field.name].length === 0) return null
                    return (
                      <div className={styles.field}>
                        <div className={styles.label}>{field.type.title}</div>
                        <div className={styles.value}>
                          {value[field.name].join(", ")}
                        </div>
                      </div>
                    )
                  }
                  return (
                    <div
                      className={`${styles.field} ${
                        field.name === "imageUrl" ? styles.urlField : ""
                      }`}
                    >
                      <div className={styles.label}>{field.type.title}</div>
                      <div className={styles.value}>{value[field.name]}</div>
                    </div>
                  )
                })}
            </div>
          </div>
        </FormField>
      </div>
    )
  }
}
