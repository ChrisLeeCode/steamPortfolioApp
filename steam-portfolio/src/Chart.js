import React from "react";
import ReactDOM from "react-dom";
import OpenLine from "./Components/Chart/OpenLine";
import MousePosLine from "./Components/Chart/MousePosLine";
import PriceBox from "./Components/Chart/PriceBox";
import {
  VictoryVoronoiContainer,
  VictoryChart,
  VictoryAxis,
  VictoryLine,
  Selection,
} from "victory";
import jsonData from "./Backend/Python/avg_data.json";
import moment from "moment";
moment().format();

export default class Chart extends React.Component {
  constructor() {
    super();
    this.state = {
      data: [[]],
      inc: true,
      curPoint: 0,
      mouseActive: false,
      title: "Ak47 | Redline (minimal ware)",
    };
    this.trimResults = this.trimResults.bind(this);
    this.onActivated = this.updatePoint.bind(this);
  }

  componentDidMount() {
    this.setState({ data: this.readJson() });
  }

  handleZoom(domain) {
    this.setState({ selectedDomain: domain });
  }

  handleBrush(domain) {
    this.setState({ zoomDomain: domain });
  }

  handleCursorChange(value) {
    if (value != undefined) {
      this.setState({ xVal: value["x"], yVal: value["y"] });
    }
  }

  updatePoint(points) {
    this.setState({ curPoint: points[0] });
  }

  readJson() {
    const newData = jsonData.map((oldData, i) => {
      const tDate = moment(oldData[0]);
      return { x: tDate, y: oldData[1] };
    });
    return newData;
  }

  trimResults(days) {
    const maxPoints = 120;
    var newData = this.readJson().slice(
      this.readJson().length - days,
      this.readJson().length
    );

    if (newData.length > maxPoints) {
      const k = Math.ceil(newData.length / maxPoints);
      newData = newData.filter((d, i) => i % k === 0);
    }

    this.setState({
      data: newData,
    });
  }

  render() {
    var max = this.state.data[this.state.data.length - 1].y;
    var min = this.state.data[0].y;
    return (
      <div>
        <h1>{this.state.title}</h1>
        <PriceBox
          max={Math.round((max + Number.EPSILON) * 100) / 100}
          min={Math.round((min + Number.EPSILON) * 100) / 100}
          hoverPoint={this.state.curPoint}
          days={this.state.data.length}
          idle={!this.state.mouseActive}
          endPoint={this.state.data[this.state.data.length - 1]}
          startPoint={this.state.data[0]}
        />
        <div
          class="chartHolder"
          onMouseLeave={() => this.setState({ mouseActive: false })}
          onMouseEnter={() => this.setState({ mouseActive: true })}
        >
          <VictoryChart
            scale={{ x: "time" }} //
            containerComponent={
              <VictoryVoronoiContainer
                voronoiDimension="x"
                labels={({ datum }) => `${datum.x}, ${datum.y}`}
                labelComponent={
                  <MousePosLine
                    inc={max > min}
                    idle={!this.state.mouseActive}
                    idlePos={this.state.data[0]}
                  />
                }
                onActivated={this.onActivated}
              />
            }
          >
            <VictoryLine
              style={{
                data: { stroke: max > min ? "green" : "red" },
              }}
              data={this.state.data}
              scale={{ x: "date" }}
              size={({ active }) => (active ? 5 : 3)}
              interpolation="natural"
            />

            <OpenLine min={min} data={this.state.data} />
          </VictoryChart>
        </div>
        <button onClick={() => this.trimResults(2)}>One Day</button>

        <button onClick={() => this.trimResults(7)}>One Week</button>

        <button onClick={() => this.trimResults(30)}>One Month</button>

        <button onClick={() => this.trimResults(365)}>One Year</button>

        <button onClick={() => this.trimResults(this.readJson().length)}>
          Max
        </button>

        <h2>{(this.state.xVal, this.state.yVal)}</h2>
      </div>
    );
  }
}
