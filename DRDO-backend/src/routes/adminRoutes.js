const express = require('express');
const router = express.Router();
const User = require('../models/user');
const Application = require('../models/application');
const { protect, authorize } = require('../middleware/auth');

// Get admin dashboard stats
router.get('/stats', protect, authorize('admin'), async (req, res) => {
  try {
    const [userStats, applicationStats] = await Promise.all([
      User.getStats(),
      Application.getStats()
    ]);

    res.status(200).json({
      success: true,
      data: {
        users: userStats,
        applications: applicationStats
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
});

// Get dashboard overview (stats + recent data)
router.get('/dashboard', protect, authorize('admin'), async (req, res) => {
  try {
    const [userStats, applicationStats, recentUsers, recentApplications] = await Promise.all([
      User.getStats(),
      Application.getStats(),
      User.getRecent(5),
      Application.getRecent(5)
    ]);

    res.status(200).json({
      success: true,
      data: {
        stats: {
          users: userStats,
          applications: applicationStats
        },
        recent: {
          users: recentUsers,
          applications: recentApplications
        }
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
});

module.exports = router;
