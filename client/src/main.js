export async function fetchData(route = '', data = {}, methodType) {
    //sending over our data to specify route in server
    const response = await fetch(`http://localhost:5001/${route}`, {
        method: methodType, // *GET, POST, PUT, DELETE, etc.
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });

    //dealing with our response from server 
    if (response.ok) {
        return await response.json();
    } else {
        throw await response.json();
    }
}
    
    