import React from 'react';
import { VictoryScatter, VictoryChart, VictoryAxis } from 'victory';

import Loader from "react-js-loader";

const MapChart = ({shatterbar, northeastp, southwestp}) => {
  const coordinates = shatterbar.map(item => item.coordinate);
  
 
  return (
    <div style={{ width: '60%',}}>
    {coordinates.length > 0 ?  (<VictoryChart
        domain={{ x: [southwestp.lng,northeastp.lng], y: [ southwestp.lat, northeastp.lat] }} // Set appropriate domain based on your data
      >
        <VictoryAxis dependentAxis />
        <VictoryAxis />
        <VictoryScatter
          data={coordinates}
          x="lng"
          y="lat"
          size={3} // Adjust the size of the points as needed
          style={{
            data: { fill: '#DB8234' }, // Set the color of the points
          }}
        />
      </VictoryChart>)
      :  <Loader type="hourglass" bgColor={"#FFFFFF"} title={"loading"} color={'#FFFFFF'} size={100} />
      }
      
      
    </div>
  );
};

export default MapChart;
