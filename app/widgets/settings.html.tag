<settings>
  <h3>Paramètres</h3>
  <form onsubmit="{ save_form }" class="uk-form" id="form_settings">
  </form>
  <emetteur>
  <script>
    
    save_form(e) {
      common.checkLogin()
      common.saveForm("form_settings", "settings", _this.obj._key)
    }

    var _this = this;    

    $.get(url + "settings/", function(d) {
      _this.obj = d.data      
      common.buildForm(_this.obj, d.fields, '#form_settings')
    })
  </script>
</settings>

