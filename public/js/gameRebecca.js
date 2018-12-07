$(document).ready(function(){
    $.get('/api/attacks', function(data) {
        console.log(data);
    })
})

$(document).ready(function(){
    $.get('/api/characters', function(data) {
        console.log(data);
    })
})
