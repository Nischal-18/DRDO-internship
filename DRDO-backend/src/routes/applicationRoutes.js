const express = require('express');
const router = express.Router();
const applicationController = require('../controllers/applicationController');
const { protect, authorize } = require('../middleware/auth');

// All routes require authentication
router.use(protect);

// Applicant routes
router.post('/', applicationController.submitApplication);
router.get('/my-applications', applicationController.getMyApplications);

// Admin/Reviewer routes (must come before /:id to avoid route conflicts)
router.get('/', authorize('admin', 'reviewer'), applicationController.getAllApplications);
router.put('/:id/status', authorize('admin', 'reviewer'), applicationController.updateApplicationStatus);

// Get single application (must come after specific routes)
router.get('/:id', applicationController.getApplicationById);

module.exports = router;
