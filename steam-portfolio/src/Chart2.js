import React from "react";
import {
  VictoryScatter,
  VictoryChart,
  VictoryZoomContainer,
  VictoryLine,
  VictoryBrushContainer,
} from "victory";
import _ from "lodash";
import ReactDOM from "react-dom";

// 10000 points (10 / 0.001 = 10000) - see what happens when you render 50k or 100k
const allData = _.range(0, 10, 0.001).map((x) => ({
  x: x,
  y: (Math.sin((Math.PI * x) / 2) * x) / 10,
}));

export default class CustomChart extends React.Component {
  constructor(props) {
    super();
    this.entireDomain = this.getEntireDomain(props);
    this.limitedDomain = this.getLimitedDomain(props);
    this.state = {
      zoomedXDomain: this.entireDomain.x,
    };
  }
  onDomainChange(domain) {
    console.log("Domain", domain.x);
    this.setState({
      zoomedXDomain: [new Date("May-14-2018"), new Date("May-20-2018")],
    });
  }
  getData() {
    const { zoomedXDomain } = this.state;
    const { data, maxPoints } = this.props;
    const filtered = data.filter(
      (d) => d.x >= zoomedXDomain[0] && d.x <= zoomedXDomain[1]
    );

    if (filtered.length > maxPoints) {
      const k = Math.ceil(filtered.length / maxPoints);
      return filtered.filter((d, i) => i % k === 0);
    }
    return filtered;
  }
  getEntireDomain(props) {
    const { data } = props;
    return {
      y: [_.minBy(data, (d) => d.y).y, _.maxBy(data, (d) => d.y).y],
      x: [data[0].x, _.last(data).x],
    };
  }

  getLimitedDomain(props) {
    const { data } = props;
    return {
      y: [_.minBy(data, (d) => d.y).y, _.maxBy(data, (d) => d.y).y],
      x: [new Date("May-14-2018"), new Date("Jun-24-2019")],
    };
  }

  getZoomFactor() {
    const { zoomedXDomain } = this.state;
    console.log("state", this.state);
    const factor = 10 / (zoomedXDomain[1] - zoomedXDomain[0]);
    return _.round(factor, factor < 3 ? 1 : 0);
  }

  buttonPress(){
    this.setState({
        zoomedXDomain: [new Date("May-14-2018"), new Date("May-14-2018")],
        entireDomain: {...this.entireDomain, x: [new Date("May-14-2018"), new Date("Jun-24-2019")]}
      });
  }
  
  render() {
    const renderedData = this.getData();
    return (
      <div>
        <div class="chartHolder">
          <div>
            <VictoryChart
              domain={this.entireDomain}
              containerComponent={
                <VictoryZoomContainer
                  zoomDimension="x"
                  onZoomDomainChange={this.onDomainChange.bind(this)}
                  allowZoom={true}
                  minimumZoom={{ x: 1 / 10000 }}
                />
              }
            >
              <VictoryLine data={renderedData} />
            </VictoryChart>
            <div>
              {this.getZoomFactor()}x zoom; rendering {renderedData.length} of{" "}
              {this.props.data.length}
            </div>
          </div>
        </div>
        <button onClick={() => this.buttonPress()}>One Year</button>
      </div>
    );
  }
}

//ReactDOM.render(<CustomChart data={allData} maxPoints={120} />, mountNode);
