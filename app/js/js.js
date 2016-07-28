$(function() {

  riot.route('/login', function(name) {
    riot.mount('div#app', 'login')
  })
  riot.route('/logout', function(name) {
    console.log(url+"users/logout")
    $.post(url +"users/logout", function(d) {
      riot.route('/')  
    })
  })

  riot.route('/demousers', function(name) {
    riot.mount('div#app', 'demousers')
  })

  riot.route('/', function(name) {
    riot.mount('div#app', 'loading')
  })
  

  riot.route(function(collection, id, action) {
    if(action != undefined) {
      if(collection == "demousers") {
        if(action == "edit") {
          riot.mount('div#app', 'demouser_edit', { user_id: id })  
        }
      }  
    }
  })

  riot.route(function(collection, action) {
    if(action != undefined) {       
      if(collection == "demousers") {
        if(action == "new") {
          riot.mount('div#app', 'demouser_new')  
        }
      }  
    }
  })
  console.log("Starting riot router")
  riot.route.start(true)
})