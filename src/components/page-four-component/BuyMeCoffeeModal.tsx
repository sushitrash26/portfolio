'use client'
import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'motion/react'

interface BuyMeCoffeeModalProps {
  isOpen: boolean
  onClose: () => void
}

interface ConfettiParticle {
  id: number
  x: number
  y: number
  color: string
  angle: number
  speed: number
  scale: number
}

export const BuyMeCoffeeModal: React.FC<BuyMeCoffeeModalProps> = ({ isOpen, onClose }) => {
  const [step, setStep] = useState<'input' | 'payment-upi' | 'processing' | 'success'>('input')
  const [donorName, setDonorName] = useState('')
  const [message, setMessage] = useState('')
  
  // UPI Payment Mode
  const [upiMode, setUpiMode] = useState<'qr' | 'id'>('qr')
  const [upiId, setUpiId] = useState('')
  const [upiError, setUpiError] = useState('')

  // Interactive UI effects
  const [focusedField, setFocusedField] = useState<string | null>(null)
  const [particles, setParticles] = useState<ConfettiParticle[]>([])
  const [shakeTrigger, setShakeTrigger] = useState<Record<string, number>>({})
  const [processMessage, setProcessMessage] = useState('Pinging banking servers...')

  const modalRef = useRef<HTMLDivElement>(null)
  const paymentAmountINR = 400 // ~$5 USD equivalent for UPI

  useEffect(() => {
    if (!isOpen) return
    setStep('input')
    setDonorName('')
    setMessage('')
    setUpiId('')
    setUpiError('')
    setFocusedField(null)
    setParticles([])
  }, [isOpen])

  // Close modal listeners
  useEffect(() => {
    if (!isOpen) return
    const handleKeyDown = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    const handleOutsideClick = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) onClose()
    }
    document.addEventListener('keydown', handleKeyDown)
    document.addEventListener('mousedown', handleOutsideClick)
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.removeEventListener('mousedown', handleOutsideClick)
    }
  }, [isOpen, onClose])

  // Dynamic Gen-Z comments
  const getHelperComment = () => {
    switch (focusedField) {
      case 'donorName':
        return "Your real name, not your Discord tag."
      case 'message':
        return "Keep it short, we have zero attention span."
      case 'upiId':
        return "yourname@bankname. Make sure you approve it on your phone."
      default:
        return "It's giving support. UPI payment gateway active."
    }
  }

  const triggerShake = (field: string) => {
    setShakeTrigger(prev => ({ ...prev, [field]: (prev[field] || 0) + 1 }))
  }

  // UPI VPA format check regex
  const validateUPI = (vpa: string) => {
    const regex = /^[a-zA-Z0-9.\-_]{2,256}@[a-zA-Z]{2,64}$/
    if (!vpa.trim()) return 'UPI ID is required, fam'
    if (!regex.test(vpa.trim())) return 'UPI ID looks kinda sus. Make sure it has @.'
    return ''
  }

  // Proceed from details screen to UPI payment screen
  const handleProceedToUPI = (e: React.FormEvent) => {
    e.preventDefault()
    setStep('payment-upi')
  }

  // Submit UPI ID payment
  const handleUPISubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const err = validateUPI(upiId)
    setUpiError(err)
    if (err) {
      triggerShake('upiId')
      return
    }

    setStep('processing')
    const messages = [
      'Pinging banking servers...',
      `Pushing payment notification request to ${upiId}...`,
      'Waiting for user authorization on phone...',
      'Securing transfer tunnel...',
      'Securing the bag...'
    ]

    messages.forEach((msg, index) => {
      setTimeout(() => setProcessMessage(msg), index * 1000)
    })

    setTimeout(() => {
      triggerSuccess()
    }, messages.length * 1000 + 300)
  }

  // Trigger Success State with Confetti Explosion
  const triggerSuccess = () => {
    setStep('processing')
    setProcessMessage('Finalizing transfer...')

    setTimeout(() => {
      const colors = ['#f43f5e', '#3b82f6', '#10b981', '#eab308', '#a855f7', '#ff7a00']
      const newParticles = Array.from({ length: 50 }).map((_, i) => ({
        id: i,
        x: 0,
        y: 0,
        color: colors[Math.floor(Math.random() * colors.length)],
        angle: Math.random() * Math.PI * 2,
        speed: 4 + Math.random() * 8,
        scale: 0.5 + Math.random() * 1
      }))
      setParticles(newParticles)
      setStep('success')
    }, 800)
  }

  // Dynamic UPI settings from environment variables
  const upiIdConfig = process.env.NEXT_PUBLIC_UPI_ID || 'astitvapathak@okaxis'
  const upiNameConfig = process.env.NEXT_PUBLIC_UPI_NAME || 'Astitva Pathak'

  // UPI Payment URL Schema
  const upiPayLink = `upi://pay?pa=${upiIdConfig}&pn=${encodeURIComponent(upiNameConfig)}&am=${paymentAmountINR.toFixed(2)}&cu=INR&tn=Portfolio%20Support`
  // Free QR Server API endpoint
  const upiQRCodeSrc = `https://api.qrserver.com/v1/create-qr-code/?size=180x180&bgcolor=171717&color=ffffff&data=${encodeURIComponent(upiPayLink)}`

  // Motion variants for input shaking
  const shakeVariants = {
    shake: (i: number) => ({
      x: i ? [0, -6, 6, -6, 6, -3, 3, 0] : 0,
      transition: { duration: 0.4 }
    })
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <motion.div
            ref={modalRef}
            initial={{ scale: 0.93, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.93, opacity: 0, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 350 }}
            className="w-full max-w-md bg-neutral-900 border border-neutral-800 rounded-2xl overflow-hidden shadow-2xl font-manrope text-white relative"
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-neutral-800 p-4">
              <h2 className="text-lg font-bold flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-neutral-300"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <path d="M3 14c.83 .642 2.077 1.017 3.5 1c1.423 .017 2.67 -.358 3.5 -1c.83 -.642 2.077 -1.017 3.5 -1c1.423 -.017 2.67 .358 3.5 1" />
                  <path d="M3 10h14v5a6 6 0 0 1 -6 6h-2a6 6 0 0 1 -6 -6v-5z" />
                  <path d="M16.746 16.726a3 3 0 1 0 .252 -5.555" />
                </svg>
                <span>Sponsor my caffeine addiction</span>
              </h2>
              <button
                onClick={onClose}
                className="text-neutral-400 hover:text-white transition-colors cursor-none p-1.5 rounded-md hover:bg-neutral-800"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Steps Container */}
            <div className="p-5 overflow-hidden">
              <AnimatePresence mode="wait">
                {step === 'input' && (
                  <motion.form
                    key="step-input"
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 30 }}
                    transition={{ type: 'spring', stiffness: 260, damping: 20 }}
                    onSubmit={handleProceedToUPI}
                    className="flex flex-col gap-4"
                  >
                    {/* Fixed Amount Info Banner */}
                    <motion.div 
                      whileHover={{ scale: 1.02 }}
                      className="bg-neutral-800 border border-neutral-700 rounded-xl px-4 py-3 text-center cursor-none transition-shadow hover:shadow-[0_0_15px_rgba(255,255,255,0.05)]"
                    >
                      <span className="text-[10px] text-neutral-400 font-semibold block uppercase tracking-wider mb-0.5">Damage</span>
                      <span className="text-2xl font-extrabold text-white font-mono">₹{paymentAmountINR}.00 INR</span>
                    </motion.div>

                    {/* Name field */}
                    <div className="flex flex-col gap-1">
                      <label className="text-xs text-neutral-400 font-semibold">Who is this legend?</label>
                      <input
                        type="text"
                        placeholder="Name (or drop it anonymously, we don't judge)"
                        value={donorName}
                        onFocus={() => setFocusedField('donorName')}
                        onBlur={() => setFocusedField(null)}
                        onChange={(e) => setDonorName(e.target.value)}
                        className="w-full bg-neutral-850 border border-neutral-700 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:ring-1 focus:ring-neutral-500 placeholder-neutral-500 transition-colors"
                      />
                    </div>

                    {/* Message field */}
                    <div className="flex flex-col gap-1">
                      <label className="text-xs text-neutral-400 font-semibold">Drop a message (no cap)</label>
                      <textarea
                        placeholder="Spill the tea..."
                        value={message}
                        onFocus={() => setFocusedField('message')}
                        onBlur={() => setFocusedField(null)}
                        onChange={(e) => setMessage(e.target.value)}
                        maxLength={160}
                        className="w-full h-24 bg-neutral-850 border border-neutral-700 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:ring-1 focus:ring-neutral-500 placeholder-neutral-500 resize-none transition-colors"
                      />
                    </div>

                    {/* Submit / Proceed */}
                    <motion.button
                      type="submit"
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full mt-2 py-3 bg-white text-black font-bold rounded-xl hover:bg-neutral-200 active:scale-98 transition-all flex items-center justify-center gap-2 cursor-none text-sm"
                    >
                      <span>Send it</span>
                      <span>→</span>
                    </motion.button>
                  </motion.form>
                )}

                {step === 'payment-upi' && (
                  <motion.div
                    key="step-upi"
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -30 }}
                    className="flex flex-col gap-4"
                  >
                    {/* UPI Mode Tabs */}
                    <div className="flex bg-neutral-950 p-1 rounded-xl">
                      <button
                        type="button"
                        onClick={() => setUpiMode('qr')}
                        className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition-all cursor-none ${
                          upiMode === 'qr' ? 'bg-neutral-800 text-white shadow-sm' : 'text-neutral-500 hover:text-white'
                        }`}
                      >
                        Scan QR Code
                      </button>
                      <button
                        type="button"
                        onClick={() => setUpiMode('id')}
                        className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition-all cursor-none ${
                          upiMode === 'id' ? 'bg-neutral-800 text-white shadow-sm' : 'text-neutral-500 hover:text-white'
                        }`}
                      >
                        Pay via UPI ID
                      </button>
                    </div>

                    {upiMode === 'qr' ? (
                      <div className="flex flex-col items-center gap-3 py-1">
                        {/* QR Code Container */}
                        <motion.div 
                          initial={{ scale: 0.9, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          className="relative w-44 h-44 bg-neutral-950 border border-neutral-800 rounded-xl p-2.5 flex items-center justify-center shadow-inner"
                        >
                          <img
                            src={upiQRCodeSrc}
                            alt="Scan to pay UPI"
                            className="w-full h-full object-contain filter invert opacity-90"
                          />
                        </motion.div>
                        
                        {/* Payee Credentials Verification */}
                        <div className="w-full bg-neutral-950/40 border border-neutral-850 rounded-xl p-2.5 text-center text-[11px] text-neutral-400 flex flex-col gap-0.5 font-mono select-all">
                          <div>Payee: <span className="font-semibold text-white">{upiNameConfig}</span></div>
                          <div>UPI ID: <span className="font-semibold text-white">{upiIdConfig}</span></div>
                        </div>

                        <p className="text-[11px] text-neutral-400 text-center max-w-[280px]">
                          Scan QR with GPay, PhonePe, or Paytm. Transacts <span className="font-semibold text-white">₹{paymentAmountINR}.00 INR</span>. Instant cash flow boost.
                        </p>
                        
                        <div className="flex gap-3 w-full mt-2">
                          <button
                            onClick={() => setStep('input')}
                            className="w-1/3 py-3 rounded-xl border border-neutral-700 hover:bg-neutral-800 active:scale-95 transition-all text-sm font-semibold cursor-none"
                          >
                            Back
                          </button>
                          <button
                            onClick={() => triggerSuccess()}
                            className="w-2/3 py-3 bg-white text-black font-bold rounded-xl hover:bg-neutral-200 active:scale-95 transition-all text-sm cursor-none"
                          >
                            Approved Paid
                          </button>
                        </div>
                      </div>
                    ) : (
                      <form onSubmit={handleUPISubmit} className="flex flex-col gap-4">
                        <div className="flex flex-col gap-1">
                          <label className="text-xs text-neutral-400 font-semibold">UPI ID / VPA</label>
                          <motion.input
                            type="text"
                            placeholder={upiIdConfig}
                            value={upiId}
                            onFocus={() => setFocusedField('upiId')}
                            onBlur={() => setFocusedField(null)}
                            onChange={(e) => setUpiId(e.target.value)}
                            variants={shakeVariants}
                            animate={shakeTrigger.upiId ? 'shake' : ''}
                            custom={shakeTrigger.upiId}
                            className={`w-full bg-neutral-850 border rounded-xl px-3 py-2 text-sm text-white focus:outline-none transition-colors focus:ring-1 focus:ring-neutral-500 ${
                              upiError ? 'border-red-500' : 'border-neutral-700'
                            }`}
                          />
                          {upiError && (
                            <p className="text-[11px] text-red-500 flex items-center gap-1">
                              <span>⚠</span> {upiError}
                            </p>
                          )}
                        </div>

                        <p className="text-[11px] text-neutral-500">
                          We will request <span className="text-neutral-400">₹{paymentAmountINR}.00</span> on your UPI application. Accept the prompt to complete.
                        </p>

                        <div className="flex gap-3 mt-2">
                          <button
                            type="button"
                            onClick={() => setStep('input')}
                            className="w-1/3 py-3 rounded-xl border border-neutral-700 hover:bg-neutral-800 active:scale-95 transition-all text-sm font-semibold cursor-none"
                          >
                            Back
                          </button>
                          <motion.button
                            type="submit"
                            whileHover={{ scale: 1.01 }}
                            whileTap={{ scale: 0.98 }}
                            className="w-2/3 py-3 bg-white text-black font-bold rounded-xl hover:bg-neutral-200 active:scale-95 transition-all text-sm cursor-none"
                          >
                            Request UPI Pay
                          </motion.button>
                        </div>
                      </form>
                    )}
                  </motion.div>
                )}

                {step === 'processing' && (
                  <motion.div
                    key="step-processing"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 1.05 }}
                    className="flex flex-col items-center justify-center py-10 gap-4 text-center"
                  >
                    <div className="relative w-16 h-16">
                      <div className="absolute inset-0 rounded-full border-4 border-neutral-800"></div>
                      <div className="absolute inset-0 rounded-full border-4 border-t-white animate-spin"></div>
                    </div>
                    <h3 className="text-base font-bold font-manrope">Securing the bag...</h3>
                    <p className="text-xs text-neutral-400 font-manrope animate-pulse">{processMessage}</p>
                  </motion.div>
                )}

                {step === 'success' && (
                  <motion.div
                    key="step-success"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ type: 'spring', stiffness: 220, damping: 15 }}
                    className="flex flex-col items-center justify-center py-4 gap-4 text-center relative"
                  >
                    {/* Confetti Explosion Layer */}
                    {particles.map((p) => (
                      <motion.div
                        key={p.id}
                        initial={{ x: 0, y: 0, scale: 0, opacity: 1 }}
                        animate={{
                          x: Math.cos(p.angle) * p.speed * 18,
                          y: Math.sin(p.angle) * p.speed * 18 - 40,
                          scale: [0, p.scale, 0],
                          opacity: [1, 1, 0]
                        }}
                        transition={{ duration: 1.5, ease: 'easeOut' }}
                        className="absolute w-2.5 h-2.5 rounded-sm pointer-events-none"
                        style={{ backgroundColor: p.color, zIndex: 10 }}
                      />
                    ))}

                    {/* Success Icon */}
                    <motion.div 
                      initial={{ scale: 0 }}
                      animate={{ scale: [0, 1.2, 1] }}
                      transition={{ delay: 0.15, duration: 0.4 }}
                      className="w-16 h-16 rounded-full bg-green-500/10 border border-green-500/20 flex items-center justify-center text-green-500 relative z-20"
                    >
                      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    </motion.div>

                    <div className="flex flex-col gap-1">
                      <h3 className="text-lg font-bold font-manrope text-white">Massive W!</h3>
                      <p className="text-xs text-neutral-300">
                        We are so back. Transaction cleared.
                      </p>
                    </div>

                    {/* Receipt Box */}
                    <div className="w-full bg-neutral-850 border border-neutral-800 rounded-xl p-3 text-left flex flex-col gap-1 text-xs text-neutral-300">
                      <div className="flex justify-between">
                        <span>Legend:</span>
                        <span className="font-semibold text-white">{donorName || 'Anonymous'}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Funds transferred:</span>
                        <span className="font-semibold text-white">₹{paymentAmountINR}.00 INR</span>
                      </div>
                      {message && (
                        <div className="border-t border-neutral-800 mt-1.5 pt-1.5">
                          <span className="text-[10px] text-neutral-500 uppercase">Vibe check:</span>
                          <p className="italic text-neutral-200 mt-0.5">"{message}"</p>
                        </div>
                      )}
                    </div>

                    <motion.button
                      onClick={onClose}
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full mt-2 py-3 bg-white text-black font-bold rounded-xl hover:bg-neutral-200 active:scale-98 transition-all cursor-none text-sm font-semibold"
                    >
                      Done.
                    </motion.button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Bottom Ticker */}
            <div className="bg-neutral-950/80 px-5 py-2.5 border-t border-neutral-800/60 flex items-center justify-between text-[11px] text-neutral-500">
              <span className="italic truncate pr-4">{getHelperComment()}</span>
              <span className="flex-shrink-0 font-mono select-none">v1.2.0</span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
