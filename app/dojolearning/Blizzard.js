define(["dojo/_base/declare"], function(declare){
    var VanillaSoftServe = declare(null, {
          constructor: function(){
            console.debug ("adding soft serve");
          }
        });
  
    var OreoMixin = declare(null, {
          constructor: function(){
            console.debug("mixing in oreos");
          },
          kind: "plain"
        });
  
    var CookieDoughMixin = declare(null, {
          constructor: function(){
            console.debug("mixing in cookie dough");
          },
          chunkSize: "medium"
        });
  
    return declare([VanillaSoftServe, OreoMixin, CookieDoughMixin], {
      constructor: function(){
        console.debug("A blizzard with " +
          this.kind + " oreos and " +
          this.chunkSize + "-sized chunks of cookie dough."
        );
      }
    });
  });