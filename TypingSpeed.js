$("body").bind("copy paste cut drag drop", function (e) {
  e.preventDefault();
});
let timelimit = document.getElementById("Timing").value;
function timing() {
  t = document.getElementById("Timing").value;
  console.log(t);
}
$(document).ready(function () {
  let button = document.getElementById("start-btn");
  let text = document.getElementById("text");
  let message = document.getElementById("message");
  let result = document.getElementById("result");
  let timer = document.getElementById("timer");
  let restart = document.getElementById("restart-btn");
  let startTime;
  result.style.display = "none";
  text.disabled = true;
  const SetofWords = [
    "In the heart of a bustling marketplace, where the kaleidoscope of colors from myriad stalls painted the scene, vendors passionately hawked their wares to the curious throngs that meandered through the labyrinth of market alleys. The vibrant tapestry of cultures converged in this lively bazaar, creating an eclectic mosaic of traditions, stories, and a palpable sense of human connection. Amidst the fragrant aromas of exotic spices and the lively chatter of bargaining, one could witness the ebb and flow of life's commerce, where the exchange of goods mirrored the exchanges of laughter, shared experiences, and the timeless dance of commerce and camaraderie.",
    "Under the vast canvas of the cosmos, where galaxies danced in celestial choreography, astronomers peered through colossal telescopes, unlocking the mysteries of the universe that spanned beyond the boundaries of our cosmic backyard. Each twinkle of a distant star whispered secrets that spanned eons of cosmic history, and the very act of observing the night sky became a humbling journey through time and space. As astronomers deciphered the language of the stars, they unearthed tales of cosmic collisions, stellar births, and the grand narrative of the universe etched across the vast cosmic expanse.",
    "The symphony of a grand academic symposium echoed through the hallowed halls of knowledge, as intellectuals from diverse disciplines engaged in spirited discourse, exchanging ideas like currency in the marketplace of thought. Minds collided and ideas collided, sparking intellectual fires that illuminated the collective pursuit of knowledge and understanding. In this dynamic arena of intellectual exchange, the boundaries between disciplines blurred, and the pursuit of truth became a collaborative venture, where the harmonious convergence of diverse perspectives created a cacophony of wisdom.",
    "Nestled within the embrace of rolling hills and lush meadows, a quaint village stood frozen in time, seemingly untouched by the hurried pace of the modern world. Here, the rhythm of life unfolded at a leisurely pace, with the community sharing not just their stories but also the simple joys of existence. In this idyllic setting, where laughter echoed through cobblestone streets and the scent of blooming flowers lingered in the air, the village became a haven of tranquility, a refuge from the chaotic tempo of contemporary life.",
    "In the ever-evolving realm of architecture, where structures became not just functional spaces but monuments to human ingenuity, the skyline bore witness to the relentless pursuit of design excellence. Skyscrapers soared to unprecedented heights, bridges spanned great distances with grace, and each architectural edifice told a tale of innovation, progress, and the symbiotic relationship between form and function. The urban landscape, with its concrete jungles and iconic landmarks, became a testament to humanity's ability to shape the physical world according to its aspirations and visions.",
    "Through the lens of a powerful microscope, a world unseen by the naked eye unfolded—a microscopic cosmos teeming with life, complexity, and the delicate dance of existence at the cellular level. Cells divided and multiplied, organisms thrived in microscopic ecosystems, and the intricate choreography of biological processes unfolded like a mesmerizing ballet. In this hidden realm, where the very building blocks of life engaged in a constant symphony of creation and destruction, the essence of existence revealed itself in the smallest of scales.",
    "Within the corridors of a bustling hospital, where the hum of sophisticated medical machinery blended with the soft murmur of compassionate care, healthcare professionals worked tirelessly, each holding not just medical instruments but also the profound responsibility of nurturing hope and healing. In their hands, they cradled the fragility of life, making split-second decisions that echoed with the gravity of life and death. The hospital, a microcosm of humanity's collective vulnerability, became a crucible where the resilience of the human spirit met the complexities of the human body.",
    "Amidst the vast expanse of a desert, where the golden dunes stretched as far as the eye could see, the silence spoke volumes. The shifting sands, sculpted by the invisible hand of the wind, bore witness to the eternal dance between nature and time. In this desolate yet mesmerizing landscape, where the only sounds were the whispers of the breeze and the soft shifting of sand grains, one could feel a profound connection to the forces that shaped the earth over millennia, creating a timeless tableau of beauty and solitude.",
    "The stage, bathed in the warm glow of meticulously positioned spotlights, became a realm of expression and emotion where actors, with scripted words and unspoken gestures, transported audiences into worlds both real and imaginary. The theatre, with its capacity to transcend the boundaries of reality, invited spectators to suspend disbelief and immerse themselves in narratives that ranged from the profound to the whimsical. Each performance, a collaboration between thespians and the collective imagination of the audience, became a celebration of the artistry that breathed life into scripted stories.",
    "Within the hallowed walls of a venerable library, where the shelves held the accumulated wisdom of centuries, readers embarked on journeys of the mind that transcended the limitations of time and space. The turning of pages echoed the collective pursuit of knowledge, a timeless quest that transcended generations. In this sanctuary of thought, where the smell of aging parchment mingled with the hushed whispers of avid readers, the library became a repository of human intellect, a sacred space where the torch of wisdom passed from one generation to the next.",
  ];

  // function changeDiff() {
  //   if (difficulty.innerHTML === "Hard") {
  //     difficulty.innerHTML = "Easy";
  //     console.log("Easy");
  //   } else {
  //     difficulty.innerHTML = "Hard";
  //     console.log("Hard");
  //   }
  // }

  // difficulty.addEventListener("click", changeDiff);

  t = `${timelimit}`;
  function start() {
    button.style.display = "none";
    restart.style.display = "block";

    let index = Math.floor(Math.random() * SetofWords.length);
    $("#message").html(SetofWords[index]);
    let date = new Date();
    startTime = date.getTime();
    const myInterval = setInterval(myTimer, 1000);

    function myTimer() {
      t = t - 1;
      if (t > 0) timer.innerHTML = `${t}`;
      else {
        clearInterval(myInterval);
        timer.innerHTML = `0`;
        end();
      }
    }
  }

  function end() {
    t = `${timelimit}`;
    restart.style.display = "none";
    button.style.display = "block";
    let date = new Date();
    let endTime = date.getTime();
    let timeTaken = (endTime - startTime - 800) / 1000;
    let totalWords = message.innerText.split(" ").length;
    if (text.value.trim().length > 0) {
      var wordsCount = text.value.split(" ").length;
    } else {
      var wordsCount = 0;
    }
    console.log(totalWords + " " + wordsCount + message.innerText);

    let correctWords = accuracy(text.value, message.innerText);
    let speed = Math.round((60 / timeTaken) * wordsCount);
    console.log("Total Words:" + wordsCount + "Correct Words:" + correctWords);
    $("#result h4").html(`Speed:  ${speed} wpm <br> 
						Words Typed: ${wordsCount}  <br> 
						Correct Words: ${correctWords} <br> 
						Accuracy:	${Math.round((correctWords / wordsCount) * 100)}%`);
    $("#message").html("Text will appear here once you click on Start");

    $("#text").prop("disabled", true);

    $("#result").fadeIn();
  }
  const accuracy = (str, message) => {
    message = message.split(" ");
    let count = 0;
    console.log(message);
    str
      .trim()
      .split(" ")
      .forEach(function (item) {
        console.log("item: " + item + message.indexOf(item));
        if (message.indexOf(item) > -1) count++;
      });
    return count;
  };

  function Start() {
    console.log("Clicked ");
    if (this.innerText === "Start") {
      $("textarea").val("");
      console.log("Started");
      $("#result").fadeOut();
      $("#text").prop("disabled", false);
      start();
    } else {
      $("#result").fadeIn();
      console.log("Stopped");
      $(this).html("Start");
    }
  }
  let flag = true;
  let modeChange = document.querySelector("#modeChange");
  modeChange.addEventListener("click", function () {
    if (flag) {
      modeChange.innerText = "🌙Dark Mode";
      document.querySelector(".title").style.color = "rgb(54, 64, 101)";
      document.querySelector("body").style.background = " rgb(193, 193, 193)";

      document.querySelector("#resultInner").style.color = "black";
      document.querySelector("#resultInner").style.border =
        "solid rgb(54, 64, 101)";
      document.querySelector("#message").style.background = "#b6b6b6";
      document.querySelector("#message").style.color = "#000";
      document.querySelector("#text").style.background = "#b6b6b6";
      document.querySelector("#text").style.color = "#000";
      document.querySelector("#timer").style.color = "rgb(0, 0, 0)";
    }
    if (!flag) {
      modeChange.innerText = "💡Light Mode";
      document.querySelector(".title").style.color = "aqua";
      document.querySelector("body").style.background = "rgb(0, 0, 0)";
      document.querySelector("#resultInner").style.color = "white";
      document.querySelector("#resultInner").style.border = "solid aqua";
      document.querySelector("#text").style.background = "#474747";
      document.querySelector("#text").style.color = "rgb(197, 195, 195)";
      document.querySelector("#message").style.background = "#474747";
      document.querySelector("#message").style.color = "rgb(197, 195, 195)";
      document.querySelector("#timer").style.color = "rgb(255, 255, 255)";
    }
    flag = !flag;
  });
  button.addEventListener("click", Start);
});
function reload() {
  location.reload();
}
