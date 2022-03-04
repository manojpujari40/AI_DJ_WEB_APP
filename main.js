song = "";

function preload()
{
	song = loadSound("music.mp3");
}

scoreRightWrist = 0;
scoreLeftWrist = 0;

rightWristX = 0;
rightWristY = 0;

leftWristX = 0;
leftWristY = 0;

function setup() {
	canvas =  createCanvas(600, 500);
	canvas.center();

	video = createCapture(VIDEO);
	video.hide();

	poseNet = ml5.poseNet(video, modelLoaded);
	poseNet.on('pose', gotPoses);
}

function modelLoaded() {
  console.log('PoseNet Is Initialized');
}
function play()
{
	song.play();
	song.setVolume(1);
	song.rate(1);
}
function gotPoses(results){
    if(results.length > 0){
        scoreRightWrist = results[0].pose.keypoints[10].score;
        scoreLeftWrist = results[0].pose.keypoints[9].score;
        console.log("scoreRightWrist = " + scoreRightWrist + "scoreLeftWrist = " + scoreLeftWrist);

        rightWristX = results[0].pose.rightWrist.X;
        rightWristX = results[0].pose.rightWrist.Y;
        console.log("rightWristX = " + rightWristX + "rightWristY" + rightWristY);

        leftWristX = result[0].pose.leftWrist.X;
        leftWristY = results[0].pose.leftWrist.Y;
        console.log("leftWristX = " + leftWristX + "leftWristY = " + leftWristY);
    }
}
function draw(){
    image(video, 0, 0, 600, 500);

    fill("#FF0000");
    stroke("#FF0000");

    if(scoreRightWrist > 0.2){
        circle(rightWristX, rightWristY, 20);
    }

    if(rightWristY > 0 && rightWristX <= 100){
        document.getElementById("speed").innerHTML = "speed = 0.5x";
        song.rate(0.5);
    }
    else if(rightWristY > 100 && rightWristX <= 200){
        document.getElementById("speed").innerHTML = "speed = 1x";
        song.rate(1);
    }
    else if(rightWristY > 300 && rightWristX <= 400){
        document.getElementById("speed").innerHTML = "speed = 2x";
        song.rate(2);
    }
    else if(rightWristY > 400){
        document.getElementById("speed").innerHTML = "speed = 2.5x";
        song.rate(2.5);
    }
}

if(scoreLeftWrist > 0.2){
    circle(leftWristX, leftWristY, 20);
    InNumberofLeftWristY = Number(leftWristY);
    new_leftWristY = floor(InNumberofLeftWristY * 2);
    leftWristY_divide_l000 = new_leftWristY/1000;
    document.getElementById("volume").innerHTML = "Volume = " + leftWristY_divide_l000;
    song.setVolume(leftWristY_divide_l000);
}