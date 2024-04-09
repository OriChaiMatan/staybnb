import { Route, Routes } from 'react-router-dom';
import { AppHeader } from './cmps/AppHeader';
import { AppFooter } from './cmps/AppFooter';
import { StayDetails } from './pages/StayDetails';
import { StayIndex } from './pages/StayIndex';

export function RootCmp() {

    return (
        <div className="main-container">
            <AppHeader />
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


