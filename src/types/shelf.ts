import { ImageSource } from './image'
import { HitsResponse } from './api'

export interface ShelfItem {
  title: string
  authors: string[]
  publicationDate: string
  publisher: string
  isbn: string[]
  image: ImageSource
  link?: string
  series?: string
  edition?: string
  coverUrl?: string
}

export interface ShelfItemResponse extends HitsResponse<ShelfItem>{}
