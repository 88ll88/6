// --- 1. 至今未開遺漏 (只計算，回傳 HTML 字串) ---
function dayOmiss() {
    let nowM = Array(39).fill(0), stopFlag = Array(39).fill(false), stopCount = 0;
    if (!window.aaa) return "";

    for (let row of window.aaa) {
        if (stopCount === 39) break;
        let nums = (typeof numMode !== 'undefined' && numMode === 2) ? row[3] : row[1];
        for (let i = 1; i <= 39; i++) {
            if (stopFlag[i - 1]) continue;
            if (nums.includes(String(i).padStart(2, '0'))) {
                stopFlag[i - 1] = true;
                stopCount++;
            } else nowM[i - 1]++;
        }
    }
    // 回傳這一列的 HTML
    return buildRowHtml("至今未開遺漏", nowM);
}

// --- 2. 歷史最大遺漏 (只計算，回傳 HTML 字串) ---
function hisOmiss() {
    let maxM = Array(39).fill(0), tempM = Array(39).fill(0);
    if (!window.aaa) return "";

    [...window.aaa].reverse().forEach(row => {
        let nums = (typeof numMode !== 'undefined' && numMode === 2) ? row[3] : row[1];
        for (let i = 1; i <= 39; i++) {
            let nStr = String(i).padStart(2, '0');
            if (nums.includes(nStr)) {
                if (tempM[i - 1] > maxM[i - 1]) maxM[i - 1] = tempM[i - 1];
                tempM[i - 1] = 0;
            } else tempM[i - 1]++;
        }
    });
    for (let i = 0; i < 39; i++) if (tempM[i] > maxM[i]) maxM[i] = tempM[i];
    // 回傳這一列的 HTML
    return buildRowHtml("歷史最大遺漏", maxM);
}

// --- 3. 底層工具：專門生產符合規格的 HTML (200+780+220) ---
function buildRowHtml(title, arr) {
    const rowS = "display:flex; width:1200px; height:20px; background:black; color:white; line-height:20px; box-sizing:border-box;";
    const lblS = "width:200px; border:1px solid white; text-align:right; padding-right:10px; font-size:12px; box-sizing:border-box;";
    const grdS = "width:20px; border:1px solid white; text-align:center; font-size:11px; flex:0 0 20px; box-sizing:border-box;";
    const talS = "width:220px; border:1px solid white; box-sizing:border-box;";

    let h = `<div style="${rowS}"><div style="${lblS}">${title}</div><div style="display:flex; width:780px;">`;
    arr.forEach(v => h += `<div style="${grdS}">${v}</div>`);
    h += `</div><div style="${talS}"></div></div>`;
    return h;
}
function jsAll(func1, func2, funcHistory) {
    let html1 = func1(); // 拿到至今未開的 HTML
    let html2 = func2(); // 拿到歷史最大的 HTML
    let htmlHistory = funcHistory(); // 拿到原本歷史列表的 HTML (假設它也會回傳字串)


    let finalHtml = htmlHistory + html1 + html2;

    let target = document.getElementById('main_container');
    if (target) target.innerHTML = finalHtml;
}

// 執行




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
function renderCurrentOmission() {
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
