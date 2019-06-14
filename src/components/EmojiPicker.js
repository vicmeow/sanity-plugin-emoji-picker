import React from 'react'
import PropTypes from 'prop-types'
import FormField from 'part:@sanity/components/formfields/default'
import './emoji-picker.css?raw'
import 'emoji-mart/css/emoji-mart.css?raw'
import { Picker } from 'emoji-mart'
import PatchEvent, { set, unset } from 'part:@sanity/form-builder/patch-event'

export default class EmojiPicker extends React.Component {
  static propTypes = {
    type: PropTypes.shape({
      options: PropTypes.shape({
        emoji: PropTypes.oneOfType([PropTypes.bool, PropTypes.object])
      })
    }),
    value: PropTypes.string
  }

  focus() {
    this._inputElement.focus()
  }

  state = {
    showPicker: false
  }

  // Handles opening the emoji picker
  showPicker = event => {
    this.setState({
      showPicker: true
    },  () => document.addEventListener('click', this.hidePicker))
  }

  // Handles closing the emoji picker
  hidePicker = event => {
    event.preventDefault()
    if (this._emojiPicker !== null && !this._emojiPicker.contains(event.target)) {
      this.setState({
        showPicker: false
      }, () => document.removeEventListener('click', this.hidePicker))
    }
  }

  // Handles choosing an emoji
  addEmoji = emoji => {
    // Incoming options from schema
    const options = this.props.type.options.emoji

    // Pick the emoji type to use from incoming options
    // default: native
    const value = !options.type || options.type === 'native'
      ? String(emoji.native)
      : emoji[options.type]
    
    // Send off emoji
    const patch = value === '' ? unset() : set(value)
    this.props.onChange(PatchEvent.from(patch))

    // Close emoji picker and remove event listener
    this.setState({
      showPicker: false
    }, () => document.removeEventListener('click', this.hidePicker))
  }

  render() {
    const { type, value } = this.props
    const options = type.options.emoji
    return (
      <div className="emoji-picker">
        <FormField
          className="emoji-field"
          label={type.title}
          description={type.description}>
          <div className="emoji-button-wrapper">
            <button
              className={
                options.type
                  ? `emoji-button emoji-button-${options.type}`
                  : 'emoji-button emoji-button-native'
              }
              ref={element => this._inputElement = element}
              onClick={this.showPicker}>
              <span className="emoji">{value !== undefined ? value : 'Emoji'}</span>
            </button>
          </div>
          {
            this.state.showPicker && 
            <div
              className="picker-wrapper"
              ref={element => this._emojiPicker = element}>
              <Picker onSelect={this.addEmoji} />
            </div>
          }
        </FormField>
      </div>
    )
  }
}
