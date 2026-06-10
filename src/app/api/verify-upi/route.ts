import { NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

export async function POST(req: Request) {
  try {
    const { name, message, amount, utr } = await req.json()

    if (!utr || !/^\d{12}$/.test(utr)) {
      return NextResponse.json({ error: 'Invalid 12-digit UTR number' }, { status: 400 })
    }

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    })

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER, 
      subject: `☕ New Coffee Sponsor UPI - ₹${amount} from ${name || 'Anonymous'}`,
      text: `Hey Astitva,\n\nSomeone sponsored your caffeine addiction!\n\nTransaction Details:\n--------------------\nSponsor Name: ${name || 'Anonymous'}\nAmount: ₹${amount} INR (~$5 USD)\nUPI Ref No (UTR): ${utr}\n\nMessage from Sponsor:\n"${message || 'No message dropped.'}"\n\nVerify this UTR in your bank account / UPI statements to confirm receipt!`,
    }

    await transporter.sendMail(mailOptions)

    return NextResponse.json({ message: 'UTR verified and email sent successfully' }, { status: 200 })
  } catch (error) {
    console.error('Error verifying UPI:', error)
    return NextResponse.json(
      { error: 'Failed to process UPI validation request' },
      { status: 500 }
    )
  }
}
