function switchMode() {
    let mode = document.getElementById('mode').value;
    document.getElementById('normalMode').style.display = (mode === 'normal') ? 'block' : 'none';
    document.getElementById('summerMode').style.display = (mode === 'summer') ? 'block' : 'none';
    document.getElementById('result').innerText = '';
}

function updateNewStart(room) {
    const endOldValue = document.getElementById(`room${room}EndOld`).value;
    document.getElementById(`room${room}StartNew`).value = endOldValue;
}

// 平常模式計算
function calculateNormal() {
    let totalUsage = parseFloat(document.getElementById('totalUsage').value);
    let totalCost = parseFloat(document.getElementById('totalCost').value);
    let people = parseInt(document.getElementById('people').value);

    let room1FStart = parseFloat(document.getElementById('room1FStart').value);
    let room1FEnd = parseFloat(document.getElementById('room1FEnd').value);
    let room1BStart = parseFloat(document.getElementById('room1BStart').value);
    let room1BEnd = parseFloat(document.getElementById('room1BEnd').value);

    if (isNaN(totalUsage) || isNaN(totalCost) || isNaN(people) || isNaN(room1FStart) || isNaN(room1FEnd) || isNaN(room1BStart) || isNaN(room1BEnd) || people <= 0 || totalUsage <= 0) {
        document.getElementById('result').innerText = "請輸入正確數值！";
        return;
    }

    let pricePerUnit = totalCost / totalUsage;
    let cost1F = (room1FEnd - room1FStart) * pricePerUnit + 100;
    let cost1B = (room1BEnd - room1BStart) * pricePerUnit + 100;
    let publicCost = (totalCost - (cost1F  + cost1B )) / people;

    document.getElementById('result').innerText =
        `【平常模式】\n` +
        `1F 電費：${cost1F.toFixed(2)} 元\n` +
        `1B 電費：${cost1B.toFixed(2)} 元\n` +
        `每人應付公用電費：${publicCost.toFixed(2)} 元`;
}

// 暑假模式計算 (最終版)
function calculateSummer() {
    // 獲取所有輸入值
    const totalSummerCost = parseFloat(document.getElementById('totalSummerCost').value);
    const totalSummerUsage = parseFloat(document.getElementById('totalSummerUsageInput').value);
    const peopleOld = parseInt(document.getElementById('peopleOld').value);
    const peopleNew = parseInt(document.getElementById('peopleNew').value);

    const room1FStartOld = parseFloat(document.getElementById('room1FStartOld').value);
    const room1FEndOld = parseFloat(document.getElementById('room1FEndOld').value);
    const room1BStartOld = parseFloat(document.getElementById('room1BStartOld').value);
    const room1BEndOld = parseFloat(document.getElementById('room1BEndOld').value);

    const room1FStartNew = parseFloat(document.getElementById('room1FStartNew').value);
    const room1FEndNew = parseFloat(document.getElementById('room1FEndNew').value);
    const room1BStartNew = parseFloat(document.getElementById('room1BStartNew').value);
    const room1BEndNew = parseFloat(document.getElementById('room1BEndNew').value);

    // 驗證輸入
    const allInputs = [totalSummerCost, totalSummerUsage, peopleOld, peopleNew,
        room1FStartOld, room1FEndOld, room1BStartOld, room1BEndOld,
        room1FStartNew, room1FEndNew, room1BStartNew, room1BEndNew];
    
    if (allInputs.some(isNaN) || (peopleOld + peopleNew) <= 0) {
        document.getElementById('result').innerText = "請輸入正確數值！";
        return;
    }

    if (totalSummerUsage <= 0) {
        document.getElementById('result').innerText = "暑假總用電度數必須大於 0。";
        return;
    }

    // 計算各房間用電度數
    const room1FUsageOld = room1FEndOld - room1FStartOld;
    const room1BUsageOld = room1BEndOld - room1BStartOld;
    const room1FUsageNew = room1FEndNew - room1FStartNew;
    const room1BUsageNew = room1BEndNew - room1BStartNew;

    // 驗證房間度數
    if (room1FUsageOld < 0 || room1BUsageOld < 0 || room1FUsageNew < 0 || room1BUsageNew < 0) {
        document.getElementById('result').innerText = "房間度數有誤，結束度數不可小於起始度數。";
        return;
    }

    // 計算各房間費用
    const cost1FOld = totalSummerCost * (room1FUsageOld / totalSummerUsage) + 100;
    const cost1BOld = totalSummerCost * (room1BUsageOld / totalSummerUsage) + 100;
    const cost1FNew = totalSummerCost * (room1FUsageNew / totalSummerUsage) + 100;
    const cost1BNew = totalSummerCost * (room1BUsageNew / totalSummerUsage) + 100;

    // 計算公用電費
    const totalPrivateCostVariable = cost1FOld+cost1BOld+cost1FNew+cost1BNew;
    const totalPublicCost = totalSummerCost - totalPrivateCostVariable;
    const publicCostPerPerson = totalPublicCost / (peopleOld + peopleNew);

    // 顯示結果
    document.getElementById('result').innerText =
        `【暑假模式】\n` +
        `--- 房間費用 ---\n` +
        `1F 退租期間電費：${cost1FOld.toFixed(2)} 元\n` +
        `1B 退租期間電費：${cost1BOld.toFixed(2)} 元\n` +
        `1F 新住期間電費：${cost1FNew.toFixed(2)} 元\n` +
        `1B 新住期間電費：${cost1BNew.toFixed(2)} 元\n\n` +
        `--- 公用電費 ---\n` +
        `每人應付公用電費：${publicCostPerPerson.toFixed(2)} 元`;
}
