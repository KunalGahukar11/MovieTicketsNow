import { Flex, Spin } from 'antd';
import React, { lazy, Suspense } from 'react';
import { Routes, Route } from "react-router-dom";
import ProtectedRoute from '../components/protectedRoute/ProtectedRoute';

const Routing = () => {
    const HomePage = lazy(() => import('../pages/Home/index'));
    const LoginPage = lazy(() => import('../pages/Login/index'));
    const RegisterPage = lazy(() => import('../pages/Register/index'));
    const AdminPage = lazy(() => import('../pages/admin/Admin'));
    const PartnerPage = lazy(() => import('../pages/partner/index'));

    return (
        <>
            <Suspense fallback={
                <Flex className='w-screen h-screen' align='center' justify='center'>
                    <Spin size='large'></Spin>
                </Flex>
            }>
                <Routes>
                    <Route path='/' element={<ProtectedRoute><HomePage></HomePage></ProtectedRoute>}></Route>
                    <Route path='/login' element={<LoginPage></LoginPage>}></Route>
                    <Route path='/register' element={<RegisterPage></RegisterPage>}></Route>
                    <Route path='/admin' element={<AdminPage></AdminPage>}></Route>
                    <Route path='/partner' element={<PartnerPage></PartnerPage>}></Route>
                </Routes>
            </Suspense>
        </>
    )
}

export default Routing