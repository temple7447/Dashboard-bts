import React from 'react';
import { VictoryChart, VictoryBar, VictoryAxis, VictoryTheme } from 'victory';

const BarChart = () => {
  const data = [
    { label: 'Label 1', value: 12 },
    { label: 'Label 2', value: 19 },
    { label: 'Label 3', value: 3 },
    { label: 'Label 4', value: 5 },
    { label: 'Label 5', value: 2 },
  ];

  return (
    <div style={{ width: '50%', alignSelf: 'flex-start' }}>
      <VictoryChart theme={VictoryTheme.material} domainPadding={20}>
        <VictoryAxis
          tickValues={data.map(d => d.label)}
          style={{
            tickLabels: { fontSize: 10, padding: 5 },
          }}
        />
        <VictoryAxis dependentAxis tickFormat={x => `${x}`} />
        <VictoryBar
          data={data}
          x="label"
          y="value"
          style={{
            data: { fill: '#4caf50' },
          }}
        />
      </VictoryChart>
    </div>
  );
};

export default BarChart;
