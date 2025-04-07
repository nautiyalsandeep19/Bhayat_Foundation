import React,{useState,useEffect} from 'react'
import { assets } from '../../../myassets.js';

const Trusted_platform = () => {
    const Counter = ({ endValue, duration }) => {
        const [count, setCount] = useState(0);
      
        useEffect(() => {
          const increment = Math.floor(endValue / (duration / 1));
          let interval = setInterval(() => {
            setCount(prevCount => {
              if (prevCount >= endValue) {
                clearInterval(interval);
                return endValue;
              }
              return prevCount + increment;
            });
          }, 1);
      
          return () => clearInterval(interval); // Cleanup on unmount
        }, [endValue, duration]);
      
        return <h1 className='text-2xl'>{count}+</h1>;
      };
  return (
      <div className="trusted_platform"  >
          <div className="trusted_platform_inner1">
            <img src={assets.logo} alt="" 
            />
            <h1
            >India’s most trusted online donation platform</h1>
          </div>
          <div className="trusted_platform_inner2">
            <div>
              <Counter endValue={500} duration={500} />
              <p>Donations</p>
            </div>
            <div>
              <Counter endValue={500} duration={500} />
              <p>Lives Impacted</p>
            </div>
            <div className='mt-3 flex-1'>
              <Counter endValue={600} duration={500} />
              <p>Verified Non Profits</p>
            </div>
            <div className='mt-3 flex-1'>
              <Counter endValue={500} duration={500} />
              <p>Corporate Partners</p>
            </div>
          </div>
        </div> 
  )
}

export default Trusted_platform