import { type SchemaTypeDefinition } from 'sanity'
import { schemaTypes as blogSchemas } from '../schemas'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [...blogSchemas],
}
