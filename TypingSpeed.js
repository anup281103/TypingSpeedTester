$("body").bind("copy paste cut drag drop", function (e) {
  e.preventDefault();
});
// alert("Adjust Zoom Size To 25%");
$(document).ready(function () {
  let button = document.getElementById("start-btn");
  let text = document.getElementById("text");
  let message = document.getElementById("message");
  let result = document.getElementById("result");

  let startTime, endTime;
  result.style.display = "none";
  text.disabled = true;
  const SetofWords = [
    "The ocean waves crashed against the shore, a rhythmic dance of water and sand. Seagulls soared overhead, their calls echoing in the salty breeze. Sunlight painted the scene with warm hues, a canvas of tranquility",

    "In bustling city streets, people hurried by, lost in their own worlds. Skyscrapers reached for the sky, reflecting the changing hues of the day. Car horns and footsteps composed the city's melody",

    "Among emerald fields, wildflowers swayed in the gentle wind. Bees buzzed from bloom to bloom, collecting nature's sweet treasure. The sun bathed the landscape in golden light, a snapshot of harmony",

    "Within cozy homes, families gathered around tables, sharing laughter and stories. A fireplace crackled, casting a warm glow that enveloped the room. Bonds grew stronger in these cherished moments",

    "Beneath the starry night, a campfire flickered, illuminating faces with an orange glow. Marshmallows sizzled on sticks, their sugary scent wafting through the air. Friends united, finding solace in the wilderness",

    "Amid ancient ruins, history whispered its tales through weathered stone. The wind carried the whispers, connecting the present to the past. Time stood still, bridging the gap between generations",

    "Among book-filled shelves, the scent of knowledge permeated the air. Pages turned, revealing worlds within words. Each story held a piece of someone's imagination",

    "Across vast meadows, wind turbines stood in sync, harnessing nature's energy. Blades spun gracefully, a modern dance with the elements. Innovation and sustainability intertwined",

    "On the stage, lights illuminated performers who poured their hearts out. Melodies and lyrics wove emotions into art. Music created a universal language of emotions",

    "Inside quiet minds, thoughts flitted like butterflies, each one a fleeting idea. Dreams intertwined with reality, painting the canvas of the subconscious. Imagination knew no bounds in this realm",
  ];

  const start = () => {
    let index = Math.floor(Math.random() * SetofWords.length);
    $("#message").html(SetofWords[index]);
    let date = new Date();
    startTime = date.getTime();
  };

  const end = () => {
    let date = new Date();
    let endTime = date.getTime();
    let timeTaken = (endTime - startTime - 800) / 1000;
    console.log(timeTaken);

    let totalWords = message.innerText.split(" ").length;
    if (text.value.trim().length > 0) {
      var wordsCount = text.value.split(" ").length;
    } else {
      var wordsCount = 0;
    }
    let prevMessage = message.innerHTML;
    console.log(totalWords + " " + wordsCount + message.innerText);

    let speed = Math.round((60 / timeTaken) * wordsCount);

    let correctWords = accuracy(text.value, message.innerText);
    console.log("Total Words:" + wordsCount + "Correct Words:" + correctWords);
    $("#result h4").html(`Speed:  ${speed} wpm <br> 
						Words Typed: ${wordsCount}  <br> 
						Correct Words: ${correctWords} <br> 
						Accuracy:	${Math.round((correctWords / wordsCount) * 100)}%`);
    $("#message").html(
      "Text will appear here once you click on Start<hr>Previous Paragraph Was :  " +
        `${prevMessage}`
    );

    $("#text").prop("disabled", true);
  };

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
      this.innerText = "Stop";
      $("#result").fadeOut();
      $("#text").prop("disabled", false);
      start();
    } else {
      $("#result").fadeIn();
      console.log("Stopped");
      $(this).html("Start");
      end();
    }
  }
  let flag = true;
  let modeChange = document.querySelector("#modeChange");
  modeChange.addEventListener("click", function () {
    if (flag) {
      console.log("clickedbro");
      document.querySelector("body").style.filter = "invert(100%)";
      document.querySelector("body").style.background = "rgb(230, 230, 230)";
    }
    if (!flag) {
      console.log("clickedbro2");
      document.querySelector("body").style.filter = "invert(0%)";
      document.querySelector("body").style.background = "rgb(0, 0, 0)";
    }
    flag = !flag;
  });
  button.addEventListener("click", Start);
});
