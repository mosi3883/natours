// users route handlers

const express = require('express');

const getAllUsers = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'route not implemented yet!',
  });
};

const getUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'route not implemented yet!',
  });
};

const createUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'route not implemented yet!',
  });
};

const updateUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'route not implemented yet!',
  });
};

const deleteUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'route not implemented yet!',
  });
};

const router = express.Router();
router.route('/').get(getAllUsers).post(createUser);

router.route('/:userId').get(getUser).patch(updateUser).delete(deleteUser);

module.exports = router;
