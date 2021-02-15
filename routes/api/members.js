const express = require('express');
const uuid = require('uuid');
const router = express.Router();
const members = require('../../membersData');

// Get single member
router.get('/:id', (req, res) => {
  const found = members.some((member) => member.id === parseInt(req.params.id));
  if (found) {
    res.json(members.filter((member) => member.id === parseInt(req.params.id)));
  } else {
    res.status(400).json({ msg: 'Requested member not found' });
  }
});

// Get all members
router.get('/', (req, res) => res.json(members));

// Create a member
router.post('/', (req, res) => {
  const newMember = {
    ...req.body,
    id: uuid.v4(),
  };

  if (!newMember.name || !newMember.email) {
    return res.status(400).json({ msg: 'Please input the required fields' });
  }

  members.push(newMember);

  res.redirect('/');
});

// Update a member
router.put('/:id', (req, res) => {
  const found = members.some((member) => member.id === parseInt(req.params.id));
  if (found) {
    const newMember = req.body;
    members.forEach((member) => {
      if (member.id === parseInt(req.params.id)) {
        member.name = newMember.name ? newMember.name : member.name;
        member.email = newMember.email ? newMember.email : member.email;

        res.json({ msg: 'Member is updated', member });
      }
    });
  } else {
    res.status(400).json({ msg: 'Requested member not found' });
  }
});

// Delete a member
router.delete('/:id', (req, res) => {
  const found = members.some((member) => member.id === parseInt(req.params.id));
  if (found) {
    res.json({
      msg: 'Member deleted',
      members: members.filter(
        (member) => member.id !== parseInt(req.params.id)
      ),
    });
  } else {
    ``;
    res.status(400).json({ msg: 'Requested member not found' });
  }
});

module.exports = router;
