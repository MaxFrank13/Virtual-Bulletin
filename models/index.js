const User = require('./User');
const Role = require('./Role');
const Comment = require('./Comment');
const Card = require('./Card');
const Bulletin = require('./Bulletin');
const Chat = require('./Chat');
const Group = require('./Group');

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
});

Bulletin.belongsTo(Group, {
  foreignKey: 'group_id',
});

Group.hasMany(User, {
  foreignKey: 'group_id',
});

User.belongsTo(Group, {
  foreignKey: 'group_id',
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
});

Card.belongsTo(Bulletin, {
  foreignKey: 'bulletin_id',
});

Role.hasMany(User, {
  foreignKey: 'role_id',
});

User.belongsTo(Role, {
  foreignKey: 'role_id',
});

module.exports = {
  Bulletin,
  Card,
  Chat,
  Comment,
  Group,
  Role,
  User
};