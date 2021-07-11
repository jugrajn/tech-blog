const router = require('express').Router();
const Post  = require('../../models');
const withAuth = require ('../../utils/auth');

router.post('/', withAuth, async (req, res) => {
    try {
        const postData = await Post.create({
            title: req.body.title,
            content: req.body.content,
            user_id: req.session.user_id
        })
        res.status(200).json(postData);
    }
    
    catch (err) {
        res.status(400).json(err)
    }
});

// CREATE ROUTE FOR UPDATE
router.put('/:id', withAuth, async (req, res) => {
    try {
        const postData = await Post.update({
            title: req.body.title,
            content: req.body.content
        },
        { where: { id: req.params.id }});
        
        // Make sure ID IS VALID OR EXISTS
        if (!postData) {
            res.status(404).jsono({ message: 'No post found with this ID' });
            return
        }
        res.status(200).json(postData);
    }

    catch (err) {
        res.status(400).json(err)
    }
})
