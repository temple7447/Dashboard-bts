"use client";

import { Button, Checkbox, Label, TextInput } from "flowbite-react";
import React from "react";

const Textinput = ({final,title,initial,}) => {
  return (
    <div>
      <div className="mb-1 block ">
        <Label htmlFor="base" value={title}/>
      </div>
      <TextInput id="base" type="number" onChange={(e)=> final(e.target.value)} sizing="md" value={initial} />
    </div>
  );
};

export default Textinput;
