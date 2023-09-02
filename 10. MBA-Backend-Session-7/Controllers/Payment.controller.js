const Bookings = require('../Models/Bookings')
const Payments = require('../Models/Payments')
const Users = require('../Models/Users')
const Constants = require('../Utills/Constants/userType')
const { sendEmail } = require('../Utills/NotificationClient')

exports.getAllPayments = async (req, res) => {
  const queryObj = {}
  const user = await Users.findOne({ userId: req.userId })

  if (user.userType !== Constants.userTypesObject.userTypes.admin) {
    const bookings = await Bookings.find({ userId: user._id })
    const bookingIds = bookings.map((booking) => booking._id)
    queryObj.bookingId = { $in: bookingIds }
  }

  try {
    const payment = await Payments.find(queryObj)
    res.status(200).send(payment)
  } catch (err) {
    console.log(err.message)
    res.status(500).send('Internal Server Error')
  }
}

exports.getPaymentById = async (req, res) => {
  const user = await Users.findOne({ userId: req.userId })
  try {
    const payments = await Payments.findOne({ _id: req.params.id })
    const booking = await Bookings.findOne({ _id: payments.bookingId })
    if (
      user.userType !== Constants.userTypesObject.userTypes.admin &&
      booking !== null &&
      booking.userId !== user._id
    ) {
      res.status(404).send({
        message: 'Access denied',
      })
      return
    }
    res.status(200).send(payments)
  } catch (err) {
    console.log(err.message)
    res.status(500).send({
      message: 'Internal error while searching for the payment',
    })
  }
}

exports.createPayment = async (req, res) => {
  const booking = await Bookings.findOne({ _id: req.body.bookingId })

  var bookingTime = booking.createdAt
  var currentTime = Date.now()
  var minutes = Math.floor((currentTime - bookingTime) / (1000 * 60))
  if (minutes > 5) {
    booking.status = Constants.bookingAndPaymentObjects.bookingStatus.expired
    await booking.save()
    return res.status(200).send({
      message: "Can't do the payment as the booking has expired.",
    })
  }

  var paymentObject = {
    bookingId: req.body.bookingId,
    amount: req.body.amount,
    status: Constants.bookingAndPaymentObjects.paymentStatus.success,
  }

  if (req.body.amount < booking.amount) {
    return res.status(400).send({
      message: 'Payment amount is less than the booking amount',
    })
  }

  try {
    const payment = await Payments.create(paymentObject)
    booking.status = Constants.bookingAndPaymentObjects.bookingStatus.completed
    await booking.save()

    const user = await Users.findOne({ userId: req.userId })
    sendEmail(
      payment._id,
      'Payment successful for the booking id: ' + payment.bookingId,
      JSON.stringify(booking),
      user.email,
      'mba-no-reply@gmail.com'
    )
    return res.status(201).send(payment)
  } catch (err) {
    console.log(err.message)
    res.status(500).send({
      message: 'Internal server error while creating the booking',
    })
  }
}
