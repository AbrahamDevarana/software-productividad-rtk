
import React, { useEffect, useState } from 'react';
import { Progress } from 'antd';
import CountUp from 'react-countup';

interface Props {
    maxValue: number,
    firstColor: string,
    secondColor: string,
    type?: 'circle' | 'line'
}

export const ProgressBar = ({maxValue, firstColor, secondColor, type='circle'}: Props) => {
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
            className={`flex items-center justify-center py-5 ${ type === 'line' ? 'progressStyle' : '' }`}
            rootClassName=''
            type={type}
            strokeColor={{
                '0%': firstColor,
                '100%': secondColor,
            }}
            size={ type === 'circle' ? 150 : 'small' }
            percent={ percent }
            format={() => <CountUp className={` ${type === 'line' ? 'text-devarana-graph text-[10px]' : 'text-devarana-graph'} `} end={maxValue} duration={1} suffix='%' decimals={2} decimal='.' />}
            strokeWidth={12}    
        />
    );
};