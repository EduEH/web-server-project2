var express = require('express'); 
var router = express.Router(); 
/* GET home page. */ 
router.get('/', function(req, res, next) { 
    if(req.user && req.user.displayName){ 
    const displayName = req.user.displayName; 
    req.user.displayName = null; 
    res.render('index', { user: req.user }); 
  } else{ 
    res.render('index', { title: 'Web-Project2', salut:'please log in' }); 
  } 
}); 
module.exports = router;
