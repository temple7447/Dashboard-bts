import React from 'react';
import { useInformation } from '../hooks/useInformation';

const Distance = ({ distance, setalertmesuc, setalertme }) => {
  const { useDistace, setdistance } = useInformation();
  const HandleUsed = () => {
    if (distance.length > 0) {
      const dKm = parseFloat(distance);
      // useDistace, setDistance
      setdistance(dKm);
      setalertmesuc(true);
    } else {
      setalertme(true);
    }
  };

  return (
    <div
      onClick={HandleUsed}
      style={{ backgroundColor: 'blue', padding: 10, borderRadius: 5 }}
    >
      Use distance
    </div>
  );
};

export default Distance;
