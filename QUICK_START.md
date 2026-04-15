# Quick Start Guide — Midcenturist Storefront

## 🚀 Getting Started

### 1. Environment Setup

The `.env.local` file has been created with the API endpoint configured for production:

```env
NEXT_PUBLIC_API_URL=https://midcenturist-api.onrender.com
```

**For local development** (if you have a local Flask API running):
```env
NEXT_PUBLIC_API_URL=http://localhost:5000
```

### 2. Install Dependencies

```bash
cd app
npm install
```

### 3. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📋 Testing the Implementation

### Product Browsing
- [ ] Visit homepage
- [ ] Navigate to categories dropdown → click a category
- [ ] Click on a product card to view details
- [ ] Verify product images, specs, and pricing load

### Add to Cart
- [ ] On product detail page, select a variant (if available)
- [ ] Change quantity using +/- buttons
- [ ] Click "Add to Cart"
- [ ] Verify cart count updates in navbar
- [ ] Verify slide-over opens automatically

### Cart Management
- [ ] Click cart icon in navbar
- [ ] View items in slide-over
- [ ] Remove an item → verify it's removed
- [ ] Close slide-over
- [ ] Click "Proceed to Checkout"

### Checkout
- [ ] Fill in contact information
- [ ] Select fulfillment method (shipping or collection)
- [ ] Fill in appropriate address fields
- [ ] (Optional) Add notes
- [ ] Click "Place Order"
- [ ] Should redirect to order confirmation page

### Order Confirmation
- [ ] Verify order number displays
- [ ] Check status shows "pending" (payments disabled)
- [ ] View items and total
- [ ] Try contact and support links

### Newsletter
- [ ] Scroll to footer
- [ ] Fill in newsletter form
- [ ] Submit
- [ ] Verify success message

---

## 🔧 Key Files to Know

| File | Purpose |
|------|---------|
| `src/lib/api.ts` | All API calls centralized here |
| `src/context/CartContext.tsx` | Global cart state management |
| `src/components/CartSlideOver.tsx` | Cart UI panel |
| `src/app/products/[slug]/page.tsx` | Product detail page |
| `src/app/checkout/page.tsx` | Checkout form |
| `src/app/order/[id]/page.tsx` | Order confirmation |

---

## 🐛 Debugging Tips

### Check Cart State
Open browser DevTools → Application → Local Storage, look for:
- `midcenturist_session_id` — Your session UUID
- `midcenturist_cart_id` — Your cart ID

### Test API Directly
```bash
# Get all products
curl https://midcenturist-api.onrender.com/api/products

# Get specific category
curl https://midcenturist-api.onrender.com/api/categories/seating/products

# Create cart
curl -X POST https://midcenturist-api.onrender.com/api/cart \
  -H "Content-Type: application/json" \
  -d '{"session_id": "test-123"}'
```

### Check Network Requests
DevTools → Network tab:
- All requests should go to `https://midcenturist-api.onrender.com/api/...`
- Responses should have status 200 (or appropriate error codes)
- Check response payloads for data structure

---

## ⚠️ Known Limitations

### Payments Disabled
Orders go directly to "pending" status. No payment processing yet:
- Waiting for payment gateway confirmation (PayFast, Yoco, Stripe, etc.)
- Payment UI won't be built until gateway is selected

### Wishlist
Heart buttons exist but wishlist is backend-only in this phase.
- UI ready for Phase 2
- Backend integration pending

### Search
Search API endpoint exists but search page doesn't have a UI yet.
- Will be implemented in Phase 2

### Collections
Collections API is wired but no dedicated page yet.
- Can be added by creating `/app/collections/[slug]/page.tsx`

---

## 📊 Common Issues & Solutions

### "Cart is empty" after refresh
**Issue:** Browser privacy mode or cookies disabled
**Solution:** Ensure localStorage is enabled, try incognito mode off

### Products not loading
**Issue:** API not reachable
**Check:**
- [ ] Is `.env.local` configured correctly?
- [ ] Is API URL reachable in browser console?
- [ ] Network tab showing 200 responses?

### Add to cart fails
**Issue:** Variant not available or session missing
**Check:**
- [ ] Product has variants in API response
- [ ] Session ID is generated (check localStorage)
- [ ] Variant has `is_available: true`

### Checkout stuck
**Issue:** Missing required form fields
**Solution:** Fill all marked required fields (name, email, phone, address)

---

## 🎯 Next Testing Steps

### If API Works:
1. Test with multiple products in cart
2. Test checkout with different fulfillment types
3. Create multiple orders
4. Test error scenarios (invalid email, etc.)

### If API Has Issues:
1. Check API logs on Render
2. Verify database connections
3. Test endpoints directly with curl
4. Check for CORS issues in browser console

---

## 📞 Support

### API Documentation
- Refer to live API: `https://midcenturist-api.onrender.com`
- Implementation spec: `implementation_storefront.md`

### Component Questions
- Check TypeScript interfaces in `src/lib/api.ts`
- Review React hooks in components
- Check Tailwind CSS classes for styling

---

## ✅ Verification Checklist

- [ ] `.env.local` exists with API URL
- [ ] `npm install` completed without errors
- [ ] `npm run dev` starts server on port 3000
- [ ] Homepage loads with hero slider
- [ ] Categories appear in dropdown
- [ ] Product pages load with images
- [ ] Add to cart shows success notification
- [ ] Cart count updates in navbar
- [ ] Cart slide-over opens/closes
- [ ] Newsletter form submits
- [ ] Checkout form is accessible
- [ ] Order confirmation page displays
- [ ] No console errors

---

**Everything should be working now! 🎉**

If you encounter any issues, check the files listed above and compare implementations with the `implementation_storefront.md` specification.
