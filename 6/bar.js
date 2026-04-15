function Bar(hBox, vHigh, vDash, vLow, data) {
    const sorted = [...new Set(data.slice(1))].filter(v => v > 0).sort((a, b) => b - a);
    const top3 = sorted.slice(0, 3);
    const maxVal = sorted[0] || 1;
    
    let h = `<div class="chart-box" style="height:${hBox}px; width:1200px; background:#fff; position:relative; display:flex; align-items:flex-end;" onclick="showChart=false; render()">`;
    
    // 計算紅色虛線位置
    let dashPx = ((vDash / maxVal) * (vHigh - vLow)) + vLow;
    h += `<div class="line-dash" style="position:absolute; left:200px; width:780px; border-top:1px dashed red; z-index:1; bottom:${dashPx}px;"></div>`;
    
    h += `<div style="width:200px"></div>`;

    for (let i = 1; i <= 39; i++) {
        let v = data[i] || 0;
        let hPx = ((v / maxVal) * (vHigh - vLow)) + vLow;
        let color = (v > 0 && v === top3[0]) ? 'red' :
                    (v > 0 && v === top3[1]) ? '#00008b' : 
                    (v > 0 && v === top3[2]) ? 'green' : '#800080';

        h += `
            <div class="bar-wrap" style="width:20px; display:flex; flex-direction:column; align-items:center; position:relative; z-index:2;">
                <div class="bar-val" style="width:20px; text-align:center; font-size:10px; color:#000; font-weight:bold; margin-bottom:2px;">${v}</div>
                <div class="bar" style="width:14px; height:${hPx}px; background:${color}"></div>
            </div>`;
    }
    h += `<div style="width:220px"></div></div>`;
    return h;
}