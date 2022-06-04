function dumpComment(object) {
   return {
      id: object._id,
      comment: object.comment,
      commentBy: object.commentBy,
      date: object.date,
      postId: object.postId,
   };
}

function dumpPost(object) {
   return {
      id: object._id,
      post: object.post,
      likes: object.likeBy.length,
      comments: object.comments.length,
      creator: {
         names: object.creator.names,
         id: object.creator._id,
         about: object.creator.about,
         profilePic: object.creator.profilePic,
      },
      date: object.date,
   };
}

function dumbUser(object) {
   return {
      id: object._id,
      names: object.names,
      phone: object.phone,
      email: object.email,
      about: object.about,
      gender: object.gender,
      location: object.location,
      verified: object.verified,
      joinedAt: object.joinedAt,
      profilePic: object.profilePic,
      coverPhoto: object.coverPhoto,
      role: object.role,
   };
}

module.exports = {
   dumpPost,
   dumbUser,
   dumpComment,
};
