class Storage {
  
  // Construct a singleton to handle persistent data
  constructor() {
    if(! Storage.instance){
      Storage.instance = this;
    }

    return Storage.instance;
  }

  /*
  ** @return array of stored todos
  */
  getTodos() {
    if (window.localStorage.todos) {
      return JSON.parse(window.localStorage.todos)
    } else {
      return []
    }
  }
  
  /*
  ** Syncronises the object state with localStorage
  ** @param todoList: [TodoObject]
  */
  sync(todoList) {
    if (JSON.stringify(todoList) !== window.localStorage.todos) {
      window.localStorage.todos = JSON.stringify(todoList)
      console.log('Storage synced!')
    }
  }

}

const singleton = new Storage();
Object.freeze(singleton);

export default singleton;
