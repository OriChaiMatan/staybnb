import { storageService } from "./async-storage.service.js"
import { utilService } from "./util.service.js"
import { userService } from "./user.service.js"
import staysData from "../data/stays.json"
const STORAGE_KEY = "stay"

_createStays()

export const stayService = {
  query,
  getById,
  save,
  remove,
  getEmptyStay,
  addStayMsg,
  minPricesStays,
  maxPricesStays,
  getAllPrices,
  getDefaultFilter,
  getFilterFromParams,
};
window.cs = stayService;

async function query(filterBy) {
  let stays = await storageService.query(STORAGE_KEY);
  if (filterBy) {
    stays = stays.filter((stay) => {
      const matchesCategoryTag =
        filterBy.category_tag === "" ||
        stay.labels.some(
          (label) => label.toLowerCase() === filterBy.category_tag.toLowerCase()
        )

      const matchesAmenities =
        filterBy.amenities.length === 0 ||
        filterBy.amenities.every((amenity) => stay.amenities.includes(amenity))

      const matchesPropertyType =
        filterBy.property_types.length === 0 ||
        filterBy.property_types.includes(stay.type)

      const withinPriceRange =
        (!filterBy.price_min || stay.price >= filterBy.price_min) &&
        (!filterBy.price_max || stay.price <= filterBy.price_max)

      const matchesBeds = !filterBy.beds || filterBy.beds <= stay.beds

      const matchesbedrooms =
        !filterBy.bedrooms || filterBy.bedrooms <= stay.bedrooms

      const matchesBathrooms = !filterBy.bath || filterBy.bath <= stay.bath

      const matchCapacities =
        !filterBy.capacity || filterBy.capacity <= stay.capacity

      const matchCountry =
        filterBy.country === "Search destination" ||
        filterBy.country === "" ||
        filterBy.country === stay.loc.country;

      const matchStartDate =
        !filterBy.startDate || stay.startDate <= filterBy.startDate

      const matchEndDate =
        !filterBy.endDate || stay.endDate >= filterBy.endDate

      return (
        matchesCategoryTag &&
        matchesAmenities &&
        matchesPropertyType &&
        withinPriceRange &&
        matchesBeds &&
        matchesbedrooms &&
        matchesBathrooms &&
        matchCapacities &&
        matchCountry &&
        matchEndDate &&
        matchStartDate
      )
    })
  }
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
  if (stay && stay._id) {
    savedStay = await storageService.put(STORAGE_KEY, stay)
  } else {
    // Later, owner is set by the backend
    // stay.owner = userService.getLoggedinUser()
    // create id here.
    stay._id = utilService.makeId()
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
    txt,
  }
  stay.msgs.push(msg)
  await storageService.put(STORAGE_KEY, stay)

  return msg
}

function minPricesStays() {
  let stays = utilService.loadFromStorage(STORAGE_KEY)
  return Math.min(...stays.map((stay) => stay.price))
}

function maxPricesStays() {
  let stays = utilService.loadFromStorage(STORAGE_KEY)
  return Math.max(...stays.map((stay) => stay.price))
}

function getAllPrices() {
  let stays = utilService.loadFromStorage(STORAGE_KEY)
  return stays.map((stay) => stay.price)
}

function getEmptyStay(
  name = "",
  type = "",
  imgUrls = [],
  price = "",
  summary = "",
  capacity = "",
  amenities = [],
  labels = [],
  country = "",
  city = "",
  address = "",
  lat,
  lng,
  reviews = [],
) {
  const { startDate, endDate } = utilService.getRandomDateRange()

  return {
    name,
    type,
    imgUrls,
    price,
    summary,
    capacity,
    amenities,
    labels,
    host: userService.getLoggedinUser(),
    loc: {
      country,
      city,
      address,
      lat,
      lng,
    },
    reviews,
    startDate,
    endDate,
  }
}

function getDefaultFilter() {
  return {
    category_tag: "",
    price_min: minPricesStays(),
    price_max: maxPricesStays(),
    amenities: [],
    property_types: [],
    bedrooms: "",
    beds: "",
    bathrooms: "",
    country: "",
    capacity: "",
    startDate: "",
    endDate: "",
  }
}

function getFilterFromParams(searchParams) {
  const defaultFilter = getDefaultFilter()
  const filterBy = {};
  for (const field in defaultFilter) {
    if (Array.isArray(defaultFilter[field])) {
      filterBy[field] = searchParams.getAll(field) || defaultFilter[field];
    } else {
      filterBy[field] = searchParams.get(field) || defaultFilter[field];
    }
  }
  return filterBy
}

function _createStays() {
  let data = staysData
  data = utilService.saveToStorage(STORAGE_KEY, data)
}
