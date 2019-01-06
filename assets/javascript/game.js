//Pseudocode:
//Super Smash Bros RPG!
//Game starts, page is loaded including 4 characters to choose from
//Each character has health, and an attack power all within a character card div
//Each div listens for clicks. When clicked, the person clicked should move to the "Your Character" section
//The remaining 3 divs are moved to the "Enemies Available To Attack" section and their background goes to red
//When one of the characters in the Available to attack section is clicked, They move to the "Defender" section and background goes to black
//When attack is clicked, your attack triggers at a given number. Every attack, that number is doubled
//At the same time, the enemy attacks you for a set ammt that does not increase
//If your character health < 0, you lose, it says you are defeated, clicking attack does not work and a restart bottun pops
//Clicking restart button reloads the page
//if the defender's health drops below 0, it tells me I have defeated Luke and I can choose another enemy
//If there is no enemy in the defender box, and you click attack, game tells you to choose another enemy
//When the next character is picked, they move to defender and same cycle occurs, but the attack is still incrementing by 8
//If you kill every team member, the game alerts you that you have won and makes it game over

//Remember! You can give an image an attribute that it carries - can be a number or value later accessed

$(document).ready(function() {
  //Declaring attributes for health and attack of each character
  $("#mario").attr("health", 140);
  $("#mario").attr("attack", 20);
  $("#mario").attr("name", "Mario");
  $("#marth").attr("health", 95);
  $("#marth").attr("attack", 10);
  $("#marth").attr("name", "Marth");
  $("#isabelle").attr("health", 180);
  $("#isabelle").attr("attack", 35);
  $("#isabelle").attr("name", "Isabelle");
  $("#pokemon").attr("health", 110);
  $("#pokemon").attr("attack", 18);
  $("#pokemon").attr("name", "Pokemon Trainer");

  //Showing health levels on screen
  $("#mario-health").html($("#mario").attr("health"));
  $("#isabelle-health").html($("#isabelle").attr("health"));
  $("#marth-health").html($("#marth").attr("health"));
  $("#pokemon-health").html($("#pokemon").attr("health"));

  //Adding hero class when initial click is made to select a character
  $(".char-class").click(function() {
    $(this)
      .attr("faction", "hero")
      .addClass("hero");
    console.log(this);
    $(this).css("display", "block"); //Centers the hero in its div
    var others = $(".char-class").not(".hero"); //Defines a variable w all characters that are not the hero
    console.log(others);
    others.attr("faction", "enemy").addClass("enemy"); //Adds an enemy faction attribute (needed?) and class to each of the enemies
    //Removes click for the enemy and hero
    $(".enemy").off("click");
    $(".hero").off("click");
    //Adds Hero and enemies to their appropriate divs
    $("#your-character-area").append(this);
    $("#enemy-choose-area").append(others);
    //Click listener that selects a defender
    $(".enemy").click(function() {
      $(this).addClass("defender"); //Adds defender css class
      $("#defender-area").append($(".defender")); //Appends defender to appropriate div
      $(".enemy").off("click"); //Removes event listener from enemy div
      var heroAttackMult = $(".hero").attr("attack"); //Declares an attack variable outside scope of attack section to increase hero attack each round
      //Click listener on attack button - this is the main functionality of the battleground
      $(".attack-btn").click(function() {
        //Declaring varibales to set name, health and attack attributes for defender and hero
        var defenderName = $(".defender").attr("name");
        console.log(defenderHealth);
        var defenderHealth = $(".defender").attr("health");
        console.log(defenderHealth);
        var defenderAttack = $(".defender").attr("attack");
        var heroName = $(".hero").attr("name");
        var heroHealth = $(".hero").attr("health");
        var heroAttack = $(".hero").attr("attack");
        console.log(defenderHealth);
        $(".defender").attr("health", defenderHealth - heroAttack); //Reduces defenders health by ammt of hero attack
        console.log(defenderHealth);
        $(".defender > .char-health").html($(".defender").attr("health")); //Changes the defender's health on screen
        console.log(defenderHealth);
        console.log($(".defender > .char-health"));
        $(".hero").attr("health", heroHealth - defenderAttack); //Reduces hero's health by ammt of defender's attack
        $(".hero > .char-health").html($(".hero").attr("health")); //Changes hero's health on screen
        //Display details about each move in detail box
        $("#game-details").html(
          "You attacked " +
            defenderName +
            " for " +
            heroAttack +
            " damage" +
            "<br>" +
            defenderName +
            " attacked you back for " +
            defenderAttack +
            "."
        );
        //Increases the power of the hero's attack each move, by the value of heroAttackMult variable declared outside scope of this function
        $(".hero").attr(
          "attack",
          parseInt(heroAttack) + parseInt(heroAttackMult)
        );
        console.log(defenderHealth);

    if(heroHealth <= 0) {
        $('#game-details').html('Health reduced below 0, you lose!');
    }

    if(defenderHealth <= 0){
        $('#game-details').html('You have defeated ' + defenderName + ' choose a new enemy to fight.');
        $('.defender').css('display', 'none');
        $(".enemy").click(function() {
            $(this).addClass("defender"); //Adds defender css class
            $("#defender-area").append($(".defender")); //Appends defender to appropriate div
            $(".enemy").off("click"); //Removes event listener from enemy div
        });
    }
      });
    });
  });
});
