const router = require('express').Router();
const { Post } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', withAuth, async (req, res) => {
  try {
    const blogPostData = await Post.findAll({
      where: { user_id: req.session.user_id }
    });
    const posts = blogPostData.map((post) => post.get({ plain: true }));
    res.render('dashboard', { posts, logged_in: req.session.logged_in });
  } catch (err) {
    res.redirect('login');
  }
});

router.get('/edit/:id', withAuth, async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id);
    if (postData) {
      const posts = postData.get({ plain: true });
      res.render('edit', {
        ...posts,
        logged_in: req.session.logged_in
      });
    } else {
      res.status(404).end();
    }
  } catch (err) {
    res.redirect('login');
  }
});

module.exports = router;