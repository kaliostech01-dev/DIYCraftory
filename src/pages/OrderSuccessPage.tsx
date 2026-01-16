import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import { Order } from '../lib/types'

export default function OrderSuccessPage() {
  const { orderId } = useParams<{ orderId: string }>()
  const [order, setOrder] = useState<Order | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (orderId) {
      loadOrder()
    }
  }, [orderId])

  const loadOrder = async () => {
    try {
      const { data, error } = await supabase
        .from('orders')
        .select('*')
        .eq('id', orderId)
        .maybeSingle()

      if (error) throw error
      setOrder(data)
    } catch (error) {
      console.error('Error loading order:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <div className="animate-pulse">
          <div className="bg-gray-300 h-8 rounded w-64 mx-auto mb-4"></div>
          <div className="bg-gray-300 h-4 rounded w-96 mx-auto"></div>
        </div>
      </div>
    )
  }

  if (!order) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <p className="text-gray-500">Order not found</p>
        <Link to="/" className="btn btn-primary mt-4">
          Return Home
        </Link>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-2xl mx-auto text-center">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>

        <h1 className="text-4xl font-bold text-gray-900 mb-4">Order Placed Successfully!</h1>
        <p className="text-lg text-gray-600 mb-8">
          Thank you for your order. We will contact you shortly to confirm the details and discuss payment options.
        </p>

        <div className="card p-6 text-left mb-8">
          <h2 className="text-xl font-bold mb-4">Order Details</h2>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">Order Number</span>
              <span className="font-medium">{order.order_number}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Total Amount</span>
              <span className="font-medium">Rs. {order.total_amount.toFixed(0)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Status</span>
              <span className="font-medium capitalize">{order.status}</span>
            </div>
          </div>
        </div>

        <div className="card p-6 text-left mb-8">
          <h2 className="text-xl font-bold mb-4">Delivery Information</h2>
          <div className="space-y-2 text-sm">
            <div>
              <span className="text-gray-600">Name:</span>{' '}
              <span className="font-medium">{order.customer_name}</span>
            </div>
            <div>
              <span className="text-gray-600">Email:</span>{' '}
              <span className="font-medium">{order.customer_email}</span>
            </div>
            <div>
              <span className="text-gray-600">Phone:</span>{' '}
              <span className="font-medium">{order.customer_phone}</span>
            </div>
            <div>
              <span className="text-gray-600">Address:</span>{' '}
              <span className="font-medium">{order.shipping_address}</span>
            </div>
          </div>
        </div>

        <div className="p-4 bg-blue-50 rounded-lg mb-8">
          <p className="text-sm text-blue-900">
            <strong>What's next?</strong> We will contact you via phone or Instagram within 24 hours to confirm your order and arrange payment. You can also reach us directly on{' '}
            <a
              href="https://instagram.com/diy_craftory"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary-600 hover:underline font-medium"
            >
              @diy_craftory
            </a>
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/" className="btn btn-primary">
            Return Home
          </Link>
          <Link to="/products" className="btn btn-secondary">
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  )
}
