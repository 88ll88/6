function times(group) {
    var list = {};
    for (var n = 1; n <= 39; n++) list[n.toString().padStart(2, '0')] = new Array(40).fill(0);

    group.forEach(function(years) {
        if (!years || years.years < 2) return;
        for (var i = 1; i < years.length; i++) {
            var old = years[i].de || years[i];
            var news = years[i-1].de || years[i-1];
            
            old.forEach(function(h) {
                var num = h.toString().padStart(2, '0');
                if (list[num]) {
                    news.forEach(function(t) { list[num][parseInt(t)]++; });
                }
            });
        }
    });

    var r = {};
    for (var k in list) r[k] = list[k].slice(1); 
    return JSON.stringify(r);
}


console.log("1. 2007-2025.js:",times([T,S,R,Q,P,O,N,M,L,K,J,I,H,G,F,E,D,C,B]));

console.log("2. 2024-今.js:", times([C, B, A]));

console.log("3. 2025-今.js:", times([B, A]));
