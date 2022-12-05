const assert = require('assert');
const session = require('express-session');
const expect = require('chai').expect;
const done = require("chai").done;
const flightCompleteMW = require("../../../middleware/flights/flightCompleteMW");

describe('complete a flight middleware', function () {
    it('should call next() if res.locals.route is undefined', function () {
        let mockObjRepo = {};
        let mockReq = {};
        let mockRes = {
            locals: {
                route: undefined,
            },
        };

        const mw = flightCompleteMW(mockObjRepo);
        mw(mockReq,
            mockRes,
            (err) => {
                expect(err).to.be.equal(undefined);
                done;
            }
        );
    });
    it('should call next() if there is a db error', function () {
        let mockObjRepo = {};
        let mockReq = {};
        let mockRes = {
            locals: {
                aircraft: {
                    _id: 12,
                },
                route: {
                    Done: false,
                    save: (cb) => {
                        cb("valamilyen db hiba");
                    },
                },
            },
            redirect: (dest) => {},
        };

        const mw = flightCompleteMW(mockObjRepo);
        mw(mockReq,
            mockRes,
            (err) => {
                expect(err).to.be.equal("valamilyen db hiba");
            }
        );
    });
    it('should set res.locals.route.Done to True, then redirect to /futureflights/"aircraftid" ', function () {
        let mockObjRepo = {};
        let mockReq = {};
        let mockRes = {
            locals: {
                aircraft: {
                    _id: 12,
                },
                route: {
                    Done: false,
                    save: (cb) => {
                        cb(null);
                    },
                },
            },
            redirect: (dest) => {
                expect(mockRes.locals.route.Done).to.be.equal(true);
                expect(dest).to.be.equal(`/futureflights/12`);   // (`/futureflights/${mockRes.locals.aircraft._id}/1`);
            },
        };

        const mw = flightCompleteMW(mockObjRepo);
        mw(mockReq,
            mockRes,
            (err) => {
                expect(err).to.be.equal(undefined);
            }
        );
    });
});