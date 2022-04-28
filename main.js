Webcam.set({
    width: 350,
    height: 300,
    image_format: 'png',
    png_quality: 90
});

camera = document.getElementById("camera");

Webcam.attach('#camera');

function take_snapshot() {
    Webcam.snap(function (data_uri) {
        document.getElementById("result").innerHTML = '<img id="captured_image" src="' + data_uri + '"/>';
    });
}

console.log('ml5 version:', ml5.version);
classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/tvioJmcFZ/model.json', modelLoaded);

function modelLoaded() {
    console.log('Model Loaded!');
}

function speak() {
    var synth = window.speechSynthesis;
    speak_data_1 = "The Prediction is " + prediction;
    var utterThis = new SpeechSynthesisUtterance(speak_data);
    synth.speak(utterThis);
}

function check() {
    img = document.getElementById("image_captured");
    classifier.classify(img, gotResults);
}

function gotResults(error, results) {
    if (error) {
        console.error(error);
    }
    else {
        document.getElementById("result_gesture_name").innerHTML = results[0].label;
        prediction = results[0].label;
        speak();
        if (results[0].label == "Okay") {
            document.getElementById("result_emoji").innerHTML = "&#58400;";
        }

        if (results[0].label == "Peace Sign") {
            document.getElementById("result_emoji").innerHTML = "&#57361;";
        }

        if (results[0].label == "High Five") {
            document.getElementById("result_emoji").innerHTML = "&#128400;";
        }

        if (results[0].label == "Fist Bump") {
            document.getElementById("result_emoji").innerHTML = "&#57357;";
        }

    }
}