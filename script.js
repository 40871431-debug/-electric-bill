function calculate() {
    // 整棟樓資料
    let buildingUsage = parseFloat(document.getElementById('buildingUsage').value);
    let totalCost = parseFloat(document.getElementById('totalCost').value);
    let people = parseInt(document.getElementById('people').value);

    // 房間資料
    let room1FStart = parseFloat(document.getElementById('room1FStart').value);
    let room1FEnd = parseFloat(document.getElementById('room1FEnd').value);
    let room1BStart = parseFloat(document.getElementById('room1BStart').value);
    let room1BEnd = parseFloat(document.getElementById('room1BEnd').value);

    // 資料檢查
    if (
        isNaN(buildingUsage) || isNaN(totalCost) || isNaN(people) ||
        isNaN(room1FStart) || isNaN(room1FEnd) ||
        isNaN(room1BStart) || isNaN(room1BEnd) ||
        buildingUsage <= 0 ||
        room1FEnd <= room1FStart ||
        room1BEnd <= room1BStart ||
        people <= 0
    ) {
        document.getElementById('result').innerText = "請輸入正確數值！";
        return;
    }

    // 計算各房間用電度數
    let usage1F = room1FEnd - room1FStart;
    let usage1B = room1BEnd - room1BStart;

    // 計算各房間應付金額 + 100 元
    let cost1F = totalCost * (usage1F / buildingUsage) + 100;
    let cost1B = totalCost * (usage1B / buildingUsage) + 100;

    // 計算剩餘公共電費（其他人分）
    let publicCostPerPerson = (totalCost - (cost1F + cost1B) ) / people;

    // 顯示結果
    document.getElementById('result').innerText =
        `整棟總用電：${buildingUsage.toFixed(2)} 度\n` +
        `1F 用電：${usage1F.toFixed(2)} 度，應付 ${cost1F.toFixed(2)} 元\n` +
        `1B 用電：${usage1B.toFixed(2)} 度，應付 ${cost1B.toFixed(2)} 元\n` +
        `每人應付的公共電費：${publicCostPerPerson.toFixed(2)} 元`;
}
