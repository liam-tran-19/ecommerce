import React from "react";
import { SlideData } from "../components/SlideData";
import { FaArrowAltCircleRight, FaArrowAltCircleLeft } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const SiteBackground = (props) => {
  const { userInfo } = props;
  const [current, setCurrent] = React.useState(0);
  const length = SlideData.length;

  const nextSlide = () => {
    setCurrent(current === length - 1 ? 0 : current + 1);
  };

  const prevSlide = () => {
    setCurrent(current === 0 ? length - 1 : current - 1);
  };

  if (!Array.isArray(SlideData) || SlideData.length <= 0) {
    return null;
  }

  return (
    <div className="site-title">
      <FaArrowAltCircleLeft className="left-arrow" onClick={prevSlide} />
      <FaArrowAltCircleRight className="right-arrow" onClick={nextSlide} />
      {SlideData.map((slide, index) => {
        return (
          <div
            className={index === current ? "slide active" : "slide"}
            key={index}
          >
            {index === current && (
              <img src={slide.image} alt="shopping image" className="image" />
            )}
          </div>
        );
      })}
      <div className="site-title__intro">
        <h1>SALE UP TODAY</h1>
        <h4>Hightlight your sales. Just input your regular sales</h4>
        {userInfo ? (
          <h3>Welcome {userInfo.name}</h3>
        ) : (
          <Link to="/signin">
            <button className="button primary"> Sign In</button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default SiteBackground;
