const express = require("express");
const checkAuth = require('../middleware/check-auth');
const checkprivilege = require('../middleware/check-privilege');
const extractFile = require('../middleware/file');

const router = express.Router();

router.post('/newlor', checkAuth, checkprivilege.student, (req, res) => {
    const url = req.protocol + '://' + req.get("host");
    const recommendation = new Recommendation({
        title: req.body.title,
        content: req.body.content,
        createdBy: req.userData.userId,
        createdOn: Date.now(),
        // filesPath: url + "/images/" + req.file.filename,
    })
    console.log(req.file.filename);
})

