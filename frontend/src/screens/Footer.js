import React from "react";
import {
  FaFacebook,
  FaInstagram,
  FaTwitter,
  FaYoutube,
  FaArrowCircleUp,
} from "react-icons/fa";

const Footer = () => {
  const handleScrollUp = () => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  };
  return (
    <div>
      <div className="container">
        <div className="about-us" data-aos="fade-right" data-aos-delay="200">
          <h2>About us</h2>
          <p>
            ROMMACHE is deeply dedicated to the ethical and humane production of
            every one our pieces. We will tolerate nothing less. Every supplier
            signs a binding letter of agreement to heed to the highest
            production standards, and we enforce those standards. We make no
            compromises in ethical production and will correct any issues the
            moment we hear of them.
          </p>
        </div>
        <div className="newsletter" data-aos="fade-right" data-aos-delay="200">
          <h2>Newsletter</h2>
          <p>Stay update with our latest</p>
          <div className="form-element">
            <input type="text" placeholder="Email" />
            <span>
              <i className="fas fa-chevron-right"></i>
            </span>
          </div>
        </div>

        <div className="follow" data-aos="fade-left" data-aos-delay="200">
          <h2>Follow us</h2>
          <p>Let us be Social</p>
          <div className="icon">
            <a href="http://facebook.com/hongsoncht" target="_blank">
              <FaFacebook />
            </a>
            <a href="https://www.instagram.com/soontrann" target="_blank">
              <FaInstagram />
            </a>
            <a href="https://twitter.com/hongson_97" target="_blank">
              <FaTwitter />
            </a>
            <a
              href="https://www.youtube.com/channel/UCPzzN0iJLlM_XoiPuo3gUJg/featured"
              target="_blank"
            >
              <FaYoutube />
            </a>
          </div>
        </div>
      </div>
      <div className="rights flex-row">
        <h4>Copyright ©2020 All rights reserved | made by Son Tran</h4>
      </div>
      <div class="move-up">
        <span>
          <FaArrowCircleUp size={30} onClick={handleScrollUp} />
        </span>
      </div>
    </div>
  );
};

export default Footer;
