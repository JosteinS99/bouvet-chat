export const Welcome = ({}) => {
  const vh = 500;
  const vw = 500;

  const messageHeight = 125;
  const messageWidth = 250;
  return (
    <svg
      height={"100%"}
      width={"100%"}
      preserveAspectRatio="none"
      viewBox={`0, 0, ${vh},  ${vw}`}
    >
      <g
        className="welcomeContainer"
        // transform={`translate(${vw / 2}, ${vh / 2})`}
      >
        <rect
          className="welcomeMessage"
          height={messageHeight}
          width={messageWidth}
        ></rect>
      </g>
    </svg>
  );
};
