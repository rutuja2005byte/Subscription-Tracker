import arcjet , { shield, detectBot, tokenBucket } from "arcjet";
import { ARCJET_ENV, ARCJET_KEY } from './env.js'

const aj = arcjet({
    key: ARCJET_KEY , 
    characteristics: ["ip.src"],
    rules: [
        shield({ mode: "LIVE" }),
        detectBot({
            mode: "LIVE",
            allow: [ "CATEGORY:SEARCH_ENGINE" ],
        }),
        tokenBucket({
            mode: "LIVE",
            refillRate: 5,    // Refill 5 tokens per interval
            interval: 10,     // Refill every 5 sec
            capacity: 10,     // Refill capacity of 10 tokens
        }),
    ],
});