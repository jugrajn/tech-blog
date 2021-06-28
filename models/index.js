const User = require('./user.js');
const Post = require('./post.js');
const Comment = require('./comment.js');


//SET UP RELATIONSHIPS BETWEEN MODELS
Comment.belongsTo(User, {
    foreignKey: 'user_id'
});

Comment.belongsTo(Post, {
    foreignKey: 'post_id'
});

Post.belongsTo(User, {
    foreignKey: 'user_id'
});

Post.hasMany(Comment, {
    foreignKey: 'post_id'
});

User.hasMany(Post, {
    foreignKey: 'user_id'
});

User.hasMany(Comment, {
    foreignKey: 'user_id'
});

module.exports = { User, Post, Comment};