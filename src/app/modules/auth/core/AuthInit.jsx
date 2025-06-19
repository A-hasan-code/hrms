import React, { useEffect, useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchProfile } from '../../../../redux/Slice/userslice'
import { getAuth } from '../core/AuthHelpers'

const AuthInit = ({ children }) => {
  const dispatch = useDispatch()
  const currentUser = useSelector((state) => state.user.currentUser)
  console.log('🧠 currentUser from store:', currentUser)
  const [authChecked, setAuthChecked] = useState(false)

  useEffect(() => {
    const token = getAuth()
    console.log('🧠 token from cookie:', token)

    // only fetch if token exists and no current user
    if (token && !currentUser) {
      dispatch(fetchProfile()).finally(() => {
        setAuthChecked(true)
      })
    } else {
      setAuthChecked(true)
    }
  }, [dispatch, currentUser])

  // ⏳ Show loading spinner until auth check completes
  if (!authChecked) return <div>Loading...</div>

  return <>{children}</>
}

export { AuthInit }
