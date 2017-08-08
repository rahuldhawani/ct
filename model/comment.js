import uniqueId from '../utils/unique-id';

export default class Comment {
  constructor(args) {
    this.comment = args.comment;
    this.id = uniqueId('comment');
    this.parentId = args.parentId || null;
    this.user = args.user;
    this.timestamp = new Date();
    this.likes = 0;
    this.dislikes = 0;
  }

  get attributes() {
    return {
      comment: this.comment,
      id: this.id,
      parentId: this.parentId,
      user: this.user,
      like: this.likes,
      dislike: this.dislikes,
      timestamp: this.timestamp
    }
  }
}