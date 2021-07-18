const router = require('express').Router();
const {User} = require('../../models');

// ROUTE FOR NEW USER
router.post('/', async (req,res) => {
  
    try {
        const userData = await User.create(req.body);

        req.session.save( () => {
            req.session.user_id = userData.id;
            req.session.loggedIn = true;
        })
        res.status(200).json(userData);
    }
    catch (err) {
        res.status(400).json(err);
    }
})

// ROUTE FOR USER LOGIN
router.post('/login', async (req, res) => {
    console.log(req.body)
    try {
        const userData = await User.findOne({ where: { username: req.body.username }});
        console.log(userData)
        if (!userData) {
            res.status(400).json({ message: 'Incorrect username or password, please try again'});
            return;
        }
        console.log(User.password)
        const validPassword = await userData.checkPassword(req.body.password);

        if (!validPassword) {
            res.status(400).json({ message: 'Incorrect username or password, please try again' });
            return;
        }

        req.session.save( () => {
            req.session.user_id = userData.id;
            req.session.loggedIn = true;

            res.json({ user: userData, message: "You have are now logged in!"})
        });

    }
    catch (err) {
        res.status(400).json(err);
    }
});

// ROUTE FOR USER LOGOUT
router.post('/logout', async (req, res) => {
    if (req.session.loggedIn) {
        req.session.destroy( () => {
            res.status(204).end();
        });
    }
    else {
        res.status(404).end();
    }
});

module.exports = router;