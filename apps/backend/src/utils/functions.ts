import type { Request } from 'express'
import {
  type DefinitionNode,
  type DocumentNode,
  type SelectionNode,
  Kind,
  parse,
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

const extractOperationFields = (fields: readonly SelectionNode[]) => {
  const operationFields: Record<string, boolean> = {}

  for (const field of fields) {
    if (field.kind !== Kind.FIELD) continue
    if (field.name.value === '__typename') continue
    operationFields[field.name.value] = true
  }

  return operationFields
}

export const extractOperationFieldsFromRequest = (req: Request) => {
  let operationFields: Record<string, boolean> | null = null
  const parsedQuery = parse(req.body.query)

  const fields = getFieldValuesFromOperation(getFirstOperationDef(parsedQuery))

  if (fields) {
    operationFields = extractOperationFields(fields)
  }

  return operationFields
}
