// https://www.weatherapi.com/docs/

let url="http://api.weatherapi.com/v1/current.json"
const apiKey="c9f05102cc9b4de2b2645539241106"

const locationInput = document.getElementById('locationInput')
const searchButton = document.getElementById('searchButton')
const locationRes = document.getElementById('location')
const tempRes = document.getElementById('temperature')
const description = document.getElementById('description')
const lastUpdated = document.getElementById('last_updated')
const imgRes = document.getElementById('image')
const regionRes = document.getElementById('region')

searchButton.addEventListener("click",()=>{
    const location = locationInput.value
    
    if(location)
        getWeather(location)
} )

async function getWeather(city)
{   
    const temp = `${url}?q=${city}&key=${apiKey}`
    const res = await fetch(temp)
    console.log(res)
    try {
        if(res.ok)
            {
                const data = await res.json()
                console.log(data)
                locationRes.textContent=`Location : ${data.location.name}`
                regionRes.textContent=`Region: ${data.location.region}`
                tempRes.textContent = `Temperature: ${data.current.temp_c}°C`
                description.textContent=`Condition: ${data.current.condition.text}`
                lastUpdated.textContent =`Last Updated: ${data.current.last_updated}` 
                imgRes.src=data.current.condition.icon
            }
        else
        {
            locationRes.textContent = "Enter a correct value"
            tempRes.textContent=""
            description.textContent=""
            lastUpdated.textContent=""
            imgRes.src=""
            regionRes.textContent=" "
        }
    } catch (error) {
        console.log(error)
        
    }
  
}