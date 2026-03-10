const express = require('express');
const router = express.Router();
const {
  createListing,
  getListings,
  getListingById,
  updateListing,
  deleteListing,
  toggleLike,
} = require('../controllers/listingController');
const { protect } = require('../middleware/authMiddleware');
const upload = require('../middleware/upload');

// POST   /api/listings           – Create listing (protected, optional file upload)
router.post('/', protect, upload.single('image'), createListing);

// GET    /api/listings           – Get all listings (public, supports ?search= &page= &limit=)
router.get('/', getListings);

// GET    /api/listings/:id       – Get single listing (public)
router.get('/:id', getListingById);

// PUT    /api/listings/:id       – Update listing (protected, owner only)
router.put('/:id', protect, upload.single('image'), updateListing);

// DELETE /api/listings/:id       – Delete listing (protected, owner only)
router.delete('/:id', protect, deleteListing);

// POST   /api/listings/:id/like  – Toggle like (protected)
router.post('/:id/like', protect, toggleLike);

module.exports = router;
