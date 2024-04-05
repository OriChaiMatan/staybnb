import { useState, useRef, useEffect } from 'react';
import dayjs from 'dayjs';
import {MapImages} from './MapImages';
import searchIcon from '../../assets/img/search_glass.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { GuestsModal } from './GuestsModal';
import DatePicker from './DatePicker';


export function MainFilter({largeMainFilter, setLargeMainFilter}) {
    const [activeMainFilter, setActiveMainFilter] = useState(-1);
    const [selectedDates, setSelectedDates] = useState([]);
    const [adultsAmount, setAdultsAmount] = useState(0)
    const [childrenAmount, setChildrenAmount] = useState(0)
    const [infantsAmount, setInfantsAmount] = useState(0)
    const [petsAmount, setPetsAmount] = useState(0)
    const mainFilterRef = useRef(null);
    console.log(selectedDates)
    useEffect(() => {
        const handleEscapeKeyPress = (event) => {
            if (event.key === 'Escape') {
                setLargeMainFilter(false);
                setActiveMainFilter(-1)
            }
        };

        const handleClickOutside = (event) => {
            if (mainFilterRef.current && !mainFilterRef.current.contains(event.target)) {
                setLargeMainFilter(false);
                setActiveMainFilter(-1)
                setSelectedDates([])
            }
        };

        const handleScroll = () => {
            if (document.documentElement.scrollTop > 30) {
                setLargeMainFilter(false);
                setActiveMainFilter(-1)

            } else {
                setLargeMainFilter(true);
            }
        };
        document.addEventListener('keydown', handleEscapeKeyPress);
        document.addEventListener('mousedown', handleClickOutside);
        document.addEventListener('scroll', handleScroll);

        handleScroll();

        return () => {
            document.removeEventListener('keydown', handleEscapeKeyPress);
            document.removeEventListener('mousedown', handleClickOutside);
            document.removeEventListener('scroll', handleScroll);
        };
    }, []);

    function toggleMainFilterSize() {
        if (!largeMainFilter) {
            setLargeMainFilter(true);
        }
    }

    function handleDatesChange(dates) {
        setSelectedDates(dates);
    }

    function extractDateDisplay() {
        if (selectedDates.length === 2 && selectedDates.every(date => date?.$d instanceof Date)) {
            const firstDate = dayjs(selectedDates[0].$d);
            const firstMonth = firstDate.format('MMM');
            const firstDay = firstDate.format('D');
            
            const secondDate = dayjs(selectedDates[1].$d);
            const secondMonth = secondDate.format('MMM');
            const secondDay = secondDate.format('D');
            
            return [firstMonth, firstDay, secondMonth, secondDay];
        }
        return [];
    }
    

    function handleAmountChange(type, operation) {
        switch (type) {
            case 'adults':
                setAdultsAmount(prevAmount => operation === 'increment' ? prevAmount + 1 : (prevAmount > 0 ? prevAmount - 1 : 0));
                break;
            case 'children':
                setChildrenAmount(prevAmount => operation === 'increment' ? prevAmount + 1 : (prevAmount > 0 ? prevAmount - 1 : 0));
                break;
            case 'infants':
                setInfantsAmount(prevAmount => operation === 'increment' ? prevAmount + 1 : (prevAmount > 0 ? prevAmount - 1 : 0));
                break;
            case 'pets':
                setPetsAmount(prevAmount => operation === 'increment' ? prevAmount + 1 : (prevAmount > 0 ? prevAmount - 1 : 0));
                break;
            default:
                break;
        }
    }

    return (
        <div ref={mainFilterRef} className={`main-filter-header ${largeMainFilter ? 'large-main-filter' : ''}`} onClick={toggleMainFilterSize} style={{ backgroundColor: activeMainFilter >= 0 ? '#ebebeb' : '#fff' }}>
                {largeMainFilter ? <label className={`main-filter-btn large ${activeMainFilter === 0 ? 'active-filter' : ''}`} onClick={() => { setActiveMainFilter(0) }}><div><span>Where</span> <br></br> <input type="text" placeholder="Search destinations"/></div>
                {activeMainFilter === 0 && <section className='add-dest-modal'>
                    <div>
                        <h2 className='search-by-region'>Search by region</h2>
                        <MapImages/>
                    </div>
                    </section>}
                </label> : <button className="main-filter-btn" onClick={() => { setActiveMainFilter(0) }}>Anywhere</button>}
                <div className="border-line"></div>
                {largeMainFilter ? (
                    <button className={`main-filter-btn large ${activeMainFilter === 1 ? 'active-filter' : ''}`} onClick={() => { setActiveMainFilter(1) }}>
                        Check in <br />
                        {selectedDates[1] ? `${extractDateDisplay()[0]} ${extractDateDisplay()[1]}` : 'Add dates'}
                    </button>
                ) : (
                    <button className="main-filter-btn" onClick={() => { setActiveMainFilter(1) }}>Any week</button>
                )}
                <div className="border-line"></div>
                {largeMainFilter && <>
                    <button className={`main-filter-btn large ${activeMainFilter === 2 ? 'active-filter' : ''}`} onClick={() => { setActiveMainFilter(2) }}>Check out <br></br>{extractDateDisplay()[2]} {extractDateDisplay()[3]}</button>
                    <div className="border-line"></div>
                </>}
                {(activeMainFilter === 1 || activeMainFilter === 2) && (
                    <section className='add-dates-modal'>
                        <DatePicker onDatesChange={handleDatesChange}/>
                    </section>
                )}
                {largeMainFilter ? (
                    <div className="main-filter-btn large">
                        <button className={`filter-content ${activeMainFilter === 3 ? 'active-filter' : ''}`} onClick={() => { setActiveMainFilter(3) }}>
                            <div className='text'>
                                Who
                                <br></br>
                                Add guests
                            </div>
                        </button>
                        <button className="large-search-btn">
                            <FontAwesomeIcon icon={faMagnifyingGlass} />
                            <span >Search</span>
                        </button>
                        {activeMainFilter === 3 && <GuestsModal adultsAmount={adultsAmount} childrenAmount={childrenAmount} infantsAmount={infantsAmount} petsAmount={petsAmount} handleAmountChange={handleAmountChange}/>}
                    </div>
                ) : (
                    <><button className="main-filter-btn" onClick={() => { setActiveMainFilter(3) }}>Add guests</button><img className='search-glass' src={searchIcon} alt="search-icon" /></>
                )}

            </div>
    );
}


