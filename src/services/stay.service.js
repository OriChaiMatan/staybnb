
import { storageService } from './async-storage.service.js'
import { utilService } from './util.service.js'
import { userService } from './user.service.js'

const STORAGE_KEY = 'stay'


_createStays()

export const stayService = {
    query,
    getById,
    save,
    remove,
    getEmptyStay,
    addStayMsg
}
window.cs = stayService


async function query() {
    var stays = await storageService.query(STORAGE_KEY)
    // if (filterBy.txt) {
    //     const regex = new RegExp(filterBy.txt, 'i')
    //     stays = stays.filter(stay => regex.test(stay.vendor) || regex.test(stay.description))
    // }
    // if (filterBy.price) {
    //     stays = stays.filter(stay => stay.price <= filterBy.price)
    // }
    return stays
}

function getById(stayId) {
    return storageService.get(STORAGE_KEY, stayId)
}

async function remove(stayId) {
    // throw new Error('Nope')
    await storageService.remove(STORAGE_KEY, stayId)
}

async function save(stay) {
    var savedStay
    // if (stay._id) {
    savedStay = await storageService.put(STORAGE_KEY, stay)
    // } else {
    //     // Later, owner is set by the backend
    //     stay.owner = userService.getLoggedinUser()
    //     savedStay = await storageService.post(STORAGE_KEY, stay)
    // }
    return savedStay
}

async function addStayMsg(stayId, txt) {
    // Later, this is all done by the backend
    const stay = await getById(stayId)
    if (!stay.msgs) stay.msgs = []

    const msg = {
        id: utilService.makeId(),
        by: userService.getLoggedinUser(),
        txt
    }
    stay.msgs.push(msg)
    await storageService.put(STORAGE_KEY, stay)

    return msg
}

function getEmptyStay(name = '', type = '', imgUrls = [], price = '', summary = '', capacity = '', amenities = [], labels = [], country, countryCode, city, address = '', lat, lng, reviews = [], likedByUsers = []) {

    const { startDate, endDate } = utilService.getRandomDateRange()

    return {
        _id: utilService.makeId(),
        name,
        type,
        imgUrls,
        price,
        summary,
        capacity,
        amenities,
        labels,
        host: userService.getLoggedinUser(),
        loc: [
            country,
            countryCode,
            city,
            address,
            lat,
            lng
        ],
        reviews,
        likedByUsers,
        startDate,
        endDate,
    }
}


