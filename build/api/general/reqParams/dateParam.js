"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const message_1 = require("../../../model/shared/message");
const dateFormat = new RegExp('(\\d{4})-(\\d{1,2})-(\\d{1,2})');
exports.dateParam = (req, res, next, value, name) => {
    // console.log(name + ':' + value);
    const parsedComponents = dateFormat.exec(value);
    if (parsedComponents) {
        // console.log(parsedComponents);
        // const [_, year, month, day] = parsedComponents.map(item 
        //     => parseInt(item));
        const [_, year, month, day] = parsedComponents.map((item) => {
            // return parseInt(item);
            return item;
        });
        // const date = new Date(year,month-1,day);
        const date = year + '-' + month + '-' + day;
        // !!!类型转换怎么搞！！
        req.params[name] = date;
        next();
    }
    else {
        next(new message_1.APIError('Parse Error', 'Date could NOT be parse, Date Format: YYYY-MM-DD', 400));
    }
};
