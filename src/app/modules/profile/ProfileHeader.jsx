import React from 'react'
import {KTIcon, toAbsoluteUrl} from '../../../_metronic/helpers'
import {Link, useLocation} from 'react-router-dom'
import {Dropdown1} from '../../../_metronic/partials'
import { Content } from '../../../_metronic/layout/components/Content'
import { useSelector } from 'react-redux'

const ProfileHeader = () => {
  const location = useLocation()
 const currentUser = useSelector((state) => state.user.currentUser)
console.log('currentUser', currentUser)
  return (
    <>
      <Content>
        <div className='card mb-5 mb-xl-10'>
          <div className='card-body pt-9 pb-0'>
            <div className='d-flex flex-wrap flex-sm-nowrap mb-3'>
  {/* ✅ Profile Image */}
  <div className='me-7 mb-4'>
    <div className='symbol symbol-100px symbol-lg-160px symbol-fixed position-relative'>
      <img src={toAbsoluteUrl(currentUser?.profile_picture)} alt='Metronic' />
      <div className='position-absolute translate-middle bottom-0 start-100 mb-6 bg-success rounded-circle border border-4 border-white h-20px w-20px'></div>
    </div>
  </div>

  {/* ✅ Profile Info */}
  <div className='flex-grow-1'>
    <div className='d-flex align-items-center mb-2'>
      <div className='text-gray-800 fs-2 fw-bolder me-3'>{currentUser?.full_name}</div>

      <div className='d-flex align-items-center gap-4 flex-wrap'>
        {currentUser?.designation && (
          <div className='badge badge-light-info d-flex align-items-center px-4 py-2 fw-semibold fs-7'>
            <KTIcon iconName='briefcase' className='fs-4 me-2' />
            {currentUser.designation}
          </div>
        )}

        {currentUser?.address && (
          <div className='badge badge-light-primary d-flex align-items-center px-4 py-2 fw-semibold fs-7'>
            <KTIcon iconName='map' className='fs-4 me-2' />
            {currentUser.address}
          </div>
        )}
         {currentUser?.work_anniversary && (
          <div className='badge badge-light-success d-flex align-items-center px-4 py-2 fw-semibold fs-7'>
            <KTIcon iconName='calendar' className='fs-4 me-2' />
            {currentUser.work_anniversary}
          </div>
        )}
      </div>
    </div>

    {/* ✅ Info Cards Grid */}
    <div className='row g-5'>
      <div className='col-md-6 col-lg-4'>
        <div className='bg-light p-4 rounded d-flex align-items-center'>
          <KTIcon iconName='profile-circle' className='fs-2 text-primary me-3' />
          <div>
            <div className='text-muted fw-semibold'>Department</div>
            <div className='fw-bold fs-6'>{currentUser?.department || '-'}</div>
          </div>
        </div>
      </div>

      <div className='col-md-6 col-lg-4'>
        <div className='bg-light p-4 rounded d-flex align-items-center'>
          <KTIcon iconName='sms' className='fs-2 text-danger me-3' />
          <div>
            <div className='text-muted fw-semibold'>Email</div>
            <div className='fw-bold fs-6'>{currentUser?.email || '-'}</div>
          </div>
        </div>
      </div>

      <div className='col-md-6 col-lg-4'>
        <div className='bg-light p-4 rounded d-flex align-items-center'>
          <KTIcon iconName='call' className='fs-2 text-warning me-3' />
          <div>
            <div className='text-muted fw-semibold'>Phone</div>
            <div className='fw-bold fs-6'>{currentUser?.phone_number || '-'}</div>
          </div>
        </div>
      </div>

      <div className='col-md-6 col-lg-4'>
        <div className='bg-light p-4 rounded d-flex align-items-center'>
          <KTIcon iconName='transgender' className='fs-2 text-primary me-3' />
          <div>
            <div className='text-muted fw-semibold'>Gender</div>
            <div className='fw-bold fs-6'>{currentUser?.gender || '-'}</div>
          </div>
        </div>
      </div>

      <div className='col-md-6 col-lg-4'>
        <div className='bg-light p-4 rounded d-flex align-items-center'>
          <KTIcon iconName='heart' className='fs-2 text-pink me-3' />
          <div>
            <div className='text-muted fw-semibold'>Marital Status</div>
            <div className='fw-bold fs-6'>{currentUser?.marital_status || '-'}</div>
          </div>
        </div>
      </div>

      <div className='col-md-6 col-lg-4'>
        <div className='bg-light p-4 rounded d-flex align-items-center'>
          <KTIcon iconName='calendar' className='fs-2 text-gray-700 me-3' />
          <div>
            <div className='text-muted fw-semibold'>Joining Date</div>
            <div className='fw-bold fs-6'>
              {currentUser?.joining_date
                ? new Date(currentUser.joining_date).toLocaleDateString('en-GB')
                : '-'}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>


            <div className='d-flex overflow-auto h-55px'>
              <ul className='nav nav-stretch nav-line-tabs nav-line-tabs-2x border-transparent fs-5 fw-bolder flex-nowrap'>
                <li className='nav-item'>
                  <Link
                    className={`nav-link text-active-primary me-6 ${location.pathname === '/dashboard/overview' ? 'active' : ''}`}
                    to='/dashboard/overview'
                  >
                    Overview
                  </Link>
                </li>
                <li className='nav-item'>
                  <Link
                    className={`nav-link text-active-primary me-6 ${location.pathname === '/dashboard/projects' ? 'active' : ''}`}
                    to='/dashboard/projects'
                  >
                    Projects
                  </Link>
                </li>
                <li className='nav-item'>
                  <Link
                    className={`nav-link text-active-primary me-6 ${location.pathname === '/dashboard/campaigns' ? 'active' : ''}`}
                    to='/dashboard/campaigns'
                  >
                    Campaigns
                  </Link>
                </li>
                <li className='nav-item'>
                  <Link
                    className={`nav-link text-active-primary me-6 ${location.pathname === '/dashboard/documents' ? 'active' : ''}`}
                    to='/dashboard/documents'
                  >
                    Documents
                  </Link>
                </li>
                <li className='nav-item'>
                  <Link
                    className={`nav-link text-active-primary me-6 ${location.pathname === '/dashboard/connections' ? 'active' : ''}`}
                    to='/dashboard/connections'
                  >
                    Connections
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </Content>
    </>
  )
}

export {ProfileHeader}
