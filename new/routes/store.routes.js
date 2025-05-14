const express = require('express');
const router = express.Router();
const db = require('../models');
const { verifyToken, isRole } = require('../middleware/auth.middleware');
const Store = db.Store;
const Rating = db.Rating;

router.get('/', async (req, res) => {
  const stores = await Store.findAll({
    include: [{ model: Rating }]
  });

  const result = stores.map(store => {
    const ratings = store.Ratings.map(r => r.rating);
    const average = ratings.length ? (ratings.reduce((a, b) => a + b, 0) / ratings.length).toFixed(1) : 0;
    return {
      id: store.id,
      name: store.name,
      address: store.address,
      email: store.email,
      averageRating: average
    };
  });

  res.json(result);
});

router.post('/:storeId/rate', verifyToken, isRole(['user']), async (req, res) => {
  const { rating } = req.body;
  const { storeId } = req.params;

  const existing = await Rating.findOne({
    where: { userId: req.user.id, storeId }
  });

  if (existing) {
    existing.rating = rating;
    await existing.save();
    return res.json({ message: 'Rating updated' });
  }

  await Rating.create({
    rating,
    userId: req.user.id,
    storeId
  });

  res.status(201).json({ message: 'Rating submitted' });
});

module.exports = router;