define(["dojo/_base/declare", "appmain/dojolearning/person"], function(declare, Person){
    return declare(Person, {
      constructor: function(name, age, residence, salary){
        // The "constructor" method is special: the parent class (Person)
        // constructor is called automatically before this one.
  
        this.salary = salary;
      },
  
      askForRaisee: function(){
        return this.salary * 0.02;
      }
    });
  });