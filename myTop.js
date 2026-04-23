function myTop(q1,q2,q3,q4,q5) {
        if (typeof aaa === 'undefined') return;
        qs = [q1, q2, q3, q4, q5];
        let results = [];
        qs.forEach(q => {
                   let target = q.toString().padStart(2, '0');
                   let stats = {};
                   for(let n=1; n<=39; n++) stats[n.toString().padStart(2, '0')] = 0;
                   for(let i = 1; i < aaa.length; i++){
                         if(aaa[i][1].includes(target)){
                             aaa[i-1][1].forEach(num => { if(stats[num] !== undefined) stats[num]++; });
                          }
                    }
                   let maxCount = -1;
                   let topNum = "";
                   for(let n in stats){
                         if(stats[n] > maxCount){
                               maxCount = stats[n];
                               topNum = n;
                         }else if(stats[n] === maxCount && maxCount > 0){
                               topNum += "." + n;
                         }
                    }
                    if(maxCount > 0){
                          results.push(`${topNum}(${target})`);
                    }else{
                          results.push(`無(${target})`);
                    }
        });
       document.write(results.join(", "));
}
