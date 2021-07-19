const router = require('express').Router();
const {Post}  = require('../../models');
const withAuth = require ('../../utils/auth');

router.post('/', withAuth, async (req, res) => {
    try {
        const postData = await Post.create({
            title: req.body.postTitle,
            content: req.body.postContent,
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
    console.log(req.body)
    try {
        const postData = await Post.update({
            title: req.body.postTitle,
            content: req.body.postContent
        },
        { where: { id: req.params.id }});
        console.log(postData)
        // Make sure ID IS VALID OR EXISTS
        if (!postData) {
            res.status(404).json({ message: 'No post found with this ID' });
            return
        }
        res.status(200).json(postData);
    }
    catch (err) {
        res.status(400).json(err)
    }
})

//CREATE ROUTE FOR DELETE
router.delete('/:id', withAuth, async (req, res) => {
    try {
        const postData = await Post.destroy({
            where: { id: req.params.id }
        });
        res.status(200).json(postData);
    }
    catch (err) {
        res.status(400).json(err);
    }
});

module.exports = router;