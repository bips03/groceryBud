import React from "react";
import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <h4 className="footer__text animate__animated animate__fadeInLeft">Copyright &copy; 2021</h4>
      <h6 className = 'animate__animated animate__fadeInLeft'>
        <a className="footer__link" href="https://biplabportfolio.netlify.app/">
          About
        </a>
      </h6>
    </footer>
  );
}

export default Footer;
