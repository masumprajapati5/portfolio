import React, { useState } from 'react'

const Contact = () => {
  const [result, setResult] = useState('')
  const [status, setStatus] = useState('idle') // idle | sending | success | error

  const onSubmit = async (event) => {
    event.preventDefault()
    setStatus('sending')
    setResult('')

    const formData = new FormData(event.target)
    formData.append('access_key', import.meta.env.VITE_WEB3FORMS_KEY)

    const response = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      body: formData,
    })

    const data = await response.json()
    if (data.success) {
      setStatus('success')
      setResult('Message sent successfully! I\'ll reply soon.')
      event.target.reset()
    } else {
      setStatus('error')
      setResult('Something went wrong. Please try again.')
    }
  }

  return (
    <section className="container contact-section" id="contact">

      <h2>Get In Touch</h2>
      <h1>Contact Me</h1>

      <div className="contact-wrapper">

        {/* Left Info */}
        <div className="contact-info">
          <p className="contact-intro">
            Have a project in mind or just want to say hello? Feel free to reach out — I&apos;ll get back to you as soon as possible.
          </p>

          <div className="contact-detail">
            <div className="contact-icon"><i className="ri-mail-line"></i></div>
            <div>
              <span>Email</span>
              <a href="mailto:kp23410056@gmail.com">kp23410056@gmail.com</a>
            </div>
          </div>

          <div className="contact-detail">
            <div className="contact-icon"><i className="ri-map-pin-line"></i></div>
            <div>
              <span>Location</span>
              <a href="#">Gujarat, India</a>
            </div>
          </div>

          <div className="contact-detail">
            <div className="contact-icon"><i className="ri-linkedin-box-line"></i></div>
            <div>
              <span>LinkedIn</span>
              <a href="https://www.linkedin.com/in/masum-prajapati-4469072b0/" target="_blank" rel="noopener noreferrer">Masum Prajapati</a>
            </div>
          </div>

          <div className="contact-socials">
            <a href="https://github.com/masumprajapati5" target="_blank" rel="noopener noreferrer" className="cs-icon"><i className="ri-github-fill"></i></a>
            <a href="https://www.linkedin.com/in/masum-prajapati-4469072b0/" target="_blank" rel="noopener noreferrer" className="cs-icon"><i className="ri-linkedin-box-fill"></i></a>
            <a href="https://x.com/masumprajapati5" target="_blank" rel="noopener noreferrer" className="cs-icon"><i className="ri-twitter-x-fill"></i></a>
          </div>
        </div>

        {/* Right Form Card */}
        <div className="contact-form-card">
          <form onSubmit={onSubmit} className="contact-form">

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="name">Your Name</label>
                <input type="text" id="name" name="name" placeholder="Masum Prajapati" required />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email Address</label>
                <input type="email" id="email" name="email" placeholder="hello@example.com" required />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="subject">Subject</label>
              <input type="text" id="subject" name="subject" placeholder="Let's work together!" />
            </div>

            <div className="form-group">
              <label htmlFor="message">Message</label>
              <textarea id="message" name="message" rows="5" placeholder="Tell me about your project..." required></textarea>
            </div>

            <button type="submit" className="form-submit-btn" disabled={status === 'sending'}>
              {status === 'sending' ? (
                <><i className="ri-loader-4-line spin"></i> Sending…</>
              ) : (
                <> Send Message</>
              )}
            </button>

            {result && (
              <div className={`form-feedback ${status}`}>
                <i className={status === 'success' ? 'ri-checkbox-circle-fill' : 'ri-error-warning-fill'}></i>
                {result}
              </div>
            )}

          </form>
        </div>

      </div>
    </section>
  )
}

export default Contact
