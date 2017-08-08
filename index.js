import Comment from './controller/comment';
import moment from 'moment';


const commentTemplate = ({ user, comment, timestamp, like, dislike, id }) => {
  const username = user.handle;
  let tempEl = document.createElement('div');
  tempEl.className = 'c-comment';
  tempEl.id = id;

  tempEl.innerHTML = `
    <div class="c-comment__header">
    <div class="c-comment__user">${username}</div>
    <div class="c-comment__timestamp">${moment(timestamp).fromNow()}</div>
    </div>
    <div class="c-comment__text">${comment}</div>
    <div class="c-comment__votes">
        <button class="like">Like</button>${like} | <button class="dislike">Dislike</button>${dislike}
    </div>
    
    <button id="reply">Reply</button>
`;

  return tempEl;
};


const commentFormTemplate = (id) => {
  let tempEl = document.createElement('div');
  tempEl.className = 'c-comment-form from-reply';
  tempEl.id = `comment-form-${id}`;

  tempEl.innerHTML = `
    <label for="comment-${id}">Comment</label>
    <textarea type="text" placeholder="Comment" class="comment-text" id="comment-${id}"></textarea>
    <label for="username-${id}">Username</label>
    <input type="text" placeholder="Username" class="username-text" id="username-${id}"/>
    <button class="comment-save">Save</button>
`;

  return tempEl;
};


class App {
  constructor() {
    this.comments = null;
    this.commentEl = document.getElementById('comments');
    this.handleSave = this.handleSave.bind(this);
    this.render();
    this.initEventListeners();
  }

  handleSave(e) {
    const el = e.target.parentElement;
    let parentId = null;
    let parentElement = this.commentEl;

    const comment = document.querySelector('#' + el.id + ' .comment-text').value;
    const user = document.querySelector('#' + el.id + ' .username-text').value;
    if ( el.classList.contains('from-reply') ) {
      parentId = el.id.split('-').splice(-1)[0];
      parentElement = document.querySelector('#' + el.parentElement.id);
      parentElement.removeChild(el);
    }

    parentElement.appendChild(commentTemplate(Comment.save({ comment, user, parentId })))
  }

  addReplyForm(id) {
    document.getElementById(id).appendChild(commentFormTemplate(id));
  }

  handleLike(id) {
    Comment.upvote(id);
    this.render(); // time limitation
  }

  handleDislike(id) {
    Comment.downvote(id);
    this.render();
  }

  initEventListeners() {
    document.addEventListener("click", (e) => {
      if ( e.target && e.target.matches(".comment-save") ) {
        this.handleSave(e);
      }
    });

    this.commentEl.addEventListener("click", (e) => {
      if ( e.target && e.target.matches("#reply") ) {
        let id = e.target.parentElement.id;
        this.addReplyForm(id);
        return;
      }
      if ( e.target && e.target.matches(".like") ) {
        let id = e.target.parentElement.parentElement.id;
        this.handleLike(id);
        return;
      }
      if ( e.target && e.target.matches(".dislike") ) {
        let id = e.target.parentElement.parentElement.id;
        this.handleDislike(id);
      }
    });
  }

  render() {
    this.comments = Comment.fetchAll();
    this.commentEl.innerHTML = '';

    let parentEl = this.commentEl;
    this.comments.forEach((comment) => {
      if ( comment.parentId ) {
        parentEl = document.querySelector('#' + comment.parentId);
      }
      parentEl.appendChild(commentTemplate(comment));
    });
  }
}

new App();
