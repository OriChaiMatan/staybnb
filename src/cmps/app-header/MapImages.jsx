
export function MapImages({ handleSelectDestination }) {
    return (
        <section className='region-choice'>
            <div onClick={() => handleSelectDestination('Search destination')}>
                <img src={"http://res.cloudinary.com/dqti9icif/image/upload/v1717068274/map_flexible_kx9iu3.jpg"} alt="world_map" />
                <div className="region-p">I'm flexible</div>
            </div>
            <div onClick={() => handleSelectDestination('Europe')}>
                <img src={"http://res.cloudinary.com/dqti9icif/image/upload/v1717068250/map_europe_csnff2.webp"} alt="europe_map" />
                <div className="region-p">Europe</div>
            </div>
            <div onClick={() => handleSelectDestination('Italy')}>
                <img src={"http://res.cloudinary.com/dqti9icif/image/upload/v1717068324/map_italy_ashymd.webp"} alt="italy_map" />
                <div className="region-p">Italy</div>
            </div>
            <div onClick={() => handleSelectDestination('United States')}>
                <img src={"http://res.cloudinary.com/dqti9icif/image/upload/v1717068372/map_us_xh04ks.webp"} alt="usa_map" />
                <div className="region-p">United States</div>
            </div>
            <div onClick={() => handleSelectDestination('Greece')}>
                <img src={"http://res.cloudinary.com/dqti9icif/image/upload/v1717068308/map_greece_uoqigs.webp"} alt="greece_map" />
                <div className="region-p">Greece</div>
            </div>
            <div onClick={() => handleSelectDestination('South America')}>
                <img src={"http://res.cloudinary.com/dqti9icif/image/upload/v1717068352/map_southamerica_xo8sam.webp"} alt="south_america_map" />
                <div className="region-p">South America</div>
            </div>
        </section>
    );
}

