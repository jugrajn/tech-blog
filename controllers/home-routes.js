const router = require('express').Router();
const {Post, Comment, User} = require('../models');
const withAuth = require('../utils/auth');

//WHAT AM I RENDERING ON THE MAIN ROOTE LANDING PAGE?
router.get('/', async (req, res) => {
    try{
        const postData = await Post.findAll({
            include: [{ model: User }]
        });
        const posts = postData.map((post) => post.get({ plain: true }))
        res.render('homepage', {
            posts,
            loggedIn: req.session.logginIn,
        });
    } 
    
    catch (err) {
        res.status(500).json(err);
    }
});


//CREATE ROUTE FOR DASHBOARD PAGE
router.get('/dashboard', async (req, res) => {
    try {

    }

    catch (err) {

    }
});

//CREATE ROUTE FOR LOGIN
router.get('/login', async (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/');
        return;
    }
    res.render('login');
})