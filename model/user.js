import uniqueId from '../utils/unique-id';

export default class User {
  constructor(handle) {
    this.handle = '@'+handle;
    this.id = uniqueId('user');
  }

  get attributes() {
    return {
      id: this.id,
      handle: this.handle
    }
  }
}