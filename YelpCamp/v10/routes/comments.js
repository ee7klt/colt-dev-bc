
var express = require('express');
var router = express.Router({mergeParams: true});
var camp = require('../models/camp');


// FORM new comment
router.get('/new', isLoggedIn, function(req,res) {
  var id = req.params.id;
  camp.findById(id, (err, campground) => {
    if (err) {
      console.log('unable to retrieve camground for comment')
    } else {
      console.log('retrieved campground for comment')
      res.render("comments/new", {campground: campground})
    }
  })

})


 // FORM edit comment
 router.get('/:comment_id/edit',checkCommentOwnership,  function(req,res) {
   var camp_id = req.params.id;
   var comment_id = req.params.comment_id;
   camp.findById(camp_id, (err, campground) => {
     if (err) {
       res.send("ERROR: cannot reach camp");
     } else {
      // res.send('comment edit')
      var comment = campground.comments.id(comment_id);
      console.log('authorized. rendering edit page')
      //res.send('edit comment')
      res.render("comments/edit", {camp_id: camp_id, comment_id:comment_id, comment: comment})
     }
   })

 })



 // UPDATE comment
 router.put('/:comment_id',checkCommentOwnership,function(req,res) {
   var camp_id = req.params.id;
   var comment_id = req.params.comment_id;
   camp.findById(camp_id, (err,campground) => {
     const comment = campground.comments.id(comment_id);
     comment.set(req.body);
     campground.save();
     res.redirect('/campgrounds/'+camp_id);
   })

})

// CREATE comment
router.post('/', isLoggedIn, function(req, res) {
  var id = req.params.id
  camp.findById(id, (err, campground) => {
    if (err) {
      console.log('unable to retrieve camground for creating comment')
    } else {
      // Comment.create(req.body.comment, function(err, comment) {
        console.log('adding comment to camp ... ')
        console.log('username is '+req.user.username)
        console.log('comment is '+ req.body.comment)
        campground.comments.push({username: req.user.username , comment: req.body.comment, userid: req.user._id})
        campground.save((err, campground) => {
          if (err) {
            console.log("cannot save after adding comment")
          } else {
            //console.log(campground.comments)
            res.redirect('/campgrounds/'+id)
          }
        })

      // })

    }
  })

})

// DELETE comment
router.delete('/:comment_id/',checkCommentOwnership,function(req,res) {
  var id = req.params.id;
  var comment_id = req.params.comment_id;
  camp.findById(id, (err, campground) => {
    if (err) {
      console.log('unable to retrieve camground for delete')
    } else {
      var commentToBeRemoved = campground.comments.id(comment_id).comment;
      campground.comments.id(comment_id).remove();
      campground.save((err) => {
        if (err) console.log('error removing comment');
        console.log('removed comment "'+commentToBeRemoved+'"');
      });


      // campground.comments = campground.comments.filter((comment,index,arr) => {
      //     return !comment._id.equals(commentid);
      // });
      res.redirect('back')
    }
  })

})



// middleware to check for Login
function isLoggedIn(req,res,next) {
  if(req.isAuthenticated()){
    return next();
  }
  res.redirect('/login');
}

module.exports=router;



// middleware authorization (is logged in person authorized to edit/delete comment.)
function checkCommentOwnership(req,res,next) {
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
