import React, { useState } from 'react'
import * as Yup from 'yup'
import clsx from 'clsx'
import { useFormik } from 'formik'
import { Link, useNavigate } from 'react-router-dom'

import { useDispatch } from 'react-redux'
import { loginUser, fetchProfile } from '../../../../redux/Slice/userslice'

const loginSchema = Yup.object().shape({
  email: Yup.string()
    .email('Wrong email format')
    .min(3, 'Minimum 3 symbols')
    .max(50, 'Maximum 50 symbols')
    .required('Email is required'),
  password: Yup.string()
    .min(3, 'Minimum 3 symbols')
    .max(50, 'Maximum 50 symbols')
    .required('Password is required'),
})

const initialValues = {
  email: '',
  password: '',
}

const Login = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)

  const formik = useFormik({
    initialValues,
    validationSchema: loginSchema,
    onSubmit: async (values, { setStatus, setSubmitting }) => {
  setLoading(true)
  try {
    const result = await dispatch(loginUser(values))

    if (loginUser.fulfilled.match(result)) {
      await dispatch(fetchProfile())
      console.log('Login successful') // ✅ Login successful
      navigate('/dashboard/overview', { replace: true }) // Redirect to dashboard
    } else {
      throw new Error(result.payload || 'Login failed') // ❌ Login failed
    }
  } catch (error) {
    setStatus(error.message)
  } finally {
    setSubmitting(false)
    setLoading(false)
  }
}
,
  })

  return (
    <form
      className='form w-100'
      onSubmit={formik.handleSubmit}
      noValidate
      id='kt_login_signin_form'
    >
      <div className='text-center mb-11'>
        <h1 className='text-gray-900 fw-bolder mb-3'>Sign In</h1>
        <div className='text-gray-500 fw-semibold fs-6'>Welcome to HRMS</div>
      </div>

      <div className='separator separator-content my-14'>
        <span className='w-125px text-gray-500 fw-semibold fs-7'>Or with email</span>
      </div>

      {formik.status && (
        <div className='mb-5 alert alert-danger'>
          <div className='alert-text'>{formik.status}</div>
        </div>
      )}

      <div className='fv-row mb-8'>
        <label className='form-label fs-6 fw-bolder text-gray-900'>Email</label>
        <input
          type='email'
          autoComplete='off'
          {...formik.getFieldProps('email')}
          className={clsx(
            'form-control bg-transparent',
            {
              'is-invalid': formik.touched.email && formik.errors.email,
            },
            {
              'is-valid': formik.touched.email && !formik.errors.email,
            }
          )}
        />
        {formik.touched.email && formik.errors.email && (
          <div className='fv-plugins-message-container'>
            <span role='alert'>{formik.errors.email}</span>
          </div>
        )}
      </div>

      <div className='fv-row mb-3'>
        <label className='form-label fw-bolder text-gray-900 fs-6 mb-0'>Password</label>
        <input
          type='password'
          autoComplete='off'
          {...formik.getFieldProps('password')}
          className={clsx(
            'form-control bg-transparent',
            {
              'is-invalid': formik.touched.password && formik.errors.password,
            },
            {
              'is-valid': formik.touched.password && !formik.errors.password,
            }
          )}
        />
        {formik.touched.password && formik.errors.password && (
          <div className='fv-plugins-message-container'>
            <span role='alert'>{formik.errors.password}</span>
          </div>
        )}
      </div>

      <div className='d-flex flex-stack flex-wrap gap-3 fs-base fw-semibold mb-8'>
        <div />
        <Link to='/auth/forgot-password' className='link-primary'>
          Forgot Password?
        </Link>
      </div>

      <div className='d-grid mb-10'>
        <button
          type='submit'
          id='kt_sign_in_submit'
          className='btn btn-primary'
          disabled={formik.isSubmitting || !formik.isValid}
        >
          {!loading && <span className='indicator-label'>Continue</span>}
          {loading && (
            <span className='indicator-progress' style={{ display: 'block' }}>
              Please wait...
              <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
            </span>
          )}
        </button>
      </div>
    </form>
  )
}

export default Login
