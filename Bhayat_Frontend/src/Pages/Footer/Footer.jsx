import React from 'react'
import { motion } from "motion/react"


const Footer = () => {
  return (
    <>
    <section className="footer">
    <div className="footer-row">
      <div className="footer-col">
        <h4>About Us</h4>
        <ul className="links">
          <li>
            <motion.a
            initial={{y:-20 , opacity:0}}
      whileInView={{y:0 , opacity:1}}
      transition={{duration:0.6,delay:0.3}}
            href="/Frontend/About/about.html">About Bhayat</motion.a>
          </li>
          <li>
            <motion.a
            initial={{y:-20 , opacity:0}}
            whileInView={{y:0 , opacity:1}}
            transition={{duration:0.6,delay:0.5}}
            href="#">Blog</motion.a>
          </li>
          <li>
            <motion.a
            initial={{y:-20 , opacity:0}}
            whileInView={{y:0 , opacity:1}}
            transition={{duration:0.6,delay:0.5}}
            href="#">Careers</motion.a>
          </li>
          <li>
            <motion.a
            initial={{y:-20 , opacity:0}}
            whileInView={{y:0 , opacity:1}}
            transition={{duration:0.6,delay:0.5}}
            href="#">Contact Us</motion.a>
          </li>
        </ul>
      </div>
      <div className="footer-col">
        <motion.h4
        initial={{y:-20 , opacity:0}}
      whileInView={{y:0 , opacity:1}}
      transition={{duration:0.6,delay:0.3}}
        >Start a Fundraiser for</motion.h4>
        <ul className="links">
          <li>
            <motion.a href="#"
            initial={{y:-20 , opacity:0}}
            whileInView={{y:0 , opacity:1}}
            transition={{duration:0.6,delay:0.5}}
            >NGO</motion.a>
          </li>
        </ul>
      </div>
      <div className="footer-col">
        <motion.h4
        initial={{y:-20 , opacity:0}}
      whileInView={{y:0 , opacity:1}}
      transition={{duration:0.6,delay:0.3}}
        >Donate to</motion.h4>
        <ul className="links">
          <li>
            <motion.a href="#"
            initial={{y:-20 , opacity:0}}
      whileInView={{y:0 , opacity:1}}
      transition={{duration:0.6,delay:0.5}}
            >Social Causes</motion.a>
          </li>
          <li>
            <motion.a href="#"
            initial={{y:-20 , opacity:0}}
      whileInView={{y:0 , opacity:1}}
      transition={{duration:0.6,delay:0.5}}
            >NGO's</motion.a>
          </li>
        </ul>
      </div>
      <div className="footer-col">
        <motion.h4
        initial={{y:-20 , opacity:0}}
      whileInView={{y:0 , opacity:1}}
      transition={{duration:0.6,delay:0.3}}
        >Newsletter</motion.h4>
        <motion.p
        initial={{y:-20 , opacity:0}}
        whileInView={{y:0 , opacity:1}}
        transition={{duration:0.6,delay:0.5}}
        >
          BHAYAT is a non-profit organization registered under the societies
          registration act 1860. It was established in 2010 under the nationwide
          act (Reg. No. 68106/2010) by the people who aspired for a healthy and
          self reliant India.
        </motion.p>
        <div className="icons">
          <motion.i 
          initial={{y:-20 , opacity:0}}
        whileInView={{y:0 , opacity:1}}
        transition={{duration:0.6,delay:0.7}}
          className="fa-brands fa-facebook-f" />
          <motion.i 
          initial={{y:-20 , opacity:0}}
        whileInView={{y:0 , opacity:1}}
        transition={{duration:0.6,delay:0.7}}
          className="fa-brands fa-twitter" />
          <motion.i 
          initial={{y:-20 , opacity:0}}
        whileInView={{y:0 , opacity:1}}
        transition={{duration:0.6,delay:0.7}}
          className="fa-brands fa-linkedin" />
          <motion.i 
          initial={{y:-20 , opacity:0}}
        whileInView={{y:0 , opacity:1}}
        transition={{duration:0.6,delay:0.7}}
          className="fa-brands fa-github" />
        </div>
      </div>
    </div>
  </section>
  <br />
  <p className="Copyright">Copyright © 2024 Bhayat Ngo Donation.</p>
    </>
  )
}

export default Footer