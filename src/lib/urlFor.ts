import createImageUrlBuilder from '@sanity/image-url' // Gunakan 'createImageUrlBuilder' bukan default
import { client } from './sanity'

const builder = createImageUrlBuilder(client)

export function urlFor(source: any) {
  return builder.image(source)
}