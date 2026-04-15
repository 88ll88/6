function myBar(hBox, vHigh, vDash, vLow, data) {
    if (!data) return;

    // 1. 找出數據裡的最高和最低 (用來對齊 95 和 15)
    let nums = [];
    for (let i = 1; i <= 39; i++) nums.push(Number(data[i]) || 0);
    const maxVal = Math.max(...nums);
    const minVal = Math.min(...nums);
    
    // 找出前三名變色
    const sorted = [...new Set(nums)].filter(v => v > 0).sort((a, b) => b - a);
    const top3 = sorted.slice(0, 3);

    // 2. 準備 HTML (直接包含樣式)
    let h = `<div style="height:${hBox}px; width:1100px; background:#fff; position:relative; display:flex; align-items:flex-end; border-top:1px solid #ccc;">`;
    
    // 3. 畫 70px 紅色虛線
    h += `<div style="position:absolute; left:10px; width:1080px; border-top:1px dashed red; z-index:1; bottom:${vDash}px;"></div>`;

    // 4. 畫 39 根柱子
    for (let i = 1; i <= 39; i++) {
        let v = Number(data[i]) || 0;
        
        // 公式：最高 95px，最低 15px
        let hPx = (maxVal === minVal) ? vLow : ((v - minVal) / (maxVal - minVal)) * (vHigh - vLow) + vLow;
        
        // 前三名紅藍綠
        let color = (v > 0 && v === top3[0]) ? 'red' :
                    (v > 0 && v === top3[1]) ? '#00008b' : 
                    (v > 0 && v === top3[2]) ? 'green' : '#800080';

        h += `<div style="width:25px; display:flex; flex-direction:column; align-items:center; position:relative; z-index:2;">
                <div style="width:25px; text-align:center; font-size:10px; font-weight:bold;">${v}</div>
                <div style="width:16px; height:${hPx}px; background:${color}"></div>
                <div style="font-size:9px; color:#666;">${i < 10 ? '0'+i : i}</div>
              </div>`;
    }
    h += `</div>`;

    // 5. 關鍵：直接把畫好的圖塞進網頁裡 id 為 "view" 的地方
    document.getElementById('view').innerHTML = h;
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

// 模式 A：[01-39] 寬度 780 版 (純號碼)
function bar780(n) {
    let data = Array(40).fill(0);
    let rows = aaa.slice(0, n); // 抓最近 n 期
    rows.forEach(r => r[1].forEach(num => data[Number(num)]++)); // 算次數

    let h = `<div style="width:1200px; display:flex; height:20px; line-height:20px; text-align:center; font-size:12px;">`;
    h += `<div style="width:200px; border:1px solid #000; background:#eee;">最近${n}期次數</div>`; 
    h += `<div style="width:780px; display:flex; border:1px solid #000; background:#fff;">`;
    
    for (let i = 1; i <= 39; i++) {
        h += `<div style="width:20px; border-right:1px solid #ccc;">${data[i]}</div>`;
    }
    
    h += `</div><div style="width:220px;"></div></div>`;
    document.getElementById('view').innerHTML = h;
}

// 模式 B：[01-39#] 寬度 800 版 (有#號格)
function bar800(n) {
    let data = Array(40).fill(0);
    let rows = aaa.slice(0, n);
    rows.forEach(r => r[1].forEach(num => data[Number(num)]++));

    let h = `<div style="width:1200px; display:flex; height:20px; line-height:20px; text-align:center; font-size:12px;">`;
    h += `<div style="width:200px; border:1px solid #000; background:#eee;">最近${n}期次數</div>`;
    h += `<div style="width:800px; display:flex; border:1px solid #000; background:#fff;">`;
    
    for (let i = 1; i <= 39; i++) {
        h += `<div style="width:20px; border-right:1px solid #ccc;">${data[i]}</div>`;
    }
    
    h += `<div style="width:20px; background:#ffff00;">#</div>`; // 第 40 格是 #
    h += `</div><div style="width:200px;"></div></div>`;
    document.getElementById('view').innerHTML = h;
}
