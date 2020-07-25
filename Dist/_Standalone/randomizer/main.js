var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
var RnzRoll = /** @class */ (function () {
    function RnzRoll(settings, result) {
        this.id = RnzMisc.generateId();
        this.settings = settings;
        this.result = result;
        this.groups = [];
        this.buildGroups();
    }
    RnzRoll.prototype.buildGroups = function () {
        this.groups = this.result.reduce(function (acc, curr) {
            var _a;
            return __assign(__assign({}, acc), (_a = {}, _a[curr.value] = acc[curr.value] ? acc[curr.value] + 1 : 1, _a));
        }, {});
    };
    return RnzRoll;
}());
var RnzState = {
    cubesCount: 10,
    rangeMin: 1,
    rangeMax: 5,
    rollName: 'Unbenannt',
    selectedRoll: null,
    rollHistory: [],
    localStorageEnabled: localStorage && true,
    usedIds: []
};
var RnzMisc = {
    generateId: function () {
        while (true) {
            var rand = Math.random().toString(20).substr(2, 9);
            if (RnzState.usedIds.indexOf(rand) == -1) {
                return RnzState.usedIds[RnzState.usedIds.push(rand) - 1];
            }
        }
    }
};
var RnzDice = {
    load: function () {
        if (!RnzState.localStorageEnabled) {
            console.warn('LocalStorage disabled');
            return false;
        }
        RnzState = __assign(__assign({}, RnzState), JSON.parse(localStorage.getItem('pnpt-cheap')));
    },
    save: function (rerender) {
        if (rerender === void 0) { rerender = false; }
        if (!RnzState.localStorageEnabled) {
            return false;
        }
        localStorage.setItem('pnpt-cheap', JSON.stringify(RnzState));
        if (rerender) {
            RnzDice.render();
        }
    },
    roll: function () {
        var settings = RnzDice.getCurrentSettings();
        var setup = Array(settings.cubesCount).fill(0);
        var result = setup.reduce(function (rollItems, item, ind) {
            var min = Math.ceil(settings.rangeMin);
            var max = Math.floor(settings.rangeMax);
            var rand = Math.floor(Math.random() * (max - min + 1) + min);
            var existingRoll = rollItems.find(function (item) { return item.value == rand; });
            var roll = {
                value: rand,
                color: (existingRoll && existingRoll.color) ||
                    Math.random().toString(16).slice(-6)
            };
            return __spreadArrays(rollItems, [roll]);
        }, []);
        var roll = __assign(__assign({}, new RnzRoll(settings, result)), { timestamp: +new Date() });
        // reset selected roll to show the important one - the new rolled roll
        RnzState.rollHistory.push(roll);
        RnzState.selectedRoll = roll.id;
        RnzDice.save();
        return RnzDice.getActiveRoll();
    },
    getActiveRoll: function () {
        var selected = RnzState.selectedRoll;
        var history = RnzState.rollHistory;
        return ((history.length &&
            (selected
                ? history.find(function (item) { return item.id == selected; })
                : history[history.length - 1])) ||
            false);
    },
    getPreviousRoll: function () {
        var activeRoll = RnzDice.getActiveRoll();
        if (activeRoll === undefined) {
            return false;
        }
        var history = RnzState.rollHistory;
        var ind = history.findIndex(function (entry) { return entry.id == activeRoll.id; });
        if (ind == -1) {
            return false;
        }
        return ind == 0 ? false : history[ind - 1];
    },
    setPreviousRoll: function () {
        var activeRoll = RnzDice.getActiveRoll();
        if (activeRoll === undefined) {
            return false;
        }
        var history = RnzState.rollHistory;
        var ind = history.findIndex(function (entry) { return entry.id == activeRoll.id; });
        if (ind == 0) {
            return true;
        }
        RnzState.selectedRoll = history[ind - 1].id;
        RnzDice.save();
    },
    getNextRoll: function () {
        var activeRoll = RnzDice.getActiveRoll();
        if (activeRoll === undefined) {
            return false;
        }
        var history = RnzState.rollHistory;
        var ind = history.findIndex(function (entry) { return entry.id == activeRoll.id; });
        return ind >= history.length - 1 ? false : history[ind + 1];
    },
    setNextRoll: function () {
        var activeRoll = RnzDice.getActiveRoll();
        if (activeRoll === undefined) {
            return false;
        }
        var history = RnzState.rollHistory;
        var ind = history.findIndex(function (entry) { return entry.id == activeRoll.id; });
        if (ind >= history.length - 1) {
            return true;
        }
        RnzState.selectedRoll = history[ind + 1].id;
        RnzDice.save();
    },
    getCurrentSettings: function () {
        return {
            cubesCount: RnzState.cubesCount,
            rangeMin: RnzState.rangeMin,
            rangeMax: RnzState.rangeMax,
            rollName: RnzState.rollName
        };
    },
    dom_buildActiveRollResults: function () {
        var _a;
        var activeRoll = RnzDice.getActiveRoll();
        if (!activeRoll) {
            return $('<p class="text-title">Kein Wurf ausgewählt</p>');
        }
        var $mapped = activeRoll.result.map(function (_a, it) {
            var value = _a.value, color = _a.color;
            return $("<p></p>")
                .addClass("roll-item " + it + " list-item text-title")
                .html(value)
                .css('background', '#' + color);
        });
        return (_a = $('<div class="roll-items grid"></div>')).append.apply(_a, $mapped);
    },
    dom_buildActiveRollGroups: function () {
        var activeRoll = RnzDice.getActiveRoll();
        if (!activeRoll) {
            return $('<p class="text-title"></p>');
        }
        var entries = __spreadArrays(Object.entries(activeRoll.groups));
        var $mapped = entries.map(function (_a) {
            var value = _a[0], ind = _a[1];
            var entry = activeRoll.result.find(function (item) { return item.value == value; });
            return $('<p></p>')
                .addClass('roll-group-item list-item')
                .html(value + ' x' + ind)
                .css('background', '#' + entry.color);
        });
        return $mapped;
    },
    dom_buildRollHistory: function () {
        var history = RnzState.rollHistory.sort(function (prev, next) {
            // console.log(prev, next, prev.timestamp < next.timestamp);
            return true;
        });
        if (!history.length) {
            return $('<p class="text-title">Es haben noch keine Würfe stattgefunden</p>');
        }
        var $mapped = history.map(function (roll) {
            var $container = $('<li></li>');
            $container.addClass('history-item list-item');
            var groupEntries = __spreadArrays(Object.entries(roll.groups));
            var $mappedGroups = groupEntries.map(function (_a) {
                var value = _a[0], ind = _a[1];
                var entry = roll.result.find(function (item) { return item.value == value; });
                return $('<p></p>')
                    .addClass('group-item list-item')
                    .html(value + ' x' + ind)
                    .css('background', '#' + entry.color);
            });
            var date = new Date(roll.timestamp);
            var hours = date.getHours();
            var minutes = '0' + date.getMinutes();
            var seconds = '0' + date.getSeconds();
            var dateString = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
            var $rollTitle = $('<p class="roll-title"></p>');
            $rollTitle.append($('<span></span>').html(dateString));
            $rollTitle.append($('<span> - </span>'));
            $rollTitle.append($('<span></span>').html(roll.settings.rollName));
            var $groupsWrap = $('<ul class="groups flex flex-h"></ul>');
            $groupsWrap.append();
            $groupsWrap.append($mappedGroups);
            $container.append($rollTitle);
            $container.append($groupsWrap);
            return $container;
        });
        return $mapped;
    },
    onOptionsChange: function (evt) {
        var value = evt.target.value;
        switch (evt.target.name) {
            case 'cubes-count':
                RnzState.cubesCount = parseInt(value) || 1;
                break;
            case 'range-min':
                RnzState.rangeMin =
                    parseInt(value) > RnzState.rangeMax
                        ? RnzState.rangeMax
                        : parseInt(value);
                break;
            case 'range-max':
                RnzState.rangeMax = parseInt(value) || RnzState.rangeMin;
                break;
            case 'roll-name':
                RnzState.rollName = value;
                break;
        }
        RnzDice.save();
    },
    // rainbowArray(array, phase) {
    //     if (phase == undefined) phase = Math.random();
    //     let center = 128;
    //     let width = 127;
    //     let frequency = (Math.PI * 2) / array.length;
    //     let items = [];
    //     for (var i = 0; i < array.length; ++i) {
    //         red = Math.sin(frequency * i + 2 + (phase % 10)) * width + center;
    //         green = Math.sin(frequency * i + 0 + (phase % 10)) * width + center;
    //         blue = Math.sin(frequency * i + 4 + (phase % 10)) * width + center;
    //         items.push({ red, green, blue, value: array[i] });
    //     }
    //     return items;
    // },
    onRoll: function (evt) {
        evt.preventDefault();
        RnzDice.roll();
        RnzDice.render();
    },
    render: function () {
        $('#app').empty();
        //---------------------------------------------------------------------
        // left side
        var $leftSide = $('<div></div>');
        $leftSide.addClass('left list-item flex flex-v col col-6');
        // form inputs
        var $inputCubesCount = $("<div class=\"form-field flex flex-h flex-align\">\n\t\t\t\t<div class=\"form-field-title\">\n\t\t\t\t\t<label>W\u00FCrfelanzahl</label>\n\t\t\t\t</div>\n\t\t\t\t<div class=\"form-field-wrapper\">\n\t\t\t\t\t<input id=\"cubes-count\" name=\"cubes-count\" type=\"number\" min=\"1\" step=\"1\" value=\"" + RnzState.cubesCount + "\" required/>\n\t\t\t\t</div>\n\t\t\t</div>");
        var $inputRangeMin = $("<div class=\"form-field flex flex-h flex-align\">\n\t\t\t\t<div class=\"form-field-title\">\n\t\t\t\t\t<label>Augenzahl Min</label>\n\t\t\t\t</div>\n\t\t\t\t<div class=\"form-field-wrapper\">\n\t\t\t\t\t<input id=\"range-min\" name=\"range-min\" type=\"number\" min=\"0\" max=\"" + RnzState.rangeMax + "\" step=\"1\" value=\"" + RnzState.rangeMin + "\" required/>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t\t");
        var $inputRangeMax = $("<div class=\"form-field flex flex-h flex-align\">\n\t\t\t\t<div class=\"form-field-title\">\n\t\t\t\t\t<label>Augenzahl Max</label>\n\t\t\t\t</div>\n\t\t\t\t<div class=\"form-field-wrapper\">\n\t\t\t\t\t<input id=\"range-max\" name=\"range-max\" type=\"number\" min=\"" + RnzState.rangeMin + "\" step=\"1\" value=\"" + RnzState.rangeMax + "\" required/>\n\t\t\t\t</div>\n\t\t\t</div>");
        var $inputRollName = $("<div class=\"form-field flex flex-h flex-align\">\n\t\t\t\t<div class=\"form-field-title\">\n\t\t\t\t\t<label>Name des Wurfes<label>\n\t\t\t\t</div>\n\t\t\t\t<div class=\"form-field-wrapper\">\n\t\t\t\t\t<input id=\"roll-name\" name=\"roll-name\" value=\"" + RnzState.rollName + "\" required/>\n\t\t\t\t</div>\n\t\t\t</div>");
        var $rollSubmit = $('<button type="submit">Roll</button>');
        $rollSubmit = $rollSubmit.addClass('btn btn-info');
        $inputCubesCount.on('change', RnzDice.onOptionsChange);
        $inputRangeMin.on('change', RnzDice.onOptionsChange);
        $inputRangeMax.on('change', RnzDice.onOptionsChange);
        $inputRollName.on('change', RnzDice.onOptionsChange);
        // options / roll form
        var $rollFormWrap = $('<div></div>');
        var $rollForm = $('<form method="post"></form>');
        $rollForm.addClass('options container-box list-item form flex flex-v');
        $rollForm.on('submit', RnzDice.onRoll);
        $rollForm.append($inputCubesCount, $inputRangeMin, $inputRangeMax, $inputRollName, $rollSubmit);
        // prev/ next roll
        var prevRoll = RnzDice.getPreviousRoll();
        var nextRoll = RnzDice.getNextRoll();
        var $prevRoll = $('<button></button>');
        var $nextRoll = $('<button></button>');
        if (prevRoll != false) {
            $prevRoll.html('Vorheriger Wurf | ' + prevRoll.settings.rollName);
            $prevRoll.on('click', function () {
                RnzDice.setPreviousRoll();
                RnzDice.render();
            });
        }
        else {
            $prevRoll.html('Vorheriger Wurf').attr('disabled', true);
        }
        if (nextRoll != false) {
            $nextRoll.html('Nächster Wurf | ' + nextRoll.settings.rollName);
            $nextRoll.on('click', function () {
                RnzDice.setNextRoll();
                RnzDice.render();
            });
        }
        else {
            $nextRoll.html('Nächster Wurf').attr('disabled', true);
        }
        $rollStepSelection = $('<div class="list-item flex flex-h"></div>').append($prevRoll, $nextRoll);
        $rollFormWrap.append($rollForm);
        $leftSide.append($rollFormWrap);
        $leftSide.append($rollStepSelection);
        //---------------------------------------------------------------------
        // right side
        var $rightSide = $('<div></div>');
        $rightSide.addClass('right list-item flex flex-v col col-6');
        var activeRoll = RnzDice.getActiveRoll();
        var $titleActiveRoll = $('<p class="text-title"></p>').html(activeRoll ? activeRoll.settings.rollName : 'Kein Wurf ausgewählt');
        // groups
        var $rollGroups = $('<div></div>');
        $rollGroups.addClass('roll-groups container-box grid');
        $rollGroups.append(RnzDice.dom_buildActiveRollGroups());
        // result items
        var $rollResultWrap = $('<div></div>');
        $rollResultWrap.addClass('roll-results container-box grid');
        $rollResultWrap.append(RnzDice.dom_buildActiveRollResults());
        $rightSide.append($titleActiveRoll);
        $rightSide.append($rollGroups);
        $rightSide.append($rollResultWrap);
        var $main = $('<div class="flex flex-h"></div>');
        $main.append($leftSide, $rightSide);
        //---------------------------------------------------------------------
        // bottom
        var $bottom = $('<div></div>');
        var $rollHistory = $('<div class="roll-history flex flex-v"></div>');
        var $rollHistoryItems = RnzDice.dom_buildRollHistory();
        $rollHistoryTitle = $('<p class="text-title">Wurf-Verlauf</p>');
        $rollHistoryTitle.on('click', function () {
            var $items = $('.history-item');
            $items.slideToggle();
            // console.log();
            // $('.history-item').eq().slideToggle()
        });
        $rollHistory.append($rollHistoryTitle);
        $rollHistory.append($rollHistoryItems);
        var $app = $('#app');
        $app.append($main);
        $app.append('<hr />');
        $app.append($rollHistory);
    }
};
document.addEventListener('DOMContentLoaded', function () {
    RnzDice.load();
    RnzDice.render();
});
