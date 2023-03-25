import React from 'react'
import { useState } from 'react';

export const ProgressBar = ({status, percent}) => {
    const [progress, setProgress] = useState(50);

  return (
    <progress className='rounded-2xl' value={progress} max={100} > {progress}% </progress>
  )
}
