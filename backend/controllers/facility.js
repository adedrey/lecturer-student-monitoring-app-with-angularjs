const Facility = require('../models/facility');

exports.getFacilities = (req, res, next) => {
  Facility.find()
  .then(facilities => {
    res.status(200).json({
      facilities: facilities
    })
  })
  .catch(err => {
    res.status(500).json({
      message: 'An unknown error occured!'
    })
  })
}

exports.getFacility = (req, res, next) => {
  Facility.findOne({_id: req.params.id})
  .then(facility => {
    if(!facility) {
      return res.status(401).json({
        message: 'Unable to find facility'
      });
    }
    res.status(200).json({
      facility: facility
    })
  })
  .catch(err => {
    res.status(500).json({
      message: 'An unknown error occured!'
    })
  })
}

exports.postFacility = (req, res, next) => {
  const name=  req.body.name;
  const location = req.body.location;
  const seat_no = req.body.seat_no;
  const description = req.body.description;
  const facility = new Facility({
    name: name,
    location: location,
    seat_no: seat_no,
    description: description
  });
  facility.save()
  .then(result => {
    res.status(200).json({
      facility: result
    })
  })
  .catch(err => {
    res.status(500).json({
      message: 'An unknown error occured!'
    })
  })
}

exports.deleteFacility = (req, res, next) => {
  Facility.findOneAndDelete({_id: req.params.id})
  .then(result => {
    if(!result) {
      return res.status(401).json({
        message: 'Unable to delete'
      })
    }
    res.status(200).json({
      message: 'Deleted Successfully'
    })
  })
  .catch(err => {
    res.status(500).json({
      message: 'An unknown error occured!'
    })
  })
}
