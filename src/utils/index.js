export function getId(url_string) { 
    var url = new URL(url_string);
    return url.searchParams.get("v");
}

export function getCurrentTime(video) {
    let time = video.time;
    let now = new Date();
    let updated_at = new Date(video.updated_at);
    let status = video.status;

    if(status != 1) {
        return time;
    }
    else {
        return time  + (now - updated_at)/1000;
    } 
}

export function colorGenerator() {
    return '#'+(0x1000000+(Math.random())*0xffffff).toString(16).substr(1,6);
}