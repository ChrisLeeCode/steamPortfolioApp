import React from "react";

export default class OpenLine extends React.Component {
    getPoints(data, scale) {
      return data.reduce(
        (pointStr, { x, y }) => `${pointStr} ${scale.x(x)},${scale.y(y)}`,
        []
      );
    }
  
    render() {
      const { x, y, scale, data, min } = this.props;
      const xRange = scale.x.range();
      const minPoints = this.getPoints(data, scale).split(" ");
      const minY = minPoints[1].split(",")[1];
  
      return (
        <line
          style={{
            stroke: "grey",
            strokeWidth: 0.5,
          }}
          x1={Math.min(...xRange)}
          y1={minY}
          x2={Math.max(...xRange)}
          y2={minY} //
        />
      );
    }
  }
  