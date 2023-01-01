/*
 * round-off-value-list
 * https://github.com/lets-fiware/round-off-value-list-operator
 *
 * Copyright (c) 2019-2023 Kazuhito Suda
 * Licensed under the MIT license.
 */

/* globals MockMP */

(function () {

    "use strict";

    describe("RoundOffValueList", function () {

        beforeAll(function () {
            window.MashupPlatform = new MockMP({
                type: 'operator',
                prefs: {
                    "mode": "exception",
                    "math": "none",
                    "point": "integer",
                    "send_nulls": true,
                },
                inputs: ['input'],
                outputs: ['output']
            });
        });

        beforeEach(function () {
            MashupPlatform.reset();
            MashupPlatform.operator.outputs.output.connect({simulate: () => {}});
        });

        it("math no operation : string", function () {
            MashupPlatform.prefs.set("math", "none");

            roundOffList(["123.45", "567.8"]);

            expect(MashupPlatform.wiring.pushEvent).toHaveBeenCalledWith('output', [123.45, 567.8]);
        });

        it("math no operation : number", function () {
            MashupPlatform.prefs.set("math", "none");

            roundOffList([567.89, 1234.5]);

            expect(MashupPlatform.wiring.pushEvent).toHaveBeenCalledWith('output', [567.89, 1234.5]);
        });

        it("round : integer", function () {
            MashupPlatform.prefs.set("math", "round");
            MashupPlatform.prefs.set("point", "integer");

            roundOffList([123.4567, 567.8]);

            expect(MashupPlatform.wiring.pushEvent).toHaveBeenCalledWith('output', [123, 568]);
        });

        it("round : first", function () {
            MashupPlatform.prefs.set("math", "round");
            MashupPlatform.prefs.set("point", "first");

            roundOffList([123.4567, 124.99, 568]);

            expect(MashupPlatform.wiring.pushEvent).toHaveBeenCalledWith('output', [123.5, 125, 568]);
        });

        it("round : second", function () {
            MashupPlatform.prefs.set("math", "round");
            MashupPlatform.prefs.set("point", "second");

            roundOffList([123.4567, 999, 123.123]);

            expect(MashupPlatform.wiring.pushEvent).toHaveBeenCalledWith('output', [123.46, 999, 123.12]);
        });

        it("round : third", function () {
            MashupPlatform.prefs.set("math", "round");
            MashupPlatform.prefs.set("point", "third");

            roundOffList([123.4567, -123.123123, 5678.1111]);

            expect(MashupPlatform.wiring.pushEvent).toHaveBeenCalledWith('output', [123.457, -123.123, 5678.111]);
        });

        it("floor: integer", function () {
            MashupPlatform.prefs.set("math", "floor");
            MashupPlatform.prefs.set("point", "integer");

            roundOffList([8.4, 8.6, -8.4, -8.6]);

            expect(MashupPlatform.wiring.pushEvent).toHaveBeenCalledWith('output', [8, 8, -9, -9]);
        });


        it("ceil: integer", function () {
            MashupPlatform.prefs.set("math", "ceil");
            MashupPlatform.prefs.set("point", "integer");

            roundOffList([8.4, 8.6, -8.4, -8.6]);

            expect(MashupPlatform.wiring.pushEvent).toHaveBeenCalledWith('output', [9, 9, -8, -8]);
        });

        it("trunc: integer", function () {
            MashupPlatform.prefs.set("math", "ceil");
            MashupPlatform.prefs.set("point", "integer");

            roundOffList([5.4, 5.6, -5.4, -5.6]);

            expect(MashupPlatform.wiring.pushEvent).toHaveBeenCalledWith('output', [6, 6, -5, -5]);
        });

        it("allowed to send nulls", function () {
            MashupPlatform.prefs.set("send_nulls", true);

            roundOffList(null);

            expect(MashupPlatform.wiring.pushEvent).toHaveBeenCalledWith('output', null);
        });

        it("disallowed to send nulls", function () {
            MashupPlatform.prefs.set("send_nulls", false);

            roundOffList(null);

            expect(MashupPlatform.wiring.pushEvent).not.toHaveBeenCalled();
        });

        it("parameter error : mode : exception", function () {
            MashupPlatform.prefs.set("mode", "exception");

            expect(function () {
                roundOffList(["missing data"]);
            }).toThrowError(MashupPlatform.wiring.EndpointTypeError);
        });

        it("parameter error : mode : remove", function () {
            MashupPlatform.prefs.set("math", "none");
            MashupPlatform.prefs.set("mode", "remove");

            roundOffList(["missing data", 123, 456]);

            expect(MashupPlatform.wiring.pushEvent).toHaveBeenCalledWith('output', [123, 456]);
        });

        it("parameter error : mode : pass", function () {
            MashupPlatform.prefs.set("mode", "pass");

            roundOffList(["missing data"]);

            expect(MashupPlatform.wiring.pushEvent).toHaveBeenCalledWith('output', ["missing data"]);
        });

        it("throws an Endpoint Value error if illegal data is received", function () {
            expect(function () {
                roundOffList("{");
            }).toThrowError(MashupPlatform.wiring.EndpointTypeError);
        });

        it("throws an Endpoint Value error if illegal data is received", function () {
            expect(function () {
                roundOffList(123);
            }).toThrowError(MashupPlatform.wiring.EndpointTypeError);
        });
    });
})();
