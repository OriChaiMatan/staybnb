import { Route, Routes } from 'react-router-dom';
import { AppHeader } from './cmps/AppHeader';
import { AppFooter } from './cmps/AppFooter';
import { StayDetails } from './pages/StayDetails';
import { StayIndex } from './pages/StayIndex';
import { useState } from 'react';

export function RootCmp() {
    const [largeMainFilter, setLargeMainFilter] = useState(false)

    return (
        <div className={`main-container ${largeMainFilter ? 'large-header' : ''}`}>
            <AppHeader largeMainFilter={largeMainFilter} setLargeMainFilter={setLargeMainFilter} />
            <main className='main-content'>
                <Routes>
                    <Route path="/" element={<StayIndex />} />
                    <Route path="/:filter" element={<StayIndex />} />
                    <Route path="/stay/:stayId" element={<StayDetails />} />
                </Routes>
            </main>
            <AppFooter />
        </div >
    );
}


