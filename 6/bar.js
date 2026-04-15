function Bar(hBox, vHigh, vDash, vLow, data) {
    // 1. 找出最高次數 (用來算比例)
    const sorted = [...new Set(data.slice(1))].filter(v => v > 0).sort((a, b) => b - a);
    const top3 = sorted.slice(0, 3);
    const maxVal = sorted[0] || 1; 

    // 2. 畫容器
    let h = `<div style="height:${hBox}px; width:1200px; background:#fff; position:relative; display:flex; align-items:flex-end; border-top:1px solid #ccc;" onclick="this.style.display='none'">`;
    
    // 3. 畫紅色虛線 (位置對應 vDash 次數)
    let dashPx = ((vDash / maxVal) * (vHigh - vLow)) + vLow;
    h += `<div style="position:absolute; left:200px; width:780px; border-top:1px dashed red; z-index:1; bottom:${dashPx}px; pointer-events:none;"></div>`;

    // 4. 左側對齊空間
    h += `<div style="width:200px"></div>`;

    // 5. 畫 39 根柱子
    for (let i = 1; i <= 39; i++) {
        let v = data[i] || 0;
        
        // 柱子高度精確計算
        let hPx = ((v / maxVal) * (vHigh - vLow)) + vLow;
        
        // 前三名變色：紅、藍、綠
        let color = (v > 0 && v === top3[0]) ? 'red' :
                    (v > 0 && v === top3[1]) ? '#00008b' : 
                    (v > 0 && v === top3[2]) ? 'green' : '#800080';

        h += `<div style="width:20px; display:flex; flex-direction:column; align-items:center; position:relative; z-index:2;">
                <div style="width:20px; text-align:center; font-size:10px; color:#000; font-weight:bold; margin-bottom:2px;">${v}</div>
                <div style="width:14px; height:${hPx}px; background:${color}"></div>
              </div>`;
    }

    h += `<div style="width:220px"></div></div>`;
    return h;
}
