let middlewareObj = {};
const camp = require('../models/camp');

middlewareObj.isLoggedIn = (req,res,next) => {
  if(req.isAuthenticated()){
    return next();
  }
  req.flash("error", "Please login first!!")
  res.redirect('/login');
};

middlewareObj.checkCommentOwnership = (req,res,next) => {
    var id = req.params.id;
    var comment_id = req.params.comment_id;
  // check for login first
  if(req.isAuthenticated()) {
    camp.findById(id, (err, campground) => {
      if (err) {
        console.log('unable to retrieve camground for comment authorization')
      } else {
        console.log('retrieved campground for comment authorization')
        console.log(comment_id)
          // if they own it, next()
        if (req.user._id.equals(campground.comments.id(comment_id).userid)) {

          console.log('authorized to edit/delete comment')
          next()
        } else {
            // if they don't own it, redirect back.
            // console.log('id of comment', comment_id)
            // console.log('user id of comment:',campground.comments.id(comment_id).userid)
            // console.log('user id of logged in user:',req.user._id )
            console.log('user not authorized to edit comment')
          res.redirect('back')
        }

      }
    })
  } else {
    console.log("you need to be logged in to do that");
      res.redirect('back')
  }


}

middlewareObj.checkCampgroundOwnership = (req,res,next) => {
    var id = req.params.id;
  // check for login first
  if(req.isAuthenticated()) {
    camp.findById(id, (err, campground) => {
      if (err) {
        console.log('unable to retrieve camground for comment')
      } else {
        console.log('retrieved campground for edit')
          // if they own it, next()
        if (req.user._id.equals(campground.userid)) {
          next()
        } else {
            // if they don't own it, redirect back.
          res.redirect('back')
        }

      }
    })
  } else {
    console.log("you need to be logged in to do that");
      res.redirect('back')
  }


}


module.exports = middlewareObj;
