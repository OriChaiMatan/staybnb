import React from 'react'
import { Route, HashRouter as Router, Routes } from 'react-router-dom';


import { AppHeader } from './cmps/AppHeader'
import { AppFooter } from './cmps/AppFooter'
import { StayDetails } from './pages/StayDetails'
import { StayIndex } from './pages/StayIndex'

export function RootCmp() {
    return (
            <div className='main-container'>
                <div className="fixed-container">
                    <AppHeader />
                </div>

                <main className="content">
                    <Routes>
                        <Route path="/" element={<StayIndex />} />
                        <Route path="/stay/:id" element={<StayDetails />} />
                    </Routes>
                </main>
                <AppFooter />
            </div>
    );
}


