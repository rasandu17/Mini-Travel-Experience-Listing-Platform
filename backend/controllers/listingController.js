const Listing = require('../models/Listing');
const path = require('path');
const fs = require('fs');

// @desc    Create new listing
// @route   POST /api/listings
// @access  Private
const createListing = async (req, res) => {
  try {
    const { title, location, imageUrl, description, price } = req.body;

    if (!title || !location || !description) {
      return res.status(400).json({ message: 'Please provide all required fields' });
    }

    // Use uploaded file path if present, else use provided imageUrl
    let finalImageUrl = imageUrl;
    if (req.file) {
      finalImageUrl = `/uploads/${req.file.filename}`;
    }

    if (!finalImageUrl) {
      return res.status(400).json({ message: 'Please provide an image URL or upload an image' });
    }

    const listing = await Listing.create({
      title,
      location,
      imageUrl: finalImageUrl,
      description,
      price,
      createdBy: req.user._id,
    });

    await listing.populate('createdBy', 'name');
    res.status(201).json(listing);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get all listings with optional search & pagination
// @route   GET /api/listings?search=&page=&limit=
// @access  Public
const getListings = async (req, res) => {
  try {
    const page  = parseInt(req.query.page)  || 1;
    const limit = parseInt(req.query.limit) || 9;
    const skip  = (page - 1) * limit;
    const search = req.query.search || '';

    const query = search
      ? {
          $or: [
            { title:    { $regex: search, $options: 'i' } },
            { location: { $regex: search, $options: 'i' } },
            { description: { $regex: search, $options: 'i' } },
          ],
        }
      : {};

    const total = await Listing.countDocuments(query);
    const listings = await Listing.find(query)
      .populate('createdBy', 'name')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    res.json({
      listings,
      pagination: {
        total,
        page,
        pages: Math.ceil(total / limit),
        limit,
      },
    });
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
    const listing = await Listing.findById(req.params.id).populate('createdBy', 'name');
    if (!listing) {
      return res.status(404).json({ message: 'Listing not found' });
    }
    res.json(listing);
  } catch (error) {
    console.error(error);
    if (error.kind === 'ObjectId') {
      return res.status(404).json({ message: 'Listing not found' });
    }
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Update a listing
// @route   PUT /api/listings/:id
// @access  Private (owner only)
const updateListing = async (req, res) => {
  try {
    const listing = await Listing.findById(req.params.id);
    if (!listing) return res.status(404).json({ message: 'Listing not found' });

    // Only owner can edit
    if (listing.createdBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorised to edit this listing' });
    }

    const { title, location, imageUrl, description, price } = req.body;

    // If a new file was uploaded, delete old file if it was a local upload
    let finalImageUrl = imageUrl || listing.imageUrl;
    if (req.file) {
      if (listing.imageUrl && listing.imageUrl.startsWith('/uploads/')) {
        const oldPath = path.join(__dirname, '..', 'public', listing.imageUrl);
        if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
      }
      finalImageUrl = `/uploads/${req.file.filename}`;
    }

    listing.title       = title       || listing.title;
    listing.location    = location    || listing.location;
    listing.imageUrl    = finalImageUrl;
    listing.description = description || listing.description;
    listing.price       = price !== undefined ? price : listing.price;

    await listing.save();
    await listing.populate('createdBy', 'name');
    res.json(listing);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Delete a listing
// @route   DELETE /api/listings/:id
// @access  Private (owner only)
const deleteListing = async (req, res) => {
  try {
    const listing = await Listing.findById(req.params.id);
    if (!listing) return res.status(404).json({ message: 'Listing not found' });

    if (listing.createdBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorised to delete this listing' });
    }

    // Delete local uploaded image if exists
    if (listing.imageUrl && listing.imageUrl.startsWith('/uploads/')) {
      const filePath = path.join(__dirname, '..', 'public', listing.imageUrl);
      if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
    }

    await listing.deleteOne();
    res.json({ message: 'Listing deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Toggle like on a listing
// @route   POST /api/listings/:id/like
// @access  Private
const toggleLike = async (req, res) => {
  try {
    const listing = await Listing.findById(req.params.id);
    if (!listing) return res.status(404).json({ message: 'Listing not found' });

    const userId = req.user._id.toString();
    const alreadyLiked = listing.likes.map(id => id.toString()).includes(userId);

    if (alreadyLiked) {
      listing.likes = listing.likes.filter(id => id.toString() !== userId);
    } else {
      listing.likes.push(req.user._id);
    }

    await listing.save();
    res.json({ likes: listing.likes.length, liked: !alreadyLiked });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  createListing,
  getListings,
  getListingById,
  updateListing,
  deleteListing,
  toggleLike,
};
