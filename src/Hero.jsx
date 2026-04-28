import React from 'react'

const Hero = () => {
  return (
    <section className="container hero-container" id="home">
      <div className="left">
        <h1>Hey There<br />I&apos;m Masum <span>Prajapati</span></h1>
        <p>I design and develop high-quality website user experiences and elegant websites for forward-thinking brands.</p>
        <button className="sayhi">
          <a href="#contact">Say Hello</a>
        </button>
      </div>
      <div className="right">
        <img src="./images/hero-section-portfolio.png" alt="Hero" fetchpriority="high" decoding="async" />
      </div>
    </section>
  )
}

export default Hero