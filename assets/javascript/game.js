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
  //Declaring attributes for health, attack and name of each character
  $("#mario").attr("health", 140);
  $("#mario").attr("attack", 5);
  $("#mario").attr("shield", 15);
  $("#mario").attr("name", "Mario");
  $("#marth").attr("health", 95);
  $("#marth").attr("attack", 8);
  $("#marth").attr("shield", 15);
  $("#marth").attr("name", "Marth");
  $("#isabelle").attr("health", 180);
  $("#isabelle").attr("attack", 19);
  $("#isabelle").attr("shield", 15);
  $("#isabelle").attr("name", "Isabelle");
  $("#pokemon").attr("health", 110);
  $("#pokemon").attr("attack", 12);
  $("#pokemon").attr("shield", 15);
  $("#pokemon").attr("name", "Pokemon Trainer");

  var defenderKillCount = 0; //Set kill count to allow win-game logic when all enemies are defeated

  //Showing health levels on screen
  $("#mario-health").html($("#mario").attr("health"));
  $("#isabelle-health").html($("#isabelle").attr("health"));
  $("#marth-health").html($("#marth").attr("health"));
  $("#pokemon-health").html($("#pokemon").attr("health"));

  //Adding hero class when initial click is made to select a character
  $(".char-class").click(function() {
    $(this)
      .addClass("hero");
    $(this).css("display", "block"); //To center hero in its div
    var others = $(".char-class").not(".hero"); //Defines a variable w all characters that are not the hero
    others.addClass("enemy");
    //Removes click for the enemy and hero after selected so you cannot choose more
    $(".enemy").off("click");
    $(".hero").off("click");
    //Adds Hero to their appropriate divs, with effects
    $("#your-character-area")
      .append(this)
      .slideDown("slow");
    //Makes it known to the user that there is no enemy in the battleground if they try and attack to early
    $(".attack-btn").click(function noEnemy() {
      $("#game-details").html("Choose an enemy to fight before attacking");
    });
    //Adds enemies to their divs, with effect
    $("#enemy-choose-area")
      .append(others)
      .show("slow");
    //Click listener that selects a defender and moves them to their div
    $(".enemy").click(function() {
      $(this).addClass("defender"); //Adds defender css class
      $("#active-defender-area")
        .append($(".defender"))
        .slideDown("slow");
      $(".enemy").off("click"); //Removes event listener from enemy div
      var heroAttackMult = $(".hero").attr("attack"); //Declares an attack variable outside scope of attack section to increase hero attack each round
      //Declaring varibales to set name of defender and heroes
      var defenderName = $(".defender").attr("name");
      var heroName = $(".hero").attr("name");
      var heroHealth = $('.hero').attr('health');
      var defenderHealth = $('.defender').attr('health');
      //Click listener on attack button - this is the main functionality of the battleground
      $(".attack-btn").click(function attackButton() {
          console.log('defender health started at' + defenderHealth)
          console.log('hero health started at' + heroHealth)
        defenderHealth = defenderHealth - $(".hero").attr("attack");
        //$(".defender").attr(
        //  "health",
        //  $(".defender").attr("health") - $(".hero").attr("attack")
        //); //Reduces defenders health by ammt of hero attack
        $(".defender > .char-health").html(defenderHealth); //Changes the defender's health on screen
        console.log('after attack, defender health is now ' + defenderHealth)
        //Only decrease the health of the hero if the hero's attack is not less than the defender's health -- explain?
        if (!$(".hero").attr("attack") <= defenderHealth) {
            heroHealth = heroHealth - $(".defender").attr("attack");
            console.log('after attack, hero health is now ' + heroHealth)
          //$(".hero").attr(
            //"health",
           // $(".hero").attr("health") - $(".defender").attr("attack")
         // ); //Reduces hero's health by ammt of defender's attack
          $(".hero > .char-health").html(heroHealth); //Changes hero's health on screen
        } else {
          //to check when something went wrong
          console.log("hero attack is " + $(".hero").attr("attack"));
          console.log("defender health is" + defenderHealth);
          console.log("Heros attack was greater than the defenders health");
        }
        //Display details about each move in detail box
        $("#game-details").html(
          "You attacked " +
            defenderName +
            " for " +
            $(".hero").attr("attack") +
            " damage" +
            "<br>" +
            defenderName +
            " attacked you back for " +
            $(".defender").attr("attack") +
            "."
        );
        //Increases the power of the hero's attack each move, by the value of heroAttackMult variable declared outside scope of this function
        $(".hero").attr(
          "attack",
          parseInt($(".hero").attr("attack")) + parseInt(heroAttackMult)
        );
        console.log("hero attack is now" + $(".hero").attr("attack"));

        if (
          defenderHealth <= 0 &&
          heroHealth > 0
        ) {
          $("#game-details").html(
            "You have defeated " +
              defenderName +
              " choose a new enemy to fight."
          );
          $(".defender").hide("fast");
          defenderKillCount++;
          console.log(defenderKillCount);
          $(".attack-btn").off("click"); //Turns off click listener on attack button until another enemy is chosen
          $(".enemy").click(function() {
            $(".attack-btn").click(attackButton); //Calls the attackButton function code to restart fight sequence
            $(this).addClass("defender"); //Adds defender css class
            $("#defender-area").append($(".defender")); //Appends defender to appropriate div
            $(".enemy").off("click"); //Removes event listener from enemy div
          });
        }
        if (defenderKillCount === 3) {
          $("#game-details").html("You have defeated all defenders - you win!");
        }
        if (heroHealth <= 0) {
          healthLost();
        }
      });
      $(".shield-btn").click(function() {
        if ($(".hero").attr("shield") > 0) {
          //$(".hero").attr(
           // "health",
           // parseInt($(".hero").attr("health")) +
            //  parseInt($(".hero").attr("shield"))
         // );
         heroHealth = heroHealth + parseInt($(".hero").attr("shield"));
          shieldDisplay = $(".hero").attr("shield");
          console.log('shield was ' + $(".hero").attr("shield"));
          $(".hero").attr("shield", parseInt($(".hero").attr("shield")) - 5);
          console.log('Now shield is ' + $(".hero").attr("shield"));
          //Changes the defender's health on screen
          heroHealth = heroHealth - $(".defender").attr("attack");
          //$(".hero").attr(
          //  "health",
          //  $(".hero").attr("health") - $(".defender").attr("attack")
          //);
          $(".hero > .char-health").html(heroHealth);
          $("#game-details").html(
            "You used shield and blocked " +
              shieldDisplay +
              " damage. " +
              defenderName +
              " hit you for " +
              $(".defender").attr("attack") +
              " damage. You now have " +
              heroHealth +
              " health left. Your shield decreased to " +
              $(".hero").attr("shield")
          );
        } else {
          $("#game-details").html("You have no shield left - you must attack");
        }
        //Lose game if you die while clicking shield
        if (heroHealth <= 0) {
          healthLost();
        }
      });
      //Lost game logic add more functions here?
      function healthLost() {
        $("#game-details").html("Health reduced to 0 - you lose!");
        $(".attack-btn").off("click");
        $(".enemy").off("click");
        $(".hero").attr("health", 0);
        $(".hero > .char-health").html($(".hero").attr("health"));
        $(".restart").css("visibility", "visible");
        $(".restart").click(function() {
          location.reload();
        });
      }
    });
  });
});
