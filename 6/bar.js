function bar800(n) {
    if (typeof aaa === 'undefined') return;

    // 1. 算次數 (最近 n 期)
    let data = Array(40).fill(0);
    let rows = aaa.slice(0, n);
    rows.forEach(r => {
        if (r[1]) r[1].forEach(num => {
            let v = parseInt(num, 10);
            if (v >= 1 && v <= 39) data[v]++;
        });
    });

    // 2. 呼叫你指定的 myBar 參數
    // 高度120, 最高95, 虛線70, 最低15, 數據
    myBar(120, 95, 70, 15, data);
}

// 這是你原本的 myBar，我稍微修了一下確保它在平板上鎖死 1200px
function myBar(hBox, vHigh, vDash, vLow, data) {
    let h = `<div style="width:1200px; display:flex; align-items:flex-end; height:${hBox}px; background:#fff; border:1px solid #000; position:relative; margin-bottom:10px; font-family:Arial;">`;
    
    // 左側 200px 標題區
    h += `<div style="width:200px; height:100%; background:#eee; display:flex; align-items:center; justify-content:center; border-right:1px solid #000; font-size:14px; font-weight:bold;">次數分佈</div>`;

    // 畫 39 根柱子 (每格 20px)
    for (let i = 1; i <= 39; i++) {
        let val = data[i] || 0;
        // 簡單算一下高度比例 (這裡可以依需求調整)
        let bH = (val / vHigh) * (hBox - 30); 
        
        h += `<div style="width:20px; flex-shrink:0; display:flex; flex-direction:column; align-items:center; position:relative;">`;
        // 柱子上的次數
        h += `<div style="font-size:9px; margin-bottom:2px;">${val}</div>`;
        // 柱子本體
        h += `<div style="width:12px; height:${bH}px; background:steelblue; border:1px solid #333;"></div>`;
        // 底部的號碼 (01-39)
        h += `<div style="font-size:10px; height:18px; line-height:18px; background:#f0f0f0; width:100%; text-align:center; border-top:1px solid #000;">${i<10?'0'+i:i}</div>`;
        h += `</div>`;
    }
    
    // 第 40 格：黃底黑字 # (20px)
    h += `<div style="width:20px; height:100%; background:#ffff00; border-left:1px solid #000; display:flex; align-items:center; justify-content:center; font-weight:bold;">#</div>`;
    
    // 畫那條 70 的紅色虛線 (用絕對定位)
    let dashPos = (vDash / vHigh) * (hBox - 30);
    h += `<div style="position:absolute; left:200px; right:20px; bottom:${dashPos + 18}px; border-top:1px dashed red; height:0; pointer-events:none;"></div>`;

    h += `</div>`;
    
    // 塞進畫面
    let target = document.getElementById('view');
    if (target) target.innerHTML += h;
}        row[1].forEach(num => {
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

