import React, { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const projects = [
  {
    id: 1,
    img: 'images/Sweetora.png',
    title: 'Sweetora', subtitle: 'Online Sweet Shop',
    tags: ['React', 'Tailwind CSS', 'Express.js', 'Node.js'],
    year: '2024', role: 'Full Stack Developer',
    github: '#', color: '#f05e81',
    cs: {
      overview: 'Sweetora is a full-stack e-commerce platform built to let users discover, filter, and order traditional Indian sweets online with a seamless shopping experience.',
      challenge: 'Local sweet shops had zero digital presence. Customers had to physically visit stores with no way to browse products, check availability, or place orders remotely — leading to lost sales and poor customer retention.',
      solution: 'Built a React SPA with a component-based cart system, real-time product filtering, and an Express.js REST API for order management. Used Tailwind for a consistent, mobile-first UI.',
      stats: [{ value: '5+', label: 'API Endpoints' }, { value: '100%', label: 'Responsive' }, { value: '3', label: 'Core Modules' }, { value: '2x', label: 'Faster Load' }],
      results: ['Fully responsive across all devices', 'Cart state managed globally with Context API', 'REST API with CRUD for products & orders', 'Deployed on Vercel + Render'],
    },
  },
  {
    id: 2,
    img: 'images/stepX.png',
    title: 'StepX', subtitle: 'Online Shoe Shop',
    tags: ['PHP', 'MySQL', 'HTML', 'CSS', 'JavaScript'],
    year: '2023', role: 'Frontend + Backend Developer',
    github: '#', color: '#76d0ec',
    cs: {
      overview: 'StepX is a server-rendered shoe e-commerce store with a PHP/MySQL backend, featuring product browsing, category filtering, and cart management.',
      challenge: 'Needed a full-stack e-commerce solution without modern JS frameworks — built entirely with vanilla PHP, MySQL, and plain HTML/CSS/JS for maximum simplicity and server performance.',
      solution: 'Designed a multi-page PHP application with session-based cart, MySQL database for products & users, and dynamic filtering via query parameters — all with a clean responsive UI.',
      stats: [{ value: '3', label: 'DB Tables' }, { value: '100%', label: 'Vanilla Stack' }, { value: '5+', label: 'Filter Options' }, { value: '0', label: 'JS Frameworks' }],
      results: ['Session-based cart persisting across pages', 'MySQL relational schema for products & users', 'filter with zero JS framework', 'Clean responsive layout on all screen sizes'],
    },
  },
  {
    id: 3,
    img: 'images/portfolio.png',
    title: 'Portfolio', subtitle: 'Personal Website',
    tags: ['React', 'CSS', 'Vite', 'Web3Forms'],
    year: '2025', role: 'Designer & Developer',
    github: '#', color: '#35b04b',
    cs: {
      overview: 'A premium personal portfolio built with React + Vite, featuring smooth scroll animations, a toggle design/code section, floating social icons, and a live contact form.',
      challenge: 'Existing portfolio templates felt generic and lifeless. Needed something that truly reflected personal brand — with micro-animations, a unique layout, and interactive sections without heavy libraries.',
      solution: 'Built from scratch in React + Tailwind CSS with GSAP animations, custom toggle slider, scrollytelling project panels, and Web3Forms for a serverless contact form.',
      stats: [{ value: '1', label: 'CSS Framework' }, { value: '8+', label: 'Sections' }, { value: '100%', label: 'Responsive' }, { value: '60fps', label: 'Animations' }],
      results: ['React + Tailwind CSS component architecture', 'Web3Forms contact integration (no backend)', 'Scroll animations & hover effects', 'Deployed on github pages'],
    },
  },
]

/* ── Coming Soon Modal ── */
const GithubModal = ({ color, onClose }) => {
  const cardRef = useRef(null)

  useEffect(() => {
    gsap.fromTo(cardRef.current,
      { scale: 0.7, opacity: 0, y: 24 },
      { scale: 1, opacity: 1, y: 0, duration: 0.4, ease: 'back.out(1.8)' }
    )
    const t = setTimeout(() => handleClose(), 3000)
    return () => clearTimeout(t)
  }, [])

  const handleClose = () => {
    gsap.to(cardRef.current, {
      scale: 0.85, opacity: 0, y: 16,
      duration: 0.25, ease: 'power2.in',
      onComplete: onClose,
    })
  }

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 9998,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      background: 'rgba(0,0,0,0.3)', backdropFilter: 'blur(5px)',
    }} onClick={handleClose}>
      <div ref={cardRef} onClick={e => e.stopPropagation()} style={{
        background: '#fff',
        borderRadius: 18,
        padding: '36px 44px',
        textAlign: 'center',
        fontFamily: '"Montserrat", sans-serif',
        boxShadow: '0 24px 70px rgba(0,0,0,0.16)',
        position: 'relative',
      }}>
        {/* close */}
        <button onClick={handleClose} style={{
          position: 'absolute', top: 12, right: 12,
          background: '#f5f5f5', border: 'none', borderRadius: '50%',
          width: 26, height: 26, cursor: 'pointer', fontSize: 13,
          display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#aaa',
        }}>✕</button>

        {/* icon */}
        <div style={{
          width: 56, height: 56, borderRadius: '50%',
          background: `${color}18`, border: `2px solid ${color}`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          margin: '0 auto 18px', fontSize: 24,
        }}>
          <i className="ri-lock-line" style={{ color }} />
        </div>

        {/* text */}
        <h3 style={{ fontSize: 20, fontWeight: 800, color: '#111', margin: '0 0 8px', letterSpacing: '-0.02em' }}>
          Coming Soon
        </h3>
        <p style={{ fontSize: 13, color: '#999', margin: 0 }}>
          This repo will be public soon.
        </p>
      </div>
    </div>
  )
}

