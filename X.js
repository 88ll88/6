function X(all,str){
	  var obj={},arr=[];
    for(let i=1;i<= 39; i++)obj[String(i).padStart(2,'0')]={};
    for(var i=all.length-1;i>0;i--){
           var x=all[i].slice(1,6);
           var y=all[i-1].slice(1,6);
           x.forEach(c=>{y.forEach(n=>{obj[c][n]=(obj[c][n]||0)+1;});});
    }
    for(var i=1;i<=39;i++)
    return arr.concat(obj[String(str).padStart(2,'0')][String(i).padStart(2,'0')]||0);
};
