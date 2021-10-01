import { ImageSource } from './image'
import { HitsResponse } from './api'

export interface ShelfItem {
  title: string
  authors: string[]
  publicationDate: string
  publisher: string
  isbn: string[]
  image: ImageSource
  series?: string
  edition?: string
  coverUrl?: string
}

export interface ShelfItemResponse extends HitsResponse<ShelfItem>{}
