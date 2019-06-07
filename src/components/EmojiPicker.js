import React from 'react'
import PropTypes from 'prop-types'
import FormField from 'part:@sanity/components/formfields/default'
import './emoji-picker.css?raw'
import 'emoji-mart/css/emoji-mart.css?raw'
import { Picker } from 'emoji-mart'

import PatchEvent, { set, unset } from 'part:@sanity/form-builder/patch-event'

export default class EmojiPicker extends React.Component {
  static propTypes = {
    value: PropTypes.string
  }

  focus() {
    this._inputElement.focus()
  }

  state = {
    showEmojis: false
  }

  // Handles opening the emoji picker
  showEmojis = event => {
    this.setState({
      showEmojis: true
    },  () => document.addEventListener('click', this.hideEmojis))
  }

  // Handles closing the emoji picker
  hideEmojis = event => {
    if (this.emojiPicker !== null && !this.emojiPicker.contains(event.target)) {
      this.setState({
        showEmojis: false
      }, () => document.removeEventListener('click', this.hideEmojis))
    }
  }

  // Handles adding emoji
  addEmoji = event => {
    // Split emoji codes into array at - when there are multiple ones
    const emojiCodes = event.unified.split('-').map(code => parseInt(code, 16))
    // Create emoji from codepoints
    const emoji = String.fromCodePoint(...emojiCodes)
    // Encode the emoji for storage
    const code = encodeURI(emoji)
    // Close emoji picker and remove event listener
    this.setState({
      showEmojis: false
    }, () => document.removeEventListener('click', this.hideEmojis))
    // Send off emoji code
    // Using emoji here breaks at PatchEvent.from() and encodeURI
    // error: malformed URI sequence
    const patch = emojiCodes === '' ? unset() : set(String(code))
    this.props.onChange(PatchEvent.from(patch))
  }

  render() {
    const { type, value } = this.props
    // Decode the emoji for display
    const emoji = decodeURI(value)
    return (
      <div className="emoji-picker">
        <FormField
          className="emoji-field"
          label={type.title}
          description={type.description}>
          <button
            className="picker-button"
            onClick={this.showEmojis}
            ref={element => this._inputElement = element}>
              {value === undefined
                ? 'Emoji'
                :  <div className="emoji">{emoji}</div> }
          </button>
          {
            this.state.showEmojis && 
            <div ref={el => (this.emojiPicker = el)}>
              <Picker 
                style={
                  { 
                    position: 'absolute', 
                    top: '-1rem', 
                    left: '4.5rem', 
                    zIndex: 100 
                  }
                } 
                onSelect={this.addEmoji} />
            </div>
          }
        </FormField>
      </div>
    )
  }
}
