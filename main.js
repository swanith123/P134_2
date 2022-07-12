object_person = [];
person_status = "";
song = ""
function setup() {
  canvas = createCanvas(400, 400);
  canvas.position(425, 225);
  video = createCapture(VIDEO);
  video.size(400,400);
  video.hide();
  objectDetector = ml5.objectDetector('cocossd', modelLoaded);
  document.getElementById("status").innerHTML = "Status : Detecting Objects!";
}

function preload(){
    song = loadSound("music.mp3");
}


function modelLoaded() {
  console.log("Model Loaded!")
  person_status = true;
}


function gotResult(error, results) {
  if (error) {
    console.log(error);
  }
  else{
    console.log(results);
    object_person = results;
  }
}


function draw() {
  image(video, 0, 0, 400, 400);

      if(person_status != "")
      {
        objectDetector.detect(video, gotResult);
        r = random(255);
        g = random(255); 
        b = random(255);

          for (i = 0; i < object_person.length; i++) {
          document.getElementById("status").innerHTML = "Status : Object Detected";
          fill(r,g,b);
          percent = floor(object_person[i].confidence * 100);
          text(object_person[i].label + " " + percent + "%", object_person[i].x + 15, object_person[i].y + 15);
          noFill();
          stroke(r,g,b);
          rect(object_person[i].x, object_person[i].y, object_person[i].width, object_person[i].height);

        if (object_person[i].label== "person")  
        {
            document.getElementById("person_found").innerHTML = "Person(s) Found";
            song.stop();
        }
        else
        {
            document.getElementById("person_found").innerHTML = "Person(s) Not Found";
            song.play();
        }
        }
    

    if(object_person.length==0)
    {
        document.getElementById("person_found").innerHTML = "Person(s) Not Found";
            song.play();
    }
}
}
