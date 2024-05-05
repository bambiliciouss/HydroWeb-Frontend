import {io} from 'socket.io-client'

const socket = io.connect('https://treatsdelight-crownprincess-backend.e6fies.easypanel.host')

export default socket;