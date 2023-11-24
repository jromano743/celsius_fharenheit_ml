let model = null;

//load model
(async () => {
    model = await tf.loadLayersModel("../model/model.json");
})();

function changeCelsius() {
    let celsius = document.getElementById("celsius").value;
    document.getElementById("lbl-celsius").innerHTML=celsius;
    if (model != null) {
        let tensor = tf.tensor1d([parseInt(celsius)]);
        let prediction = model.predict(tensor).dataSync();
        prediction = Math.round(prediction, 1);
        document.getElementById("result").innerHTML = celsius + " celsius son " + prediction + " fahrenheit!";
    } else {
        document.getElementById("result").innerHTML = "Intenta de nuevo en un momento...";
    }

    updateImage(celsius);
}

function updateImage(celsius){
    let temperatureImage = document.getElementById("temperature-img");

    if(celsius < -30)
    {
        temperatureImage.src = "assets/images/snowman_emoji.png";
        return;
    }
    
    if((celsius >= -30 && celsius <= -10) || (celsius >= 35 && celsius <= 50)){
        temperatureImage.src = "assets/images/cold_sweat_emoji.png";
        return;
    }

    if(celsius >= 5 && celsius <= 25)
    {
        temperatureImage.src = "assets/images/smile_emoji.png";
        return;
    }

    if((celsius > -10 && celsius <= 5) || (celsius >= 25 && celsius < 35)){
        temperatureImage.src = "assets/images/smile_sweat_emoji.png";
        return;
    }

    if(celsius > 50)
    {
        temperatureImage.src = "assets/images/fire_emoji.png";
        return;
    }
}