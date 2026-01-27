import { useState, useEffect } from 'react'
import Protected from "../components/Protected";
import Header from '../components/Header'
import emailjs from '@emailjs/browser';

export default function Rsvp() {
  const [status, setStatus] = useState(null)
  const [attending, setAttending] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const RATE_LIMIT_SECONDS = 15 // cooldown in seconds between submissions
  const [rateLimitedUntil, setRateLimitedUntil] = useState(null)
  const [now, setNow] = useState(Date.now())


  // Replace with your actual Google Form endpoint
  const FORM_ENDPOINT = "https://docs.google.com/forms/d/e/<FORM_ID>/formResponse"

  // Match to Google Form entry IDs from inspect element on the form page
  const ENTRY_ID_MAP = {
    name: "entry.261565979",
    email: "entry.1088033278",
    attending: "entry.1524530761",
    total_guests: "entry.109871348",
    additional_guests: "entry.117374733",
    dietary_requirements: "entry.1295994256",
    hotel: "entry.383715592",
    song_request: "entry.1473565494",
    other: "entry.1546963535",
  };

  // EmailJS configuration
  const EMAIL_JS_CONFIG = {
    serviceId: 'service_<SERVICE_ID>',
    templateId: 'template_<TEMPLATE_ID>',
    publicKey: '<PUBLIC_KEY>',
  };

  async function handleSubmit(e) {
    e.preventDefault()

    if (isSubmitting) return
    setIsSubmitting(true)

    // Client-side rate limiting: check last submit time stored in localStorage
    try {
      const last = parseInt(localStorage.getItem('rsvp_last_submit') || '0', 10)
      const until = last + RATE_LIMIT_SECONDS * 1000
      if (Date.now() < until) {
        setRateLimitedUntil(until)
        setStatus('rate_limited')
        return
      }
    } catch (err) {
      // ignore localStorage errors and continue
    }

    const data = new URLSearchParams();
    const form = new FormData(e.target);

    for (const [key, value] of form.entries()) {
      if (ENTRY_ID_MAP[key]) {
        data.append(ENTRY_ID_MAP[key], value);
      }
    }

    try {
      const res = await fetch(FORM_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: data.toString(),
        mode: 'no-cors',
      })

      // Due to no-cors mode, we can't check response status

      const templateParams = {
        name: form.get('name')?.trim() || "",
        email: form.get('email')?.trim() || "",
        attending: form.get('attending')?.trim() || "",
        total_guests: form.get('total_guests')?.trim() || "",
        additional_guests: form.get('additional_guests')?.trim() || "",
        dietary_requirements: form.get('dietary_requirements')?.trim() || "",
        hotel: form.get('hotel')?.trim() || "",
        song_request: form.get('song_request')?.trim() || "",
        other: form.get('other')?.trim() || ""
      };
      const result = await emailjs.send(EMAIL_JS_CONFIG.serviceId, EMAIL_JS_CONFIG.templateId, templateParams, EMAIL_JS_CONFIG.publicKey);

      try {
        const ts = Date.now()
        localStorage.setItem('rsvp_last_submit', String(ts))
        setRateLimitedUntil(ts + RATE_LIMIT_SECONDS * 1000)
      } catch (err) {
        // ignore localStorage errors
      }

      if (result.status === 200) {
        setStatus('success')
        e.target.reset()
        setAttending("")
      }
      else {
        setStatus('error')
      }

    } catch (err) {
      console.error(err)
      setStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  useEffect(() => {
    // Keep a clock so UI can show remaining cooldown seconds
    let mounted = true
    try {
      const last = parseInt(localStorage.getItem('rsvp_last_submit') || '0', 10)
      if (last) {
        const until = last + RATE_LIMIT_SECONDS * 1000
        if (until > Date.now() && mounted) setRateLimitedUntil(until)
      }
    } catch (err) {
      // ignore localStorage
    }

    const timer = setInterval(() => setNow(Date.now()), 1000)
    return () => {
      mounted = false
      clearInterval(timer)
    }
  }, [])

  return (
    <Protected>
      <Header />
      <div className="container py-16">
        <h2 className="text-3xl font-serif text-primary">RSVP</h2>

        <p className="mt-4 text-text max-w-prose">
          Please fill in the RSVP form. You will receive a confirmation email when sent.
        </p>

        <form onSubmit={handleSubmit} className="mt-6 max-w-lg space-y-4">

          <div>
            <label className="block text-sm text-text font-medium">Full name</label>
            <input name="name" required className="mt-1 block w-full rounded-md border px-3 py-2" />
          </div>

          <div>
            <label className="block text-sm text-text font-medium">Email</label>
            <input type="email" name="email" required className="mt-1 block w-full rounded-md border px-3 py-2" />
          </div>

          <div>
            <label className="block text-sm text-text font-medium">Will you attend?</label>
            <select
              name="attending"
              required
              value={attending}
              onChange={(e) => setAttending(e.target.value)}
              className="mt-1 block w-full rounded-md border px-3 py-2"
            >
              <option value="">Choose</option>
              <option value="Yes">Yes</option>
              <option value="Sorry, can't make it">Sorry, can't make it</option>
            </select>
          </div>

          {attending === "Yes" && (
            <>
              <div>
                <label className="block text-sm text-text font-medium">
                  Total Number of Guests Attending (Including Yourself)
                </label>
                {/* <input name="total_guests" className="mt-1 block w-full rounded-md border px-3 py-2" /> */}

                <select name="total_guests" className="mt-1 block w-full rounded-md border px-3 py-2" >
                  <option value="">Choose</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                </select>
              </div>

              <div>
                <label className="block text-sm text-text font-medium">
                  Full name of additional guest(s) (Optional)
                </label>
                <input name="additional_guests" className="mt-1 block w-full rounded-md border px-3 py-2" />
              </div>

              <div>
                <label className="block text-sm text-text font-medium">
                  Dietary requirements (Optional)
                </label>
                <input name="dietary_requirements" className="mt-1 block w-full rounded-md border px-3 py-2" />
              </div>

              <div>
                <label className="block text-sm text-text font-medium">
                  Would you like a hotel room?
                </label>
                <select name="hotel" required className="mt-1 block w-full rounded-md border px-3 py-2">
                  <option value="">Choose</option>
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </select>
              </div>

              <div>
                <label className="block text-sm text-text font-medium">
                  Song request (Optional)
                </label>
                <input name="song_request" className="mt-1 block w-full rounded-md border px-3 py-2" />
              </div>

              <div>
                <label className="block text-sm text-text font-medium">
                  Anything else? (Optional)
                </label>
                <textarea name="other" rows="3" className="mt-1 block w-full rounded-md border px-3 py-2" />
              </div>
            </>
          )}

          <div>
            {(() => {
              const remaining = rateLimitedUntil ? Math.ceil((rateLimitedUntil - now) / 1000) : 0
              const isRateLimited = rateLimitedUntil && rateLimitedUntil > now
              return (
                <div className="relative group inline-block">
                  <button
                    disabled={isRateLimited || isSubmitting}
                    className="px-5 py-3 rounded-lg bg-secondary text-text-light font-semibold hover:bg-secondary-200 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? 'Sending…' : 'Send RSVP'}
                  </button>

                  {isRateLimited && (
                    <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 hidden group-hover:block w-max bg-gray-800 text-white text-xs py-1 px-2 rounded shadow-lg">
                      Please wait {remaining}s
                      <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-gray-800" />
                    </div>
                  )}
                </div>
              )
            })()}
          </div>

          {status === 'success' && (
            <p className="text-green-600">Thanks — your RSVP has been sent.</p>
          )}
          {status === 'error' && (
            <p className="text-red-600">Something went wrong. Try again or contact us.</p>
          )}
          {status === 'rate_limited' && (
            <p className="text-yellow-600">You're sending RSVPs too quickly. Please wait a moment and try again.</p>
          )}
        </form>
      </div>
    </Protected>
  )
}