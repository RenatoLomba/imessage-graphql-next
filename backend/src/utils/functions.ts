import type { Request } from 'express'
import {
  type DefinitionNode,
  type DocumentNode,
  Kind,
  parse,
  type SelectionNode,
} from 'graphql'

export const getFirstOperationDef = (query: DocumentNode) =>
  query.definitions?.[0]
export const getFieldValuesFromOperation = (
  operationDefinition: DefinitionNode,
) => {
  if (operationDefinition.kind === Kind.OPERATION_DEFINITION) {
    if (operationDefinition.selectionSet.selections[0].kind !== Kind.FIELD)
      return null

    return operationDefinition.selectionSet.selections[0].selectionSet
      .selections
  }

  return null
}

export const parseQuery = (req: Request) => {
  const parsedQuery = parse(req.body.query)
  return parsedQuery
}

export const extractOperationFields = (fields: readonly SelectionNode[]) => {
  const operationFields: Record<string, boolean> = {}

  for (const field of fields) {
    if (field.kind !== Kind.FIELD) continue
    if (field.name.value === '__typename') continue
    operationFields[field.name.value] = true
  }

  return operationFields
}
