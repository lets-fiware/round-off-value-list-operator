/*
 * round-off-value-list
 * https://github.com/lets-fiware/round-off-value-list-operator
 *
 * Copyright (c) 2019-2023 Kazuhito Suda
 * Licensed under the MIT license.
 */

(function () {

    "use strict";
    var parseInputEndpointData = function parseInputEndpointData(data) {
        if (typeof data === "string") {
            try {
                data = JSON.parse(data);
            } catch (e) {
                throw new MashupPlatform.wiring.EndpointTypeError();
            }
        }

        if (data != null && !Array.isArray(data)) {
            throw new MashupPlatform.wiring.EndpointTypeError();
        }

        return data;
    };

    var pushEvent = function pushEvent(data) {
        if (MashupPlatform.operator.outputs.output.connected) {
            MashupPlatform.wiring.pushEvent("output", data);
        }
    }

    var mathTable = {"none": "", "round": "Math.round", "floor": "Math.floor", "ceil": "Math.ceil", "trunc": "Math.trunc" };
    var shiftTable = {"integer": "1", "first": "10", "second": "100", "third": "1000" };

    var makeFunction = function makeFunction() {
        var formula = mathTable[MashupPlatform.prefs.get('math')];
        var shift = shiftTable[MashupPlatform.prefs.get('point')];

        var formula = formula + ((formula === "" || shift === 1) ? '(value)' : '(value*' + shift + ')/' + shift);

        return new Function('value', '"use strict";value = parseFloat(value);return (' + formula + ')');
    }

    var roundOffList = function roundOffList(list) {
        list = parseInputEndpointData(list);
        var mathFunc = makeFunction();
        var mode = MashupPlatform.prefs.get('mode');

        if (list != null) {
            var newList = list.map(function (value) {
                if (!isNaN(value)) {
                    return mathFunc(value);
                } else {
                    if (mode === "exception") {
                        throw new MashupPlatform.wiring.EndpointTypeError();
                    } else if (mode === "pass") {
                        return value;
                    } // remove
                }
                return null;
            });

            newList = newList.filter(v => v);
            pushEvent(newList);

        } else {
            if (MashupPlatform.prefs.get("send_nulls")) {
                pushEvent(list);
            }
        }
    }

    /* TODO
     * this if is required for testing, but we have to search a cleaner way
     */
    if (window.MashupPlatform != null) {
        MashupPlatform.wiring.registerCallback("input", roundOffList);
    }

    /* test-code */
    window.roundOffList = roundOffList;
    /* end-test-code */

})();
