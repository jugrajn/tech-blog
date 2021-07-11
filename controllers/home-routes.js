const router = require('express').Router();
const { json } = require('sequelize/types');
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
            loggedIn: req.session.loggedIn,
        });
    } 
    
    catch (err) {
        res.status(500).json(err);
    }
});


//CREATE ROUTE FOR DASHBOARD PAGE
router.get('/dashboard', async (req, res) => {
    try {
        const dashData = await Post.findAll({
            where: { user_id: req.session.user_id},
            include: [{ model: User }]
        });

        const posts = dashData.map((post) => post.get({ plain: true }));

        // NOW USE THE MAPPED DATA and RENDER ON DASHBOARD PAGE
        res.render('dashboard', {
            posts,
            loggedIn: req.session.loggedIn
        });
    }

    catch (err) {
        res.status(400).json({ message: 'Please login or signup.'})
    }
});

//CREATE ROUTE FOR LOGIN
router.get('/login', async (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/homepage');
        return;
    }
    res.render('login');
})

//CREATE ROUTE FOR createpost

router.get('/createpost', async (req, res) => {
    try {
        res.render('createpost', {
            loggedIn: req.session.loggedIn
        });
    }

    catch (err) {
        res.status(400).json(err)
    }
});

router.get('/:id', async (req, res) => {
    try {
        const postedData = await Post.findByPk(req.params.id, {
            include: [{ model: User}, { model: Comment, include: User}]
        });

        const post = postedData.get({ plain: true })
    }

    catch (err) {
        res.status(500).json(err)
    }
})