<demouser_edit>
  <h3>Modifying a User</h3>
  <form onsubmit="{ save_form }" class="uk-form" id="form_users">
  </form>
  <script>
    
    save_form(e) {
      common.checkLogin()
      common.saveForm("form_users", "demousers", opts.user_id)
    }
    
    var _this = this;    

    $.get(url + "demousers/" + opts.user_id, function(d) {
      _this.users = d.data      
      common.buildForm(_this.users, d.fields, '#form_users', 'demousers')
    })
  </script>
</demouser_edit>

<demouser_new>
  <h3>Creating a User</h3>
  <form onsubmit="{ save_form }" class="uk-form" id="form_new_users">
  </form>
  <script>
    save_form(e) {
      common.checkLogin()
      common.saveForm("form_new_users", "demousers")
    }

    $.get(url + "demousers/fields", function(d) {
      common.buildForm({}, d.fields, '#form_new_users', 'demousers')
    })
  </script>
</demouser_new>

<demousers>
  <div class="uk-float-right">
    <a href="/#logout">
      <i class="uk-icon-sign-out"></i>
      Logout
    </a>
  </div>
  <h3>Users' List</h3>
  <p class="uk-alert uk-alert-warning">This is just a demo about using ArangoDB / Foxx within RiotJS - Nothing more - Just a CRUD sample</p>
  <a href="/#demousers/new" class="uk-button uk-button-mini"><i class="uk-icon-plus"></i> New User</a>
  <table class="uk-table ">
    <thead>
      <tr>
        <th>Email</th>
        <th>First Name</th>
        <th>Last Name</th>
        <th>Role</th>
        <th width="70"></th>
      </tr>
    </thead>
    <tbody>
      <tr each={ users } >
        <td>{ login }</td>
        <td>{ fn }</td>
        <td>{ ln }</td>
        <td>{ role }</td>
        <td class="uk-text-center">
          <a href="/#demousers/{ _key }/edit" class="uk-button uk-button-primary uk-button-mini"><i class="uk-icon-edit"></i></a>
          <a onclick={ destroy_object } class="uk-button uk-button-danger uk-button-mini"><i class="uk-icon-trash"></i></a>
        </td>
      </tr>    
    </tbody>
    
  </table>
  <script>

    var _this = this
    
    destroy_object(e) {
      UIkit.modal.confirm("Are you sure?", function() {
        $.ajax({
          url: url + "demousers/" + e.item._key,
          method: "DELETE"
        })
        $.get(url + "demousers/", function(d) {
          _this.users = d.data
          _this.update()
        })
      });
    }

    $.get(url + "users/whoami", function(d) {
      if(d.username === null) riot.route('/login');
    })

    $.get(url + "demousers/", function(d) {
      _this.users = d.data
      _this.update()
    })
  </script>
</demousers>

