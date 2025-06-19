import React, { useEffect, useState } from 'react'
import dayjs from 'dayjs'
import { toAbsoluteUrl } from '../../../helpers'

const Toolbar = () => {
  const [currentTime, setCurrentTime] = useState(dayjs().format('HH:mm:ss'))
  const [isClockedIn, setIsClockedIn] = useState(false)

  // Update the clock every second
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(dayjs().format('HH:mm:ss'))
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  const handleClockInOut = () => {
    if (!isClockedIn) {
      console.log('Clocked In at:', currentTime)
    } else {
      console.log('Clocked Out at:', currentTime)
    }
    setIsClockedIn(!isClockedIn)
  }

  return (
    <div
      className='card rounded-0 shadow-none border-0 bgi-no-repeat bgi-position-x-end bgi-size-cover'
      style={{
        backgroundColor: '#0d3019',
        backgroundSize: 'auto 100%',
        backgroundImage: `url('${toAbsoluteUrl('media/misc/taieri.svg')}')`,
      }}
    >
      <div className='card-body container-xxl pt-10 pb-8'>
        <div className='d-flex align-items-center justify-content-between flex-wrap'>
          <h1 className='fw-bold me-3 text-white mb-2'>
            Welcome to Xortslogix
          </h1>
          <div className='text-white fs-3 mb-2'>
            ⏰ {currentTime}
             <div className='d-flex align-items-center mt-4'>
          <button
            onClick={handleClockInOut}
            className='btn btn-light fw-bold me-4'
          >
            {isClockedIn ? 'Clock Out' : 'Clock In'}
          </button>

        
        </div>
          </div>
          
        </div>

       
      </div>
    </div>
  )
}

export { Toolbar }
