class RnzRoll {
    constructor(settings, result) {
        this.id = RnzMisc.generateId();
        this.settings = settings;
        this.result = result;
        this.groups = [];

        this.buildGroups();
    }

    buildGroups() {
        this.groups = this.result.reduce((acc, curr) => {
            return {
                ...acc,
                [curr.value]: acc[curr.value] ? acc[curr.value] + 1 : 1
            };
        }, {});
    }
}

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
    generateId() {
        while (true) {
            const rand = Math.random().toString(20).substr(2, 9);

            if (RnzState.usedIds.indexOf(rand) == -1) {
                return RnzState.usedIds[RnzState.usedIds.push(rand) - 1];
            }
        }
    }
};

var RnzDice = {
    load() {
        if (!RnzState.localStorageEnabled) {
            console.warn('LocalStorage disabled');
            return false;
        }

        RnzState = {
            ...RnzState,
            ...JSON.parse(localStorage.getItem('pnpt-cheap'))
        };
    },

    save(rerender = false) {
        if (!RnzState.localStorageEnabled) {
            return false;
        }

        localStorage.setItem('pnpt-cheap', JSON.stringify(RnzState));

        if (rerender) {
            RnzDice.render();
        }
    },

    roll() {
        const settings = RnzDice.getCurrentSettings();
        const setup = Array(settings.cubesCount).fill(0);

        const result = setup.reduce((rollItems, item, ind) => {
            const min = Math.ceil(settings.rangeMin);
            const max = Math.floor(settings.rangeMax);
            const rand = Math.floor(Math.random() * (max - min + 1) + min);
            const existingRoll = rollItems.find((item) => item.value == rand);

            const roll = {
                value: rand,
                color:
                    (existingRoll && existingRoll.color) ||
                    Math.random().toString(16).slice(-6)
            };

            return [...rollItems, roll];
        }, []);

        const roll = {
            ...new RnzRoll(settings, result),
            timestamp: +new Date()
        };

        // reset selected roll to show the important one - the new rolled roll
        RnzState.rollHistory.push(roll);
        RnzState.selectedRoll = roll.id;

        RnzDice.save();

        return RnzDice.getActiveRoll();
    },

    getActiveRoll() {
        const selected = RnzState.selectedRoll;
        const history = RnzState.rollHistory;

        return (
            (history.length &&
                (selected
                    ? history.find((item) => item.id == selected)
                    : history[history.length - 1])) ||
            false
        );
    },

    getPreviousRoll() {
        const activeRoll = RnzDice.getActiveRoll();

        if (activeRoll === undefined) {
            return false;
        }

        const history = RnzState.rollHistory;
        const ind = history.findIndex((entry) => entry.id == activeRoll.id);

        if (ind == -1) {
            return false;
        }

        return ind == 0 ? false : history[ind - 1];
    },

    setPreviousRoll() {
        const activeRoll = RnzDice.getActiveRoll();

        if (activeRoll === undefined) {
            return false;
        }

        const history = RnzState.rollHistory;
        const ind = history.findIndex((entry) => entry.id == activeRoll.id);

        if (ind == 0) {
            return true;
        }

        RnzState.selectedRoll = history[ind - 1].id;
        RnzDice.save();
    },

    getNextRoll() {
        const activeRoll = RnzDice.getActiveRoll();

        if (activeRoll === undefined) {
            return false;
        }

        const history = RnzState.rollHistory;
        const ind = history.findIndex((entry) => entry.id == activeRoll.id);

        return ind >= history.length - 1 ? false : history[ind + 1];
    },

    setNextRoll() {
        const activeRoll = RnzDice.getActiveRoll();

        if (activeRoll === undefined) {
            return false;
        }

        const history = RnzState.rollHistory;
        const ind = history.findIndex((entry) => entry.id == activeRoll.id);

        if (ind >= history.length - 1) {
            return true;
        }

        RnzState.selectedRoll = history[ind + 1].id;
        RnzDice.save();
    },

    getCurrentSettings() {
        return {
            cubesCount: RnzState.cubesCount,
            rangeMin: RnzState.rangeMin,
            rangeMax: RnzState.rangeMax,
            rollName: RnzState.rollName
        };
    },

    dom_buildActiveRollResults() {
        const activeRoll = RnzDice.getActiveRoll();

        if (!activeRoll) {
            return $('<p class="text-title">Kein Wurf ausgewählt</p>');
        }

        const $mapped = activeRoll.result.map(({ value, color }, it) => {
            return $(`<p></p>`)
                .addClass(`roll-item ${it} list-item text-title`)
                .html(value)
                .css('background', '#' + color);
        });

        return $('<div class="roll-items grid"></div>').append(...$mapped);
    },

    dom_buildActiveRollGroups() {
        const activeRoll = RnzDice.getActiveRoll();

        if (!activeRoll) {
            return $('<p class="text-title"></p>');
        }

        const entries = [...Object.entries(activeRoll.groups)];
        const $mapped = entries.map(([value, ind]) => {
            const entry = activeRoll.result.find((item) => item.value == value);
            return $('<p></p>')
                .addClass('roll-group-item list-item')
                .html(value + ' x' + ind)
                .css('background', '#' + entry.color);
        });

        return $mapped;
    },

    dom_buildRollHistory() {
        const history = RnzState.rollHistory.sort((prev, next) => {
            // console.log(prev, next, prev.timestamp < next.timestamp);
            return true;
        });

        if (!history.length) {
            return $(
                '<p class="text-title">Es haben noch keine Würfe stattgefunden</p>'
            );
        }

        const $mapped = history.map((roll) => {
            const $container = $('<li></li>');
            $container.addClass('history-item list-item');

            const groupEntries = [...Object.entries(roll.groups)];
            const $mappedGroups = groupEntries.map(([value, ind]) => {
                const entry = roll.result.find((item) => item.value == value);
                return $('<p></p>')
                    .addClass('group-item list-item')
                    .html(value + ' x' + ind)
                    .css('background', '#' + entry.color);
            });

            const date = new Date(roll.timestamp);
            const hours = date.getHours();
            const minutes = '0' + date.getMinutes();
            const seconds = '0' + date.getSeconds();

            const dateString =
                hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);

            const $rollTitle = $('<p class="roll-title"></p>');
            $rollTitle.append($('<span></span>').html(dateString));
            $rollTitle.append($('<span> - </span>'));
            $rollTitle.append($('<span></span>').html(roll.settings.rollName));

            const $groupsWrap = $('<ul class="groups flex flex-h"></ul>');
            $groupsWrap.append();
            $groupsWrap.append($mappedGroups);

            $container.append($rollTitle);
            $container.append($groupsWrap);

            return $container;
        });

        return $mapped;
    },

    onOptionsChange(evt) {
        const value = evt.target.value;

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

    onRoll(evt) {
        evt.preventDefault();

        RnzDice.roll();
        RnzDice.render();
    },

    render() {
        $('#app').empty();

        //---------------------------------------------------------------------
        // left side
        const $leftSide = $('<div></div>');
        $leftSide.addClass('left list-item flex flex-v col col-6');

        // form inputs
        const $inputCubesCount = $(
            `<div class="form-field flex flex-h flex-align">
				<div class="form-field-title">
					<label>Würfelanzahl</label>
				</div>
				<div class="form-field-wrapper">
					<input id="cubes-count" name="cubes-count" type="number" min="1" step="1" value="${RnzState.cubesCount}" required/>
				</div>
			</div>`
        );

        const $inputRangeMin = $(
            `<div class="form-field flex flex-h flex-align">
				<div class="form-field-title">
					<label>Augenzahl Min</label>
				</div>
				<div class="form-field-wrapper">
					<input id="range-min" name="range-min" type="number" min="0" max="${RnzState.rangeMax}" step="1" value="${RnzState.rangeMin}" required/>
				</div>
			</div>
			`
        );

        const $inputRangeMax = $(
            `<div class="form-field flex flex-h flex-align">
				<div class="form-field-title">
					<label>Augenzahl Max</label>
				</div>
				<div class="form-field-wrapper">
					<input id="range-max" name="range-max" type="number" min="${RnzState.rangeMin}" step="1" value="${RnzState.rangeMax}" required/>
				</div>
			</div>`
        );

        const $inputRollName = $(
            `<div class="form-field flex flex-h flex-align">
				<div class="form-field-title">
					<label>Name des Wurfes<label>
				</div>
				<div class="form-field-wrapper">
					<input id="roll-name" name="roll-name" value="${RnzState.rollName}" required/>
				</div>
			</div>`
        );

        let $rollSubmit = $('<button type="submit">Roll</button>');
        $rollSubmit = $rollSubmit.addClass('btn btn-info');

        $inputCubesCount.on('change', RnzDice.onOptionsChange);
        $inputRangeMin.on('change', RnzDice.onOptionsChange);
        $inputRangeMax.on('change', RnzDice.onOptionsChange);
        $inputRollName.on('change', RnzDice.onOptionsChange);

        // options / roll form
        const $rollFormWrap = $('<div></div>');
        const $rollForm = $('<form method="post"></form>');
        $rollForm.addClass('options container-box list-item form flex flex-v');
        $rollForm.on('submit', RnzDice.onRoll);
        $rollForm.append(
            $inputCubesCount,
            $inputRangeMin,
            $inputRangeMax,
            $inputRollName,
            $rollSubmit
        );

        // prev/ next roll
        const prevRoll = RnzDice.getPreviousRoll();
        const nextRoll = RnzDice.getNextRoll();

        const $prevRoll = $('<button></button>');
        const $nextRoll = $('<button></button>');

        if (prevRoll != false) {
            $prevRoll.html('Vorheriger Wurf | ' + prevRoll.settings.rollName);
            $prevRoll.on('click', () => {
                RnzDice.setPreviousRoll();
                RnzDice.render();
            });
        } else {
            $prevRoll.html('Vorheriger Wurf').attr('disabled', true);
        }

        if (nextRoll != false) {
            $nextRoll.html('Nächster Wurf | ' + nextRoll.settings.rollName);
            $nextRoll.on('click', () => {
                RnzDice.setNextRoll();
                RnzDice.render();
            });
        } else {
            $nextRoll.html('Nächster Wurf').attr('disabled', true);
        }

        $rollStepSelection = $(
            '<div class="list-item flex flex-h"></div>'
        ).append($prevRoll, $nextRoll);

        $rollFormWrap.append($rollForm);

        $leftSide.append($rollFormWrap);
        $leftSide.append($rollStepSelection);

        //---------------------------------------------------------------------
        // right side
        const $rightSide = $('<div></div>');
        $rightSide.addClass('right list-item flex flex-v col col-6');

        const activeRoll = RnzDice.getActiveRoll();

        const $titleActiveRoll = $('<p class="text-title"></p>').html(
            activeRoll ? activeRoll.settings.rollName : 'Kein Wurf ausgewählt'
        );

        // groups
        const $rollGroups = $('<div></div>');
        $rollGroups.addClass('roll-groups container-box grid');
        $rollGroups.append(RnzDice.dom_buildActiveRollGroups());

        // result items
        const $rollResultWrap = $('<div></div>');
        $rollResultWrap.addClass('roll-results container-box grid');
        $rollResultWrap.append(RnzDice.dom_buildActiveRollResults());

        $rightSide.append($titleActiveRoll);
        $rightSide.append($rollGroups);
        $rightSide.append($rollResultWrap);

        const $main = $('<div class="flex flex-h"></div>');
        $main.append($leftSide, $rightSide);

        //---------------------------------------------------------------------
        // bottom
        const $bottom = $('<div></div>');

        const $rollHistory = $('<div class="roll-history flex flex-v"></div>');
        const $rollHistoryItems = RnzDice.dom_buildRollHistory();

        $rollHistoryTitle = $('<p class="text-title">Wurf-Verlauf</p>');
        $rollHistoryTitle.on('click', () => {
            const $items = $('.history-item');

            $items.slideToggle();
            // console.log();
            // $('.history-item').eq().slideToggle()
        });

        $rollHistory.append($rollHistoryTitle);
        $rollHistory.append($rollHistoryItems);

        const $app = $('#app');
        $app.append($main);
        $app.append('<hr />');
        $app.append($rollHistory);
    }
};

document.addEventListener('DOMContentLoaded', () => {
    RnzDice.load();
    RnzDice.render();
});
