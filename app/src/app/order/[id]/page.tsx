import { getOrder } from '@/lib/api'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheckCircle, faArrowRight } from '@fortawesome/free-solid-svg-icons'

export const dynamic = 'force-dynamic'

export default async function OrderConfirmationPage({ params }: { params: { id: string } }) {
  let order
  try {
    order = await getOrder(params.id)
  } catch {
    notFound()
  }

  return (
    <div className="min-h-screen bg-brand-off">
      <div className="max-w-2xl mx-auto px-8 md:px-12 py-20 md:py-28 text-center">
        {/* Success icon */}
        <div className="mb-8 flex justify-center">
          <div className="w-20 h-20 rounded-full border-2 border-status-live flex items-center justify-center">
            <FontAwesomeIcon icon={faCheckCircle} className="w-10 h-10 text-status-live" />
          </div>
        </div>

        {/* Main message */}
        <span className="label-caps text-brand-muted block mb-3">Thank you for your purchase</span>
        <h1 className="font-serif text-4xl md:text-[3rem] text-brand-black font-light mb-2">Order Confirmed</h1>
        <div className="rule mx-auto mt-6 mb-8 max-w-[80px]" />

        {/* Order details card */}
        <div className="bg-white border border-brand-rule p-8 md:p-10 mb-8 text-left space-y-6">
          {/* Order number */}
          <div>
            <p className="text-xs uppercase tracking-widest-2 text-brand-muted mb-1">Order Number</p>
            <p className="font-serif text-2xl text-brand-black">{order.order_number}</p>
          </div>

          {/* Status */}
          <div className="border-t border-brand-rule pt-6">
            <p className="text-xs uppercase tracking-widest-2 text-brand-muted mb-1">Status</p>
            <div className="flex items-center gap-2">
              <span
                className={`inline-block px-3 py-1 rounded-full text-xs font-light uppercase tracking-widest-2 ${
                  order.status === 'pending'
                    ? 'bg-status-draft/10 text-status-draft'
                    : order.status === 'confirmed'
                      ? 'bg-status-live/10 text-status-live'
                      : 'bg-brand-off text-brand-muted'
                }`}
              >
                {order.status}
              </span>
              {order.status === 'pending' && (
                <span className="text-xs text-brand-muted">
                  We&apos;ll contact you soon to confirm collection/shipping details
                </span>
              )}
            </div>
          </div>

          {/* Fulfillment method */}
          <div className="border-t border-brand-rule pt-6">
            <p className="text-xs uppercase tracking-widest-2 text-brand-muted mb-1">Fulfillment Method</p>
            <p className="font-serif text-sm text-brand-black capitalize">
              {order.fulfillment_type === 'shipping' ? 'Shipping' : 'Collection by Appointment'}
            </p>
          </div>

          {/* Order total */}
          <div className="border-t border-brand-rule pt-6">
            <p className="text-xs uppercase tracking-widest-2 text-brand-muted mb-1">Order Total</p>
            <p className="font-serif text-3xl text-brand-black">
              R{order.total_amount.toLocaleString()}
            </p>
          </div>

          {/* Items */}
          {order.items && order.items.length > 0 && (
            <div className="border-t border-brand-rule pt-6">
              <p className="text-xs uppercase tracking-widest-2 text-brand-muted mb-4">Items Ordered</p>
              <div className="space-y-3">
                {order.items.map((item, idx) => (
                  <div key={idx} className="flex justify-between text-sm">
                    <div>
                      <p className="text-brand-black">
                        {item.product_snapshot?.product_name || 'Product'} × {item.quantity}
                      </p>
                      <p className="text-xs text-brand-muted">
                        R{item.price_at_purchase.toLocaleString()} each
                      </p>
                    </div>
                    <p className="font-serif text-brand-black">
                      R{(item.price_at_purchase * item.quantity).toLocaleString()}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Next steps */}
        <div className="bg-brand-black text-white p-8 md:p-10 mb-8">
          <p className="text-sm font-light leading-relaxed">
            {order.status === 'pending'
              ? 'We will review your order and contact you shortly to confirm delivery or collection details. Check your email for updates.'
              : 'Your order has been confirmed! Check your email for shipping or collection information.'}
          </p>
        </div>

        {/* Action buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/"
            className="py-3.5 px-8 bg-brand-black text-white font-light uppercase tracking-widest-2 text-[0.6rem] hover:opacity-90 transition-opacity duration-300 flex items-center justify-center gap-2"
          >
            Continue Shopping
            <FontAwesomeIcon icon={faArrowRight} className="w-3 h-3" />
          </Link>
          <Link
            href="/contact"
            className="py-3 px-6 border border-brand-black text-brand-black font-light uppercase tracking-widest-2 text-sm hover:bg-brand-off transition-colors"
          >
            Contact Support
          </Link>
        </div>

        {/* Info box */}
        <div className="mt-12 pt-8 border-t border-brand-rule">
          <p className="text-xs text-brand-muted uppercase tracking-widest-2 mb-4">
            Questions about your order?
          </p>
          <p className="text-sm text-brand-black">
            Email us at{' '}
            <a href="mailto:shop@midcenturist.co.za" className="font-serif hover:opacity-70 transition-opacity">
              shop@midcenturist.co.za
            </a>{' '}
            or call{' '}
            <a href="tel:+27115551234" className="font-serif hover:opacity-70 transition-opacity">
              +27 (0) 11 555 1234
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}
