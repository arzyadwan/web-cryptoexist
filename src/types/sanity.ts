import { PortableTextBlock } from '@portabletext/react'

export interface SanityImage {
  _type: 'image'
  asset: {
    _ref: string
    _type: 'reference'
  }
}

export interface Author {
  name: string
  image: SanityImage
  bio?: string
  slug: { current: string } // Pastikan ini ada
}

export interface Category {
  _id: string;
  title: string
  slug: { current: string }
  description?: string
}

export interface Tag {
  title: string
  slug: { current: string }
}

export interface Post {
  _id: string
  title: string
  slug: { current: string }
  author: Author
  mainImage: SanityImage
  categories: Category[]
  tags: Tag[]
  publishedAt: string
  excerpt: string
  body: PortableTextBlock[]
}
