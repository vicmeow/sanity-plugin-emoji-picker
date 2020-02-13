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
    value: PropTypes.object,
    onChange: PropTypes.func.isRequired
  }

  emojiPicker = React.createRef()
  inputElement = React.createRef()

  state = {
    isPickerOpen: false,
    fallbackValue: this.props.value || {}
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

    this.setState({ fallbackValue: emoji })

    const allowedFields = [
      "id",
      "name",
      "colons",
      "short_names",
      "unified",
      "native",
      "imageUrl",
      "keywords",
      "customCategory",
      "skin",
      "emoticons",
      "text"
    ]
    const fields = Object.keys(emoji)
      .map(key => {
        if (allowedFields.some(value => value === key)) return key
      })
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
    const unsetFields = allowedFields.map(key => unset([key]))
    onChange(PatchEvent.from(...unsetFields, ...fields))
    // Close emoji picker and remove event listener
    this.setState({ isPickerOpen: false }, () =>
      document.removeEventListener("click", this.handleHidePicker, null)
    )
  }

  componentDidMount() {
    if (this.inputElement) {
      this.inputElement.current.focus()
    }
  }

  componentWillUnmount() {
    document.removeEventListener("click", this.handleHidePicker)
  }

  render() {
    const { type, value } = this.props
    const { isPickerOpen, fallbackValue } = this.state
    const { options } = type
    const endValue = value || fallbackValue
    const fields = type.fields || []
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
                {endValue && endValue.imageUrl ? (
                  <div className={styles.emoji}>
                    <img src={endValue.imageUrl} alt={endValue.name} />
                  </div>
                ) : (
                  <div className={styles.emoji}>
                    {(endValue && endValue.native) || "🐱"}
                  </div>
                )}
              </button>
              <div id="button-label">Pick emoji</div>
              {isPickerOpen && (
                <div className={styles.pickerWrapper} ref={this.emojiPicker}>
                  <Picker
                    onSelect={this.handleUpdateEmojiFields}
                    {...options.picker}
                  />
                </div>
              )}
            </div>

            <div className={styles.fieldsWrapper}>
              {!options.hideSummary &&
                fields.map(field => {
                  if (!endValue) return null
                  if (typeof endValue[field.name] === "string") {
                    return (
                      <div
                        key={field.name}
                        className={`${styles.field} ${
                          field.name === "imageUrl" ? styles.urlField : ""
                        }`}
                      >
                        <div className={styles.label}>{field.type.title}</div>
                        <div className={styles.value}>
                          {endValue[field.name]}
                        </div>
                      </div>
                    )
                  }
                  if (Array.isArray(endValue[field.name])) {
                    if (endValue[field.name].length === 0) return null
                    return (
                      <div className={styles.field} key={field.name}>
                        <div className={styles.label}>{field.type.title}</div>
                        <div className={styles.value}>
                          {endValue[field.name].join(", ")}
                        </div>
                      </div>
                    )
                  }
                  return null
                })}
            </div>
          </div>
        </FormField>
      </div>
    )
  }
}
