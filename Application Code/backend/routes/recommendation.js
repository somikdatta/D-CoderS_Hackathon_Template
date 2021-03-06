const express = require("express");
const checkAuth = require('../middleware/check-auth');
const checkprivilege = require('../middleware/check-privilege');
const Recommendation = require('../models/recommendation')
const extractFile = require('../middleware/file');

const router = express.Router();

router.get("/mylors", checkAuth, checkprivilege.student, (req, res) => {
    Recommendation.find({ createdBy: req.userData.userId }).populate('reviewedBy').populate('acceptedBy').populate('rejectedBy').then((lorData) => {
        res.status(200).json({ message: "Your LOR Requests", data: lorData })
    }).catch((err) => {
        console.log(err);
        res.status(400).json({ message: "Cannot fetch your LOR Requests" });
    })
})



router.get('/tobereviewed', checkAuth, checkprivilege.hod, (req, res) => {
    Recommendation.find({ isassigned: false, department: req.userData.department }).populate('createdBy').then(tbrData => {
        res.status(200).json({ message: "LOR Requests to be reviewed", data: tbrData })
    }).catch((err) => {
        console.log(err);
        res.status(400).json({ message: "Cannot fetch your LOR Requests" });
    })
})

router.get('/toreview', checkAuth, checkprivilege.teacher, (req, res) => {
    Recommendation.find({ isassigned: true, isreviewed: false, department: req.userData.department, assignedTo: req.userData.userId }).populate('createdBy').then(tbrData => {
        res.status(200).json({ message: "LOR Requests to be reviewed", data: tbrData })
    }).catch((err) => {
        console.log(err);
        res.status(400).json({ message: "Cannot fetch your LOR Requests" });
    })
})

router.get('/reviewed', checkAuth, checkprivilege.hod, (req, res) => {
    Recommendation.find({ isreviewed: true, isaccepted: false, isrejected: false, department: req.userData.department }).populate('reviewedBy').populate('createdBy').then(rData => {
        res.status(200).json({ message: "Reviewed LOR Requests", data: rData })
    }).catch((err) => {
        console.log(err);
        res.status(400).json({ message: "Cannot fetch your LOR Requests" });
    })
})

router.get('/reviewedbyme', checkAuth, checkprivilege.teacher, (req, res) => {
    Recommendation.find({ isreviewed: true, reviewedBy: req.userData.userId, department: req.userData.department }).populate('acceptedBy').populate('rejectedBy').populate('createdBy').then(rData => {
        res.status(200).json({ message: "Reviewed LOR Requests", data: rData })
    }).catch((err) => {
        console.log(err);
        res.status(400).json({ message: "Cannot fetch your LOR Requests" });
    })
})

router.get('/acceptedbyme', checkAuth, checkprivilege.hod, (req, res) => {
    Recommendation.find({ acceptedBy: req.userData.userId }).populate('reviewedBy').populate('createdBy').then(rData => {
        res.status(200).json({ message: "Evaluated LOR Requests", data: rData })
    }).catch((err) => {
        console.log(err);
        res.status(400).json({ message: "Cannot fetch your LOR Requests" });
    })
})

router.get('/rejectedbyme', checkAuth, checkprivilege.hod, (req, res) => {
    Recommendation.find({ rejectedBy: req.userData.userId }).populate('reviewedBy').populate('createdBy').then(rData => {
        res.status(200).json({ message: "Evaluated LOR Requests", data: rData })
    }).catch((err) => {
        console.log(err);
        res.status(400).json({ message: "Cannot fetch your LOR Requests" });
    })
})
router.patch('/submitreview/:id', checkAuth, checkprivilege.teacher, (req, res) => {
    const id = req.params.id;
    Recommendation.updateOne({ _id: id }, { $set: { isreviewed: true, reviewedBy: req.userData.userId, reviewedOn: Date.now(), review: req.body.review, isaccepted: false, isrejected: false } }).then(() => {
        return res.status(200).json({ message: "Review Submitted successfully" });
    }).catch(err => {
        console.log(err);
        return res.status(401).json({ message: "Cannot submit review" });
    })
})

router.patch('/acceptlor/:id', checkAuth, checkprivilege.hod, (req, res) => {
    const id = req.params.id;
    Recommendation.updateOne({ _id: id }, { $set: { isaccepted: true, acceptedOn: Date.now(), acceptedBy: req.userData.userId } }).then(() => {
        return res.status(200).json({ message: "LOR Accepted successfully" });
    }).catch(err => {
        console.log(err);
        return res.status(401).json({ message: "Cannot accept LOR" });
    })
})
router.patch('/rejectlor/:id', checkAuth, checkprivilege.hod, (req, res) => {
    const id = req.params.id;
    Recommendation.updateOne({ _id: id }, { $set: { isrejected: true, rejectedOn: Date.now(), rejectedBy: req.userData.userId } }).then(() => {
        return res.status(200).json({ message: "LOR Rejected successfully" });
    }).catch(err => {
        console.log(err);
        return res.status(401).json({ message: "Cannot reject LOR" });
    })
})

router.patch('/assignteacher/:id', checkAuth, checkprivilege.hod, (req, res) => {
    const id = req.params.id;
    Recommendation.updateOne({ _id: id }, { $set: { assignedTo: req.body.teacher, isassigned: true } }).then(() => {
        return res.status(200).json({ message: "Teacher assigned successfully" });
    }).catch(err => {
        console.log(err);
        return res.status(401).json({ message: "Cannot assign teacher" });
    })
})


router.post('/newlor', checkAuth, checkprivilege.student, extractFile, (req, res) => {
    const url = req.protocol + '://' + req.get("host");
    let fileArr = [];
    for (let file of req.files) {
        fileArr.push(url + "/files/" + file.filename);
    }
    const recommendation = new Recommendation({
        title: req.body.title,
        content: req.body.content,
        createdBy: req.userData.userId,
        department: req.userData.department,
        createdOn: Date.now(),
        filesPath: fileArr,
        isreviewed: false,
        isaccepted: false,
        isassigned: false
    })
    recommendation.save().then((saveData) => {
        res.status(200).json({ message: 'LOR requested' });
    })
        .catch((err) => {
            console.log(err);
            res.status(400).json({ message: 'Cannot request a LOR at the moment' });
        })
})

router.delete('/deletelor/:id', checkAuth, checkprivilege.student, (req, res) => {
    const id = req.params.id;
    Recommendation.deleteOne({ _id: id }).then(() => {
        Recommendation.find({ createdBy: req.userData.userId }).then((lorData) => {
            res.status(200).json({ message: "LOR Request Deleted Successfully", data: lorData })
        }).catch((err) => {
            console.log(err);
            res.status(400).json({ message: "Cannot fetch your LOR Requests" });
        })
    }).catch((err) => {
        console.log(err);
        res.status(400).json({ message: "Cannot delete LOR request" });
    })
})

module.exports = router;

