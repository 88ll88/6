function renderRealTimeOmission() {
    if (!window.aaa) return;

    // 1. 初始化計數器與狀態
    let nowM = Array(39).fill(0);
    let stopFlag = Array(39).fill(false);
    let stopCount = 0; // 紀錄有多少號碼已經停了

    // 2. 開始從最新一期往歷史深處挖
    for (let row of window.aaa) {
        if (stopCount === 39) break; // 關鍵：如果 39 個號碼都找到了，就停止掃描

        let currentNums = (typeof numMode !== 'undefined' && numMode === 2) ? row[3] : row[1];

        for (let i = 1; i <= 39; i++) {
            if (stopFlag[i - 1]) continue; // 該號碼已停，跳過

            let numStr = String(i).padStart(2, '0');
            if (currentNums.includes(numStr)) {
                stopFlag[i - 1] = true;
                stopCount++; // 又一個號碼停了
            } else {
                nowM[i - 1]++; // 還沒遇到，繼續加
            }
        }
    }

    // 3. 繪製 HTML [200x20 靠右][780x20 數據][220x20 填充]
    const rowWrapper = "display: flex; width: 1200px; background: black; color: white; height: 20px; line-height: 20px; box-sizing: border-box;";
    const labelStyle = "width: 200px; height: 20px; border: 1px solid white; text-align: right; padding-right: 10px; font-size: 12px; box-sizing: border-box;";
    const gridStyle = "width: 20px; height: 20px; border: 1px solid white; color: white; background: black; text-align: center; line-height: 20px; font-size: 11px; flex: 0 0 20px; box-sizing: border-box;";
    const tailStyle = "width: 220px; height: 20px; border: 1px solid white; box-sizing: border-box;";

    let html = `<div style="${rowWrapper}">
                    <div style="${labelStyle}">至今未開遺漏</div>
                    <div style="display: flex; width: 780px;">`;
    
    nowM.forEach(val => {
        html += `<div style="${gridStyle}">${val}</div>`;
    });

    html += `</div><div style="${tailStyle}"></div></div>`;

    // 4. 輸出到畫面
    const target = document.getElementById('footer_area');
    if (target) target.innerHTML = html;
    else document.body.insertAdjacentHTML('beforeend', html);
}
/**
 * @param {number} x - 計算的總行數 (預設 50 行)
 */
function renderCurrentOmission(x = 50) {
    if (!window.aaa) return;
    
    // 取得最近 x 期的數據 (aaa[0] 是最新一期)
    const dataX = window.aaa.slice(0, x);

    // 計算邏輯：從第一列開始找，直到遇到號碼為止
    let nowM = Array(39).fill(0);
    
    for (let i = 1; i <= 39; i++) {
        let numStr = String(i).padStart(2, '0');
        let count = 0;
        
        // 從第一列 (最新) 往下掃
        for (let row of dataX) {
            let currentNums = (typeof numMode !== 'undefined' && numMode === 2) ? row[3] : row[1];
            
            if (currentNums.includes(numStr)) {
                // 一旦遇到號碼，立刻停止計數
                break; 
            } else {
                // 沒遇到，次數 +1
                count++;
            }
        }
        nowM[i - 1] = count;
    }

    // 2. 拼接 HTML [200x20 靠右][780x20 數據區][220x20 填充]
    const rowWrapper = "display: flex; width: 1200px; background: black; color: white; height: 20px; line-height: 20px; box-sizing: border-box;";
    const labelStyle = "width: 200px; height: 20px; border: 1px solid white; text-align: right; padding-right: 10px; font-size: 12px; box-sizing: border-box;";
    const gridStyle = "width: 20px; height: 20px; border: 1px solid white; color: white; background: black; text-align: center; line-height: 20px; font-size: 11px; flex: 0 0 20px; box-sizing: border-box;";
    const tailStyle = "width: 220px; height: 20px; border: 1px solid white; box-sizing: border-box;";

    let html = `<div style="${rowWrapper}">
                    <div style="${labelStyle}">至今未開遺漏</div>
                    <div style="display: flex; width: 780px;">`;
    
    nowM.forEach(val => {
        html += `<div style="${gridStyle}">${val}</div>`;
    });

    html += `</div><div style="${tailStyle}"></div></div>`;

    // 3. 輸出
    const target = document.getElementById('footer_area');
    if (target) target.innerHTML = html;
    else document.body.insertAdjacentHTML('beforeend', html);
}
