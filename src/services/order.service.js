import { storageService } from './async-storage.service.js'
import { utilService } from './util.service.js'
import { userService } from './user.service.js'
import ordersData from "../data/orders.json";

const STORAGE_KEY = 'order'

_createOrders()

export const orderService = {
    query,
    getById,
    save,
    remove,
    getEmptyOrder,
    addOrderMsg
}
window.cs = orderService


async function query(filterBy = { txt: '', price: 0 }) {
    var orders = await storageService.query(STORAGE_KEY)
    if (filterBy.txt) {
        const regex = new RegExp(filterBy.txt, 'i')
        orders = orders.filter(order => regex.test(order.vendor) || regex.test(order.description))
    }
    if (filterBy.price) {
        orders = orders.filter(order => order.price <= filterBy.price)
    }
    return orders
}

function getById(orderId) {
    return storageService.get(STORAGE_KEY, orderId)
}

async function remove(orderId) {
    // throw new Error('Nope')
    await storageService.remove(STORAGE_KEY, orderId)
}

async function save(order) {
    var savedOrder
    if (order._id) {
        savedOrder = await storageService.put(STORAGE_KEY, order)
    } else {
        // Later, owner is set by the backend
        // order.owner = userService.getLoggedinUser()
        console.log('saving order ', order)
        savedOrder = await storageService.post(STORAGE_KEY, order)
        console.log("saved order", savedOrder)
    }
    return savedOrder
}

async function addOrderMsg(orderId, txt) {
    // Later, this is all done by the backend
    const order = await getById(orderId)
    if (!order.msgs) order.msgs = []

    const msg = {
        id: utilService.makeId(),
        by: userService.getLoggedinUser(),
        txt
    }
    order.msgs.push(msg)
    await storageService.put(STORAGE_KEY, order)

    return msg
}

function getEmptyOrder(hostId = "", buyer = {}, totalPrice = 0, startDate = "", endDate = "", guests = {}, stay = {}, status = "pending") {
    return {
        _id: utilService.makeId(),
        hostId,
        buyer,
        totalPrice,
        startDate,
        endDate,
        guests,
        stay,
        status
    }
}

function _createOrders() {
    let data = ordersData;
    data = utilService.saveToStorage(STORAGE_KEY, data);
}
// TEST DATA
// storageService.post(STORAGE_KEY, {vendor: 'Subali Rahok 2', price: 980}).then(x => console.log(x))




