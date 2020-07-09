"use strict";
exports.__esModule = true;
exports["default"] = {
    url: {
        base: "/api"
    },
    timers: {
        userCookieExpiry: "720h"
    },
    env: {
        authSecret: process.env.TOKEN_SECRET_KEY || "test"
    }
};
