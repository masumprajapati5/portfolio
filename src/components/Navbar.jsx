import React, { useState, useEffect, useRef, useCallback } from 'react'
import { gsap } from 'gsap'

const NAV_ITEMS = ['Home', 'Skills', 'About', 'Projects', 'Contact']

/* ── Slot-machine text link (same GSAP yPercent trick as StaggeredMenu toggle) ── */
const NavLink = ({ label, href }) => {
  const innerRef     = useRef(null)
  const wrapRef      = useRef(null)   // locked to initial label width
  const tweenRef     = useRef(null)
  const pendingRef   = useRef(null)
  const [lines, setLines] = useState([label])

  // Lock wrapper width to the original label width so other links never shift
  useEffect(() => {
    if (wrapRef.current) {
      const w = wrapRef.current.offsetWidth
      wrapRef.current.style.width = `${w}px`
    }
  }, [])

  // Fire GSAP after React re-renders the new lines
  useEffect(() => {
    if (pendingRef.current && innerRef.current) {
      const { finalShift, duration } = pendingRef.current
      gsap.set(innerRef.current, { yPercent: 0 })
      tweenRef.current?.kill()
      tweenRef.current = gsap.to(innerRef.current, {
        yPercent: -finalShift,
        duration,
        ease: 'power4.out',
      })
      pendingRef.current = null
    }
  }, [lines])

  const handleEnter = useCallback(() => {
    // Build cycle sequence through other nav names, land back on own label
    const seq = []
    let last = label
    for (let i = 0; i < 5; i++) {
      const opts = NAV_ITEMS.filter(n => n !== last)
      last = opts[Math.floor(Math.random() * opts.length)]
      seq.push(last)
    }
    seq.push(label)
    seq.push(label) // stable landing

    const allLines  = [label, ...seq]
    const lineCount = allLines.length
    const finalShift = ((lineCount - 1) / lineCount) * 100

    pendingRef.current = { finalShift, duration: 0.8 + lineCount * 0.1 }
    setLines(allLines)
  }, [label])

  const handleLeave = useCallback(() => {
    tweenRef.current?.kill()
    pendingRef.current = null
    setLines([label])
    if (innerRef.current) gsap.set(innerRef.current, { yPercent: 0 })
  }, [label])

  return (
    <a
      href={href}
      className="lg-link"
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
    >
      <span className="lg-link-wrap" ref={wrapRef} aria-hidden="true">
        <span ref={innerRef} className="lg-link-inner">
          {lines.map((l, i) => (
            <span className="lg-link-line" key={i}>{l}</span>
          ))}
        </span>
      </span>
      <span className="lg-link-sr">{label}</span>
    </a>
  )
}

/* ── Main Navbar ── */
const Navbar = () => {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <header className={`site-header${scrolled ? ' is-scrolled' : ''}`}>
        <nav className="lg-nav" aria-label="Main navigation">

          {/* Logo */}
          <div className="lg-logo">
            <span className="lg-logo-text">Masum&apos;s</span>
            <span className="lg-logo-sub">Portfolio</span>
          </div>

          {/* Links — slot-machine hover */}
          <ul className="lg-links" role="list">
            {NAV_ITEMS.map(item => (
              <li key={item}>
                <NavLink label={item} href={`#${item.toLowerCase()}`} />
              </li>
            ))}
          </ul>

        </nav>
      </header>

      <style>{`
        /* ======================================================
           LIQUID GLASS NAVBAR — Desktop (hidden on mobile)
           ====================================================== */
        .site-header {
          position: fixed;
          top: 0; left: 0; right: 0;
          z-index: 999;
          display: flex;
          justify-content: center;
          padding: 14px 24px;
          pointer-events: none;
          transition: padding 0.4s ease;
        }
        .site-header.is-scrolled { padding: 8px 24px; }

        .lg-nav {
          pointer-events: auto;
          width: 90%;
          max-width: 1200px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 12px 28px;
          border-radius: 100px;

          background: rgba(255,255,255,0.22);
          backdrop-filter: blur(28px) saturate(200%);
          -webkit-backdrop-filter: blur(28px) saturate(200%);
          box-shadow:
            0 0 0 0.5px rgba(255,255,255,0.6) inset,
            0 1px 0 rgba(255,255,255,0.8) inset,
            0 12px 40px rgba(0,0,0,0.10),
            0 2px 8px rgba(0,0,0,0.06);
          transition: background 0.4s ease, box-shadow 0.4s ease, padding 0.4s ease;
        }
        .site-header.is-scrolled .lg-nav {
          background: rgba(255,255,255,0.38);
          box-shadow:
            0 0 0 0.5px rgba(255,255,255,0.7) inset,
            0 1px 0 rgba(255,255,255,0.9) inset,
            0 16px 50px rgba(0,0,0,0.13),
            0 2px 8px rgba(0,0,0,0.08);
        }

        /* ---- Logo ---- */
        .lg-logo {
          display: flex; align-items: baseline;
          gap: 5px; user-select: none; flex-shrink: 0;
        }
        .lg-logo-text {
          font-family: "Montserrat", sans-serif;
          font-size: 15px; font-weight: 700;
          color: #111; letter-spacing: -0.02em;
        }
        .lg-logo-sub {
          font-family: "Montserrat", sans-serif;
          font-size: 15px; font-weight: 400;
          color: #555; letter-spacing: -0.01em;
        }

        /* ---- Links ---- */
        .lg-links {
          display: flex; align-items: center;
          gap: 4px; list-style: none; margin: 0; padding: 0;
        }

        /* Base link — no hover background, no color change */
        .lg-link {
          display: inline-flex;
          align-items: center;
          padding: 7px 16px;
          border-radius: 50px;
          font-family: "Montserrat", sans-serif;
          font-size: 13.5px; font-weight: 500;
          color: #444;
          text-decoration: none;
          white-space: nowrap;
          position: relative;
          overflow: visible;
        }

        /* Slot-machine text container */
        .lg-link-wrap {
          display: inline-block;
          height: 1em;
          overflow: hidden;
          line-height: 1;
          vertical-align: top;
        }
        .lg-link-inner {
          display: flex;
          flex-direction: column;
          line-height: 1;
          font-weight: 500;
        }
        .lg-link-line {
          display: block;
          height: 1em;
          line-height: 1;
          white-space: nowrap;
        }

        /* Accessible label hidden visually (screen readers) */
        .lg-link-sr {
          position: absolute;
          width: 1px; height: 1px;
          overflow: hidden;
          clip: rect(0,0,0,0);
          white-space: nowrap;
        }

        /* ---- Hidden on mobile ---- */
        @media (max-width: 768px) {
          .site-header { display: none; }
        }

        /* ---- Tablet ---- */
        @media (max-width: 900px) {
          .lg-link  { padding: 7px 11px; font-size: 13px; }
          .lg-nav   { padding: 10px 22px; }
        }
      `}</style>
    </>
  )
}

export default Navbar