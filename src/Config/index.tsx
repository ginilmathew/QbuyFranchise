export const env = "dev"

const URLS = {
    live: "https://apiqbuygreen.diginestsolutions.in/public/api/",
    testing: "https://qbuygreenapi.diginestsolutions.in/public/api/",
    dev: "https://apiqbuypanda.diginestsolutions.in/public/api/"
}
const url = {
    dev: "https://apibulletinly.diginestsolutions.in/public/api",
    live: "https://apiqbuygreen.diginestsolutions.in/public/api",
    testing: "https://qbuygreenapi.diginestsolutions.in/public/api/",
}

const IMG_URL = {
    live: "https://apiqbuygreen.diginestsolutions.in/public/",
    testing: "https://qbuygreenapi.diginestsolutions.in/public/",
    dev: "https://apiqbuypanda.diginestsolutions.in/public/"
}

const key = {
    live: "nGw3tbaew9KgjGiXf3JwVnNEDUS4pmsA",
    dev: "nGw3tbaew9KgjGiXf3JwVnNEDUS4pmsA",
    testing: "nGw3tbaew9KgjGiXf3JwVnNEDUS4pmsA"
}


export const BASE_URL = URLS[env]
export const IMAGE_URL = IMG_URL[env]


export const API_URL = `${url[env]}`
export const API_KEY = `${key[env]}`