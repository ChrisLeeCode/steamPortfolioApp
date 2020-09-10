import React from "react";

export default class MousePosLine extends React.Component {
    render() {
      const { x, y, scale, inc, idle, idlePos } = this.props;
      const range = scale.y.range();
      if(idle){
        console.log("Idle")
      return (
        <g>
          <circle
            cx={idlePos.x}
            cy={idlePos.y}
            r="5"
            stroke={"white"}
            strokeWidth={1.5}
            fill={inc ? "green" : "red"}
          />
          <line
            style={{
              stroke: inc ? "green" : "red",
              strokeWidth: 0.25,
            }}
            x1={x}
            x2={x}
            y1={Math.max(...range)}
            y2={Math.min(...range)} //
          />
        </g>
      );
          }else{
            return (
              <g>
                <circle
                  cx={x}
                  cy={y}
                  r="5"
                  stroke={"white"}
                  strokeWidth={1.5}
                  fill={inc ? "green" : "red"}
                />
                <line
                  style={{
                    stroke: inc ? "green" : "red",
                    strokeWidth: 0.25,
                  }}
                  x1={x}
                  x2={x}
                  y1={Math.max(...range)}
                  y2={Math.min(...range)} //
                />
              </g>
            );

          }
    }
  }
  