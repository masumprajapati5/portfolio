import React from 'react'

const Footer = () => {
  return (
    <footer className="footer-wrap">

      {/* Big name */}
      <div className="footer-big-name">
        <span>Masum</span>
      </div>

      {/* Copyright bar */}
      <section className="container footer-section">
        <div className="footer-bar">
          <h2>Copyright &copy; 2026 Masum Prajapati</h2>
          <p>created with <i className="ri-heart-fill"></i> by me</p>
        </div>
      </section>

    </footer>
  )
}

export default Footer