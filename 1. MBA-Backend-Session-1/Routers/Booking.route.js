


const bookingController = require("../Controllers/Booking.controller");
const MiddleWares = require("./../Middlewares/authJwt")


module.exports = function (app) {
    app.get("/MovieBooking/api/v1/bookings", [MiddleWares.verifyToken ], bookingController.getAllBookings); 
    app.get("/MovieBooking/api/v1/bookings/:id", [MiddleWares.verifyToken], bookingController.getBookingById);  
    app.post("/MovieBooking/api/v1/bookings", [MiddleWares.verifyToken], bookingController.createBooking);
    app.put("/MovieBooking/api/v1/bookings/:id", [MiddleWares.verifyToken], bookingController.updateBooking);
}