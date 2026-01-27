import Protected from "../components/Protected";
import Header from '../components/Header'

const CONFIG = {
  VENUE_NAME: "The Serpentine Lido",
  VENUE_ADDRESS: "Hyde Park, S Carriage Dr, London W2 2UH",
  GOOGLE_MAPS_CODE: "GR4P+W9 London", // Find the plus code at the side on google maps.
  GOOGLE_MAPS_LINK: "https://www.google.com/maps/place/GR4P%2BW9%20London", // 'GR4P+W9 London' converts to 'GR4P%2BW9%20London'
  WHAT3WORDS_CODE: "cafe.march.elbow",
  WHAT3WORDS_LINK: "https://what3words.com/cafe.march.elbow",
  MAP_IFRAME_SRC: "https://www.google.com/maps?q=GR4P%2BW9%20London&output=embed", // 'GR4P+W9 London' converts to 'GR4P%2BW9%20London'
  ACCOMMODATION_LINK: "https://www.theritzlondon.com/",
  CHARITY_LINK: "https://www.justgiving.com/charity-placeholder",
};

export default function Details() {
  return (
    <Protected>
      <Header />

      <div className="container py-16">
        <h2 className="text-3xl font-serif text-primary">Details & Venue</h2>

        <section className="mt-6">
          <h3 className="font-semibold text-text">Schedule</h3>
          <div className="mt-3 grid grid-cols-[auto_1fr] gap-x-4 gap-y-2 text-text">
            <span className="font-medium">12:30</span>
            <span>Champagne Departure from The Ritz London</span>

            <span className="font-medium">13:30</span>
            <span>Ceremony at the Bandstand</span>

            <span className="font-medium">14:30</span>
            <span>Lakeside Drinks Reception</span>

            <span className="font-medium">16:30</span>
            <span>Wedding Breakfast at {CONFIG.VENUE_NAME}</span>

            <span className="font-medium">19:30</span>
            <span>Carriages & Dancing</span>
          </div>

          <p className="mt-2 text-text max-w-prose">Private shuttles will return guests to The Ritz from 22:00.</p>
        </section>

        <section className="mt-6">
          <h3 className="font-semibold text-text">Venue</h3>
          <p className="mt-2 text-text max-w-prose">{CONFIG.VENUE_NAME} — {CONFIG.VENUE_ADDRESS}</p>
          <ul className="mt-1 ml-4 list-disc text-text max-w-prose">
            <li>Google Maps Code: <a href={CONFIG.GOOGLE_MAPS_LINK} className="text-primary underline hover:text-primary/80" target="_blank" rel="noopener noreferrer">{CONFIG.GOOGLE_MAPS_CODE}</a></li>
            <li>What3Words: <a href={CONFIG.WHAT3WORDS_LINK} className="text-primary underline hover:text-primary/80" target="_blank" rel="noopener noreferrer">{CONFIG.WHAT3WORDS_CODE}</a></li>
          </ul>

          <div className="mt-4">
            <iframe
              title="Venue map"
              src={CONFIG.MAP_IFRAME_SRC}
              className="w-full h-64 rounded-lg border-0"
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </section>

        <section className="mt-6">
          <h3 className="font-semibold text-text">Accommodation</h3>
          <p className="mt-2 text-text max-w-prose">We have a block of rooms reserved at The Ritz. Please indicate on the RSVP if you would like to stay within our party wing (£950+ payable at check-in).</p>
          <p className="mt-2 text-text max-w-prose">Alternative options are available at <a href={CONFIG.ACCOMMODATION_LINK} className="text-primary underline hover:text-primary/80" target="_blank" rel="noopener noreferrer">The Ritz Website</a>, but we recommend booking early as central London fills up fast.</p>
        </section>

        <section className="mt-6">
          <h3 className="font-semibold text-text">Transport</h3>
          <p className="mt-2 text-text max-w-prose">Rolls-Royce shuttles will be provided between The Ritz and Hyde Park.</p>
          <ul className="mt-1 ml-4 list-disc text-text max-w-prose">
            <li>12:30 — Shuttles depart from the main entrance.</li>
            <li>22:00 til late — Return shuttles running every 20 minutes.</li>
          </ul>
          <p className="mt-2 text-text max-w-prose">For those coming via the Tube, the nearest stations are Hyde Park Corner and Green Park.</p>
        </section>

        <section className="mt-6">
          <h3 className="font-semibold text-text">Gifts</h3>
          <p className="mt-2 text-text max-w-prose">No gifts, please! If you would still like to give something, we are collecting <a href={CONFIG.CHARITY_LINK} className="text-primary underline hover:text-primary/80" target="_blank" rel="noopener noreferrer">donations via our charity page</a>. Any contribution is deeply appreciated 💖</p>
        </section>

        <section className="mt-6">
          <h3 className="font-semibold text-text">Dress Code</h3>
          <p className="mt-2 text-text max-w-prose">Boho Chic</p>
        </section>
      </div>
    </Protected>
  )
}