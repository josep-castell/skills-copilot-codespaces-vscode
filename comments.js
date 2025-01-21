// Create web server
// Create a new comment
// Get all comments
// Get a comment by id
// Update a comment
// Delete a comment

const express = require('express');
const router = express.Router();
const { Comment, validate } = require('../models/comment');

// Create a new comment
router.post('/', async (req, res) => {
  const { error } = validate(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  let comment = new Comment({
    name: req.body.name,
    message: req.body.message,
    date: req.body.date
  });
  comment = await comment.save();

  res.send(comment);
});

// Get all comments
router.get('/', async (req, res) => {
  const comments = await Comment.find();
  res.send(comments);
});

// Get a comment by id
router.get('/:id', async (req, res) => {
  const comment = await Comment.findById(req.params.id);
  if (!comment) {
    return res.status(404).send('The comment with the given ID was not found.');
  }

  res.send(comment);
});

// Update a comment
router.put('/:id', async (req, res) => {
  const { error } = validate(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  const comment = await Comment.findByIdAndUpdate(req.params.id, {
    name: req.body.name,
    message: req.body.message,
    date: req.body.date
  }, { new: true });

  if (!comment) {
    return res.status(404).send('The comment with the given ID was not found.');
  }

  res.send(comment);
});

// Delete a comment
router.delete('/:id', async (req, res) => {
  const comment = await Comment.findByIdAndRemove(req.params.id);
  if (!comment) {
    return res.status(404).send('The comment with the given ID was not found.');
  }

  res.send(comment);
});

module.exports = router;