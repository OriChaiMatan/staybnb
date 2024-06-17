import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const allowedAmenities = [
    "TV", "Wifi", "Kitchen", "Smoking allowed", "Pets allowed", "Pool",
    "Air conditioning", "Heating", "Gym", "Iron", "Washer", "Free parking",
    "Elevator", "BBQ Grill", "Dryer"
];

const allowedLabels = [
    "Beach", "Beachfront", "Vineyards", "Mansions", "Lake", "Treehouses",
    "Farms", "Skiing", "Amazing pools", "Earth homes", "Amazing views",
    "Desert", "Lakefront", "Islands", "Tropical", "Camping", "Surfing",
    "Bed & breakfast", "Luxe", "Top of the world", "Ski-in/out"
];

const randomImageUrls = [
    "https://res.cloudinary.com/dqti9icif/image/upload/2_roolfv",
    "https://res.cloudinary.com/dqti9icif/image/upload/3_ezuwiw",
    "https://res.cloudinary.com/dqti9icif/image/upload/4_sbhpr1",
    "https://res.cloudinary.com/dqti9icif/image/upload/v1716981258/men1_vzlwfn.png",
    "https://res.cloudinary.com/dqti9icif/image/upload/v1716980278/userwomen4_ylwdbb.jpg",
    "https://res.cloudinary.com/dqti9icif/image/upload/v1716981396/men2_st6uwg.jpg",
    "https://res.cloudinary.com/dqti9icif/image/upload/v1716981825/userwomen3_b3toj0.jpg",
    "http://res.cloudinary.com/dqti9icif/image/upload/v1716981952/men3_kduvzb.jpg",
    "http://res.cloudinary.com/dqti9icif/image/upload/v1716982686/userwomen5_dvavqu.jpg",
    "http://res.cloudinary.com/dqti9icif/image/upload/v1716982768/men4_yio0gl.jpg",
    "https://res.cloudinary.com/dqti9icif/image/upload/v1716979059/user2_fb3xqz.png",
    "http://res.cloudinary.com/dqti9icif/image/upload/v1716982890/userwomen6_rudvvf.jpg",
    "http://res.cloudinary.com/dqti9icif/image/upload/v1716983029/men5_y0aqtj.jpg",
    "http://res.cloudinary.com/dqti9icif/image/upload/v1717044984/admin_qsymkr.jpg"
]

// Function to get a random image URL
function getRandomImageUrl() {
    return randomImageUrls[Math.floor(Math.random() * randomImageUrls.length)];
}

const allowedTypes = ["Home", "House", "Guesthouse"];

// Function to get a random date between two dates
function getRandomDate(start, end) {
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

// Function to get random elements from an array
function getRandomElements(arr, count) {
    let _arr = [...arr];
    const result = [];
    for (let i = 0; i < count; i++) {
        const randomIndex = Math.floor(Math.random() * _arr.length);
        result.push(_arr[randomIndex]);
        _arr.splice(randomIndex, 1);
    }
    return result;
}

function getRandomMonth() {
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    return months[Math.floor(Math.random() * months.length)];
}

function getRandomYear() {
    const startYear = 2021; // Start year
    const endYear = 2024; // End year
    return Math.floor(Math.random() * (endYear - startYear + 1)) + startYear;
}

function getRandomFullDate() {
    const randomMonth = getRandomMonth();
    const randomYear = getRandomYear();
    return `${randomMonth} ${randomYear}`;
}


function getRandomRating() {
    // Generate a random number between 0 and 1
    const random = Math.random();

    // Define probabilities for each rating value
    const probabilities = [
        { rating: 0, probability: 0 },
        { rating: 1, probability: 0 },
        { rating: 2, probability: 0.1 },
        { rating: 3, probability: 0.1 },
        { rating: 4, probability: 0.4 },
        { rating: 5, probability: 0.4 }
    ];

    // Calculate cumulative probabilities
    let cumulativeProbability = 0;
    for (const { rating, probability } of probabilities) {
        cumulativeProbability += probability;
        if (random <= cumulativeProbability) {
            return rating;
        }
    }

    // Fallback to 0 if for some reason no probability is matched
    return 0;
}

// Function to transform the JSON
function transformJson(data) {
    const transformedData = [];

    data.forEach(item => {
        const newItem = {};

        // If type is not in allowed types, change it to one of the allowed types
        newItem['type'] = allowedTypes.includes(item['type']) ? item['type'] : allowedTypes[0];

        // Basic fields
        newItem['name'] = item['name'];
        newItem['imgUrls'] = item['imgUrls'].map(url => ({ imgUrl: url }));
        newItem['price'] = item['price'];
        newItem['summary'] = item['summary'];
        newItem['capacity'] = item['capacity'];
        newItem['bath'] = item['bathrooms'] || 0;
        newItem['bedrooms'] = item['bedrooms'] || 0;
        newItem['beds'] = getRandomRating();
        newItem['likedByUsers'] = item['likedByUsers']

        // Filter amenities
        newItem['amenities'] = item['amenities'].filter(amenity => allowedAmenities.includes(amenity));

        // Random labels
        newItem['labels'] = getRandomElements(allowedLabels, Math.floor(Math.random() * 8) + 3);

        // Host details
        const host = item['host'];
        newItem['host'] = {
            _id: host['_id'],
            fullname: host['fullname'],
            imgUrl: host['pictureUrl']
        };

        // Location details
        const loc = item['loc'];
        newItem['loc'] = {
            country: loc['country'],
            city: loc['city'],
            address: loc['address'],
            lat: loc['lat'],
            lng: loc['lan']
        };

        // Reviews
        newItem['reviews'] = item['reviews'].map(review => ({
            _id: review['_id'],
            txt: review['txt'],
            rate: getRandomRating(),
            date: getRandomFullDate(),
            by: {
                _id: review['by']['_id'],
                fullname: review['by']['fullname'],
                imgUrl: getRandomImageUrl(),
                address: review['by']['address'] || `${review['by']['city']}, ${review['by']['country']}`
            }
        }))


        // Random startDate and endDate
        const startDate = new Date('2024-04-15T00:00:00.000Z');
        const endDate = new Date('2024-06-15T00:00:00.000Z');
        newItem['startDate'] = getRandomDate(startDate, endDate);
        console.log(newItem.startDate, typeof newItem.startDate)

        const endStartDate = new Date('2024-06-21T00:00:00.000Z');
        const endEndDate = new Date('2025-04-15T00:00:00.000Z');
        newItem['endDate'] = getRandomDate(endStartDate, endEndDate);

        transformedData.push(newItem);
    });

    return transformedData;
}

// Resolve file paths
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const filePath = path.join(__dirname, 'stay.json');

async function processFile() {
    try {
        const data = await fs.readFile(filePath, 'utf8');
        const jsonData = JSON.parse(data);
        const transformedData = transformJson(jsonData);

        // Write the transformed data back to the file or to a new file
        const outputFilePath = path.join(__dirname, 'stay.transformed.json');
        await fs.writeFile(outputFilePath, JSON.stringify(transformedData, null, 2));
        console.log('File has been transformed and saved to', outputFilePath);
    } catch (err) {
        console.error('Error processing file:', err);
    }
}

processFile();
