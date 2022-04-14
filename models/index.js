const User = require('./User');
const Role = require('./Role');
const Comment = require('./Comment');
const Card = require('./Card');
const Bulletin = require('./Bulletin');
const Chat = require('./Chat');
const Group = require('./Group');
const GroupUser = require('./GroupUser');
const Invitation = require('./Invitation');

Group.hasOne(Chat, {
  foreignKey: 'group_id',
});

Chat.belongsTo(Group, {
  foreignKey: 'group_id',
});

Chat.hasMany(Comment, {
  foreignKey: 'chat_id',
});

Comment.belongsTo(Chat, {
  foreignKey: 'chat_id',
});

Group.hasMany(Bulletin, {
  foreignKey: 'group_id',
  onDelete: 'SET NULL',
});

Bulletin.belongsTo(Group, {
  foreignKey: 'group_id',
});

Group.belongsToMany(User, {
  through: {
    model: GroupUser,
    unique: false,
  },
  as: 'users',
});

User.belongsToMany(Group, {
  through: {
    model: GroupUser,
    unique: false,
  },
  as: 'groups',
});

Group.hasMany(Role, {
  foreignKey: 'group_id',
  onDelete: 'CASCADE',
});

Role.belongsTo(Group, {
  foreignKey: 'group_id',
});

Role.belongsTo(User, {
  foreignKey: 'user_id',
});

User.hasMany(Role, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE',
});

User.hasMany(Card, {
  foreignKey: 'user_id',
});

Card.belongsTo(User, {
  foreignKey: 'user_id',
});

User.hasMany(Comment, {
  foreignKey: 'user_id',
});

Comment.belongsTo(User, {
  foreignKey: 'user_id',
});

Bulletin.hasMany(Card, {
  foreignKey: 'bulletin_id',
  onDelete: 'SET NULL',
});

Card.belongsTo(Bulletin, {
  foreignKey: 'bulletin_id',
});

User.hasMany(Invitation, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE',
});

Invitation.belongsTo(User, {
  foreignKey: 'user_id',
});

Group.hasMany(Invitation, {
  foreignKey: 'group_id',
  onDelete: 'CASCADE',
});

Invitation.belongsTo(Group, {
  foreignKey: 'group_id',
});


module.exports = {
  Bulletin,
  Card,
  Chat,
  Comment,
  Group,
  Role,
  User,
  GroupUser,
  Invitation
};