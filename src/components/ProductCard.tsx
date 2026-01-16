import { Link } from 'react-router-dom'
import { Product } from '../lib/types'
import { useCart } from '../context/CartContext'

interface ProductCardProps {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart()

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault()
    try {
      await addToCart(product, 1)
    } catch (error) {
      console.error('Failed to add to cart:', error)
    }
  }

  return (
    <Link to={`/products/${product.id}`} className="card overflow-hidden group">
      <div className="aspect-square overflow-hidden bg-gray-100">
        {product.image_url ? (
          <img
            src={product.image_url}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400">
            <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
        )}
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-lg text-gray-900 mb-2 line-clamp-2">{product.name}</h3>
        {product.description && (
          <p className="text-sm text-gray-600 mb-3 line-clamp-2">{product.description}</p>
        )}
        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold text-primary-600">
            Rs. {product.price.toFixed(0)}
          </span>
          <button
            onClick={handleAddToCart}
            className="btn btn-primary text-sm py-2 px-4"
          >
            Add to Cart
          </button>
        </div>
        {product.stock <= 5 && product.stock > 0 && (
          <p className="text-xs text-amber-600 mt-2">Only {product.stock} left in stock!</p>
        )}
        {product.stock === 0 && (
          <p className="text-xs text-red-600 mt-2">Out of stock</p>
        )}
      </div>
    </Link>
  )
}
