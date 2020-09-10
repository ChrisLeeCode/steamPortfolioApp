import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Chart from './Chart';
import Chart2 from './Chart2';
import _ from 'lodash';
import * as serviceWorker from './serviceWorker';
import jsonData from './Backend/Python/avg_data.json'

const allData = _.range(0, 10, 0.001).map(x => ({
	x: x,
  y: Math.sin(Math.PI*x/2) * x / 10
}));

function readJson() {
  console.log(jsonData);
  const newData = jsonData.map((oldData, i) => {
    const tDate = new Date(oldData[0]);
    return { x: tDate, y: oldData[1] };
  });
  return newData;
}

ReactDOM.render(
  
  <React.StrictMode>
    {/* <Chart2 data={readJson()} maxPoints={120} /> */}
    <Chart/>
    {/* <App /> */}
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
