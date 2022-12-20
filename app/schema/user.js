
const userSchema = {
  type: "object",
  properties: {
    username: { type: 'string', pattern: '^[a-zA-Z0-9.-_]{3,12}$' },
    password: { type: 'string', pattern: '^(?=.*[0-9])(?=.*[-a-z])(?=.*[-A-Z]).{8,}$' },
    confirmPassword: { type: 'string' },
    isAdmin: { type: 'boolean' }
  },
  required: ["username", "password"],
  additionalProperties: false
}

const userSchemaUpdated = {
  type: "object",
  properties: {
    username: { type: 'string', pattern: '^[-a-zA-Z0-9.-_]+@[\\w-]+(?:\\.[\\w-]{2,4})$' },
    password: { type: 'string', pattern: '^(?=.*[0-9])(?=.*[-a-z])(?=.*[-A-Z]).{8,}$' },
    confirmPassword: { type: 'string' },
    isAdmin: { type: 'boolean' }
  },
  required: [],
  additionalProperties: false
}

export { userSchema }