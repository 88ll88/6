function Bar(hBox, vHigh, vDash, vLow, data) {
    // 1. 抓出這組數據裡的最高和最低次數 (例如 850 和 701)
    const nums = data.slice(1).map(Number);
    const maxVal = Math.max(...nums); 
    const minVal = Math.min(...nums); 
    
    // 找出前三名數值（變色用）
    const sorted = [...new Set(nums)].filter(v => v > 0).sort((a, b) => b - a);
    const top3 = sorted.slice(0, 3);

    // 2. 畫容器
    let h = `<div style="height:${hBox}px; width:1200px; background:#fff; position:relative; display:flex; align-items:flex-end;">`;
    
    // 3. 畫紅虛線：固定在你指定的像素 70px
    h += `<div style="position:absolute; left:200px; width:780px; border-top:1px dashed red; z-index:1; bottom:${vDash}px;"></div>`;

    h += `<div style="width:200px"></div>`; // 左側空 200px

    // 4. 畫 39 根柱子
    for (let i = 1; i <= 39; i++) {
        let v = data[i] || 0;
        
        // --- 核心公式精確版 ---
        // 像素 = ((當前次數 - 最低次數) / (最高次數 - 最低次數)) * (最高像素 - 最低像素) + 最低像素
        let hPx;
        if (maxVal === minVal) {
            hPx = vLow; // 如果全部次數都一樣，就全部平齊在 15px
        } else {
            hPx = ((v - minVal) / (maxVal - minVal)) * (vHigh - vLow) + vLow;
        }
        
        // 顏色：前三名紅藍綠
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
}        h += `<div style="width:20px; display:flex; flex-direction:column; align-items:center; position:relative; z-index:2;">
                <div style="width:20px; text-align:center; font-size:10px; color:#000; font-weight:bold; margin-bottom:2px;">${v}</div>
                <div style="width:14px; height:${hPx}px; background:${color}"></div>
              </div>`;
    }

    h += `<div style="width:220px"></div></div>`;
    return h;
}
        h += `<div style="width:20px; display:flex; flex-direction:column; align-items:center; position:relative; z-index:2;">
                <div style="width:20px; text-align:center; font-size:10px; color:#000; font-weight:bold; margin-bottom:2px;">${v}</div>
                <div style="width:14px; height:${hPx}px; background:${color}"></div>
              </div>`;
    }

    h += `<div style="width:220px"></div></div>`;
    return h;
}
