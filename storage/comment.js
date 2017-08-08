class CommentStorage {
  constructor() {
    !localStorage.getItem('comment') && localStorage.setItem('comment', '[]');
  }

  get storage() {
    return localStorage.getItem('comment');
  }

  set storage(data) {
    return localStorage.setItem('comment', data);
  }

  save(comment) {
    let data = JSON.parse(this.storage);
    data.push(comment);
    this.storage = JSON.stringify(data);
  }

  fetchAll() {
    return JSON.parse(this.storage);
  }
}

export default new CommentStorage();
