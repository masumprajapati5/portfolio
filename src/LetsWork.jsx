import React from 'react'

const LetsWork = () => {
  return (
    <section className="container letswork-section">
      <h1>Let&apos;s create something meaningful and amazing together.</h1>
      <a
        href="#contact"
        className="connect-btn"
      >
        <span className="dot"></span>
        <span className="btn-text">Let&apos;s Connect</span>
      </a>

      <div className="connect-visual">
        <img src="images/letsconnect.png" alt="Let's Connect Illustration" loading="lazy" decoding="async" />
        <div className="social-floating">
          <a href="https://github.com/masumprajapati5" target="_blank" rel="noopener noreferrer" className="icon github">
            <i className="ri-github-fill"></i>
          </a>
          <a href="https://www.linkedin.com/in/masum-prajapati-4469072b0/?originalSubdomain=in" target="_blank" rel="noopener noreferrer" className="icon linkedin">
            <i className="ri-linkedin-box-fill"></i>
          </a>
          <a href="https://x.com/masumprajapati5" target="_blank" rel="noopener noreferrer" className="icon twitter">
            <i className="ri-twitter-x-fill"></i>
          </a>
        </div>
      </div>
    </section>
  )
}

export default LetsWork