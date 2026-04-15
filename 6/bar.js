function Bar(hBox, vHigh, vDash, vLow, data) {
    if (!data || data.length < 2) return ""; // 沒數據就回傳空字串，避免當機

    // 1. 抓出這組數據裡的最高和最低次數 (確保轉換成數字)
    let nums = [];
    for (let i = 1; i <= 39; i++) {
        nums.push(Number(data[i]) || 0);
    }
    const maxVal = Math.max(...nums); 
    const minVal = Math.min(...nums); 
    
    // 找出前三名數值（變色用）
    const sorted = [...new Set(nums)].filter(v => v > 0).sort((a, b) => b - a);
    const top3 = sorted.slice(0, 3);

    // 2. 畫容器
    let h = `<div style="height:${hBox}px; width:1200px; background:#fff; position:relative; display:flex; align-items:flex-end; overflow:hidden;">`;
    
    // 3. 畫紅虛線：固定在 70px
    h += `<div style="position:absolute; left:200px; width:780px; border-top:1px dashed red; z-index:1; bottom:${vDash}px;"></div>`;

    // 4. 左側空間
    h += `<div style="width:200px"></div>`;

    // 5. 畫 39 根柱子
    for (let i = 1; i <= 39; i++) {
        let v = Number(data[i]) || 0;
        
        // --- 核心公式 ---
        let hPx;
        if (maxVal === minVal) {
            hPx = vLow; 
        } else {
            // (當前-最小) / (最大-最小) * (95-15) + 15
            hPx = ((v - minVal) / (maxVal - minVal)) * (vHigh - vLow) + vLow;
        }
        
        // 顏色判斷
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
