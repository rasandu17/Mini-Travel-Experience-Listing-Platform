const express = require('express');
const router = express.Router();
const {
  createListing,
  getListings,
  getListingById,
} = require('../controllers/listingController');
const { protect } = require('../middleware/authMiddleware');

// POST /api/listings - Create listing (protected)
router.post('/', protect, createListing);

// GET /api/listings - Get all listings (public)
router.get('/', getListings);

// GET /api/listings/:id - Get single listing (public)
router.get('/:id', getListingById);

module.exports = router;
