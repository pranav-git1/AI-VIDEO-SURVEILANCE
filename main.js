objects = [];
status = "";
video = "";

function preload() {
    video = createVideo("video.mp4");
    video.hide();
}

function setup() {
    canvas = createCanvas(350, 350);
    canvas.center();
}

function draw() {
    image(video, 0, 0, 350, 350);
    if (status != "") {
        objectDetector.detect(video, gotResults);
        for (i = 0; i < objects.length; i++) {
            document.getElementById("status").innerHTML = "Status: OBJECTS DETECTED";
            document.getElementById("number_of_object").innerHTML = "The number of objects detected are: " + objects.length;
            percent = floor(objects[i].confidence * 100);
            fill("#FF0000");
            stroke("#FF0000");
            text(objects[i].label + ":" + percent + "%", objects[i].x, objects[i].y);
            noFill();
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
        }
    }
}

function start() {
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status: DETECTING OBJECTS";
}

function modelLoaded() {
    console.log("model loaded");
    status = true;
    video.loop();
    video.speed(1);
    video.volume(0.5);
}

function gotResults(error, results) {
    if (error) {
        console.error(error);
    } else {
        console.log(results);
        objects = results;
    }
}