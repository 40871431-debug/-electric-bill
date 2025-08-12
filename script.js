function calculate() {
    let myStart = parseFloat(document.getElementById('myStart').value);
    let myEnd = parseFloat(document.getElementById('myEnd').value);
    let totalCost = parseFloat(document.getElementById('totalCost').value);
    let people = parseInt(document.getElementById('people').value);

    if (isNaN(myStart) || isNaN(myEnd) || isNaN(totalCost) || isNaN(people) || people <= 0) {
        document.getElementById('result').innerText = "請輸入正確數值！";
        return;
    }

    let myUsage = myEnd - myStart;
    let myCost = totalCost / people; // 假設均分

    document.getElementById('result').innerText =
        `你的用電量：${myUsage} 度\n你的應付電費：約 ${myCost.toFixed(2)} 元`;
}
