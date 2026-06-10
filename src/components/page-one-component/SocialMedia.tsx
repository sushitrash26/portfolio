'use client'
import React, { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import { Button } from '../ui/button'
import { motion, AnimatePresence } from 'motion/react'

type Rect = { top: number; left: number; width: number; height: number }

type FormFields = { name: string; email: string; subject: string; message: string }
type FormErrors = Partial<Record<keyof FormFields, string>>

const validate = (fields: FormFields): FormErrors => {
  const errors: FormErrors = {}
  if (!fields.name.trim()) errors.name = 'Name is required'
  if (!fields.email.trim()) {
    errors.email = 'Email is required'
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email)) {
    errors.email = 'Enter a valid email address'
  }
  if (!fields.subject.trim()) errors.subject = 'Subject is required'
  if (!fields.message.trim()) errors.message = 'Message is required'
  else if (fields.message.trim().length < 10) errors.message = 'Message must be at least 10 characters'
  return errors
}

const FieldError = ({ msg }: { msg?: string }) => (
  <AnimatePresence>
    {msg && (
      <motion.p
        key={msg}
        initial={{ opacity: 0, y: -4 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -4 }}
        transition={{ duration: 0.15 }}
        className='text-red-400 text-xs mt-0.5 flex items-center gap-1'
      >
        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className='flex-shrink-0'>
          <circle cx="12" cy="12" r="10" /><path d="M12 8v4M12 16h.01" />
        </svg>
        {msg}
      </motion.p>
    )}
  </AnimatePresence>
)

const inputClass = (hasError: boolean) =>
  `w-full rounded-lg border ${hasError ? 'border-red-500 focus:ring-red-500' : 'border-neutral-700 focus:ring-neutral-500'} bg-neutral-900 text-white px-3 py-2 text-sm placeholder-neutral-500 focus:outline-none focus:ring-1 transition-colors`

