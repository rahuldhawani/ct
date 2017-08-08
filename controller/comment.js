import CommentModel from '../model/comment';
import UserModel from '../model/user';
import Storage from '../storage/comment';

const controller = {
  save(comment) {
    const { user } = comment;
    const _user = new UserModel(user);

    comment.user = _user;

    const _comment = new CommentModel(comment);

    const attrs = _comment.attributes;

    Storage.save(attrs);

    return attrs;
  },

  fetchAll() {
    return Storage.fetchAll()
  },

  fetch(id) {
    let _comment;
    this.fetchAll().some((comment) => {
      _comment = comment;
      return comment.id === id;
    });

    return _comment;
  },

  upvote(id) {
    let comment = this.fetch(id);
    comment.like++;
    this.update(comment);
  },
  downvote(id) {
    let comment = this.fetch(id);
    comment.dislike++;
    this.update(comment);
  },

  update(comment) {
    let comments = this.fetchAll().map((_comment) => {
      if ( comment.id === _comment.id ) {
        _comment = comment;
      }

      return _comment;
    });
    Storage.storage = JSON.stringify(comments);
  }
};


export default controller;