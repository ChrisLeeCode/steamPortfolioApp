import React from "react";

export default class PriceBox extends React.Component {
  round(num) {
    const rounded = Math.round((num + Number.EPSILON) * 100) / 100;
    return rounded;
  }

  getIncrease(min, max) {
    const inc = max - min;
    return inc;
  }

  getPercIncrease(min, max) {
    const percInc = this.round((this.getIncrease(min, max) / min) * 100);
    return percInc;
  }

  getDaysDiff(startDate, endDate){
    const diffInMs = Math.abs(new Date(startDate) - new Date(endDate));
    return Math.round(diffInMs / (1000 * 60 * 60 * 24) + 1);
  }

  trimDate(hoverDate){
    if(hoverDate == ''){
      return ''
    }
    var hoverDateList = hoverDate.split('-')
    if(hoverDateList[2] == new Date().getFullYear()){
      hoverDateList.length = 2
    }
    const hoverDateTrimmed = hoverDateList.join(' ')
    return (hoverDateTrimmed)
  }
  render() {
    const { max, min, hoverPoint, days, idle, endPoint, startPoint } = this.props;

    const startDate = startPoint.x == undefined ? '' : startPoint.x._i
    const endDate = endPoint.x == undefined ? '' : endPoint.x._i

    const dayDiff = this.getDaysDiff(startDate, endDate)
    var curPoint = hoverPoint
    if(idle){
      curPoint = endPoint
    }
    var hoverPrice = curPoint.y;
    var hoverDate = curPoint.x == undefined ? '' : curPoint.x._i;

    hoverDate = this.trimDate(hoverDate);

    // if (hoverPrice == undefined) {
    //   hoverPrice = max;
    // }

  
    const percInc = this.getPercIncrease(min, hoverPrice);
    return (
      <div key={this.props.value}>
        <h2
          style={{}}
        >£{this.round(hoverPrice).toFixed(2)}</h2>
        <h3 style={hoverPrice > min ? { color: "green" } : { color: "red" }}>
          {percInc}% (£{this.round(hoverPrice - min)}) {idle ? 'in the last '+ dayDiff + ' days.' : hoverDate} 
        </h3>
      </div>
    );
  }
}
