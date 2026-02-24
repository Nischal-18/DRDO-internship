const Application = require('../models/application');

// Submit new application
exports.submitApplication = async (req, res) => {
  try {
    const { program_id } = req.body;
    const user_id = req.user.userId; // from auth middleware

    if (!program_id) {
      return res.status(400).json({
        success: false,
        message: 'Please provide program_id'
      });
    }

    // Create application
    const applicationId = await Application.create({
      user_id,
      program_id
    });

    res.status(201).json({
      success: true,
      message: 'Application submitted successfully',
      data: {
        application_id: applicationId
      }
    });

  } catch (error) {
    console.error('Submit application error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error during application submission',
      error: error.message
    });
  }
};

// Get user's applications
exports.getMyApplications = async (req, res) => {
  try {
    const user_id = req.user.userId;

    const applications = await Application.findByUserId(user_id);

    res.status(200).json({
      success: true,
      count: applications.length,
      data: applications
    });

  } catch (error) {
    console.error('Get my applications error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// Get all applications (admin only)
exports.getAllApplications = async (req, res) => {
  try {
    const applications = await Application.findAll();

    res.status(200).json({
      success: true,
      count: applications.length,
      data: applications
    });

  } catch (error) {
    console.error('Get all applications error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// Get single application
exports.getApplicationById = async (req, res) => {
  try {
    const { id } = req.params;

    const application = await Application.findById(id);

    if (!application) {
      return res.status(404).json({
        success: false,
        message: 'Application not found'
      });
    }

    // Check if user owns this application (unless admin)
    if (req.user.role !== 'admin' && application.user_id !== req.user.userId) {
      return res.status(403).json({
        success: false,
        message: 'Access denied'
      });
    }

    res.status(200).json({
      success: true,
      data: application
    });

  } catch (error) {
    console.error('Get application error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// Update application status (admin/reviewer only)
exports.updateApplicationStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, remarks } = req.body;
    const reviewerId = req.user.userId;

    // Validate status
    const validStatuses = ['pending', 'under_review', 'approved', 'rejected'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: `Invalid status. Must be one of: ${validStatuses.join(', ')}`
      });
    }

    await Application.updateStatus(id, status, reviewerId, remarks);

    res.status(200).json({
      success: true,
      message: 'Application status updated successfully'
    });

  } catch (error) {
    console.error('Update application status error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};
