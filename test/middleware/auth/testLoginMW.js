const assert = require('assert');
const session = require('express-session');
const expect = require('chai').expect;
const done = require("chai").done;
const loginMW = require("../../../middleware/auth/loginMW");

describe('login middleware', function () {
    it('should call next() if username and password are undefined', function () {
        let mockObjRepo = {
            UserModel: {}
        };
        let mockReq = {
            body: {
                Username: undefined,
                Password: undefined,
            },
        };
        let mockRes = {};

        const mw = loginMW(mockObjRepo);
        mw(mockReq,
            mockRes,
            (err) => {
                expect(err).to.be.equal(undefined);
                done;
            }
        );
    });
    it('should call next() if username is undefined', function () {
        let mockObjRepo = {
            UserModel: {}
        };
        let mockReq = {
            body: {
                Username: undefined,
                Password: "jelszo",
            },
        };
        let mockRes = {};

        const mw = loginMW(mockObjRepo);
        mw(mockReq,
            mockRes,
            (err) => {
                expect(err).to.be.equal(undefined);
                done;
            }
        );
    });
    it('should call next() if password is undefined', function () {
        let mockObjRepo = {
            UserModel: {}
        };
        let mockReq = {
            body: {
                Username: "felhasznalo",
                Password: undefined,
            },
        };
        let mockRes = {};

        const mw = loginMW(mockObjRepo);
        mw(mockReq,
            mockRes,
            (err) => {
                expect(err).to.be.equal(undefined);
                done;
            }
        );
    });
    it('should call next() and set res.locals.error="Fill out all fields!" if username and password are empty strings', function () {
        let mockObjRepo = {
            UserModel: {}
        };
        let mockReq = {
            body: {
                Username: "",
                Password: "",
            },
        };
        let mockRes = {
            locals: {
                error: undefined,
            }
        };

        const mw = loginMW(mockObjRepo);
        mw(mockReq,
            mockRes,
            (err) => {
                expect(err).to.be.equal(undefined);
                expect(mockRes.locals.error).to.be.equal("Fill out all fields!");
                done;
            }
        );
    });
    it('should call next() and set res.locals.error="Fill out all fields!" if username is an empty string', function () {
        let mockObjRepo = {
            UserModel: {}
        };
        let mockReq = {
            body: {
                Username: "",
                Password: "pass",
            },
        };
        let mockRes = {
            locals: {
                error: undefined,
            }
        };

        const mw = loginMW(mockObjRepo);
        mw(mockReq,
            mockRes,
            (err) => {
                expect(err).to.be.equal(undefined);
                expect(mockRes.locals.error).to.be.equal("Fill out all fields!");
                done;
            }
        );
    });
    it('should call next() and set res.locals.error="Fill out all fields!" if password is an empty string', function () {
        let mockObjRepo = {
            UserModel: {}
        };
        let mockReq = {
            body: {
                Username: "user",
                Password: "",
            },
        };
        let mockRes = {
            locals: {
                error: undefined,
            }
        };

        const mw = loginMW(mockObjRepo);
        mw(mockReq,
            mockRes,
            (err) => {
                expect(err).to.be.equal(undefined);
                expect(mockRes.locals.error).to.be.equal("Fill out all fields!");
                done;
            }
        );
    });
    it('should call next() and set res.locals.error="Wrong username!" if there is a db error', function () {
        let mockObjRepo = {
            UserModel: {
                findOne: (p1, cb) => {
                    cb("db_hiba", null)
                },
            }
        };
        let mockReq = {
            body: {
                Username: "user",
                Password: "pass",
            },
        };
        let mockRes = {
            locals: {
                error: undefined,
            }
        };

        const mw = loginMW(mockObjRepo);
        mw(mockReq,
            mockRes,
            (err) => {
                expect(err).to.be.equal("db_hiba");
                expect(mockRes.locals.error).to.be.equal("Wrong username!");
                done;
            }
        );
    });
    it('should call next() and set res.locals.error="Wrong username!" if there is no result', function () {
        let mockObjRepo = {
            UserModel: {
                findOne: (p1, cb) => {
                    cb(undefined, null)
                },
            }
        };
        let mockReq = {
            body: {
                Username: "user",
                Password: "pass",
            },
        };
        let mockRes = {
            locals: {
                error: undefined,
            }
        };

        const mw = loginMW(mockObjRepo);
        mw(mockReq,
            mockRes,
            (err) => {
                expect(err).to.be.equal(undefined);
                expect(mockRes.locals.error).to.be.equal("Wrong username!");
                done;
            }
        );
    });
    it('should call next() and set res.locals.error="Wrong password!" if the password is wrong', function () {
        let mockObjRepo = {
            UserModel: {
                findOne: (p1, cb) => {
                    cb(undefined, {Username: "user", Password: "pass123"} )
                },
            }
        };
        let mockReq = {
            body: {
                Username: "user",
                Password: "pass",
            },
        };
        let mockRes = {
            locals: {
                error: undefined,
            }
        };

        const mw = loginMW(mockObjRepo);
        mw(mockReq,
            mockRes,
            (err) => {
                expect(err).to.be.equal(undefined);
                expect(mockRes.locals.error).to.be.equal("Wrong password");
                done;
            }
        );
    });
    it('should redirect to /aircrafts and set up req.session params', function () {
        let mockObjRepo = {
            UserModel: {
                findOne: (p1, cb) => {
                    cb(undefined, {_id: 123, Username: "user", Password: "pass"} )
                },
            }
        };
        let mockReq = {
            body: {
                Username: "user",
                Password: "pass",
            },
            session: {
                userid: undefined,
                Username: undefined,
                loggedin: undefined,
            },
        };
        let mockRes = {
            locals: {
                error: undefined,
            },
            redirect: (dest) => {
                expect(mockReq.session.userid).to.be.equal(123);
                expect(mockReq.session.Username).to.be.equal("user");
                expect(mockReq.session.loggedin).to.be.equal(true);
                expect(dest).to.be.equal("/aircrafts");
                done;
            }
        };

        const mw = loginMW(mockObjRepo);
        mw(mockReq,
            mockRes,
            (err) => {
                expect(err).to.be.equal(undefined);
                expect(mockRes.locals).to.be.equal(undefined);
            }
        );
    });
});