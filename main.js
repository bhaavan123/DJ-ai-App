leftWristX = "";
leftWristY = "";
rightWristX = "";
rightWristY = "";
song = "";
scoreLeftWrist = "";
scoreRightWrist = "";
function preload(){
song = loadSound("music.mp3");   
}

function setup(){
    canvas = createCanvas(500,500);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
    
    }

    function draw(){
        image(video,0,0,500,500);
        fill("#1aff05");
        stroke("#1aff05");
         
        if(scoreLeftWrist > 0.2){
        fill("#1aff05");
        stroke("#1aff05");
        
        circle(leftWristX - 50,leftWristY - 20,20);

        inNumberLeftWristY = Number(leftWristY);

        remove_decimals = floor(inNumberLeftWristY);

        volume = remove_decimals/500;

        document.getElementById("volume").innerHTML = "Volume = "+volume;

        song.setVolume(volume);
        }
     if(scoreRightWrist > 0.2){
        circle(rightWristX + 50,rightWristY + 20,20);

        if(rightWristY > 0 && rightWristY < 100){
            document.getElementById("speed").innerHTML = "Speed  = 0.5x";
            song.rate(0.5);
        }
        if(rightWristY > 100 && rightWristY < 200){
            document.getElementById("speed").innerHTML = "Speed  = 1x";
            song.rate(1);
        }
        if(rightWristY > 200 && rightWristY < 300){
            document.getElementById("speed").innerHTML = "Speed  = 1.5x";
            song.rate(1.5);
        }
        if(rightWristY > 300 && rightWristY < 400){
            document.getElementById("speed").innerHTML = "Speed  = 2x";
            song.rate(2);
        }
        if(rightWristY > 400 && rightWristY < 500){
            document.getElementById("speed").innerHTML = "Speed  = 2.5x";
            song.rate(2.5);
        }
    }
    }

    function play(){
    song.play();
    song.setVolume(1);  
    song.rate(1);


}

function modelLoaded(){
console.log("Model is Initialized");

}

function gotPoses(results){
    if(results.length  > 0){
        console.log(results);
        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        righttWristX = results[0].pose.rightWrist.x;
        righttWristY = results[0].pose.rightWrist.y;

        console.log(leftWristX,leftWristY,rightWristX,rightWristY);

        scoreLeftWrist = results[0].pose.keypoints[9].score;
        scoreRightWrist = results[0].pose.keypoints[10].score;
    }
}



