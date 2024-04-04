
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
    if (stay._id) {
        savedStay = await storageService.put(STORAGE_KEY, stay)
    } else {
        // Later, owner is set by the backend
        stay.owner = userService.getLoggedinUser()
        savedStay = await storageService.post(STORAGE_KEY, stay)
    }
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

function getEmptyStay(name = "", type = "House", imgUrls = [], price = 0, summary = "", capacity = 0, amenities = [], labels = [], loc = {}, reviews = [], likedByUsers = []) {
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
        loc,
        reviews,
        likedByUsers
    }
}

function _createStays() {
    let stays = utilService.loadFromStorage(STORAGE_KEY)
    if (!stays || !stays.length) {
        stays = [
            {
                _id: "10006546",
                name: "Ribeira Charming Duplex",
                type: "House",
                imgUrls: [
                    "../assets/img/stay_demo_img/1.png"
                ],
                price: 80.00,
                summary: "Fantastic duplex apartment with three bedrooms, located in the historic area of Porto, Ribeira (Cube)...",
                capacity: 8,
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
                likedByUsers: ['mini-user']
            },
            {
                _id: "10006547",
                name: "Ocean View Villa",
                type: "House",
                imgUrls: [
                    "../assets/img/stay_demo_img/2_1.png",
                    "../assets/img/stay_demo_img/2_2.png",
                    "../assets/img/stay_demo_img/2_3.png",
                    "../assets/img/stay_demo_img/2_4.png",
                ],
                price: 120.00,
                summary: "Beautiful villa with stunning ocean views, perfect for a relaxing getaway...",
                capacity: 6,
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
                likedByUsers: ["user1", "user2"]
            },
            // Cozy Mountain Cabin
            {
                _id: "10006548",
                name: "Cozy Mountain Cabin",
                type: "Cabin",
                imgUrls: [
                    "../assets/img/stay_demo_img/3_1.png",
                    "../assets/img/stay_demo_img/3_2.png",
                    "../assets/img/stay_demo_img/3_3.png"
                ],
                price: 100.00,
                summary: "Escape to this cozy cabin nestled in the mountains, offering tranquility and breathtaking views.",
                capacity: 4,
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
                likedByUsers: ["user3", "user4"]
            },
            // City Center Loft
            {
                _id: "10006549",
                name: "City Center Loft",
                type: "Apartment",
                imgUrls: [
                    "../assets/img/stay_demo_img/4_1.png",
                    "../assets/img/stay_demo_img/4_2.png"
                ],
                price: 150.00,
                summary: "Stylish loft apartment located in the heart of the city, offering convenience and urban vibes.",
                capacity: 2,
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
                likedByUsers: ["user5", "user6"]
            }
        ]
        utilService.saveToStorage(STORAGE_KEY, stays)
    }
}
// TEST DATA
// storageService.post(STORAGE_KEY, {vendor: 'Subali Rahok 2', price: 980}).then(x => console.log(x))





