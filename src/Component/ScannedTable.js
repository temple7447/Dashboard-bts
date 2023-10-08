'use client';
import React from 'react'
import { Table } from 'flowbite-react';

const ScannedTable = ({scannedCoordinates}) => {

    console.log(scannedCoordinates)


  return (

    <Table>
      <Table.Head>
        <Table.HeadCell>
      Nos
        </Table.HeadCell>
        <Table.HeadCell>
     Longitude
        </Table.HeadCell>
        <Table.HeadCell>
Latitude
        </Table.HeadCell>
      
      </Table.Head>
      <Table.Body className="divide-y">
      {
        scannedCoordinates.length > 0 ? (
            scannedCoordinates.map((items, index) => {
                console.log(items)
                return (
                <Table.Row key={index} className="bg-white dark:border-gray-700 dark:bg-gray-800">
          <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
          {index+1}
          </Table.Cell>
          <Table.Cell>
          {items?.lng}
          </Table.Cell>
          <Table.Cell>
          {items?.lat}
          </Table.Cell>
         
      
        </Table.Row>
                )
            })
        ): null
      }
      
      
    
      </Table.Body>
    </Table>





  )
}

export default ScannedTable
