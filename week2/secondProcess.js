// fetch("http://localhost:3000", {method: "POST"}).then((result) => {
//     console.log(result);
// });

fetch("http://localhost:3000/handleSum?num=10", {method: "GET"}).then((result) => {
    result.json().then((body) => { console.log(body)});
});
