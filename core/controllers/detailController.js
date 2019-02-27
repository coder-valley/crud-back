const mongoose = require('mongoose');
const shortid = require('shortid');
const time = require('./../libs/timeLib');
const response = require('./../libs/responseLib')
const check = require('../libs/checkLib');
const fs = require('fs');
const DetailModel = mongoose.model('Detail');
const UserModel = mongoose.model('User');


let createNewDetail = (req, res) => {
  let validateUserInput = () => {
    return new Promise((resolve, reject) => {
      if (req.body.bloodgroup && req.body.gender && req.body.language && req.body.standard && req.body.subject1 && req.body.subject2 && req.body.subject3 && req.body.subject4 && req.body.subject5 && req.body.uname) {
        resolve(req)
      } else {
        let apiResponse = response.generate(true, 'Inputs are missing', 422, null);
        reject(apiResponse)
      }
    })
  }

  // let createDetail = () => {
  //   return new Promise((resolve, reject) => {
  //     DetailModel.findOne({
  //       issue: req.body.issue
  //     }, (err, result) => {
  //       if (err) {
  //         let apiResponse = response.generate(true, 'server error', 500, null)
  //         reject(apiResponse)
  //       } else if (check.isEmpty(result)) {
  //         if (req.file) {
  //           let Detail = new DetailModel({
  //             userId: req.params.userId,
  //             detailId: shortid.generate(),
  //             email: req.body.email,
  //             address: req.body.address,
  //             mobile: req.body.mobile,
  //             issue: req.body.issue,
  //             name: req.body.name,
  //             createdOn: time.now(),
  //           })
  //           Detail.save((err, Detail1) => {
  //             if (err) {
  //               let apiResponse = response.generate(true, 'failed to save your Info', 500, null)
  //               reject(apiResponse)
  //             } else {
  //               let Detail2 = Detail1.toObject()
  //               resolve(Detail2)
  //             }
  //           })
  //         } else {
  //           let Detail = new DetailModel({
  //             detailId: shortid.generate(),
  //             userId: req.params.userId,
  //             email: req.body.email,
  //             address: req.body.address,
  //             mobile: req.body.mobile,
  //             issue: req.body.issue,
  //             name: req.body.name,
  //             createdOn: time.now(),
  //           })
  //           Detail.save((err, Detail1) => {
  //             if (err) {
  //               let apiResponse = response.generate(true, 'failed to save your details', 500, null)
  //               reject(apiResponse);
  //               console.log(err)
  //             } else {
  //               let Detail2 = Detail1.toObject()
  //               resolve(Detail2)
  //             }
  //           })
  //         }
  //       } else {
  //         let apiResponse = response.generate(true, 'This issue ticket is already raised, please use another one', 422, null)
  //         reject(apiResponse)
  //       }
  //     })
  //   })
  // }

    let createDetail= () => {
      return new Promise((resolve, reject) => {
        let Detail = new DetailModel({
          detailId: shortid.generate(),
          userId: req.params.userId,
          uname: req.body.uname,
          class: req.body.class,
          language: req.body.language,
          subject1: req.body.subject1,
          subject2: req.body.subject2,
          subject3: req.body.subject3,
          subject4: req.body.subject4,
          subject5: req.body.subject5,
          bloodgroup: req.body.bloodgroup,
          gender: req.body.gender,
          standard: req.body.standard,
          name: req.body.name,
          createdOn: time.now()
        })
        console.log(Detail)
        Detail.save((err, result) => {
          if (err) {
            let apiResponse = response.generate(true, 'failed to save info2', 417, null)
            console.log(err)
            reject(apiResponse)
          } else {
            let detailObj = result.toObject()
            console.log(detailObj)
            resolve(detailObj)
          }
        })
      })
    }
  
    validateUserInput(req, res)
    .then(createDetail)
    .then((resolve) => {
      let apiResponse = response.generate(false, 'Info created successfully', 200, resolve)
      res.send(apiResponse)
    }).catch(err => res.send(err))
}



// let createNewDetail = (req, res) => {
//   let validateInputs = () => {
//     return new Promise((resolve, reject) => {
//       if (!req.body.issue && !req.body.email && !req.body.name && !req.body.name && !req.body.mobile && !req.body.address) {
//         let apiResponse = response.generate(true, 'Parameters Missing', 422, null)
//         reject(apiResponse)
//       } else {
//         resolve(req)
//       }
//     })
//   }
//   let createDetail = () => {
//     return new Promise((resolve, reject) => {
//       let newDetail = new DetailModel({
//         userId: req.params.userId,
//         detailId: shortid.generate(),
//         email: req.body.email,
//         address: req.body.address,
//         mobile: req.body.mobile,
//         issue: req.body.issue,
//         name: req.body.name,
//         createdOn: time.now(),
//       })
//       newDetail.save((err, result) => {
//         if (err) {
//           let apiResponse = response.generate(true, 'failed to save info2', 417, null)
//           reject(apiResponse)
//           console.log(err)
//           console.log(result)
//         } else {
//           let detailObj = result.toObject()
//           resolve(detailObj)
//         }
//       })
//     })
//   }
//   validateInputs(req, res)
//     .then(createDetail)
//     .then((resolve) => {
//       let apiResponse = response.generate(false, 'info created successfully', 200, resolve)
//       res.send(apiResponse)
//       console.log(apiResponse)
//     }).catch(err => res.send(err))
// }


