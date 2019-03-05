System.register([], function (exports_1, context_1) {
    "use strict";
    var DateHelper;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [],
        execute: function () {
            DateHelper = class DateHelper {
                static dataToString(data) {
                    return `${data.getDate()}/${data.getMonth() + 1}/${data.getFullYear()}`;
                }
                static stringToData(data) {
                    return new Date(data);
                }
            };
            exports_1("DateHelper", DateHelper);
        }
    };
});
