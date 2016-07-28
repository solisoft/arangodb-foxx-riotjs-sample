<users_edit>
  <h3>Modification d'un contrat</h3>
  <form onsubmit="{ save_form }" class="uk-form" id="form_users">
  </form>
  <script>
    
    save_form(e) {
      common.checkLogin()
      common.saveForm("form_users", "userss", opts.users_id)
    }
    
    var _this = this;    

    $.get(url + "userss/" + opts.users_id, function(d) {
      _this.users = d.data      
      common.buildForm(_this.users, d.fields, '#form_users', 'userss')
    })
  </script>
</users_edit>

<users_new>
  <h3>Création d'un contrat</h3>
  <form onsubmit="{ save_form }" class="uk-form" id="form_new_users">
  </form>
  <script>
    save_form(e) {
      common.checkLogin()
      common.saveForm("form_new_users", "userss")
    }

    

    $.get(url + "userss/fields", function(d) {
      common.buildForm({}, d.fields, '#form_new_users', 'userss')
    })
  </script>
</users_new>

<userss>
  <h3>Gestion des contrats</h3>
  <a href="/#userss/new" class="uk-button uk-button-mini"><i class="uk-icon-plus"></i> Nouveau contrat</a>
  <table class="uk-table ">
    <thead>
      <tr>
        <th>key</th>
        <th>date</th>
        <th width="70"></th>
      </tr>
    </thead>
    <tbody>
      <tr each={ userss } >
        <td>{ _key }</td>
        <td>{ S21_G00_40_001 }</td>
        <td class="uk-text-center">
          <a href="/#userss/{ _key }/edit" class="uk-button uk-button-primary uk-button-mini"><i class="uk-icon-edit"></i></a>
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
          url: url + "userss/" + e.item._key,
          method: "DELETE"
        })
        $.get(url + "userss/", function(d) {
          _this.userss = d.data
          _this.update()
        })
      });
    }

    $.get(url + "users/whoami", function(d) {
      if(d.username === null) riot.route('/login');
    })

    $.get(url + "userss/", function(d) {
      _this.userss = d.data
      _this.update()
    })
  </script>
</userss>

