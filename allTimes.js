var obj = {}; // 這是我們的大字典

// 外層循環：遍歷 01 到 39 號作為「主角」
for (var i = 1; i <= 39; i++) {
    var target = i.toString().padStart(2, '0');
    var rowData = [];
    
    // 內層循環：針對主角，統計它拖出 01 到 39 號的次數
    for (var k = 1; k <= 39; k++) {
        var num = k.toString().padStart(2, '0');
        rowData.push(s[target][num] || 0); // 從你之前的 s 抽屜裡拿次數
    }
    
    obj[target] = rowData; // 存入字典： "01": [次數, 次數, ...]
}

// 將整個大字典轉成文字，方便你複製保存
var finalData = JSON.stringify(obj);
console.log("--- 以下是 01-39 完整的數據，請複製保存 ---");
console.log(finalData);