function _createStays() {
    let stays = utilService.loadFromStorage(STORAGE_KEY)
    if (!stays || !stays.length) {
        const stays = [
            // Stay 1: Ribeira Charming Duplex
            {
                _id: "10006546",
                name: "Ribeira Charming Duplex",
                type: "House",
                imgUrls: [
                    "https://res.cloudinary.com/dqti9icif/image/upload/1_1_idqrpa"
                ],
                price: 80.00,
                summary: `
                A big, comfortable and nice five-room apartment, fully equipped, completely renewed, 
                located in the heart of Porto's historic area, at 2 minutes walking from Ribeira, 
                7 minutes walking from São Bento Metro and train Station. Completely renewed, where 
                can perfectly sleep and live 6 people. Surrounded by some of the main tourist 
                points of interest in town, monuments, churches, museums, restaurants, shops, 
                bakeries, laundries...
                `,
                capacity: 8,
                beds: 4,
                bedroom: 4,
                bath: 2,
                amenities: [
                    "TV",
                    "Wifi",
                    "Kitchen",
                    "Smoking allowed",
                    "Pets allowed",
                    "Cooking basics"
                ],
                labels: [
                    "Top of the world",
                    "Islands",
                    "Luxe",
                    "Tropical"
                ],
                host: {
                    _id: "u101",
                    fullname: "Davit Pok",
                    imgUrl: "../assets/imgs/users_imgs/user1.png",
                },
                loc: {
                    country: "Portugal",
                    countryCode: "PT",
                    city: "Porto",
                    address: "17 Kombo st",
                    lat: -8.61308,
                    lng: 41.1413
                },
                reviews: [],
                likedByUsers: ['mini-user'],
                startDate: "2028-09-27",
                endDate: "2028-10-07",
            },
            // Stay 2: Ocean View Villa
            {
                _id: "10006547",
                name: "Ocean View Villa",
                type: "House", //2_2_xepifd
                imgUrls: [
                    "https://res.cloudinary.com/dqti9icif/image/upload/2_1_tfy50l",
                    "https://res.cloudinary.com/dqti9icif/image/upload/2_2_xepifd",
                    "https://res.cloudinary.com/dqti9icif/image/upload/2_3_o4ikp0",
                    "https://res.cloudinary.com/dqti9icif/image/upload/2_4_e9elfy"
                ],
                price: 120.00,
                summary: `Unit 6302 at Bethany Bay is a 2 BR, 2 Bath, ground floor unit with panoramic
                views of the waterways and Indian River Bay. Sleeps 4. Free parking. Fully equipped kitchen, AC, fireplace, 
                community outdoor pool, jogging/hiking path, 9 hole golf course. Enjoy dinner and drinks on the enclosed rear porch
                and take in the view and wildlife all year round. 5 miles to Bethany Beach, 12 miles to Ocean City,
                17 miles to Rehoboth Beach. NON-SMOKING UNIT. NO ANIMALS permitted due to severe allergies.`,
                capacity: 6,
                beds: 3,
                bedroom: 2,
                bath: 3,
                amenities: [
                    "TV",
                    "Wifi",
                    "Kitchen",
                    "Swimming Pool",
                    "Air Conditioning",
                    "Free Parking"
                ],
                labels: [
                    "Luxe",
                    "Beachfront",
                    "Mansions"
                ],
                host: {
                    _id: "u103",
                    fullname: "Sara Smith",
                    imgUrl: "https://example.com/sara.jpg"
                },
                loc: {
                    country: "Portugal",
                    countryCode: "PT",
                    city: "Albufeira",
                    address: "123 Ocean View Street",
                    lat: 37.088,
                    lng: -8.250
                },
                reviews: [
                    {
                        id: "review1",
                        txt: "Amazing place with breathtaking views!",
                        rate: 5,
                        by: {
                            _id: "u104",
                            fullname: "John Doe",
                            imgUrl: "https://example.com/john.jpg"
                        }
                    },
                    {
                        id: "review2",
                        txt: "Great host, very responsive and accommodating.",
                        rate: 4,
                        by: {
                            _id: "u105",
                            fullname: "Alice Johnson",
                            imgUrl: "https://example.com/alice.jpg"
                        }
                    }
                ],
                likedByUsers: ["user1", "user2"],
                startDate: "2024-07-09",
                endDate: "2024-07-15",
            },
            // Stay 3: Cozy Mountain Cabin
            {
                _id: "10006548",
                name: "Cozy Mountain Cabin",
                type: "Cabin",
                imgUrls: [
                    "https://res.cloudinary.com/dqti9icif/image/upload/3_1_ucfaeb",
                    "https://res.cloudinary.com/dqti9icif/image/upload/3_2_o9trto",
                    "https://res.cloudinary.com/dqti9icif/image/upload/3_3_kqiayn"
                ],
                price: 100.00,
                summary: `
                Look no further, we've got you covered.
                
                Holiday house with two bedrooms, for up to 6 people, is located only 150m from the sea, 
                in the cove Božanska, on the island of Pašman, without immediate neighbors. Its location 
                on the top of the hill vouches for a breathtaking sea view. Pets are welcome against a 
                surcharge. Please indicate in your inquiry, how many pets you are traveling with. This 
                holiday home can be reached by car. The road leading to it is concreted. The road to the 
                sea is steep, the beach is rocky. There are two floors in the house, but only the upper 
                one is open to guests. The ground floor is empty and not for rent. Electricity and water 
                should be used sparingly here. Given that the water stays in the tank during the summer 
                at high temperatures, it is recommended to boil it before consumption or buy bottled 
                drinking water. Water directly from the tank is suitable for cooking and washing. 
                Solar-powered electricity is 220 V, but it is not allowed to bring and use your own 
                electrical devices, except of the battery chargers for mobile phones/laptops. The kitchen, 
                living room and dining room are located in one room and contain a fireplace and a sofa for 
                two people. WLan internet and SAT-TV are available in this house at no additional cost. 
                In the kitchen there is a refrigerator with a freezer, a gas stove with 4 burners, a 
                toaster, a kettle and a filter coffee machine. The bedrooms are equipped with double beds. 
                The bathroom equipment includes a shower, toilet and sink. Hot and cold water is installed 
                in the kitchen and bathroom. Bed linen and towels (one per person) are included in the 
                price, and fresh ones are available after each week of stay. Beach towels are not offered. 
                In the garden there is a barbecue in a covered gazebo with outdoor furniture. For the garden 
                shower, the water is heated by the heat of the sun. The balcony is furnished, deckchairs 
                are also available. We recommend that guests bring their mobile phone so that they can 
                contact us in case of need. There is a socket for a standard plug in the house, so guests 
                can charge their mobile phones in the house, with their own standard home charger. The island 
                of Pašman is only a 15-minute ferry ride from Biograd na Moru. This island is a great 
                destination for all lovers of water sports. In addition, there are hiking, biking and trekking 
                trails on the island, which are also near this house, along which you can find various types 
                of Mediterranean medicinal and aromatic plants - perfect for all nature lovers. Ferry tickets 
                are not included in the price. The house can be booked throughout the year, but for winter 
                rent, an additional payment for firewood is required. We recommend arriving at our agency in 
                Biograd na Moru during the morning to early afternoon, because getting to the accommodation 
                at night is difficult, even impossible after the last ferry leaves. After check-in at our 
                agency, you continue your journey to the island. If you find any ambiguities in the description 
                or if you have any further questions, and you do not find the answers in the description, 
                please contact us. The agency cannot be held responsible if the client does not inquire about 
                details that are important to him and are not listed in the description, or for any reason are 
                not completely clear to the client.
                `,
                capacity: 4,
                beds: 2,
                bedroom: 2,
                bath: 1,
                amenities: [
                    "TV",
                    "Wifi",
                    "Fireplace",
                    "Mountain View",
                    "Heating",
                    "Free Parking"
                ],
                labels: [
                    "Rustic",
                    "Mountain Retreat",
                    "Nature"
                ],
                host: {
                    _id: "u106",
                    fullname: "Michael Brown",
                    imgUrl: "https://example.com/michael.jpg"
                },
                loc: {
                    country: "USA",
                    city: "Aspen",
                    address: "456 Mountain Lane",
                    lat: 39.1911,
                    lng: -106.8175
                },
                reviews: [
                    {
                        id: "review3",
                        txt: "Absolutely charming cabin with stunning views!",
                        rate: 0,
                        by: {
                            _id: "u107",
                            fullname: "Emily White",
                            imgUrl: "https://example.com/emily.jpg"
                        }
                    }
                ],
                likedByUsers: ["user3", "user4"],
                startDate: "2024-08-22",
                endDate: "2024-08-24",
            },
            // Stay 4: City Center Loft
            {
                _id: "10006549",
                name: "City Center Loft",
                type: "Apartment",
                imgUrls: [
                    "https://res.cloudinary.com/dqti9icif/image/upload/4_1_u7pgyn",
                    "https://res.cloudinary.com/dqti9icif/image/upload/4_2_v7ch6x"
                ],
                price: 150.00,
                summary: "Stylish loft apartment located in the heart of the city, offering convenience and urban vibes.",
                capacity: 2,
                beds: 1,
                bedroom: 1,
                bath: 1,
                amenities: [
                    "TV",
                    "Wifi",
                    "Elevator",
                    "City View",
                    "Air Conditioning",
                    "Gym Access"
                ],
                labels: [
                    "Urban Living",
                    "Modern",
                    "Cityscape"
                ],
                host: {
                    _id: "u109",
                    fullname: "Sophia Garcia",
                    imgUrl: "https://example.com/sophia.jpg"
                },
                loc: {
                    country: "USA",
                    city: "New York",
                    address: "789 Downtown Avenue",
                    lat: 40.7128,
                    lng: -74.0060
                },
                reviews: [
                    {
                        id: "review5",
                        txt: "The loft is amazing! Loved the city views.",
                        rate: 5,
                        by: {
                            _id: "u110",
                            fullname: "Daniel Smith",
                            imgUrl: "https://example.com/daniel.jpg"
                        }
                    },
                    {
                        id: "review6",
                        txt: "Perfect location for exploring the city. Modern and clean.",
                        rate: 3,
                        by: {
                            _id: "u111",
                            fullname: "Jessica Davis",
                            imgUrl: "https://example.com/jessica.jpg"
                        }
                    }
                ],
                likedByUsers: ["user5", "user6"],
                startDate: "2024-08-23",
                endDate: "2024-08-28",
            },
            // Stay 1: Ribeira Charming Duplex
            {
                _id: "10006550",
                name: "Ribeira Charming Duplex",
                type: "House",
                imgUrls: [
                    "https://res.cloudinary.com/dqti9icif/image/upload/1_1_idqrpa"
                ],
                price: 80.00,
                summary: "Fantastic duplex apartment with three bedrooms, located in the historic area of Porto, Ribeira (Cube)...",
                capacity: 8,
                beds: 4,
                bedroom: 4,
                bath: 2,
                amenities: [
                    "TV",
                    "Wifi",
                    "Kitchen",
                    "Smoking allowed",
                    "Pets allowed",
                    "Cooking basics"
                ],
                labels: [
                    "Top of the world",
                    "Islands",
                    "Luxe",
                    "Tropical"
                ],
                host: {
                    _id: "u101",
                    fullname: "Davit Pok",
                    imgUrl: "https://a0.muscache.com/im/pictures/fab79f25-2e10-4f0f-9711-663cb69dc7d8.jpg?aki_policy=profile_small",
                },
                loc: {
                    country: "Portugal",
                    countryCode: "PT",
                    city: "Porto",
                    address: "17 Kombo st",
                    lat: -8.61308,
                    lng: 41.1413
                },
                reviews: [
                    {
                        id: "madeId",
                        txt: "Very helpful hosts. Cooked traditional...",
                        rate: 2,
                        by: {
                            _id: "u102",
                            fullname: "user2",
                            imgUrl: "/img/img2.jpg"
                        }
                    }
                ],
                likedByUsers: ['mini-user'],
                startDate: "2024-10-17",
                endDate: "2024-10-22",
            },
            // Stay 2: Ocean View Villa
            {
                _id: "10006551",
                name: "Ocean View Villa",
                type: "House",
                imgUrls: [
                    "https://res.cloudinary.com/dqti9icif/image/upload/2_1_tfy50l",
                    "https://res.cloudinary.com/dqti9icif/image/upload/2_2_xepifd",
                    "https://res.cloudinary.com/dqti9icif/image/upload/2_3_o4ikp0",
                    "https://res.cloudinary.com/dqti9icif/image/upload/2_4_e9elfy"
                ],
                price: 120.00,
                summary: "Beautiful villa with stunning ocean views, perfect for a relaxing getaway...",
                capacity: 6,
                beds: 3,
                bedroom: 2,
                bath: 3,
                amenities: [
                    "TV",
                    "Wifi",
                    "Kitchen",
                    "Swimming Pool",
                    "Air Conditioning",
                    "Free Parking"
                ],
                labels: [
                    "Luxe",
                    "Beachfront",
                    "Mansions"
                ],
                host: {
                    _id: "u103",
                    fullname: "Sara Smith",
                    imgUrl: "https://example.com/sara.jpg"
                },
                loc: {
                    country: "Portugal",
                    countryCode: "PT",
                    city: "Albufeira",
                    address: "123 Ocean View Street",
                    lat: 37.088,
                    lng: -8.250
                },
                reviews: [
                    {
                        id: "review1",
                        txt: "Amazing place with breathtaking views!",
                        rate: 3,
                        by: {
                            _id: "u104",
                            fullname: "John Doe",
                            imgUrl: "https://example.com/john.jpg"
                        }
                    },
                    {
                        id: "review2",
                        txt: "Great host, very responsive and accommodating.",
                        rate: 4,
                        by: {
                            _id: "u105",
                            fullname: "Alice Johnson",
                            imgUrl: "https://example.com/alice.jpg"
                        }
                    }
                ],
                likedByUsers: ["user1", "user2"],
                startDate: "2024-11-28",
                endDate: "2024-11-30",
            },
            // Stay 3: Cozy Mountain Cabin
            {
                _id: "10006552",
                name: "Cozy Mountain Cabin",
                type: "Cabin",
                imgUrls: [
                    "https://res.cloudinary.com/dqti9icif/image/upload/3_1_ucfaeb",
                    "https://res.cloudinary.com/dqti9icif/image/upload/3_2_o9trto",
                    "https://res.cloudinary.com/dqti9icif/image/upload/3_3_kqiayn"
                ],
                price: 100.00,
                summary: "Escape to this cozy cabin nestled in the mountains, offering tranquility and breathtaking views.",
                capacity: 4,
                beds: 2,
                bedroom: 2,
                bath: 1,
                amenities: [
                    "TV",
                    "Wifi",
                    "Fireplace",
                    "Mountain View",
                    "Heating",
                    "Free Parking"
                ],
                labels: [
                    "Rustic",
                    "Mountain Retreat",
                    "Nature"
                ],
                host: {
                    _id: "u106",
                    fullname: "Michael Brown",
                    imgUrl: "https://example.com/michael.jpg"
                },
                loc: {
                    country: "USA",
                    city: "Aspen",
                    address: "456 Mountain Lane",
                    lat: 39.1911,
                    lng: -106.8175
                },
                reviews: [
                    {
                        id: "review3",
                        txt: "Absolutely charming cabin with stunning views!",
                        rate: 5,
                        by: {
                            _id: "u107",
                            fullname: "Emily White",
                            imgUrl: "https://example.com/emily.jpg"
                        }
                    },
                    {
                        id: "review4",
                        txt: "Perfect getaway spot! Cozy and peaceful.",
                        rate: 4,
                        by: {
                            _id: "u108",
                            fullname: "Jason Miller",
                            imgUrl: "https://example.com/jason.jpg"
                        }
                    }
                ],
                likedByUsers: ["user3", "user4"],
                startDate: "2024-12-19",
                endDate: "2024-12-21",
            },
            // Stay 4: City Center Loft
            {
                _id: "10006553",
                name: "City Center Loft",
                type: "Apartment",
                imgUrls: [
                    "https://res.cloudinary.com/dqti9icif/image/upload/4_1_u7pgyn",
                    "https://res.cloudinary.com/dqti9icif/image/upload/4_2_v7ch6x"
                ],
                price: 150.00,
                summary: "Stylish loft apartment located in the heart of the city, offering convenience and urban vibes.",
                capacity: 2,
                beds: 1,
                bedroom: 1,
                bath: 1,
                amenities: [
                    "TV",
                    "Wifi",
                    "Elevator",
                    "City View",
                    "Air Conditioning",
                    "Gym Access"
                ],
                labels: [
                    "Urban Living",
                    "Modern",
                    "Cityscape"
                ],
                host: {
                    _id: "u109",
                    fullname: "Sophia Garcia",
                    imgUrl: "https://example.com/sophia.jpg"
                },
                loc: {
                    country: "USA",
                    city: "New York",
                    address: "789 Downtown Avenue",
                    lat: 40.7128,
                    lng: -74.0060
                },
                reviews: [
                    {
                        id: "review5",
                        txt: "The loft is amazing! Loved the city views.",
                        rate: 5,
                        by: {
                            _id: "u110",
                            fullname: "Daniel Smith",
                            imgUrl: "https://example.com/daniel.jpg"
                        }
                    },
                    {
                        id: "review6",
                        txt: "Perfect location for exploring the city. Modern and clean.",
                        rate: 4,
                        by: {
                            _id: "u111",
                            fullname: "Jessica Davis",
                            imgUrl: "https://example.com/jessica.jpg"
                        }
                    }
                ],
                likedByUsers: ["user5", "user6"],
                startDate: "2025-02-06",
                endDate: "2025-02-10",
            },
            {
                _id: "10006554",
                name: "Ribeira Charming Duplex",
                type: "House",
                imgUrls: [
                    "https://res.cloudinary.com/dqti9icif/image/upload/1_1_idqrpa"
                ],
                price: 80.00,
                summary: "Fantastic duplex apartment with three bedrooms, located in the historic area of Porto, Ribeira (Cube)...",
                capacity: 8,
                beds: 4,
                bedroom: 4,
                bath: 2,
                amenities: [
                    "TV",
                    "Wifi",
                    "Kitchen",
                    "Smoking allowed",
                    "Pets allowed",
                    "Cooking basics"
                ],
                labels: [
                    "Top of the world",
                    "Islands",
                    "Luxe",
                    "Tropical"
                ],
                host: {
                    _id: "u101",
                    fullname: "Davit Pok",
                    imgUrl: "https://a0.muscache.com/im/pictures/fab79f25-2e10-4f0f-9711-663cb69dc7d8.jpg?aki_policy=profile_small",
                },
                loc: {
                    country: "Portugal",
                    countryCode: "PT",
                    city: "Porto",
                    address: "17 Kombo st",
                    lat: -8.61308,
                    lng: 41.1413
                },
                reviews: [],
                likedByUsers: ['mini-user'],
                startDate: "2025-02-06",
                endDate: "2025-02-10",
            },
            // Stay 2: Ocean View Villa
            {
                _id: "10006555",
                name: "Ocean View Villa",
                type: "House",
                imgUrls: [
                    "https://res.cloudinary.com/dqti9icif/image/upload/2_1_tfy50l",
                    "https://res.cloudinary.com/dqti9icif/image/upload/2_2_xepifd",
                    "https://res.cloudinary.com/dqti9icif/image/upload/2_3_o4ikp0",
                    "https://res.cloudinary.com/dqti9icif/image/upload/2_4_e9elfy"
                ],
                price: 120.00,
                summary: "Beautiful villa with stunning ocean views, perfect for a relaxing getaway...",
                capacity: 6,
                beds: 3,
                bedroom: 2,
                bath: 3,
                amenities: [
                    "TV",
                    "Wifi",
                    "Kitchen",
                    "Swimming Pool",
                    "Air Conditioning",
                    "Free Parking"
                ],
                labels: [
                    "Luxe",
                    "Beachfront",
                    "Mansions"
                ],
                host: {
                    _id: "u103",
                    fullname: "Sara Smith",
                    imgUrl: "https://example.com/sara.jpg"
                },
                loc: {
                    country: "Portugal",
                    countryCode: "PT",
                    city: "Albufeira",
                    address: "123 Ocean View Street",
                    lat: 37.088,
                    lng: -8.250
                },
                reviews: [
                    {
                        id: "review1",
                        txt: "Amazing place with breathtaking views!",
                        rate: 0,
                        by: {
                            _id: "u104",
                            fullname: "John Doe",
                            imgUrl: "https://example.com/john.jpg"
                        }
                    },
                    {
                        id: "review2",
                        txt: "Great host, very responsive and accommodating.",
                        rate: 0,
                        by: {
                            _id: "u105",
                            fullname: "Alice Johnson",
                            imgUrl: "https://example.com/alice.jpg"
                        }
                    }
                ],
                likedByUsers: ["user1", "user2"],
                startDate: "2025-04-11",
                endDate: "2025-04-18",
            },
            // Stay 3: Cozy Mountain Cabin
            {
                _id: "10006556",
                name: "Cozy Mountain Cabin",
                type: "Cabin",
                imgUrls: [
                    "https://res.cloudinary.com/dqti9icif/image/upload/3_1_ucfaeb",
                    "https://res.cloudinary.com/dqti9icif/image/upload/3_2_o9trto",
                    "https://res.cloudinary.com/dqti9icif/image/upload/3_3_kqiayn"
                ],
                price: 100.00,
                summary: "Escape to this cozy cabin nestled in the mountains, offering tranquility and breathtaking views.",
                capacity: 4,
                beds: 2,
                bedroom: 2,
                bath: 1,
                amenities: [
                    "TV",
                    "Wifi",
                    "Fireplace",
                    "Mountain View",
                    "Heating",
                    "Free Parking"
                ],
                labels: [
                    "Rustic",
                    "Mountain Retreat",
                    "Nature"
                ],
                host: {
                    _id: "u106",
                    fullname: "Michael Brown",
                    imgUrl: "https://example.com/michael.jpg"
                },
                loc: {
                    country: "USA",
                    city: "Aspen",
                    address: "456 Mountain Lane",
                    lat: 39.1911,
                    lng: -106.8175
                },
                reviews: [
                    {
                        id: "review3",
                        txt: "Absolutely charming cabin with stunning views!",
                        rate: 5,
                        by: {
                            _id: "u107",
                            fullname: "Emily White",
                            imgUrl: "https://example.com/emily.jpg"
                        }
                    },
                    {
                        id: "review4",
                        txt: "Perfect getaway spot! Cozy and peaceful.",
                        rate: 4,
                        by: {
                            _id: "u108",
                            fullname: "Jason Miller",
                            imgUrl: "https://example.com/jason.jpg"
                        }
                    }
                ],
                likedByUsers: ["user3", "user4"],
                startDate: "2025-03-06",
                endDate: "2025-03-10",
            },
            // Stay 4: City Center Loft
            {
                _id: "10006557",
                name: "City Center Loft",
                type: "Apartment",
                imgUrls: [
                    "https://res.cloudinary.com/dqti9icif/image/upload/4_1_u7pgyn",
                    "https://res.cloudinary.com/dqti9icif/image/upload/4_2_v7ch6x"
                ],
                price: 150.00,
                summary: "Stylish loft apartment located in the heart of the city, offering convenience and urban vibes.",
                capacity: 2,
                beds: 1,
                bedroom: 1,
                bath: 1,
                amenities: [
                    "TV",
                    "Wifi",
                    "Elevator",
                    "City View",
                    "Air Conditioning",
                    "Gym Access"
                ],
                labels: [
                    "Urban Living",
                    "Modern",
                    "Cityscape"
                ],
                host: {
                    _id: "u109",
                    fullname: "Sophia Garcia",
                    imgUrl: "https://example.com/sophia.jpg"
                },
                loc: {
                    country: "USA",
                    city: "New York",
                    address: "789 Downtown Avenue",
                    lat: 40.7128,
                    lng: -74.0060
                },
                reviews: [
                    {
                        id: "review5",
                        txt: "The loft is amazing! Loved the city views.",
                        rate: 5,
                        by: {
                            _id: "u110",
                            fullname: "Daniel Smith",
                            imgUrl: "https://example.com/daniel.jpg"
                        }
                    },
                    {
                        id: "review6",
                        txt: "Perfect location for exploring the city. Modern and clean.",
                        rate: 4,
                        by: {
                            _id: "u111",
                            fullname: "Jessica Davis",
                            imgUrl: "https://example.com/jessica.jpg"
                        }
                    }
                ],
                likedByUsers: ["user5", "user6"],
                startDate: "2025-07-15",
                endDate: "2025-07-22",
            },
            // Stay 1: Ribeira Charming Duplex
            {
                _id: "10006558",
                name: "Ribeira Charming Duplex",
                type: "House",
                imgUrls: [
                    "https://res.cloudinary.com/dqti9icif/image/upload/1_1_idqrpa"
                ],
                price: 80.00,
                summary: "Fantastic duplex apartment with three bedrooms, located in the historic area of Porto, Ribeira (Cube)...",
                capacity: 8,
                beds: 4,
                bedroom: 4,
                bath: 2,
                amenities: [
                    "TV",
                    "Wifi",
                    "Kitchen",
                    "Smoking allowed",
                    "Pets allowed",
                    "Cooking basics"
                ],
                labels: [
                    "Top of the world",
                    "Islands",
                    "Luxe",
                    "Tropical"
                ],
                host: {
                    _id: "u101",
                    fullname: "Davit Pok",
                    imgUrl: "https://a0.muscache.com/im/pictures/fab79f25-2e10-4f0f-9711-663cb69dc7d8.jpg?aki_policy=profile_small",
                },
                loc: {
                    country: "Portugal",
                    countryCode: "PT",
                    city: "Porto",
                    address: "17 Kombo st",
                    lat: -8.61308,
                    lng: 41.1413
                },
                reviews: [
                    {
                        id: "madeId",
                        txt: "Very helpful hosts. Cooked traditional...",
                        rate: 4,
                        by: {
                            _id: "u102",
                            fullname: "user2",
                            imgUrl: "/img/img2.jpg"
                        }
                    }
                ],
                likedByUsers: ['mini-user'],
                startDate: "2025-08-17",
                endDate: "2025-08-23",
            },
            // Stay 2: Ocean View Villa
            {
                _id: "10006559",
                name: "Ocean View Villa",
                type: "House",
                imgUrls: [
                    "https://res.cloudinary.com/dqti9icif/image/upload/2_1_tfy50l",
                    "https://res.cloudinary.com/dqti9icif/image/upload/2_2_xepifd",
                    "https://res.cloudinary.com/dqti9icif/image/upload/2_3_o4ikp0",
                    "https://res.cloudinary.com/dqti9icif/image/upload/2_4_e9elfy"
                ],
                price: 120.00,
                summary: "Beautiful villa with stunning ocean views, perfect for a relaxing getaway...",
                capacity: 6,
                beds: 3,
                bedroom: 2,
                bath: 3,
                amenities: [
                    "TV",
                    "Wifi",
                    "Kitchen",
                    "Swimming Pool",
                    "Air Conditioning",
                    "Free Parking"
                ],
                labels: [
                    "Luxe",
                    "Beachfront",
                    "Mansions"
                ],
                host: {
                    _id: "u103",
                    fullname: "Sara Smith",
                    imgUrl: "https://example.com/sara.jpg"
                },
                loc: {
                    country: "Portugal",
                    countryCode: "PT",
                    city: "Albufeira",
                    address: "123 Ocean View Street",
                    lat: 37.088,
                    lng: -8.250
                },
                reviews: [
                    {
                        id: "review1",
                        txt: "Amazing place with breathtaking views!",
                        rate: 5,
                        by: {
                            _id: "u104",
                            fullname: "John Doe",
                            imgUrl: "https://example.com/john.jpg"
                        }
                    },
                    {
                        id: "review2",
                        txt: "Great host, very responsive and accommodating.",
                        rate: 4,
                        by: {
                            _id: "u105",
                            fullname: "Alice Johnson",
                            imgUrl: "https://example.com/alice.jpg"
                        }
                    }
                ],
                likedByUsers: ["user1", "user2"],
                startDate: "2025-09-18",
                endDate: "2025-09-22",
            },
            // Stay 3: Cozy Mountain Cabin
            {
                _id: "10006560",
                name: "Cozy Mountain Cabin",
                type: "Cabin",
                imgUrls: [
                    "https://res.cloudinary.com/dqti9icif/image/upload/3_1_ucfaeb",
                    "https://res.cloudinary.com/dqti9icif/image/upload/3_2_o9trto",
                    "https://res.cloudinary.com/dqti9icif/image/upload/3_3_kqiayn"
                ],
                price: 100.00,
                summary: "Escape to this cozy cabin nestled in the mountains, offering tranquility and breathtaking views.",
                capacity: 4,
                beds: 2,
                bedroom: 2,
                bath: 1,
                amenities: [
                    "TV",
                    "Wifi",
                    "Fireplace",
                    "Mountain View",
                    "Heating",
                    "Free Parking"
                ],
                labels: [
                    "Rustic",
                    "Mountain Retreat",
                    "Nature"
                ],
                host: {
                    _id: "u106",
                    fullname: "Michael Brown",
                    imgUrl: "https://example.com/michael.jpg"
                },
                loc: {
                    country: "USA",
                    city: "Aspen",
                    address: "456 Mountain Lane",
                    lat: 39.1911,
                    lng: -106.8175
                },
                reviews: [
                    {
                        id: "review3",
                        txt: "Absolutely charming cabin with stunning views!",
                        rate: 5,
                        by: {
                            _id: "u107",
                            fullname: "Emily White",
                            imgUrl: "https://example.com/emily.jpg"
                        }
                    },
                    {
                        id: "review4",
                        txt: "Perfect getaway spot! Cozy and peaceful.",
                        rate: 4,
                        by: {
                            _id: "u108",
                            fullname: "Jason Miller",
                            imgUrl: "https://example.com/jason.jpg"
                        }
                    }
                ],
                likedByUsers: ["user3", "user4"],
                startDate: "2025-10-18",
                endDate: "2025-10-22",
            },
            // Stay 4: City Center Loft
            {
                _id: "10006561",
                name: "City Center Loft",
                type: "Apartment",
                imgUrls: [
                    "https://res.cloudinary.com/dqti9icif/image/upload/4_1_u7pgyn",
                    "https://res.cloudinary.com/dqti9icif/image/upload/4_2_v7ch6x"
                ],
                price: 150.00,
                summary: "Stylish loft apartment located in the heart of the city, offering convenience and urban vibes.",
                capacity: 2,
                beds: 1,
                bedroom: 1,
                bath: 1,
                amenities: [
                    "TV",
                    "Wifi",
                    "Elevator",
                    "City View",
                    "Air Conditioning",
                    "Gym Access"
                ],
                labels: [
                    "Urban Living",
                    "Modern",
                    "Cityscape"
                ],
                host: {
                    _id: "u109",
                    fullname: "Sophia Garcia",
                    imgUrl: "https://example.com/sophia.jpg"
                },
                loc: {
                    country: "USA",
                    city: "New York",
                    address: "789 Downtown Avenue",
                    lat: 40.7128,
                    lng: -74.0060
                },
                reviews: [
                    {
                        id: "review5",
                        txt: "The loft is amazing! Loved the city views.",
                        rate: 5,
                        by: {
                            _id: "u110",
                            fullname: "Daniel Smith",
                            imgUrl: "https://example.com/daniel.jpg"
                        }
                    },
                    {
                        id: "review6",
                        txt: "Perfect location for exploring the city. Modern and clean.",
                        rate: 4,
                        by: {
                            _id: "u111",
                            fullname: "Jessica Davis",
                            imgUrl: "https://example.com/jessica.jpg"
                        }
                    }
                ],
                likedByUsers: ["user5", "user6"],
                startDate: "2025-11-22",
                endDate: "2025-11-24",
            },
        ];

        utilService.saveToStorage(STORAGE_KEY, stays)
    }
}
// TEST DATA
// storageService.post(STORAGE_KEY, {vendor: 'Subali Rahok 2', price: 980}).then(x => console.log(x))





