import React from "react";

const About = () => {
  return (
    <div className="about">
      <div className="top">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
          <path
            fill="#000000"
            fill-opacity="0.5"
            d="M0,128L40,106.7C80,85,160,43,240,37.3C320,32,400,64,480,80C560,96,640,96,720,106.7C800,117,880,139,960,128C1040,117,1120,75,1200,48C1280,21,1360,11,1400,5.3L1440,0L1440,0L1400,0C1360,0,1280,0,1200,0C1120,0,1040,0,960,0C880,0,800,0,720,0C640,0,560,0,480,0C400,0,320,0,240,0C160,0,80,0,40,0L0,0Z"
          ></path>
        </svg>
      </div>
      <div className="text">Hello</div>
      <div className="bottom">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
          <path
            fill="#000"
            fill-opacity="0.7"
            d="M0,160L80,149.3C160,139,320,117,480,144C640,171,800,245,960,234.7C1120,224,1280,128,1360,80L1440,32L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"
          ></path>
        </svg>
      </div>
    </div>
  );
};

export default About;
