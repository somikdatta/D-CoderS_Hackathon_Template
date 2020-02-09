const express = require("express");
const checkAuth = require('../middleware/check-auth');
const checkprivilege = require('../middleware/check-privilege');
const Recommendation = require('../models/recommendation')
const extractFile = require('../middleware/file');

const router = express.Router();

router.get("/mylors", checkAuth, (req, res) => {
    Recommendation.find({ createdBy: req.userData.userId, isreviewed: false }).select({ filesPath: 1 }).select({ title: 1 }).select({ createdOn: 1 }).then((lorData) => {
        res.status(200).json({ message: "Your LOR Requests", data: lorData })
    }).catch((err) => {
        console.log(err);
        res.status(400).json({ message: "Cannot fetch your LOR Requests" });
    })
})

router.post('/newlor', checkAuth, checkprivilege.student, extractFile, (req, res) => {
    const url = req.protocol + '://' + req.get("host");
    let fileArr = [];
    for (let file of req.files) {
        fileArr.push(url + "/files" + file.filename);
    }
    const recommendation = new Recommendation({
        title: req.body.title,
        content: req.body.content,
        createdBy: req.userData.userId,
        createdOn: Date.now(),
        filesPath: fileArr,
        isreviewed: false
    })
    recommendation.save().then((saveData) => {
        res.status(200).json({ message: 'LOR requested' });
    })
        .catch((err) => {
            console.log(err);
            res.status(400).json({ message: 'Cannot request a LOR at the moment' });
        })
})

module.exports = router;

