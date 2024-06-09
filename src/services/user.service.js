import { storageService } from './async-storage.service'
import { utilService } from './util.service'
import { httpService } from './http.service'

const STORAGE_KEY_LOGGEDIN_USER = 'loggedinUser'
const BASE_URL = "user/";

export const userService = {
    login,
    logout,
    signup,
    getLoggedinUser,
    saveLocalUser,
    getUsers,
    getById,
    remove,
    update,
    updateLocalUserFields,
    getEmptyUser
}

window.userService = userService


function getUsers() {
    // return storageService.query('user')
    return httpService.get(`user`)
}



async function getById(userId) {
    // const user = await storageService.get('user', userId)
    const user = await httpService.get(`${BASE_URL}${userId}`)
    return user
}

function remove(userId) {
    // return storageService.remove('user', userId)
    return httpService.delete(`${BASE_URL}${userId}`)
}

async function update({ _id }) {
    // const user = await storageService.get('user', _id)
    // await storageService.put('user', user)

    const user = await httpService.put(`${BASE_URL}${_id}`, { _id })
    // Handle case in which admin updates other user's details
    if (getLoggedinUser()._id === user._id) saveLocalUser(user)
    return user
}

async function login(userCred) {
    // const users = await storageService.query('user')
    // const user = users.find(user => user.email === userCred.email && user.password === userCred.password)
    if (!userCred.fullname) {
        userCred.fullname = userCred.email.split("@")[0];
    }

    const user = await httpService.post('auth/login', userCred)

    if (user) {
        return saveLocalUser(user)
    }
    throw new Error("Incorrect email or password");
}

async function signup(userCred) {
    const users = await storageService.query('user');

    const existingUser = users.find(user => user.email === userCred.email);
    if (existingUser) {
        throw new Error('User already exists');
    }
    if (!userCred.imgUrl) {
        userCred.imgUrl = 'https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_1280.png';
    }
    if (!userCred.fullname) {
        userCred.fullname = userCred.email.split("@")[0];
    }

    // const user = await storageService.post('user', userCred);
    const user = await httpService.post('auth/signup', userCred)
    return saveLocalUser(user);
}

async function logout() {
    console.log("logging out")
    sessionStorage.removeItem(STORAGE_KEY_LOGGEDIN_USER)
    // return await storageService.post('auth/logout')
    return await httpService.post('auth/logout')
}

function saveLocalUser(user) {
    user = { _id: user._id, fullname: user.fullname, username: user.email, password: user.password, imgUrl: user.imgUrl }
    sessionStorage.setItem(STORAGE_KEY_LOGGEDIN_USER, JSON.stringify(user))
    return user
}

function updateLocalUserFields(user) {
    const currUser = getLoggedinUser()
    const userToSave = { ...currUser, ...user }
    sessionStorage.setItem(STORAGE_KEY_LOGGEDIN_USER, JSON.stringify(userToSave))
    return user
}

function getLoggedinUser() {
    return JSON.parse(sessionStorage.getItem(STORAGE_KEY_LOGGEDIN_USER))
}

function getEmptyUser(fullname, imgUrl, username, password, address) {
    return {
        _id: utilService.makeId(),
        fullname,
        imgUrl,
        username,
        password,
        address
    }
}


