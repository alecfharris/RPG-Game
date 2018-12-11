$.get('/api/attacks', function(data) {
    // Here are your two arrays, rename them as necessary
    let magicalIsTrue = [];
    let magicalIsFalse = [];
    console.log(data);
    attacks = data;
    for(var i = 0; i < attacks.length; i++) {
        console.log(attacks[i].Weapon);
        if (attacks[i].magical) {
             magicalIsTrue.push(attacks[i])
        } else {
            magicalIsFalse.push(attacks[i])
        }
    }
    // The two arrays are sorted when the above function finishes.
});