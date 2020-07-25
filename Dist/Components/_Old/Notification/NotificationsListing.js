/**
 * @File notifications listing component
 *
 * @Author Alexander Bassov
 * @Email blackxes.dev@gmail
 */
import * as React from 'react';
var NotificationsListing = function (_a) {
    var items = _a.items;
    return !items.length ? null : React.createElement("ul", { className: "flex flex-v" }, items.map(function (item) {
        if (typeof item == 'string')
            return React.createElement("li", { className: "container-box regular" },
                React.createElement("p", null, item));
    }));
    {
        !componentErrors.length ? null : (React.createElement("div", { className: "container flex flex-v" }, componentErrors.map(function (error) { return (React.createElement("p", { key: generateId(), className: "list-item container-box info" }, error)); })));
    }
};