let getAllDetailsByStudent = (req, res) => { // To get All the Details of particular User
  DetailModel.find({
    userId: req.params.userId
  }).select('-__v -_id')
    .lean()
    .exec((err, result) => {
      if (err) {
        let apiResponse = response.generate(true, 'failed finding Details', 500, null)
        res.send(apiResponse)
      } else if (check.isEmpty(result)) {
        let apiResponse = response.generate(true, 'no Details found', 404, null)
        res.send(apiResponse)
      } else {
        let apiResponse = response.generate(false, 'All Details of Particular Student found', 200, result)
        res.send(apiResponse)
      }
    })
}

let getAllDetails = (req, res) => { // To get All the Details for Admin
  DetailModel.find()
  .select('-__v -_id')
    .lean()
    .exec((err, result) => {
      if (err) {
        let apiResponse = response.generate(true, 'failed finding Details', 500, null)
        res.send(apiResponse)
      } else if (check.isEmpty(result)) {
        let apiResponse = response.generate(true, 'no Details found', 404, null)
        res.send(apiResponse)
      } else {
        let apiResponse = response.generate(false, 'All Details of all Students found', 200, result)
        res.send(apiResponse)
      }
    })
}

let updateSelectedDetail = (req, res) => {
  if (req.file) {
    let options = req.body;
    DetailModel.update({
        'detailId': req.params.detailId
      }, options)
      .select('-__v -_id')
      .lean()
      .exec((err, result) => {
        if (err) {
          let apiResponse = response.generate(true, 'server error', 500, null)
          res.send(apiResponse)
        } else if (check.isEmpty(result)) {
          let apiResponse = response.generate(true, 'Detail not found', 404, null)
          res.send(apiResponse)
        } else {
          let apiResponse = response.generate(false, 'Detail updated', 200, result)
          res.send(apiResponse)
        }
      })
  } else {
    let options = req.body;
    DetailModel.update({
        'detailId': req.params.detailId
      }, options)
      .select('-__v -_id')
      .lean()
      .exec((err, result) => {
        if (err) {
          let apiResponse = response.generate(true, 'server error', 500, null)
          res.send(apiResponse)
        } else if (check.isEmpty(result)) {
          let apiResponse = response.generate(true, 'Detail not found', 404, null)
          res.send(apiResponse)
        } else {
          let apiResponse = response.generate(false, 'Detail updated', 200, result)
          console.log(apiResponse)
          res.send(apiResponse)
        }
      })
  }
}

let deleteSingleDetail = (req, res) => {
  detailsModel.findOneAndRemove({
      detailId: req.params.detailId
    })
    .select('-__v -_id')
    .lean()
    .exec((err, result) => {
      if (err) {
        let apiResponse = response.generate(true, 'failed to find the detail', 500, null)
        res.send(apiResponse)
      } else if (check.isEmpty(result)) {
        let apiResponse = response.generate(true, 'No Detail found with associated ID', 404, null)
        res.send(apiResponse)
      } else {
        let apiResponse = response.generate(true, 'Detail deleted successfully', 200, result)
        res.send(apiResponse)
      }
    })
}

let getSelectedDetail = (req, res) => {
  if (check.isEmpty(req.params.detailId)) {
    let apiResponse = response.generate(true, 'Detail Parameter Missing', 422, null)
    res.send(apiResponse)
  } else {
    DetailModel.find({
      detailId: req.params.detailId
      })
      .select('-_id -__v')
      .lean()
      .exec((err, result) => {
        if (err) {
          let apiResponse = response.generate(true, 'server error occured', 500, null)
          res.send(apiResponse)
        } else if (check.isEmpty(result)) {
          let apiResponse = response.generate(true, 'No Detail Found', 404, null)
          res.send(apiResponse)
        } else {
          let apiResponse = response.generate(false, 'Detail Found', 200, result)
          res.send(apiResponse)
        }
      })
  }
}

let getDetailsByStudent = (req, res) => {
  DetailModel.find({
    student: req.params.student
  }, (err, result) => {
    if (err) {
      let apiResponse = response.generate(true, 'server error occured', 500, null)
      res.send(apiResponse)
    } else if (check.isEmpty(result)) {
      let apiResponse = response.generate(true, 'No Detail Found', 404, null)
      res.send(apiResponse)
    } else {
      let apiResponse = response.generate(false, 'Detail Found', 200, result)
      res.send(apiResponse)
    }
  })
}

let deleteDetail = (req, res) => {
  DetailModel.findOneAndRemove({
      detailId: req.params.detailId
    })
    .select('-__v -_id')
    .lean()
    .exec((err, result) => {
      if (err) {
        let apiResponse = response.generate(true, 'failed to find the detail', 500, null)
        res.send(apiResponse)
      } else if (check.isEmpty(result)) {
        let apiResponse = response.generate(true, 'no detail found with associated ID', 404, null)
        res.send(apiResponse)
      } else {
        let apiResponse = response.generate(true, 'Detail deleted Successfully', 200, result)
        res.send(apiResponse)
      }
    })
}


module.exports = {
  createNewDetail: createNewDetail,
  getAllDetailsByStudent: getAllDetailsByStudent,
  updateSelectedDetail: updateSelectedDetail,
  getSelectedDetail: getSelectedDetail,
  getDetailsByStudent: getDetailsByStudent,
  getAllDetails: getAllDetails,
  deleteSingleDetail: deleteSingleDetail,
  deleteDetail: deleteDetail
}