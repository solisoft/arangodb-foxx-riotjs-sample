$(function() {

  riot.route('/login', function(name) {
    riot.mount('div#app', 'login')
  })
  riot.route('/logout', function(name) {
    $.post(url +"users/logout", function(d) {
      riot.route('/')  
    })
  })

  riot.route('/users', function(name) {
    riot.mount('div#app', 'users')
  })

  riot.route('/', function(name) {
    riot.mount('div#app', 'loading')
  })
  

  riot.route(function(collection, id, action) {
    if(action != undefined) {
      if(collection == "user") {
        if(action == "edit") {
          riot.mount('div#app', 'user_edit', { user_id: id })  
        }
      }  
    }
  })

  riot.route(function(collection, action) {
    if(action != undefined) {
       
      if(collection == "user") {
        if(action == "new") {
          riot.mount('div#app', 'user_new')  
        }
      }  
    }
  })
  console.log("Starting riot router")
  riot.route.start(true)
})