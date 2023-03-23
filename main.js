img = "";
status = "";
objects = [];

function preload(){
    img = loadImage('dog_cat.jpg');
    som = loadSound('salamisound-7927385-smoke-detector-30-seconds-10.mp3');
}

function gotResult(error, results){
if(error){
    console.error(error);
}
console.log(results);
objects = results;
}


function modelLoded(){
    console.log("Modelo carregado");
    status = true;
    detector.detect(video, gotResult);
}

function setup(){
    canvas = createCanvas(380, 380);
    canvas.center();
    video = createCapture(VIDEO);
    video.size(380, 380);
    video.hide();
}

function start(){
    detector = ml5.objectDetector('cocossd', modelLoded);
    document.getElementById("status").innerHTML = "status: detectando objetos";
}

function draw(){
    image(video, 0, 0, 380, 380);
    if(status !=""){
        r = random(255);
        g = random(255);
        b = random(255);
        detector.detect(video, gotResult);
        for(i = 0; i < objects.length; i++){
            document.getElementById("status").innerHTML = "Status: Objeto Detectado";
            document.getElementById("numberOfObjects").innerHTML = "Bebê detectado";
            fill(r,g,b);
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percent + "%", objects[i].x, objects[i].y);
            noFill();
            stroke(r,g,b);
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
        }
    }
    if(objects == 0){
        som = true;
    }
}