const express = require("express");
const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
// const checkAuth = require('../middleware/check-auth');

const router = express.Router();

router.get('/', (req, res, next) => {
    res.send('<p>Signup:</p><ul><li>First Name: firstname</li><li>Last Name: lastname</li><li>uniqueid: uniqueid</li><li>Password: password</li><li>Course: course</li><li>Department: department</li><li>Semester: semester</li><li>Section: section</li></ul><p>Login</p><ul><li>Email: email</li><li>Password: password</li></ul>');
})

// router.get("/iam", checkAuth, (req, res) => {
//     User.findOne({ _id: req.userData.userId }).select({ name: 1 }).select({ career: 1 }).select({ email: 1 })
//         .then((userData) => {
//             return res.status(200).json({
//                 data: userData
//             })
//         })
//         .catch(() => {
//             res.status(401).json({
//                 message: "User not found"
//             })
//         })
// })


router.post('/signup', (req, res, next) => {
    if ((req.body.password).length < 8) {
        return res.status(401).json({
            message: 'Password must be longer than 8 characters'
        })
    }
    bcrypt.hash(req.body.password, 10).then((hash) => {
        const user = new User({
            name: {
                first: req.body.firstname,
                last: req.body.lastname
            },
            uniqueid: req.body.uniqueid,
            password: hash,
            career: {
                course: req.body.course,
                department: req.body.department,
                semester: req.body.semester
            },
            authorization: req.body.profession
        });
        user.save().then(result => {
            res.status(201).json({
                message: "Succesful signup"
            })
        }).catch((err) => {
            console.log(err);
            res.status(401).json({
                message: "User already exists"
            })
        });
    }).catch(() => {
        res.status(401).json({
            message: "Unknown Error Occurred"
        })
    });
});


router.post('/login', (req, res) => {
    let fetchedUser;
    User.findOne({ uniqueid: req.body.uniqueid }).then(user => {
        if (!user) {
            console.log(user);
            return res.status(401).json({
                message: "There's no account with this uniqueid"
            })
        }
        fetchedUser = user;
        return bcrypt.compare(req.body.password, user.password);
    }).then(result => {
        if (!result) {
            return res.status(401).json({
                message: "Wrong password"
            })
        }
        const token = jwt.sign(
            {
                userId: fetchedUser._id,
                authorization: fetchedUser.authorization,
                department: fetchedUser.career.department
            },
            process.env.JWT_KEY,
            { expiresIn: '1d' }
        );
        res.status(200).json({
            token: token,
            expiresIn: 86400,
            userId: fetchedUser._id,
            authorization: fetchedUser.authorization,
            firstname: fetchedUser.name.first,
            lastname: fetchedUser.name.last
        })
    }).catch((err) => {
        console.log(err);
        res.status(401).json({
            message: "Authentication failed!"
        });
    })
})

// router.patch("/updatedetails", checkAuth, (req, res) => {
//     User.findById(req.userData.userId).select("email").then((userData) => {
//         if (userData.email == req.body.email) {
//             User.updateOne({ _id: req.userData.userId }, { $set: { name: req.body.name, career: req.body.career } }).then(() => {
//                 return res.status(200).json({ message: "Details Updated successfully" });
//             }).catch((err) => {
//                 console.log(err);
//                 return res.status(401).json({ message: "Cannot update account details" });

//             })
//         }
//         else {
//             User.findOne({ email: req.body.email }).then(() => {
//                 return res.status(401).json({ message: "Another account exists with this email" })
//             }).catch(() => {
//                 User.updateOne({ _id: req.userData.userId }, { $set: { name: req.body.name, career: req.body.career, email: req.body.email } }).then(() => {
//                     return res.status(200).json({ message: "Details Updated successfully" });
//                 }).catch((err) => {
//                     console.log(err);
//                     return res.status(401).json({ message: "Cannot update account details" });

//                 })
//             })
//         }
//     })
// })

// router.patch("/updatepassword", checkAuth, (req, res) => {
//     User.findById(req.userData.userId).select({ password: 1 })
//         .then((user) => {
//             return bcrypt.compare(req.body.currentpassword, user.password);
//         }).then((result) => {
//             if (!result) {
//                 return res.status(401).json({
//                     message: "Your current password is incorrect"
//                 })
//             } else {
//                 bcrypt.hash(req.body.newpassword, 10).then((hash) => {
//                     User.updateOne({ _id: req.userData.userId }, { $set: { password: hash } }).then(() => {
//                         res.status(200).json({
//                             message: "Your password has been changed successfully"
//                         })
//                     })
//                         .catch((err) => {
//                             console.log(err);
//                             res.status(401).json({
//                                 message: "Unable to change your password"
//                             })
//                         })
//                 })
//             }
//         }).catch((err) => {
//             console.log(err);
//             res.status(401).json({
//                 message: "Current password verification failed"
//             })
//         })
//         .catch((err) => {
//             console.log(err);
//             res.status(401).json({
//                 message: "Authentication failed"
//             })
//         })
// })


module.exports = router;