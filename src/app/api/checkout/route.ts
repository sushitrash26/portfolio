import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    const { count, name, message } = await req.json()
    const stripeKey = process.env.STRIPE_SECRET_KEY

    if (!stripeKey) {
      // Fallback mode for demonstration/local testing
      return NextResponse.json({ 
        fallback: true, 
        message: 'Mock gateway active (Stripe keys not set in .env)' 
      })
    }

    // Create URL encoded form payload for Stripe API
    const formData = new URLSearchParams()
    formData.append('payment_method_types[0]', 'card')
    formData.append('mode', 'payment')
    formData.append('success_url', `${req.headers.get('origin')}/?payment=success`)
    formData.append('cancel_url', `${req.headers.get('origin')}/?payment=cancelled`)
    formData.append('line_items[0][price_data][currency]', 'usd')
    formData.append('line_items[0][price_data][product_data][name]', `Buy ${count} Coffee${count > 1 ? 's' : ''} ☕`)
    formData.append('line_items[0][price_data][unit_amount]', '500') // $5.00 per coffee
    if (message) {
      formData.append('line_items[0][price_data][product_data][description]', `From: ${name || 'Anon'}. Message: "${message}"`)
    } else {
      formData.append('line_items[0][price_data][product_data][description]', `From: ${name || 'Anon'}`)
    }
    formData.append('line_items[0][quantity]', count.toString())
    formData.append('metadata[donor_name]', name || 'Anonymous')
    formData.append('metadata[message]', message || '')

    const stripeRes = await fetch('https://api.stripe.com/v1/checkout/sessions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${stripeKey}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: formData.toString()
    })

    const session = await stripeRes.json()

    if (!stripeRes.ok) {
      throw new Error(session.error?.message || 'Failed to create Stripe checkout session')
    }

    return NextResponse.json({ id: session.id, url: session.url })
  } catch (error: any) {
    console.error('Stripe API Error:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
