import mapEurope from '../../assets/img/map_europe.jpg'
import mapFlexible from '../../assets/img/map_flexible.jpg'
import mapGreece from '../../assets/img/map_greece.jpg'
import mapItaly from '../../assets/img/map_italy.jpg'
import mapSouthAmerica from '../../assets/img/map_southamerica.jpg'
import mapUSA from '../../assets/img/map_us.jpg'

export function MapImages({ handleSelectDestination }) {
    return (
        <section className='region-choice'>
            <div onClick={() => handleSelectDestination('Search destination')}>
                <img src={mapFlexible} alt="world_map" />
                <div className="region-p">I'm flexible</div>
            </div>
            <div onClick={() => handleSelectDestination('Europe')}>
                <img src={mapEurope} alt="europe_map" />
                <div className="region-p">Europe</div>
            </div>
            <div onClick={() => handleSelectDestination('France')}>
                <img src={mapItaly} alt="italy_map" />
                <div className="region-p">Italy</div>
            </div>
            <div onClick={() => handleSelectDestination('United States')}>
                <img src={mapUSA} alt="usa_map" />
                <div className="region-p">United States</div>
            </div>
            <div onClick={() => handleSelectDestination('United Kingdom')}>
                <img src={mapGreece} alt="greece_map" />
                <div className="region-p">Greece</div>
            </div>
            <div onClick={() => handleSelectDestination('South America')}>
                <img src={mapSouthAmerica} alt="south_america_map" />
                <div className="region-p">South America</div>
            </div>
        </section>
    );
}