const ContactMorph = () => {
  const [open, setOpen] = useState(false)
  const [btnRect, setBtnRect] = useState<Rect | null>(null)
  const btnRef = useRef<HTMLButtonElement>(null)
  const formRef = useRef<HTMLDivElement>(null)

  const [fields, setFields] = useState<FormFields>({ name: '', email: '', subject: '', message: '' })
  const [errors, setErrors] = useState<FormErrors>({})
  const [touched, setTouched] = useState<Partial<Record<keyof FormFields, boolean>>>({})
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  const handleOpen = () => {
    if (btnRef.current) {
      const r = btnRef.current.getBoundingClientRect()
      setBtnRect({ top: r.top, left: r.left, width: r.width, height: r.height })
    }
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
    // Reset after close animation
    setTimeout(() => {
      setFields({ name: '', email: '', subject: '', message: '' })
      setErrors({})
      setTouched({})
      setStatus('idle')
    }, 400)
  }

  // Close on outside click
  useEffect(() => {
    if (!open) return
    const handler = (e: MouseEvent) => {
      if (formRef.current && !formRef.current.contains(e.target as Node)) handleClose()
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [open])

  // Close on Escape
  useEffect(() => {
    if (!open) return
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') handleClose() }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [open])

  const handleChange = (field: keyof FormFields, value: string) => {
    const updated = { ...fields, [field]: value }
    setFields(updated)
    // Re-validate touched fields live
    if (touched[field]) {
      setErrors(validate(updated))
    }
  }

  const handleBlur = (field: keyof FormFields) => {
    setTouched(t => ({ ...t, [field]: true }))
    setErrors(validate({ ...fields }))
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    // Touch all fields to show all errors
    setTouched({ name: true, email: true, subject: true, message: true })
    const errs = validate(fields)
    setErrors(errs)
    if (Object.keys(errs).length > 0) return

    setStatus('loading')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(fields),
      })
      if (res.ok) {
        setStatus('success')
        setTimeout(() => handleClose(), 2200)
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  const FORM_W = 320
  const FORM_H = 510

  return (
    <>
      {/* Static button */}
      <button
        ref={btnRef}
        onClick={handleOpen}
        style={{ visibility: open ? 'hidden' : 'visible' }}
        className='h-9 px-4 rounded-md bg-black text-white text-sm font-semibold font-manrope cursor-none hover:bg-neutral-800 active:scale-95 transition-all whitespace-nowrap'
      >
        Contact
      </button>

      {/* Fixed overlay */}
      <AnimatePresence>
        {open && btnRect && (
          <motion.div
            ref={formRef}
            key='contact-form'
            data-cursor-native
            initial={{ top: btnRect.top, left: btnRect.left, width: btnRect.width, height: btnRect.height, borderRadius: 8, opacity: 1 }}
            animate={{ top: Math.max(8, btnRect.top - FORM_H + btnRect.height), left: btnRect.left - FORM_W + btnRect.width, width: FORM_W, height: FORM_H, borderRadius: 16 }}
            exit={{ top: btnRect.top, left: btnRect.left, width: btnRect.width, height: btnRect.height, borderRadius: 8, opacity: 0 }}
            transition={{ type: 'spring', bounce: 0.12, duration: 0.5 }}
            className='bg-black text-white overflow-hidden shadow-2xl'
            style={{ position: 'fixed', zIndex: 999 }}
          >
            <AnimatePresence>
              {open && (
                <motion.div
                  key='form-content'
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1, transition: { delay: 0.28, duration: 0.2 } }}
                  exit={{ opacity: 0, transition: { duration: 0.1 } }}
                  className='p-5 h-full flex flex-col'
                >
                  {/* Header */}
                  <div className='flex items-center justify-between mb-3'>
                    <span className='text-base font-bold font-manrope'>Get in touch</span>
                    <button type='button' onClick={handleClose} className='text-neutral-400 hover:text-white transition-colors leading-none'>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <path d="M18 6L6 18M6 6l12 12" />
                      </svg>
                    </button>
                  </div>

                  {/* Success state */}
                  <AnimatePresence mode='wait'>
                    {status === 'success' ? (
                      <motion.div
                        key='success'
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className='flex-1 flex flex-col items-center justify-center gap-3 text-center'
                      >
                        <div className='w-12 h-12 rounded-full bg-green-500/15 border border-green-500/30 flex items-center justify-center'>
                          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2.5">
                            <polyline points="20 6 9 17 4 12" />
                          </svg>
                        </div>
                        <p className='text-sm font-semibold font-manrope'>Message sent!</p>
                        <p className='text-xs text-neutral-400 font-manrope'>I&apos;ll get back to you soon.</p>
                      </motion.div>
                    ) : (
                      <motion.form
                        key='form'
                        className='flex flex-col gap-2.5 flex-1'
                        onSubmit={handleSubmit}
                        noValidate
                      >
                        {/* Error banner */}
                        <AnimatePresence>
                          {status === 'error' && (
                            <motion.div
                              initial={{ opacity: 0, y: -6 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0 }}
                              className='flex items-center gap-2 bg-red-500/10 border border-red-500/30 rounded-lg px-3 py-2'
                            >
                              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2.5">
                                <circle cx="12" cy="12" r="10" /><path d="M12 8v4M12 16h.01" />
                              </svg>
                              <p className='text-xs text-red-400 font-manrope'>Failed to send. Please try again.</p>
                            </motion.div>
                          )}
                        </AnimatePresence>

                        {/* Name */}
                        <div className='flex flex-col gap-0.5'>
                          <label className='text-xs text-neutral-400 font-manrope'>Name</label>
                          <input
                            value={fields.name}
                            onChange={e => handleChange('name', e.target.value)}
                            onBlur={() => handleBlur('name')}
                            placeholder='Your full name'
                            className={inputClass(!!errors.name && !!touched.name)}
                          />
                          <FieldError msg={touched.name ? errors.name : undefined} />
                        </div>

                        {/* Email */}
                        <div className='flex flex-col gap-0.5'>
                          <label className='text-xs text-neutral-400 font-manrope'>Email</label>
                          <input
                            type='email'
                            value={fields.email}
                            onChange={e => handleChange('email', e.target.value)}
                            onBlur={() => handleBlur('email')}
                            placeholder='your@email.com'
                            className={inputClass(!!errors.email && !!touched.email)}
                          />
                          <FieldError msg={touched.email ? errors.email : undefined} />
                        </div>

                        {/* Subject */}
                        <div className='flex flex-col gap-0.5'>
                          <label className='text-xs text-neutral-400 font-manrope'>Subject</label>
                          <input
                            value={fields.subject}
                            onChange={e => handleChange('subject', e.target.value)}
                            onBlur={() => handleBlur('subject')}
                            placeholder='What is this about?'
                            className={inputClass(!!errors.subject && !!touched.subject)}
                          />
                          <FieldError msg={touched.subject ? errors.subject : undefined} />
                        </div>

                        {/* Message */}
                        <div className='flex flex-col gap-0.5 flex-1'>
                          <label className='text-xs text-neutral-400 font-manrope'>Message</label>
                          <textarea
                            value={fields.message}
                            onChange={e => handleChange('message', e.target.value)}
                            onBlur={() => handleBlur('message')}
                            placeholder='Write your message...'
                            className={`${inputClass(!!errors.message && !!touched.message)} resize-none flex-1`}
                          />
                          <FieldError msg={touched.message ? errors.message : undefined} />
                        </div>

                        {/* Submit */}
                        <button
                          type='submit'
                          disabled={status === 'loading'}
                          className='rounded-lg bg-white text-black font-semibold text-sm py-2 hover:bg-neutral-200 active:scale-95 transition-all font-manrope disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2 mt-1'
                        >
                          {status === 'loading' ? (
                            <>
                              <svg className='animate-spin' width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                <path d="M21 12a9 9 0 1 1-6.219-8.56" />
                              </svg>
                              Sending...
                            </>
                          ) : 'Send message →'}
                        </button>
                      </motion.form>
                    )}
                  </AnimatePresence>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

const SocialMedia = () => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className='h-8 sm:h-10 flex items-center gap-2 sm:gap-4 flex-wrap justify-center sm:justify-start fixed top-4 right-4 z-50'>
      {/* Desktop View */}
      <div className='hidden sm:flex items-center gap-2 lg:gap-4'>
        <div className='text-xs bg-white lg:text-sm font-manrope flex items-center gap-1 lg:gap-2 rounded-md border border-neutral-300 hover:shadow-md transition-shadow p-1 lg:p-2 px-2 lg:px-4'>
          <Link href='' className='px-2 lg:px-4 hover:bg-neutral-400/35 transition-shadow rounded-sm cursor-none whitespace-nowrap'>X</Link>
          <Link href='https://www.linkedin.com/in/astitvapathak/' className='px-1 lg:px-2 hover:bg-neutral-400/35 transition-shadow rounded-sm cursor-none whitespace-nowrap'>LinkedIn</Link>
          <Link href='https://drive.google.com/file/d/1IxkEMgRKXEke_IKkY1ig-jCYFf49cpe_/view?usp=drive_link' className='px-1 lg:px-2 hover:bg-neutral-400/35 transition-shadow rounded-md cursor-none whitespace-nowrap'>Resume</Link>
        </div>
        <ContactMorph />
      </div>

      {/* Mobile Hamburger Menu */}
      <div className='sm:hidden'>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className='w-10 h-10 flex flex-col justify-center items-center gap-1 bg-white rounded-lg border border-neutral-300 shadow-md hover:shadow-lg transition-shadow'
        >
          <div className={`w-5 h-0.5 bg-black transition-transform duration-300 ${isOpen ? 'rotate-45 translate-y-1.5' : ''}`}></div>
          <div className={`w-5 h-0.5 bg-black transition-opacity duration-300 ${isOpen ? 'opacity-0' : ''}`}></div>
          <div className={`w-5 h-0.5 bg-black transition-transform duration-300 ${isOpen ? '-rotate-45 -translate-y-1.5' : ''}`}></div>
        </button>

        {isOpen && (
          <div className='absolute top-12 right-0 bg-white rounded-lg border border-neutral-300 shadow-lg p-4 min-w-[200px]'>
            <div className='flex flex-col gap-3'>
              <Link href='' className='px-3 py-2 hover:bg-neutral-100 transition-colors rounded-md cursor-none text-sm font-manrope' onClick={() => setIsOpen(false)}>X</Link>
              <Link href='https://www.linkedin.com/in/astitvapathak/' className='px-3 py-2 hover:bg-neutral-100 transition-colors rounded-md cursor-none text-sm font-manrope' onClick={() => setIsOpen(false)}>LinkedIn</Link>
              <Link href='https://drive.google.com/file/d/1IxkEMgRKXEke_IKkY1ig-jCYFf49cpe_/view?usp=drive_link' className='px-3 py-2 hover:bg-neutral-100 transition-colors rounded-md cursor-none text-sm font-manrope' onClick={() => setIsOpen(false)}>Resume</Link>
              <div className='border-t border-neutral-200 my-1'></div>
              <Button className='w-full justify-start px-3 py-2 h-auto cursor-none font-manrope text-sm' onClick={() => setIsOpen(false)}>Contact</Button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default SocialMedia
