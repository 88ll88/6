function TT(x){
       var xz= Array(40).fill(0);
       aaa.slice(0, x).map(r =>r[1].map(n => xz[Number(n)]++));
       return xz.slice(1,40);
}

