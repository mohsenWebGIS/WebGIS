define(["dojo/_base/declare", 'appmain/dojolearning/Employee'], function(declare, Employee){
    return declare(Employee, {
      askForRaisee: function(){
        return this.inherited(arguments) * 20;
      }
    });
  });