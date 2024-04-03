
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
                "type": "House", // hotels, guesthouse
                imgUrls: "../assets/img/stay_demo_img/1.png",
                price: 80.00, //pe night
                "summary": "Fantastic duplex apartment with three bedrooms, located in the historic area of Porto, Ribeira (Cube)...",
                "capacity": 8,
                "amenities": [
                  "TV",
                  "Wifi",
                  "Kitchen",
                  "Smoking allowed",
                  "Pets allowed",
                  "Cooking basics"
                ],
                "labels": [ // ?
                  "Top of the world",
                  "Islands",
                  "Luxe",
                  "Tropical"
                ],
                "host": {
                  "_id": "u101",
                  "fullname": "Davit Pok",
                  "imgUrl": "https://a0.muscache.com/im/pictures/fab79f25-2e10-4f0f-9711-663cb69dc7d8.jpg?aki_policy=profile_small",
                },
                "loc": {
                  "country": "Portugal",
                  "countryCode": "PT",
                  "city": "Porto",
                  "address": "17 Kombo st",
                  "lat": -8.61308,
                  "lng": 41.1413
                },
                "reviews": [
                  {
                    "id": "madeId",
                    "txt": "Very helpful hosts. Cooked traditional...",
                    "rate": 4,
                    "by": {
                      "_id": "u102",
                      "fullname": "user2",
                      "imgUrl": "/img/img2.jpg"
                    }
                  }
                ],
                "likedByUsers": ['mini-user'] // for user-wishlist : use $in  save to wishlist
              },
              {
                _id: "10006547",
                name: "Ocean View Villa",
                type: "House",
                imgUrls: "../assets/img/stay_demo_img/2.png",
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
            }
            
        ]
        utilService.saveToStorage(STORAGE_KEY, stays)
    }
}
// TEST DATA
// storageService.post(STORAGE_KEY, {vendor: 'Subali Rahok 2', price: 980}).then(x => console.log(x))





