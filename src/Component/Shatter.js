import React from 'react';
import { VictoryScatter, VictoryChart, VictoryAxis } from 'victory';

const data = [
  { lat: 7.160653, lng: 6.338584 },
  // ... add more data points
];

const MapChart = ({shatterbar}) => {
  return (
    <div style={{ width: '80%', margin: '0 auto' }}>
      <VictoryChart
        domain={{ x: [6, 7], y: [6, 7] }} // Set appropriate domain based on your data
      >
        <VictoryAxis dependentAxis />
        <VictoryAxis />
        <VictoryScatter
          data={shatterbar}
          x="lng"
          y="lat"
          size={5} // Adjust the size of the points as needed
          style={{
            data: { fill: '#3498db' }, // Set the color of the points
          }}
        />
      </VictoryChart>
    </div>
  );
};

export default MapChart;
