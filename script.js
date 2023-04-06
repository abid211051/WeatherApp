var tem = document.getElementById('temp');
var na = document.getElementById('name');
var hu = document.getElementById('hu');
var wi = document.getElementById('wind');
var ic = document.getElementById('icon');
var err = document.querySelector('#error h1');
var info = document.getElementById('info');
var main = document.getElementById('main');
var humidity = document.getElementsByClassName('humidity');
var wind = document.getElementsByClassName('wind');

async function fetchdata(c){
    try{
        const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${c}&appid=41f2229daba175d58fa40e1145e41c49&units=metric`);
        if(!res.ok){
            err.style.display ='block';
            info.style.display = 'none';
        }
        else{
            info.style.display = 'block';
            err.style.display ='none';
            const data = await res.json();
            tem.innerHTML=Math.round(data.main.temp) +"°C";
            na.innerHTML = data.name;
            hu.innerHTML = data.main.humidity +"%";
            wi.innerHTML = data.wind.speed +"km/h";
            ic.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
            humidity[0].style.display = 'block';
            wind[0].style.display = 'block';
            const sunrise = new Date(data.sys.sunrise *1000);
            const sunset = new Date(data.sys.sunset *1000);
            const morningms = 5 * 60 * 60 * 1000;
            const timezonems = (data.timezone < 0 ? -1: 1)*data.timezone*1000;
            let nowdate = new Date();
            let localtime = new Date(nowdate.getTime()+ timezonems);
            let localsunrise = new Date(sunrise.getTime() + timezonems);
            let localsunset = new Date(sunset.getTime() +timezonems);
            let localmornig = new Date(sunrise.getTime() + morningms + timezonems);
            if(localtime > localsunrise && localtime < localmornig){
                main.style.background = 'linear-gradient(to bottom left, #42688f, #426a8e, #d2e2f0)';
                console.log('morning');
                main.style.color = 'black';
            }
            else if(localtime > localmornig && localtime < localsunset){
                main.style.background = 'linear-gradient(to top, #95d5fd, #e9e9e9)';
                console.log('day');
                main.style.color = 'black';
            }
            else{
                main.style.background = 'linear-gradient(to bottom, #1d2f67, #1a1a1a)';
                console.log('night');
                main.style.color ='white';
            }
            console.log(data);
        }
    }
    catch (error){
        console.error('error :', error);
    }
}


const btn = document.getElementById('btn');
btn.addEventListener('click',()=>{
    var city = document.getElementById('city').value;
    fetchdata(city)
})