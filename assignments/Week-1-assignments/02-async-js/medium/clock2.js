let startTimestamp = Date.now();

setInterval(() => {
    console.clear();
    startTimestamp += 1000;
    let updatedDate = new Date(startTimestamp);
    
    let hours = updatedDate.getHours();
    let minutes = updatedDate.getMinutes(); 
    let seconds = updatedDate.getSeconds(); 

    let time24h = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    let ampm = hours >= 12 ? 'PM' : 'AM';
    let time12h = `${String((hours % 12 || 12)).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}:${ampm}`;
    console.log(time24h);
    console.log(time12h);
}, 1000);