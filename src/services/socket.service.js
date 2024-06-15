/* eslint-disable no-undef */
import io from 'socket.io-client'
import { userService } from './user.service'

export const SOCKET_EVENT_NEW_ORDER = 'new-order'
export const SOCKET_EVENT_NOTIFY_NEW_ORDER = 'notify-new-order'

export const SOCKET_EVENT_ORDER_STATUS = 'order-status'
export const SOCKET_EVENT_NOTIFY_ORDER_STATUS = 'notify-order-status'

export const SOCKET_EVENT_NOTIFY_USER_WATCHING_STAY = 'notify-user-watching-stay'
export const SOCKET_EVENT_USER_WATCHING_STAY = 'user-watching'


const SOCKET_EMIT_LOGIN = 'set-user-socket'
const SOCKET_EMIT_LOGOUT = 'unset-user-socket'


const baseUrl = (process.env.NODE_ENV === 'production') ? '' : '//localhost:5000'
// const baseUrl = ''
export const socketService = createSocketService()

window.socketService = socketService

socketService.setup()// move to user.service

function createSocketService() {
    var socket = null
    const socketService = {
        setup() {
            socket = io(baseUrl)
            const user = userService.getLoggedinUser()
            if (user) this.login(user._id)
        },
        on(eventName, cb) {
            console.log(eventName)
            socket.on(eventName, cb)
        },
        off(eventName, cb = null) {
            if (!socket) return;
            if (!cb) socket.removeAllListeners(eventName)
            else socket.off(eventName, cb)
        },
        emit(eventName, data) {
            socket.emit(eventName, data)
        },
        login(userId) {
            socket.emit(SOCKET_EMIT_LOGIN, userId)
            console.log('emitting login', userId)
        },
        logout() {
            socket.emit(SOCKET_EMIT_LOGOUT)
        },
        terminate() {
            socket = null
        },

    }
    return socketService
}
