import React, { useState } from 'react';
import app from '../firebase';
import { getDatabase, ref, set } from "firebase/database";
import { Alert } from 'flowbite-react';

const Setting = () => {
  const [Iteration, setIteration] = useState('');
  const [coordinate, setCoordinate] = useState('');
  const [alertme, setAlertme] = useState(false);
  const [alertmesuc, setAlertmesuc] = useState(false);

  const writeUserData = (userId) => {
    if (Iteration && coordinate) {
        const Iterationv = parseFloat(Iteration)
        const coordinatev = parseFloat(coordinate)
      const db = getDatabase();
      const userRef = ref(db, 'ElevationChanges/' + userId);

      set(userRef, {
        Iteration: Iterationv,
        coordinate: coordinatev
      });

      setIteration('');
      setCoordinate('');
      setAlertmesuc(true);
      setTimeout(() => {
        setAlertmesuc(false);
      }, 4000);
    } else {
      setAlertme(true);
      setTimeout(() => {
        setAlertme(false);
      }, 4000);
    }
  };

  const handleWarningDismiss = () => setAlertme(false);
  const handleSuccessDismiss = () => setAlertmesuc(false);

  return (
    <div>
      <div style={{ fontSize: '25px', fontWeight: 700 }} className='text-center'>Setting</div>
      <hr />
      <div>
        {alertme && (
          <Alert color="warning" onDismiss={handleWarningDismiss}>
            <span>
              <p>
                <span className="font-medium">Warning alert!</span>
                All fields must be inputted.
              </p>
            </span>
          </Alert>
        )}
        {alertmesuc && (
          <Alert color="success" onDismiss={handleSuccessDismiss}>
            <span>
              <p>
                <span className="font-medium">Success alert!</span>
                All data was successfully sent.
              </p>
            </span>
          </Alert>
        )}
        <div>Elevation Value Changes</div>
        <div className='my-5'>
          <label htmlFor='number'>Number of Elevation</label>
          <input
            value={Iteration}
            placeholder='Default coordinate diff is 0'
            onChange={(e) => setIteration(e.target.value)}
            style={{ height: '30px', borderRadius: 5, width: '50vw' }}
            type="number"
            step="any"
            required
          />
        </div>
        <div>
          <label htmlFor='number'>Coordinate difference</label>
          <input
            value={coordinate}
            style={{ height: '30px', borderRadius: 5, width: '50vw' }}
            type="number"
            step="any"
            placeholder='Default coordinate diff is 0.05'
            onChange={(e) => setCoordinate(e.target.value)}
            required
          />
        </div>
        <button
          style={{ backgroundColor: 'blue', color: 'white', borderRadius: 10, alignSelf: 'center' }}
          className='p-2'
          onClick={() => writeUserData("BTS")}
        >
          Save Changes
        </button>
      </div>
    </div>
  );
};

export default Setting;
