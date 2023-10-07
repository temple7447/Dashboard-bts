import React from 'react';
import { VictoryChart, VictoryScatter, VictoryTheme, VictoryAxis } from 'victory';
import Loader from "react-js-loader";

const MapChart = ({shatterbar, northeastp, southwestp}) => {
  const coordinates = shatterbar.map(item => item.coordinate);
  
 
  return (
    <div style={{ width: '60%',}}>
    <h2 style={{textDecoration:'underline', textAlign:'center', fontSize:'2rem', lineHeight:1}}>Scatter Plot</h2>
    {coordinates.length > 0 ?  (<VictoryChart theme={VictoryTheme.material}
        domain={{ x: [southwestp.lng,northeastp.lng], y: [ southwestp.lat, northeastp.lat] }} // Set appropriate domain based on your data
      >
        <VictoryAxis 
          style={{
            axisLabel: { padding: 30 },
          }} dependentAxis />
        <VictoryAxis  
          style={{
            axisLabel: { padding: 40 },
          }} />
        <VictoryScatter
          data={coordinates}
          x="lng"
          y="lat"
          size={5} // Adjust the size of the points as needed
          style={{
            data: { fill: '#35DE17' }, // Set the color of the points
          }}
        />
      </VictoryChart>)
      :  <Loader type="hourglass" bgColor={"#FFFFFF"} title={"loading"} color={'#FFFFFF'} size={100} />
      }
      
      
    </div>
  );
};

export default MapChart;
