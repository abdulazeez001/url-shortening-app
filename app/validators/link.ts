import vine from '@vinejs/vine'

export const shotnerValidator = vine.compile(
  vine.object({
    name: vine.string(),
    description: vine.string(),
    website: vine.string().url(),
    custom: vine.string().nullable().optional(),
  })
)
