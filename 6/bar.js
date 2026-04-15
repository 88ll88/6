function Bar(hBox, vHigh, vDash, vLow, data) {
    // 1. 找出這組數據中的最大與最小次數
    const nums = data.slice(1).map(Number);
    const maxVal = Math.max(...nums) || 1; // 假設是 850
    const minVal = Math.min(...nums) || 0; // 假設是 701
    
    // 找出前三名數值（變色用）
    const sorted = [...new Set(nums)].filter(v => v > 0).sort((a, b) => b - a);
    const top3 = sorted.slice(0, 3);

    // 2. 畫容器 (hBox = 120)
    let h = `<div style="height:${hBox}px; width:1200px; background:#fff; position:relative; display:flex; align-items:flex-end;">`;
    
    // 3. 畫紅色虛線 (固定在 70px 像素高度)
    h += `<div style="position:absolute; left:200px; width:780px; border-top:1px dashed red; z-index:1; bottom:${vDash}px;"></div>`;

    h += `<div style="width:200px"></div>`; // 左側空 200px

    // 4. 畫 39 根柱子
    for (let i = 1; i <= 39; i++) {
        let v = data[i] || 0;
        
        // --- 核心公式修正 ---
        // 把次數 v 映射到 15px 到 95px 之間
        // 如果 v 是最小次數(701)，結果就是 15px
        // 如果 v 是最大次數(850)，結果就是 95px
        let hPx;
        if (maxVal === minVal) {
            hPx = vLow; 
        } else {
            hPx = ((v - minVal) / (maxVal - minVal)) * (vHigh - vLow) + vLow;
        }
        
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
