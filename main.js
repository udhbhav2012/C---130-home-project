song="";
song2="";
leftx=0;
lefty=0;
rightx=0;
righty=0;
score_left_wrist=0;
score_right_wrist=0;
song1_status="";
song2_status="";


function preload() {
    song=loadSound("114_pirates_of_caribbean_themes_mp3_ringtone_ringtone_mp3.mp3");
    song2=loadSound("44_avengers_theme_bgm_mp3_ringtone_ringtone_mp3.mp3");
}

function setup() {
    canvas=createCanvas(600, 500);
    canvas.position(470, 200);
    video=createCapture(VIDEO);
    video.hide();

    poseNet=ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}

function gotPoses(results) {
    if(results.length>0) {
        console.log(results);

        score_left_wrist=results[0].pose.keypoints[9].score;
        console.log("Score of Left Wrist= "+score_left_wrist);

        leftx=results[0].pose.leftWrist.x;
        console.log("Left Wrist x= "+leftx);
        lefty=results[0].pose.leftWrist.y;
        console.log("Left Wrist y= "+lefty);

        score_right_wrist=results[0].pose.keypoints[10].score;
        console.log("Score of Right Wrist= "+score_right_wrist);

        rightx=results[0].pose.rightWrist.x;
        console.log("Right Wrist x= "+rightx);
        righty=results[0].pose.rightWrist.y;
        console.log("Right Wrist y= "+righty);
    }
}

function modelLoaded() {
    console.log("PoseNet Is Loaded!");
}

function draw() {
    image(video, 0, 0, 600, 500);

    song1_status=song.isPlaying();
    song2_status=song2.isPlaying();

    fill("green");
    stroke("green");

    if(score_left_wrist>0.2) {
        circle(leftx, lefty, 20);
        song2.stop();

        if(song1_status==false) {
            play();
            song.isPlaying();
            document.getElementById("song_name").innerHTML="Playing= Piates of Carribbean Theme Song";
        }
    }

    if(score_right_wrist>0.2) {
        circle(rightx, righty, 20);
        song.stop();

        if(song2_status==false) {
            play2();
            song2.isPlaying();
            document.getElementById("song_name").innerHTML="Playing= Avengers Theme";
        }
    }
}

function play() {
    song.play();
    song.setVolume(1);
}

function play2() {
    song2.play();
    song2.setVolume(1);
}