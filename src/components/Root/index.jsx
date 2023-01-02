
import React, { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router'
import Layout from '../../Layouts'

export default function Root() {
    const navigate = useNavigate()
    useEffect(() => {
      const isLogin = true
      if(isLogin){

      }
    }, [])
    
  return (
    <Layout><Outlet /></Layout>
  )
}
