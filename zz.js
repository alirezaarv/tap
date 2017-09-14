const io = require('socket.io-client')

const getNextRequestId = (() => {
  let id = 0
  return () => {
    id += 1
    return id.toString()
  }
})()

const URL = 'http://localhost:3000'
const PATH = '/api'
const LAYERS = {
  tap: 1
}

let token = null
let socket = null
const callbacks = {}
const listeners = {}

const onDisconnect = () => {
  Object.keys(callbacks).forEach(requestId => {
    const { reject } = callbacks[requestId]
    reject('NETWORK')
    delete callbacks[requestId]
  })
}

const onResult = (requestId, err, res) => {
  const { reject, resolve } = callbacks[requestId]
  delete callbacks[requestId]
  if (err) {
    return reject(err)
  }
  return resolve(res)
}

const onEvent = (api, type, data) => {
  if (listeners[api]) {
    listeners[api](Object.assign({ type }, data))
  }
}

function disconnect() {
  if (socket && socket.connected) {
    socket.off('res', onResult)
    socket.off('evt', onEvent)
    socket.off('disconnect', onDisconnect)
    socket.close()
    socket = null
  }
}

function connect() {
  if (socket == null) {
    socket = io(URL, {
      path: PATH,
      query: {
        token,
        layers: JSON.stringify(LAYERS)
      }
    })
    socket.on('res', onResult)
    socket.on('evt', onEvent)
    socket.on('disconnect', onDisconnect)
  }
}

function reconnect() {
  disconnect()
  connect()
}

function call(api, method, request) {
  return new Promise((resolve, reject) => {
    const requestId = getNextRequestId()
    socket.emit('req', requestId, api, method, request)
    callbacks[requestId] = {
      resolve,
      reject
    }
  })
}

module.exports = {
  setToken: newToken => {
    token = newToken
    reconnect()
  },
  tap: {
    setEventListener: listener => {
      listeners.tap = listener
    },
    sendSms: request => call('tap', 'sendSms', request),
    signIn: request => call('tap', 'signIn', request),
    signUp: request => call('tap', 'signUp', request),
    getUser: request => call('tap', 'getUser', request),
    updateUser: request => call('tap', 'updateUser', request),
    generateAddress: request => call('tap', 'generateAddress', request),
    createTransaction: request => call('tap', 'createTransaction', request),
    deleteTransaction: request => call('tap', 'deleteTransaction', request),
    getSections: request => call('tap', 'getSections', request),
    getPersonalSections: request => call('tap', 'getPersonalSections', request),
    paySection: request => call('tap', 'paySection', request),
    findUser: request => call('tap', 'findUser', request)
  }
}
