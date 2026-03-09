// Git commit suggestion: "feat: implement listing CRUD operations"

const Listing = require('../models/Listing');

// @desc    Create new listing
// @route   POST /api/listings
// @access  Private (requires authentication)
const createListing = async (req, res) => {
  try {
    const { title, location, imageUrl, description, price } = req.body;

    // Validation
    if (!title || !location || !imageUrl || !description) {
      return res.status(400).json({ message: 'Please provide all required fields' });
    }

    // Create listing with authenticated user ID
    const listing = await Listing.create({
      title,
      location,
      imageUrl,
      description,
      price,
      createdBy: req.user._id, // From auth middleware
    });

    // Populate creator name before sending response
    await listing.populate('createdBy', 'name');

    res.status(201).json(listing);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get all listings (public feed)
// @route   GET /api/listings
// @access  Public
const getListings = async (req, res) => {
  try {
    // Fetch all listings, populate creator name, sort newest first
    const listings = await Listing.find()
      .populate('createdBy', 'name')
      .sort({ createdAt: -1 }); // -1 for descending (newest first)

    res.json(listings);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get single listing by ID
// @route   GET /api/listings/:id
// @access  Public
const getListingById = async (req, res) => {
  try {
    const listing = await Listing.findById(req.params.id).populate(
      'createdBy',
      'name'
    );

    if (!listing) {
      return res.status(404).json({ message: 'Listing not found' });
    }

    res.json(listing);
  } catch (error) {
    console.error(error);
    // Handle invalid ObjectId format
    if (error.kind === 'ObjectId') {
      return res.status(404).json({ message: 'Listing not found' });
    }
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  createListing,
  getListings,
  getListingById,
};
