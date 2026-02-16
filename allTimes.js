// 計算函式 (結構完全統一)
function time(group) {
    var s = {};
    for (var n = 1; n <= 39; n++) s[n.toString().padStart(2, '0')] = new Array(40).fill(0);
    group.forEach(function(k) {
        var d = window[k]; if (!d) return;
        for (var i = 1; i < d.length; i++) {
            d[i].forEach(function(h) {
                var key = h.toString().padStart(2, '0');
                d[i-1].forEach(function(t) { s[key][parseInt(t)]++; });
            });
        }
    });
    var res = {};
    for (var k in s) res[k] = s[k].slice(1);
    return JSON.stringify(res);
}

// --- 執行以下指令，分別複製結果去存檔 ---

// 1. 存成 2007-2025.js
console.log(times("TSRQPONMLKJIHGFEDCB".split("")));

// 2. 存成 2024-今.js (包含 2026/A)
console.log(times(["C", "B", "A"]));

// 3. 存成 2025-今.js (包含 2026/A)
console.log(times(["B", "A"]));
