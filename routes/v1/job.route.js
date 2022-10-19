const express = require('express');
const jobController = require('../../controllers/job.controller');
const authorize = require('../../middleware/authorize');
const upload = require('../../middleware/upload');
const validateId = require('../../middleware/validateId');
const verifyToken = require('../../middleware/verifyToken');
const router = express.Router();

router
  .route('/')
  .get(jobController.getJobs)
  .post(verifyToken, authorize('hiring-manager'), jobController.createJob);

router
  .route('/:id/apply')
  .post(
    verifyToken,
    authorize('candidate'),
    upload.array('resume'),
    jobController.applyJob
  );

router
  .route('/:id')
  .get(validateId, jobController.getJobById)
  .patch(
    verifyToken,
    authorize('hiring-manager'),
    validateId,
    jobController.updateJobById
  );

module.exports = router;