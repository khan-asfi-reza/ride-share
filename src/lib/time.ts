export function formatTime(timeInSeconds){
    if(typeof timeInSeconds !== "number"){
        return "0 Min"
    }
    if(timeInSeconds < 3600){
        return (timeInSeconds / 60).toString() + "Min"
    }else if(timeInSeconds >= 3600){
        const hourWithFraction = timeInSeconds / 3600
        const hours = Math.floor(hourWithFraction);
        return hours.toString() + " Hour ";
    }
}