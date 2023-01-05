declare module '*.graphql' {
  import { DocumentNode } from 'graphql'
  export const Schema: DocumentNode
}
