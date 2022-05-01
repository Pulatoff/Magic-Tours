const fs = require('fs');

function getAllUsers(req, res) {
  res.status(200).json({
    data: 'not found',
  });
}
function addUser(req, res) {
  res.status(200).json({
    data: 'not found',
  });
}
function getUser(req, res) {
  res.status(200).json({
    data: 'not found',
  });
}
function updateUser(req, res) {
  res.status(200).json({
    data: 'not found',
  });
}
function deleteUser(req, res) {
  res.status(200).json({
    data: 'not found',
  });
}

module.exports = { getAllUsers, addUser, getUser, updateUser, deleteUser };
