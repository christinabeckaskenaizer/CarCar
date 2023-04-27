import React, { useEffect, useState } from "react";

function ManufacturerList(props) {
    return (
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Manufacturers</th>
          </tr>
        </thead>
        <tbody>
          {props.manufacturer.map(manufacturer => {
            return (
              <tr key={manufacturer.id}>
                <td>{ manufacturer.name }</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  }

  export default ManufacturerList;