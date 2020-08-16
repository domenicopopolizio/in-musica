export function getId(url_string) { 
    var url = new URL(url_string);
    return url.searchParams.get("v");
}