const Projects = () => {
  const wrapperRef  = useRef(null)
  const [modal, setModal] = useState(null) // { color } when open

  useEffect(() => {
    const ctx = gsap.context(() => {
      // No more sticky stacking — just a normal clean list
      const panels = gsap.utils.toArray('.proj-slide')
      panels.forEach((panel) => {
        gsap.fromTo(panel, 
          { y: 50, opacity: 0 }, 
          { 
            y: 0, 
            opacity: 1, 
            duration: 0.8, 
            ease: 'power3.out',
            scrollTrigger: {
              trigger: panel,
              start: 'top 85%',
              toggleActions: 'play none none reverse'
            }
          }
        )
      })
    }, wrapperRef)

    // Recalculate pin positions after lazy siblings above have mounted & painted
    const refreshTimer = setTimeout(() => ScrollTrigger.refresh(), 150)

    return () => {
      clearTimeout(refreshTimer)
      ctx.revert()
    }
  }, [])

  return (
    <>
      <section className="container projects-section" id="projects">
        <h2>Things I&apos;ve Built</h2>
        <h1>My Works</h1>
      </section>

      <div className="proj-slides-wrapper" ref={wrapperRef}>
        {projects.map((p, i) => (
          <article className="proj-slide" key={p.id} style={{ '--pa': p.color }}>
            <div className="proj-inner">

              {/* ── LEFT ── */}
              <div className="proj-left">
                <span className="proj-num">0{i + 1}</span>
                <img src={p.img} alt={p.title} className="proj-img" decoding="async" />
                <div className="proj-left-body">
                  <h3 className="proj-title">{p.title}</h3>
                  <p className="proj-subtitle">{p.subtitle}</p>
                  <div className="proj-tags">
                    {p.tags.map(t => <span key={t} className="proj-tag">{t}</span>)}
                  </div>
                  <div className="proj-meta-row">
                    <span>{p.year}</span>
                    <span className="proj-meta-sep">·</span>
                    <span>{p.role}</span>
                  </div>
                  <div className="proj-btns">
                    <button
                      className="proj-btn proj-btn-solid"
                      onClick={() => setModal({ color: p.color })}
                    >
                      GitHub Repo
                    </button>
                  </div>
                </div>
              </div>

              {/* ── RIGHT ── */}
              <div className="proj-right">
                <div className="proj-cs-main-heading">Case Study</div>
                {[
                  { num: '01', label: 'Overview', content: p.cs.overview },
                  { num: '02', label: 'Challenge', content: p.cs.challenge },
                  { num: '03', label: 'Solution',  content: p.cs.solution  },
                ].map(({ num, label, content }) => (
                  <div className="proj-cs-block" key={label}>
                    <div className="proj-cs-label">
                      <span className="proj-cs-num">{num}</span>
                      <span className="proj-cs-heading">{label}</span>
                    </div>
                    <p className="proj-cs-text">{content}</p>
                  </div>
                ))}

                {/* Stats */}
                <div className="proj-stats">
                  {p.cs.stats.map((s, si) => (
                    <div key={si} className="proj-stat">
                      <strong>{s.value}</strong>
                      <span>{s.label}</span>
                    </div>
                  ))}
                </div>

                {/* Results */}
                <div className="proj-cs-block">
                  <div className="proj-cs-label">
                    <span className="proj-cs-num">04</span>
                    <span className="proj-cs-heading">Results</span>
                  </div>
                  <div className="proj-results">
                    {p.cs.results.map((r, ri) => (
                      <div key={ri} className="proj-result-item">
                        <span className="proj-dot" />
                        <p>{r}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

            </div>
          </article>
        ))}
      </div>

      <style>{`
        /* ─── Wrapper ─── */
        .proj-slides-wrapper {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 3vw 6rem;
        }

        /* ─── Slide ─── */
        .proj-slide {
          width: 100%;
          min-height: 480px;
          background: #fff;
          border-radius: 24px;
          overflow: hidden;
          box-shadow: 0 10px 45px rgba(0,0,0,0.06);
          border: 1px solid #f0f0f0;
          margin-bottom: 60px;
          will-change: transform, opacity;
        }

        /* ─── Inner grid ─── */
        .proj-inner {
          display: grid;
          grid-template-columns: 38% 62%;
          min-height: 480px;
        }

        /* ─── LEFT ─── */
        .proj-left {
          background: #fafafa;
          border-right: 1px solid #f0f0f0;
          padding: 2.5rem 2rem;
          display: flex;
          flex-direction: column;
          gap: 1.2rem;
          position: relative;
          overflow: hidden;
        }
        .proj-num {
          position: absolute;
          top: -0.5rem; right: 1rem;
          font-size: 7rem;
          font-weight: 900;
          color: rgba(0,0,0,0.04);
          font-family: "Montserrat", sans-serif;
          letter-spacing: -0.04em;
          line-height: 1;
          user-select: none;
        }
        .proj-img {
          width: 100%;
          height: 190px;
          object-fit: cover;
          border-radius: 14px;
          box-shadow: 0 4px 20px rgba(0,0,0,0.1);
        }
        .proj-left-body {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
          flex: 1;
        }
        .proj-title {
          font-size: 22px;
          font-weight: 700;
          color: #111;
          margin: 0;
          letter-spacing: -0.02em;
          font-family: "Montserrat", sans-serif;
        }
        .proj-subtitle {
          font-size: 13px;
          color: #888;
          margin: 0;
          font-family: "Montserrat", sans-serif;
        }
        .proj-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 5px;
        }
        .proj-tag {
          padding: 3px 10px;
          border-radius: 100px;
          font-size: 11px;
          font-weight: 500;
          background: #f0f0f0;
          color: #555;
          font-family: "Montserrat", sans-serif;
        }
        .proj-meta-row {
          font-size: 12px;
          color: #aaa;
          display: flex;
          align-items: center;
          gap: 6px;
          font-family: "Montserrat", sans-serif;
        }
        .proj-meta-sep { color: #ddd; }

        /* ─── Buttons ─── */
        .proj-btns {
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
          margin-top: auto;
          padding-top: 0.5rem;
        }
        .proj-btn {
          display: inline-block;
          padding: 9px 18px;
          border-radius: 100px;
          border: none;
          font-size: 12px;
          font-weight: 600;
          text-decoration: none;
          cursor: pointer;
          transition: transform 0.2s ease, box-shadow 0.2s ease;
          font-family: "Montserrat", sans-serif;
          white-space: nowrap;
        }
        .proj-btn:hover { transform: translateY(-2px); }
        .proj-btn-solid {
          background: var(--pa, #35b04b);
          color: #fff;
          box-shadow: 0 4px 14px color-mix(in srgb, var(--pa, #35b04b) 40%, transparent);
        }
        .proj-btn-outline {
          background: transparent;
          border: 1.5px solid var(--pa, #35b04b);
          color: var(--pa, #35b04b);
        }
        .proj-btn-outline:hover {
          background: var(--pa, #35b04b);
          color: #fff;
        }

        /* ─── RIGHT — static, no scroll ─── */
        .proj-right {
          padding: 1.8rem 2.2rem;
          overflow: hidden;
          height: 100%;
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        /* ─── Case Study heading ─── */
        .proj-cs-main-heading {
          font-size: 17px;
          font-weight: 700;
          color: #111;
          letter-spacing: -0.02em;
          font-family: "Montserrat", sans-serif;
          padding-bottom: 0.7rem;
          border-bottom: 2px solid var(--pa, #35b04b);
          margin-bottom: 0.8rem;
          flex-shrink: 0;
        }

        /* ─── CS Blocks ─── */
        .proj-cs-block {
          display: flex;
          flex-direction: column;
          gap: 0.35rem;
          padding-bottom: 1rem;
          border-bottom: 1px solid #f0f0f0;
          overflow: hidden;
        }
        .proj-cs-block:last-of-type { border-bottom: none; padding-bottom: 0; }

        .proj-cs-label {
          display: flex;
          align-items: center;
          gap: 8px;
          flex-shrink: 0;
        }
        .proj-cs-num {
          font-size: 10px;
          font-weight: 700;
          color: var(--pa, #35b04b);
          letter-spacing: 0.05em;
          font-family: "Montserrat", sans-serif;
        }
        .proj-cs-heading {
          font-size: 11px;
          font-weight: 700;
          color: #111;
          text-transform: uppercase;
          letter-spacing: 0.09em;
          font-family: "Montserrat", sans-serif;
        }
        .proj-cs-text {
          font-size: 12.5px;
          color: #555;
          line-height: 1.65;
          margin: 0;
          font-family: "Montserrat", sans-serif;
          overflow: hidden;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
        }

        /* ─── Stats — compact row ─── */
        .proj-stats {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 8px;
          flex-shrink: 0;
          margin-bottom: 0.6rem;
        }
        .proj-stat {
          display: flex;
          flex-direction: column;
          gap: 2px;
          padding: 9px 8px;
          background: #f9f9f9;
          border-radius: 10px;
          border-top: 2px solid var(--pa, #35b04b);
          text-align: center;
        }
        .proj-stat strong {
          font-size: 16px;
          font-weight: 800;
          color: var(--pa, #35b04b);
          font-family: "Montserrat", sans-serif;
          letter-spacing: -0.02em;
        }
        .proj-stat span {
          font-size: 9px;
          color: #999;
          font-weight: 500;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          font-family: "Montserrat", sans-serif;
        }

        /* ─── Results — 2-col compact ─── */
        .proj-results {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 5px 12px;
        }
        .proj-result-item {
          display: flex;
          align-items: flex-start;
          gap: 7px;
          overflow: hidden;
        }
        .proj-dot {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: var(--pa, #35b04b);
          flex-shrink: 0;
          margin-top: 5px;
        }
        .proj-result-item p {
          font-size: 13px;
          color: #555;
          margin: 0;
          line-height: 1.6;
          font-family: "Montserrat", sans-serif;
        }

        /* ─── Mobile ─── */
        @media (max-width: 768px) {
          .proj-slides-wrapper { padding: 0 4vw 2rem; }
          .proj-slide { 
            height: auto; 
            min-height: auto; 
            border-radius: 20px; 
            margin-bottom: 30px; 
            opacity: 1 !important; 
            scale: 1 !important; 
          }
          .proj-inner { grid-template-columns: 1fr; }
          .proj-left { 
            border-right: none; 
            border-bottom: 1px solid #f0f0f0; 
            padding: 1.5rem;
          }
          .proj-img { height: 180px; }
          .proj-num { font-size: 5rem; top: -1rem; right: 0.5rem; }
          
          .proj-right { 
            height: auto; 
            padding: 1.5rem; 
            gap: 1.5rem;
          }
          .proj-cs-text {
            -webkit-line-clamp: unset;
            display: block;
          }
          .proj-stats { 
            grid-template-columns: repeat(2, 1fr); 
            gap: 10px;
          }
          .proj-results {
            grid-template-columns: 1fr;
          }
          .proj-btns {
            margin-top: 1rem;
          }
          .proj-btn {
            width: 100%;
            text-align: center;
          }
        }
      `}</style>
      {/* Coming Soon Modal */}
      {modal && <GithubModal color={modal.color} onClose={() => setModal(null)} />}
    </>
  )
}

export default Projects