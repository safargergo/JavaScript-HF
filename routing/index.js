
const renderMW = require("../middleware/renderMW");

const authMW = require("../middleware/auth/authMW");
const loginMW = require("../middleware/auth/loginMW");
const setPassMW = require("../middleware/auth/setPassMW");
const registrationMW = require("../middleware/auth/registrationMW");
const logoutMW = require("../middleware/auth/logoutMW");

const aircraftGetOneMW = require("../middleware/aircrafts/aircraftGetOneMW");
const aircraftSaveMW = require("../middleware/aircrafts/aircraftSaveMW");
const aircraftsGetAllMW = require("../middleware/aircrafts/aircraftsGetAllMW");

const flightsGetAllMW = require("../middleware/flights/flightsGetAllMW");
const flightGetOneMW = require("../middleware/flights/flightGetOneMW");
const flightSaveMW = require("../middleware/flights/flightSaveMW");
const flightDeleteMW = require("../middleware/flights/flightDeleteMW");
const doneFlightsGetAllMW = require("../middleware/flights/doneFlightsGetAllMW");
const flightComplete = require("../middleware/flights/flightCompleteMW");

const UserModel = require("../entities/user");
const AircraftModel = require("../entities/aircraft");
const RouteModel = require("../entities/route");

module.exports = function (app) {

    const objRepo = {
        AircraftModel: AircraftModel,
        RouteModel: RouteModel,
        UserModel: UserModel
    };

    /*app.post("/login",
        loginMW(objRepo)
    );*/

    app.get("/logout",
        logoutMW(objRepo),
        renderMW(objRepo, "index")
        //res.redirect("/")
    );

    app.use("/registration",
        registrationMW(objRepo),
        //setPassMW(objRepo),
        renderMW(objRepo, "registration")
    );

    app.use("/resetpassword",
        registrationMW(objRepo),
        //getUserPassMW(objRepo),
        renderMW(objRepo, "password_reset")
    );

    app.get("/aircrafts",
        authMW(objRepo),
        aircraftsGetAllMW(objRepo),
        renderMW(objRepo, "aircraft_list")
    );

    app.use("/aircrafts/addnew",
        authMW(objRepo),
        aircraftSaveMW(objRepo),
        renderMW(objRepo, "aircraft_editing")
    );

    app.use("/aircrafts/edit/:aircraftid",
        authMW(objRepo),
        aircraftGetOneMW(objRepo),
        aircraftSaveMW(objRepo),
        renderMW(objRepo, "aircraft_editing")
    );

    app.get("/futureflights/:aircraftid",
        authMW(objRepo),
        aircraftGetOneMW(objRepo),
        flightsGetAllMW(objRepo),
        renderMW(objRepo, "future_flights")
    );

    app.use("/futureflights/:aircraftid/addnew",
        authMW(objRepo),
        aircraftGetOneMW(objRepo),
        flightSaveMW(objRepo),
        renderMW(objRepo, "flight_editing")
    );

    app.use("/futureflights/:aircraftid/edit/:flightid",
        authMW(objRepo),
        aircraftGetOneMW(objRepo),
        flightGetOneMW(objRepo),
        flightSaveMW(objRepo),
        renderMW(objRepo, "flight_editing")
    );

    app.get("/futureflights/:aircraftid/complete/:flightid",
        authMW(objRepo),
        aircraftGetOneMW(objRepo),
        flightGetOneMW(objRepo),
        flightComplete(objRepo),
        renderMW(objRepo, "future_flights")
    );

    app.get("/futureflights/:aircraftid/del/:flightid",
        authMW(objRepo),
        aircraftGetOneMW(objRepo),
        flightGetOneMW(objRepo),
        flightDeleteMW(objRepo),
        renderMW(objRepo, "future_flights")
    );

    app.get("/doneflights/:aircraftid",
        authMW(objRepo),
        aircraftGetOneMW(objRepo),
        doneFlightsGetAllMW(objRepo),
        renderMW(objRepo, "done_flights")
    );

    app.use("/",
        loginMW(objRepo),
        renderMW(objRepo, "index")
    );

}