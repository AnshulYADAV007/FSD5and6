


const UserController = require("./../Controllers/User.controller");


module.exports = function (app) {
     app.get("/MovieBooking/api/v1/Users" , UserController.getAllUsers);
     app.get("/MovieBooking/api/v1/Users/:userId" , UserController.getUserById);
     app.put("/MovieBooking/api/v1/Users/:userId" , UserController.updateUseerDetails);
     app.delete("/MovieBooking/api/v1/Users/:userId" , UserController.deleteUser);
}