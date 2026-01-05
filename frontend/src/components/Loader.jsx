import React from "react";
import styled from "styled-components";

const Loader = ({title,description, children}) => {
  return (
    <Wrapper>
      <div className="bg">
        <svg viewBox="0 0 900 900" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">

          <defs>
            <linearGradient id="traceGradient1" x1={250} y1={120} x2={100} y2={200}>
              <stop offset="0%" stopColor="#00ccff" />
              <stop offset="100%" stopColor="#00ccff" stopOpacity="0.5" />
            </linearGradient>
            <linearGradient id="traceGradient2" x1={650} y1={120} x2={800} y2={300}>
              <stop offset="0%" stopColor="#00ccff" />
              <stop offset="100%" stopColor="#00ccff" stopOpacity="0.5" />
            </linearGradient>
            <linearGradient id="traceGradient3" x1={250} y1={380} x2={400} y2={400}>
              <stop offset="0%" stopColor="#00ccff" />
              <stop offset="100%" stopColor="#00ccff" stopOpacity="0.5" />
            </linearGradient>
            <linearGradient id="traceGradient4" x1={650} y1={120} x2={500} y2={100}>
              <stop offset="0%" stopColor="#00ccff" />
              <stop offset="100%" stopColor="#00ccff" stopOpacity="0.5" />
            </linearGradient>
          </defs>

          <g>
            {[...Array(17)].map((_, i) => (
              <line key={i} x1={i * 100} y1={0} x2={i * 100} y2="100%" stroke="#222" strokeWidth=".5" />
            ))}
            {[...Array(9)].map((_, i) => (
              <line key={i} x1={0} y1={i * 100} x2="100%" y2={i * 100} stroke="#222" strokeWidth=".5" />
            ))}
          </g>


          <g transform="translate(0,200)">
            <path d="M100 300 H250 V120" className="trace t1" style={{animationDelay: `${Math.random()*3}s`}} />
            <path d="M800 200 H650 V380" className="trace t2" style={{animationDelay: `${Math.random()*3}s`}} />
            <path d="M400 520 V380 H250" className="trace t3" style={{animationDelay: `${Math.random()*3}s`}} />
            <path d="M500 50 V120 H650" className="trace t4" style={{animationDelay: `${Math.random()*3}s`}} />
          </g>

        </svg>
      </div>

      <div className="content flex flex-col">
        
        {children}
         <h3 className="card-title text-center">{title}</h3>
         <p className="text-base-content/70 text-center">
                {description}
              </p>
      </div>

    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: relative;
  width: 100%;

  .bg {
    position: absolute;
    inset: 0;
    z-index: 1;
    overflow : hidden;
  }

  .content {
    position: relative;
    z-index: 2;
    height: 100%;
    display: flex;
    padding: 10%;
    flex-direction: column;
    gap: 12px;
    align-items: center;
    justify-content: center;
  }

  .trace {
    stroke-width: 1;
    fill: none;
    stroke-dasharray: 120 600;
    stroke-dashoffset: 720;
    animation: flow 3.5s linear infinite;
    filter: drop-shadow(0 0 6px #00ccff);
  }

  .t1 { stroke: url(#traceGradient1); }
  .t2 { stroke: url(#traceGradient2); }
  .t3 { stroke: url(#traceGradient3); }
  .t4 { stroke: url(#traceGradient4); }

  @keyframes flow {
    from { stroke-dashoffset: 720; }
    to { stroke-dashoffset: 0; }
  }
`;

export default Loader;
