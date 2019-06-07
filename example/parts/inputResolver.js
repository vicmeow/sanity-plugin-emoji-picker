import EmojiPicker from '../../src/components/EmojiPicker'
import {get} from 'lodash'

export default function resolveInput(type) {
  if (type.name === 'string' && get(type, 'options.emoji')) {
    return EmojiPicker
  }

  return false
}
