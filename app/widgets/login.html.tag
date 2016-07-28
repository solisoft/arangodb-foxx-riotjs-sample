<loading>
  <div class="uk-text-center">
    Chargement de l'application ...
    <i class="uk-icon-spinner uk-icon-spin"></i>
  </div>

  <script>
    $.get(url + "users/whoami", function(d) {
      if(d.username === null) riot.route('/login'); 
      else riot.route('/salaries'); 
    })
  </script>
</loading>

<login>
  <div class="uk-container uk-container-center">
    <div class="uk-grid">
      <div class="uk-width-3-10"></div>
      <div class="uk-width-4-10">
        <div class="uk-margin-top uk-text-center">
          <h2>CRM - DSN</h2>
          <h3>Authentification</h3>
        </div>
        <form class="uk-form uk-margin-top"  onsubmit="{ save_form }">
           <label for="" class="uk-form-label">Email</label>
           <div class="uk-form-controls">
             <input type="text" placeholder="john@doe.com" class="uk-width-1-1" id="username" name="username" value="">
           </div>
           <label for="" class="uk-form-label">Mot de passe</label>
           <div class="uk-form-controls">
             <input type="password" placeholder="********" class="uk-width-1-1" id="password" name="password" value="">
           </div>
           <div class="uk-form-controls uk-margin-top">
             <button type="submit" class="uk-width-1-1 uk-button">Connexion</button>
           </div>
           
        </form>
      </div>
      <div class="uk-width-3-10"></div>
    </div>
  </div>
  
  <script>
    save_form(e) {
      $.post(url + "users/login", JSON.stringify({ "username": $("#username").val(), "password": $("#password").val() }) , function(data) {
        if(data.success) riot.route('/salaries')
      })
    }
  </script>

</login>