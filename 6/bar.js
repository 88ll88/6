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

function runData(n) {
    let data = Array(40).fill(0);
    let rows = aaa.slice(0, n);
    
    // 計算次數
    rows.forEach(row => {
        row[1].forEach(num => {
            data[Number(num)]++;
        });
    });

    // 把數字排成一串字
    let txt = `<div style="font-family:monospace; background:#f0f0f0; padding:10px; line-height:1.8;">`;
    txt += `<b>最近 ${n} 期開獎次數統計：</b><br>`;
    
    for (let i = 1; i <= 39; i++) {
        let num = i < 10 ? '0' + i : i;
        // 號碼：次數，每個號碼中間留點空隙
        txt += `<span style="display:inline-block; width:60px;">${num}: <b>${data[i]}</b></span> `;
        if (i % 10 === 0) txt += "<br>"; // 每 10 個號碼換一行，整齊好讀
    }
    
    txt += `</div>`;

    // 顯示在畫面上
    document.getElementById('view').innerHTML = txt;
}

// 第二個函數：畫 1200px 寬的次數列
function bar800(n) {
    // 1. 檢查數據 (這步最重要，沒數據會報錯)
    if (typeof aaa === 'undefined') {
        console.log("找不到 aaa 數據");
        return;
    }

    // 2. 算次數 (抓最近 n 期)
    let data = Array(40).fill(0);
    let rows = aaa.slice(0, n);
    
    rows.forEach(r => {
        if (r[1] && Array.isArray(r[1])) {
            r[1].forEach(num => {
                let v = parseInt(num, 10);
                if (v >= 1 && v <= 39) data[v]++;
            });
        }
    });

    // 3. 畫 HTML (鎖死 1200px 寬度，每格 20px)
    let h = `<div style="width:1200px; display:flex; height:20px; line-height:20px; text-align:center; font-size:12px; margin-bottom:2px;">`;
    
    // 左邊標題區 200px
    h += `<div style="width:200px; border:1px solid #000; background:#eee; flex-shrink:0;">最近${n}期次數</div>`;
    
    // 數據區 800px (39格次數 + 1格#)
    h += `<div style="width:800px; display:flex; border:1px solid #000; background:#fff; flex-shrink:0;">`;
    for (let i = 1; i <= 39; i++) {
        h += `<div style="width:20px; border-right:1px solid #ccc; flex-shrink:0; box-sizing:border-box;">${data[i]}</div>`;
    }
    h += `<div style="width:20px; background:#ffff00; flex-shrink:0; box-sizing:border-box;">#</div>`;
    h += `</div>`;
    
    // 右邊補白 200px
    h += `<div style="width:200px; flex-shrink:0;"></div>`;
    h += `</div>`;

    // 4. 顯示到 id="view" 的地方
    let target = document.getElementById('view');
    if (target) {
        target.innerHTML = h;
    } else {
        // 如果網頁還沒加載完 view，就直接貼到最下面
        document.body.insertAdjacentHTML('beforeend', h);
    }
}
