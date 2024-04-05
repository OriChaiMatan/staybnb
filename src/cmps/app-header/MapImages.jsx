import mapEurope from '../../assets/img/map_europe.jpg'
import mapFlexible from '../../assets/img/map_flexible.jpg'
import mapGreece from '../../assets/img/map_greece.jpg'
import mapItaly from '../../assets/img/map_italy.jpg'
import mapSouthAmerica from '../../assets/img/map_southamerica.jpg'
import mapUSA from '../../assets/img/map_us.jpg'

export function MapImages() {
    return (
        <section className='region-choice'>
            <div>
                <img src={mapFlexible} alt="world_map" />
                <div className="region-p">I'm flexible</div>
            </div>
            <div>
                <img src={mapEurope} alt="europe_map" />
                <div className="region-p">Europe</div>
            </div>
            <div>
                <img src={mapItaly} alt="italy_map" />
                <div className="region-p">Italy</div>
            </div>
            <div>
                <img src={mapUSA} alt="usa_map" />
                <div className="region-p">United States</div>
            </div>
            <div>
                <img src={mapGreece} alt="greece_map" />
                <div className="region-p">Greece</div>
            </div>
            <div>
                <img src={mapSouthAmerica} alt="south_america_map" />
                <div className="region-p">South America</div>
            </div>
        </section>
    );
}
