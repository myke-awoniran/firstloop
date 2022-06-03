function dumpComment(object) {
   return {
      id: object._id,
      comment: object.comment,
      commentBy: object.commentBy,
      date: object.date,
   };
}
function dumpPost(object) {
   return {};
}
function dumbUser(object) {
   return {};
}

module.exports = {
   dumpPost,
   dumbUser,
   dumpComment,
};
