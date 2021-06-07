song = "";
LWX = 0;
RWX = 0;
LWY = 0;
RWY = 0;
LWS = 0;
RWS = 0;

function preload() {
    song = loadSound("M.mp3");
}

function setup() {
    canvas = createCanvas(600, 500);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();
    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', getPoses);
}

function draw() {
    image(video, 0, 0, 600, 500);
    if (LWS > 0.2) {
        fill("#eac4ff");
        stroke("#c55cff");
        circle(LWX, LWY, 20);
        LWX_number = Number(LWX);
        LWX_widoutdecemals = floor(LWX_number);
        volume = LWX_widoutdecemals / 500;
        document.getElementById("volume").innerHTML = "volume:" + volume;
        song.setVolume(volume);
    }
    //if (RWS > 0.1) {
        fill("#eac4ff");
        stroke("#c55cff");
        circle(RWX, RWY, 20);
        if (RWY > 0 && RWY <= 100) {
            document.getElementById("speed").innerHTML = "speed=0.5x";
            song.rate(0.5);
        } else if (RWY > 100 && RWY <= 200) {
            document.getElementById("speed").innerHTML = "speed=1x";
            song.rate(1);
        } else if (RWY > 200 && RWY <= 300) {
            document.getElementById("speed").innerHTML = "speed=1.5x";
            song.rate(1.5);
        } else if (RWY > 300 && RWY <= 400) {
            document.getElementById("speed").innerHTML = "speed=2x";
            song.rate(2);
        }
        else if (RWY > 400 && RWY <= 500) {
            document.getElementById("speed").innerHTML = "speed=2.5x";
            song.rate(2.5);
        }
    //}


}

function play() {
    song.play();
    song.setVolume(1);
    song.rate(1);
}

function modelLoaded() {
    console.log("you are the worst if the poseNet works which it dose");
}

function getPoses(results) {
    if (results.length > 0) {
        console.log(results);
        LWS = results[0].pose.keypoints[9].score;
        RWS = results[0].pose.keypoints[10].score;
        LWX = results[0].pose.leftWrist.x;
        LWY = results[0].pose.leftWrist.y;
        RWX = results[0].pose.rightWrist.x;
        RWY = results[0].pose.rightWrist.y;
    } else {
        console.log("you are not a human you are a fish");
    }
}