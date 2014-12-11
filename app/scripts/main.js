
function GameController(leftCombatants, rightCombatants) {
  this._turn = null;
  this.leftCombatants = leftCombatants;
  this.rightCombatants = rightCombatants;
  this.playerChoosesLeft = function(){
    this.player = 'left';
    this.computer = 'right';
  };
  this.playerChoosesRight = function(){
    this.player = 'right';
    this.computer = 'left';
  };
  this.playerChoosesCombatant = function(/*string*/name){
    var combatant = _.findWhere(
      this.getPlayerCombatants(),{"name": name});
      this.playerCombatant = combatant;
      this._computerChoosesCombatant();
    };
    this._computerChoosesCombatant = function(){
      var x = this.getComputerCombatants();
      this.computerCombatant = _.sample(x);
    };
    this.getPlayerCombatants = function(){
      return this.getCombatantsForSide(this.player);
    };
    this.getComputerCombatants = function(){
      return this.getCombatantsForSide(this.computer);
    };
    this.getCombatantsForSide = function(side){
      //whatever side the player did not choose
      //is the computer side
      //so the computer combatant is one from its side
      var combatantChoices;
      if ('right' === side){
        combatantChoices = this.rightCombatants;
      }else{
        combatantChoices = this.leftCombatants;
      }
      return combatantChoices;
    };
    this.attack = function(){
      console.log(this.playerCombatant,"vs", this.computerCombatant);
      if(this.gameIsFinished()) {
        console.log("game is over");
        return;
      }
      this.playerCombatant.attack(this.computerCombatant);
      if(this.gameIsFinished()) {
        return;
      }
      this.computerCombatant.attack(this.playerCombatant);
    };
    this.gameIsFinished = function(){
      return this.playerCombatant.health <= 0 || // playerCombatant
      this.computerCombatant.health <= 0; //.computerCombatant
    };
  };

  var Elephant = function (options){
    var options = options || {};
    this.name = options.name;
    this.life = options.life ||'normal';
    this.age = options.age;
    this.color = options.color;
    this.health = options.health;
    this.attack = function(stomped){
      var result = stomped.health -= _.random(10, 15);
      $('.health' + '.' + stomped.name).html(result);
      return result;
    };
    this.life = function(stomped) {
      return stomped.health -= _.random(20, 25);
    };
    $('.health.' + options.name).html(options.health);
  };

  var Lion = function (options){
    var options = options || {};
    this.life = options.life;
    this.name = options.name;
    this.age = options.age;
    this.color = options.color;
    this.health = options.health;
    this.attack = function(chomped){
      var result = chomped.health -= _.random(10, 15);
      $('.health' + '.' + chomped.name).html(result);
      return result;
    };
    this.life = function(chomped) {
      return chomped.health -= _.random(15, 20);
    };
    $('.health.' + options.name).html(options.health);
  };

  var morgan = new Elephant({
    name: "morgan",
    age: 14,
    color: "gray",
    health: 100
  });

  var blackbeard = new Elephant({
    name:"blackbeard",
    age: 17,
    color: "gray",
    health: 100
  });

  var kidd = new Elephant({
    name:"kidd",
    age: 39,
    color: "gray",
    health: 100
  });

  var lonnais = new Lion({
    name: "lonnais",
    age: 14,
    color: "yellow",
    life: 'poor',
    health: 100
  });

  var carter = new Lion({
    name: "carter",
    age: 24,
    color: "brown",
    health: 100
  });

  var lewis = new Lion({
    name: "lewis",
    age: 18,
    color: "brown",
    health: 100
  })

  var controller = new GameController(
    [morgan, blackbeard, kidd],
    [lonnais, carter, lewis]);

    var turnOnMessageNumber = function(x){
      $(".greetings > p").css("display","none");
      $(".greetings > p:nth-child(" + x +")").css("display","block");

    };

    $(".elephants").on("click", function() {
      controller.playerChoosesLeft();
      turnOnMessageNumber(3);
    });

    $(".lions").on("click", function() {
      controller.playerChoosesRight();
      turnOnMessageNumber(3);
    });

    $(".ellie, .lion").on("click", function(){
      // var animal name was clicked
      var fighterName = $(this).text();
      var f = fighterName.toLowerCase();
      controller.playerChoosesCombatant(f);
      turnOnMessageNumber(4);
    });

    $(".ellibut, .lionbut").on("click", function(){
      controller.attack();
      if(controller.gameIsFinished()){
        turnOnMessageNumber(5);
      };

    });
