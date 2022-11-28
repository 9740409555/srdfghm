img = "";
status ="";
song = "";
object = [];
function preload(){
    img=loadImage("dog_cat.jpg");
    song = loadSound("jin.mp3");
}

function setup()
{
    canvas = createCanvas(380,380);
    canvas.center();
    video = createCapture(VIDEO);
    video.size(380,380);
    video.hide();
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status : detecting objects";
}

function modelLoaded() {
    console.log("model loaded");
    status = true;
    objectDetector.detect(video, gotResult);
}


function gotResult(error , results){
if (error) {
    console.log(error);
}
console.log(results);

object = results;
}


function draw()
{
    image(video , 0,0, 380,380);
      

    if(status != "")
    {
        r = random(255);
        g = random(255);
        b = random(255);
        objectDetector.detect(video, gotResult);
        for (i=0;i< object.length;i++){
         document.getElementById("status").innerHTML = "Status : object detected";
        document.getElementById("number_of_objects").innerHTML = "Number of objects detected are : "+ object.length;
        fill(r,g,b);
        percent = floor(object[i].confidence*100);
        text(object[i].label + " " + percent + "%" , object[i].x, object[i].y);
        noFill();
        stroke(r,g,b);
        rect(object[i].x , object[i].y , object[i].width , object[i].height);
        if(object[i].label == "person") 
    { document.getElementById("number_of_objects").innerHTML = "Baby Found";
     console.log("stop"); 
     song.stop(); }

     else
     { document.getElementById("number_of_objects").innerHTML = "Baby Not Found";
      console.log("stop"); 
      song.play(); }
    



        }
    }
    

}