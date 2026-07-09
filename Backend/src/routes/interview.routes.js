const express = require('express')
const authMiddleware = require('../middlewares/auth.middleware')
const interviewController = require('../controllers/interview.controller')
const upload = require('../middlewares/file.middleware')

const interviewRouter = express.Router()

/**
 * @route api/interview/
 * @description generate a new report on the basis of resume pdf, self-description and job-description provided by user
 * @access Private
 */
interviewRouter.post('/', authMiddleware.authUser, upload.single('resume'), interviewController.generateInterviewReportController)

module.exports = interviewRouter