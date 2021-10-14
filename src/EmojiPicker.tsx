import React, { useCallback, useEffect, useRef, useState } from "react"
import "emoji-mart/css/emoji-mart.css?raw"
import { Picker } from "emoji-mart"
import {
  Stack,
  Text,
  Button,
  Box,
  Popover,
  useClickOutside,
  Flex,
  Label,
  Grid,
} from "@sanity/ui"
import { SearchIcon } from "@sanity/icons"
import { FormField } from "@sanity/base/components"
import PatchEvent, { set, unset } from "@sanity/form-builder/PatchEvent"

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
  "text",
]

const EmojiPicker = React.forwardRef(
  (props: any, ref: React.Ref<HTMLInputElement>) => {
    const {
      type, // Schema information
      value, // Current field value
      readOnly, // Boolean if field is not editable
      markers, // Markers including validation rules
      presence, // Presence information for collaborative avatars
      onFocus, // Method to handle focus state
      onBlur, // Method to handle blur state
      onChange, // Method to handle patch events
    } = props

    const { options } = type

    const [open, setOpen] = useState<boolean>(false)
    const [selectedEmoji, setSelectedEmoji] =
      useState<Record<string, string | string[]>>()

    // This will launch only if propName value has changed.
    useEffect(() => {
      setSelectedEmoji(value)
    }, [value])

    const handlePickerOpen = () => {
      setOpen(true)
    }
    const handlePickerClose = () => {
      setOpen(false)
    }

    const handleSelect = (emoji) => {
      setSelectedEmoji(emoji)
      const newKeys = Object.keys(emoji)
      const patches = allowedFields
        .map((key) => {
          if (newKeys.includes(key)) {
            if (emoji[key] || emoji[key]?.length !== 0) {
              return set(emoji[key], [key])
            }
          }
          if (selectedEmoji) {
            return unset([key])
          }
        })
        .filter(Boolean)
      // Unset and set new fields
      onChange(PatchEvent.from(...patches))
      // Close emoji picker
      handlePickerClose()
    }

    const [pickerRef, setPickerRef] = useState(null)

    const handleClickOutside = useCallback(() => {
      setOpen(false)
    }, [])

    useClickOutside(handleClickOutside, [pickerRef])

    const meta = [
      { label: "ID", value: selectedEmoji?.id },
      { label: "Unified", value: selectedEmoji?.unified },
      { label: "Name", value: selectedEmoji?.name },
      { label: "Colons", value: selectedEmoji?.colons },
    ]

    return (
      <Stack space={2}>
        <FormField
          description={type.description} // Creates description from schema
          title={type.title} // Creates label from schema title
          __unstable_markers={markers} // Handles all markers including validation
          __unstable_presence={presence} // Handles presence avatars
        >
          <Flex align="flex-start">
            <Popover
              open={open}
              content={
                <Box ref={setPickerRef}>
                  <Picker {...options?.picker} onSelect={handleSelect} />
                </Box>
              }
            >
              <Button
                text={selectedEmoji ? undefined : "Select emoji"}
                icon={selectedEmoji ? undefined : SearchIcon}
                mode="ghost"
                paddingY={3}
                paddingX={4}
                onClick={open ? handlePickerClose : handlePickerOpen}
                ref={ref}
                onFocus={onFocus}
                onBlur={onBlur}
                readOnly={readOnly}
              >
                {selectedEmoji && (
                  <span style={{ fontSize: "2em" }}>
                    {selectedEmoji.native}
                  </span>
                )}
              </Button>
            </Popover>
            {!options?.hideSummary && (
              <Grid
                flex={1}
                gap={3}
                columns={2}
                paddingLeft={2}
                style={{
                  gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))",
                }}
              >
                {selectedEmoji &&
                  meta.map(
                    (m) =>
                      m.value && (
                        <Stack space={2} padding={1} marginLeft={2}>
                          <Label size={1} muted>
                            {m.label}
                          </Label>
                          <Text size={1}>{m.value}</Text>
                        </Stack>
                      )
                  )}
              </Grid>
            )}
          </Flex>
        </FormField>
      </Stack>
    )
  }
)

export default EmojiPicker
