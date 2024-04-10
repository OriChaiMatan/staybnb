import dayjs from 'dayjs';

export const utilService = {
    makeId,
    makeLorem,
    getRandomIntInclusive,
    debounce,
    randomPastTime,
    saveToStorage,
    loadFromStorage,
    getAssetSrc,
    formatDateRange,
    getRandomDateRange,
    calculateDistance,
    calculateAvgRating,
}

const TEL_AVIV_LAT = 32.109333
const TEL_AVIV_LNG = 34.855499

function makeId(length = 6) {
    var txt = ''
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

    for (var i = 0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length))
    }

    return txt
}

function makeLorem(size = 100) {
    var words = ['The sky', 'above', 'the port', 'was', 'the color of television', 'tuned', 'to', 'a dead channel', '.', 'All', 'this happened', 'more or less', '.', 'I', 'had', 'the story', 'bit by bit', 'from various people', 'and', 'as generally', 'happens', 'in such cases', 'each time', 'it', 'was', 'a different story', '.', 'It', 'was', 'a pleasure', 'to', 'burn']
    var txt = ''
    while (size > 0) {
        size--
        txt += words[Math.floor(Math.random() * words.length)] + ' '
    }
    return txt
}

function getRandomIntInclusive(min, max) {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min + 1)) + min //The maximum is inclusive and the minimum is inclusive 
}

function randomPastTime() {
    const HOUR = 1000 * 60 * 60
    const DAY = 1000 * 60 * 60 * 24
    const WEEK = 1000 * 60 * 60 * 24 * 7

    const pastTime = getRandomIntInclusive(HOUR, WEEK)
    return Date.now() - pastTime
}

function debounce(func, timeout = 300) {
    let timer
    return (...args) => {
        clearTimeout(timer)
        timer = setTimeout(() => { func.apply(this, args) }, timeout)
    }
}

function saveToStorage(key, value) {
    localStorage.setItem(key, JSON.stringify(value))
}

function loadFromStorage(key) {
    const data = localStorage.getItem(key)
    return (data) ? JSON.parse(data) : undefined
}

function getAssetSrc(name) {
    const path = `/src/assets/${name}`
    const modules = import.meta.glob('/src/assets/*', { eager: true })
    const mod = modules[path]
    return mod.default
}

function formatDateRange(startDate, endDate) {
    const customMonthNames = [
        'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
        'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'
    ]
    const startMonthIndex = dayjs(startDate).month()
    const startDay = dayjs(startDate).format('D')
    const endMonthIndex = dayjs(endDate).month()
    const endDay = dayjs(endDate).format('D')

    if (startMonthIndex === endMonthIndex) {
        return `${customMonthNames[startMonthIndex]} ${startDay} – ${endDay}`
    } else {
        return `${customMonthNames[startMonthIndex]} ${startDay} – ${customMonthNames[endMonthIndex]} ${endDay}`
    }
}

function getRandomDateRange() {
    const minYear = 2024
    const maxYear = 2028

    const randomYear = Math.floor(Math.random() * (maxYear - minYear + 1)) + minYear
    const randomMonth = Math.floor(Math.random() * 12) + 1
    const maxDaysInMonth = new Date(randomYear, randomMonth, 0).getDate()
    const randomDay = Math.floor(Math.random() * maxDaysInMonth) + 1
    const maxDaysDifference = 11;
    const randomDaysDifference = Math.floor(Math.random() * maxDaysDifference)

    const startDate = new Date(randomYear, randomMonth - 1, randomDay - randomDaysDifference)
    const endDate = new Date(startDate.getTime() + (randomDaysDifference * 24 * 60 * 60 * 1000))

    const formattedStartDate = _formatDate(startDate)
    const formattedEndDate = _formatDate(endDate)

    return { startDate: formattedStartDate, endDate: formattedEndDate }
}

function calculateDistance(lat2, lon2) {
    const R = 6371
    const dLat = _deg2rad(lat2 - TEL_AVIV_LAT)
    const dLon = _deg2rad(lon2 - TEL_AVIV_LNG)
    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(_deg2rad(TEL_AVIV_LAT)) * Math.cos(_deg2rad(lat2)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2)
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
    const distance = R * c
    return distance
}

function calculateAvgRating(reviews) {
    if (!reviews || reviews.length === 0) return '0.00'
    const totalRating = reviews.reduce((acc, review) => acc + review.rate, 0)
    const avgRating = (totalRating / reviews.length).toFixed(1)
    return avgRating;
}


//private functions
function _deg2rad(deg) {
    return deg * (Math.PI / 180)
}

function _formatDate(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}
