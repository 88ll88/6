function times(group) {
    var 表 = {};
    for (var n = 1; n <= 39; n++) 表[n.toString().padStart(2, '0')] = new Array(40).fill(0);

    group.forEach(function(年) {
        if (!年 || 年.length < 2) return;
        for (var i = 1; i < 年.length; i++) {
            var 舊 = 年[i].de || 年[i];
            var 新 = 年[i-1].de || 年[i-1];
            舊.forEach(function(h) {
                var 號 = h.toString().padStart(2, '0');
                新.forEach(function(t) { 表[號][parseInt(t)]++; });
            });
        }
    });

    var 結果 = {};
    for (var k in 表) 結果[k] = 表[k].slice(1);
    return JSON.stringify(結果);
}

// --- 休息好了再跑這三行，複製結果去存檔 ---

// 1. 歷史數據 (T, S, R... 到 B)
console.log("2007-2025：", times([T, S, R, Q, P, O, N, M, L, K, J, I, H, G, F, E, D, C, B]));

// 2. 2024-2026 (C, B, A)
console.log("2024-今：", times([C, B, A]));

// 3. 2025-2026 (B, A)
console.log("2025-今：", times([B, A]));
