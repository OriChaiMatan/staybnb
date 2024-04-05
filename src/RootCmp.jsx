import React from 'react'
import { Route, HashRouter as Router, Routes } from 'react-router-dom';
import { AppHeader } from './cmps/AppHeader'
import { AppFooter } from './cmps/AppFooter'
import { StayDetails } from './pages/StayDetails'
import { StayIndex } from './pages/StayIndex'

export function RootCmp() {
    return (
        <main className='main-content'>
            <AppHeader />
                {/* <Routes>
                        <Route path="/" element={<StayIndex />} />
                        <Route path="/stay/:id" element={<StayDetails />} />
                    </Routes> */}
                <Routes>
                    <Route path="/" element={<StayIndex />} />
                    <Route path="/stay/:stayId" element={<StayDetails />} />

                </Routes>
            <AppFooter />
        </main>
    );
}


