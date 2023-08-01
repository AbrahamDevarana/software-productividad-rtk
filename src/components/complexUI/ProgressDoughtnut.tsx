
import React, { useEffect, useState } from 'react';
import { Progress } from 'antd';
import CountUp from 'react-countup';

interface Props {
    maxValue: number,
    firstColor: string,
    secondColor: string,
}

export const ProgressBar = ({maxValue, firstColor, secondColor}: Props) => {
    const [percent, setPercent] = useState(0);
  
    useEffect(() => {
      const timer = setInterval(() => {
        setPercent(prevPercent => {
          const newPercent = prevPercent + 5;
            if (newPercent >= maxValue) {   
                clearInterval(timer);
                return maxValue;
            }

          return newPercent;
        });
      }, 35);
  
      return () => {
        clearInterval(timer);
      };
    }, [maxValue]);
  
    return (
        <Progress
            className='flex items-center justify-center py-5'
            rootClassName=''
            type='circle'
            strokeColor={{
                '0%': firstColor,
                '100%': secondColor,
            }}
            percent={ percent }
            format={() => <CountUp className='text-devarana-graph' end={maxValue} duration={1} suffix='%' decimals={2} decimal='.' />}
            strokeWidth={12}    
        />
    );
};