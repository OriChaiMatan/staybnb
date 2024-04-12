import { Route, Routes, useLocation } from 'react-router-dom'
import { AppHeader } from './cmps/AppHeader'
import { AppFooter } from './cmps/AppFooter'
import { StayDetails } from './pages/StayDetails'
import { StayIndex } from './pages/StayIndex'
import { StayEdit } from './pages/StayEdit'
import { useState } from 'react'

export function RootCmp() {
    const [largeMainFilter, setLargeMainFilter] = useState(false)

    const location = useLocation()
    const pathname = location.pathname.split("/")[1]

    return (
        <div className={` ${largeMainFilter ? 'large-header' : ''} ${pathname === 'stay' ? 'details-layout-container' : 'main-container'}`}>
            <AppHeader largeMainFilter={largeMainFilter} setLargeMainFilter={setLargeMainFilter} />
            <main className='main-content'>
                <Routes>
                    <Route path="/" element={<StayIndex />} />
                    <Route path="/:filter" element={<StayIndex />} />
<<<<<<< HEAD
                    <Route path="/stay/:stayId" element={<StayDetails setLargeMainFilter={setLargeMainFilter} />} />
=======
                    <Route path="/stay/:stayId" element={<StayDetails largeMainFilter={largeMainFilter} setLargeMainFilter={setLargeMainFilter} />} />
                    <Route path="/stay-edit/newStay" element={<StayEdit />}/>
>>>>>>> 7da47d8d5d6aa800cad614b2ad02459f48bb02b7
                </Routes>
            </main>
            <AppFooter />
        </div >
    );
}


