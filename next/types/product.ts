export interface Product {
  id: string
  title: string
  price: string
  description?: string
  image: string
  rating?: number
  reviews?: number
  url: string
  inStock?: boolean
  category?: string
  tags?: string[]
}
