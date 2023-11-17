video = "";
Status = ""
objects = [];
function setup() {
    canvas = createCanvas(480, 380)
    canvas.center()
}

function preload(){
    video = createVideo('video.mp4')
    video.size(480, 380);
  video.hide();
}


function start(){
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status : Dectecting Objects"
}

function modelLoaded() {
    console.log("Model Loaded!");
    Status = true;
    video.loop();
    video.speed(1);
    video.volume(0);
}
function draw(){
    image(video, 0, 0, 480, 380)
    if(Status !="")
    {
        objectDetector.detect(video, gotResult);
        for(i = 0; i < objects.length; i++) {
            document.getElementById("status").innerHTML = "Status : Objects Dectected";
            document.getElementById("objects").innerHTML = "Number of objects dectected are : "+ objects.length;

            fill("white");
            percent = floor(objects[i].confidence = 100);
            text(objects[i].label + " " + percent + "%", objects[i].x + 15, objects[i].y +15);
            noFill();
            stroke("red");
            strokeWeight(3)
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
        }
    }
}

function gotResult(error, results) {
    if (error) {
        console.log(error);
    }
    console.log(results);
    objects = results;
}
