// ----------------BMI計算--------------------------
// 指定 dom
let resultRackJS = document.querySelector('.resultRack');
let list = document.querySelector('.list');
//下載名稱為listData的localStorage並解析JSON字串轉為陣列，若無此資料則設定為空陣列
let data = JSON.parse(localStorage.getItem('listData')) || [];
let heightValue;
let weightValue;
let BMI;
let floorBMI;
//BMI評語
let judgeJS;
//記錄列表標頭的顏色
let recordClass;

// 監聽與更新
resultRackJS.addEventListener('click', calculateBMI);
resultRackJS.addEventListener('click', addData);
list.addEventListener('click', toggleDone);
updateList(data);

function calculateBMI(e) {
    e.preventDefault();
    //取得身高的值並存入變數
    heightValue = document.querySelector('#height').value;
    //取得體重的值存並入變數
    weightValue = document.querySelector('#weight').value;
    //BMI計算
    BMI = weightValue / Math.pow((heightValue / 100), 2);
    //BMI值取到小數點第2位
    floorBMI = Math.floor(BMI * 100) / 100;

    if (e.target.nodeName == "IMG" || "A") {
        let str = '';
        //儲存CSS class
        let resultJS;
        //儲存CSS class
        let resultBoxJS;
        //儲存'BMI'字串
        let pJS;
        //儲存loop圖片
        let loopJS;
        //儲存顏色變化
        let calculatedCollor;
        //儲存margin-top變化
        let loopMarginTop;
        if (floorBMI < 18.5) {
            // resultBoxJS = 'resultBoxOverLight';
            // resultJS = 'resultOverLight';
            resultBoxJS = 'calculatedBox';
            resultJS = 'calculated';
            judgeJS = '過輕';
            pJS = 'BMI';
            loopJS = '<img src="./images/icons_loop.png" alt="">';
            recordClass = 'recordOverLight';
            calculatedCollor = '#31BAF9';
            loopMarginTop = '-8px';
        } else if (18.5 <= floorBMI && floorBMI < 25) {
            resultBoxJS = 'calculatedBox';
            resultJS = 'calculated';
            // resultBoxJS = 'resultBoxGood';
            // resultJS = 'resultGood';
            judgeJS = '理想';
            pJS = 'BMI';
            loopJS = '<img src="./images/icons_loop.png" alt="">';
            recordClass = 'recordGood';
            calculatedCollor = '#86D73E';
            loopMarginTop = '-8px';
        } else if (25 <= floorBMI && floorBMI < 30) {
            // resultBoxJS = 'resultBoxOverWeight';
            // resultJS = 'resultOverWeight';
            resultBoxJS = 'calculatedBox';
            resultJS = 'calculated';
            judgeJS = '過重';
            pJS = 'BMI';
            loopJS = '<img src="./images/icons_loop.png" alt="">';
            recordClass = 'recordOverWeight';
            calculatedCollor = '#FF982D';
            loopMarginTop = '-8px';
        } else if (30 <= floorBMI && floorBMI < 35) {
            // resultBoxJS = 'resultBoxLittleFat';
            // resultJS = 'resultLittleFat';
            resultBoxJS = 'calculatedBox';
            resultJS = 'calculated';
            judgeJS = '輕度肥胖';
            pJS = 'BMI';
            loopJS = '<img src="./images/icons_loop.png" alt="">';
            recordClass = 'recordLittleFat'
            calculatedCollor = '#FF6C03';
            loopMarginTop = '-8px';
        } else if (35 <= floorBMI && floorBMI < 40) {
            // resultBoxJS = 'resultBoxMediumFat';
            // resultJS = 'resultMediumFat';
            resultBoxJS = 'calculatedBox';
            resultJS = 'calculated';
            judgeJS = '中度肥胖';
            pJS = 'BMI';
            loopJS = '<img src="./images/icons_loop.png" alt="">';
            recordClass = 'recordMediumFat';
            calculatedCollor = '#FF6C03';
            loopMarginTop = '-8px';
        } else if (40 <= floorBMI) {
            // resultBoxJS = 'resultBoxOverFat';
            // resultJS = 'resultOverFat';
            resultBoxJS = 'calculatedBox';
            resultJS = 'calculated';
            judgeJS = '重度肥胖';
            pJS = 'BMI';
            loopJS = '<img src="./images/icons_loop.png" alt="">';
            recordClass = 'recordOverFat';
            calculatedCollor = '#FF1200';
            loopMarginTop = '-8px';
        } else {
            // resultBoxJS = 'resultBoxError';
            // resultJS = 'resultError';
            resultBoxJS = 'calculatedBox';
            resultJS = 'calculated';
            judgeJS = '錯誤';
            pJS = '';
            loopJS = '<img src="./images/icons_loop.png" alt="">';
            floorBMI = '';
            recordClass = 'recordError';
            calculatedCollor = 'gray';
            loopMarginTop = '77px';
        }
        //將顏色變化導入CSS root變數
        document.documentElement.style.setProperty("--calculatedCollor", calculatedCollor);
        //將margin-top變化導入CSS root變數
        document.documentElement.style.setProperty("--loopMarginTop", loopMarginTop);
        // 更新BMI計算的網頁內容
        str = `<div class="${resultBoxJS}">
        <div  class="${resultJS}">
            <h2>${floorBMI}</h2>
            <p>${pJS}</p>
            <div class="loop">
                <a href="#">${loopJS}</a>
            </div>
            </div>
        <h3 class="judge">${judgeJS}</h3>
    </div>`
        resultRackJS.innerHTML = str
    };
}

// ----------------BMI計算  end--------------------------
// ----------------BMI紀錄  start--------------------------

//加入列表，並同步更新紀錄列表的網頁內容與 localstorage
function addData(e) {
    //取消元素預設功能
    e.preventDefault();
    //初始化Date物件
    let now = new Date();
    //獲取年、月、日資訊
    let year = now.getFullYear();
    let month = now.getMonth();
    let day = now.getDate();
    let nowTime = (month + 1) + '-' + day + '-' + year;
    //將各項資訊放入recordBMI物件
    let recordBMI = {
        height: heightValue,
        weight: weightValue,
        BMI: floorBMI,
        judge: judgeJS,
        liClass: recordClass,
        time: nowTime
    };
    //將recordBMI物件放入data陣列
    data.push(recordBMI);
    //更新紀錄列表的網頁內容
    updateList(data);
    //將data陣列轉為JSON字串，上傳名稱為listData的localstorage
    localStorage.setItem('listData', JSON.stringify(data));
}
// 更新紀錄列表的網頁內容
function updateList(items) {
    str = '';
    let len = items.length;

    for (let i = 0; len > i; i++) {
        const judge = items[i].judge;
        const BMI = items[i].BMI;
        const weight = items[i].weight;
        const height = items[i].height;
        const liClass = items[i].liClass;
        const time = items[i].time;

        str +=
            `<li class="${liClass}"> <span>${judge}</span><span><small>BMI :</small>${BMI}</span> <span><small>weight :</small>  ${weight}kg</span>
        <span><small>height :</small>  ${height}cm</span><span class="day"><small>${time}</small></span><span
        class="delete"><a href="#" data-index=${i}>刪除</a></span></li>`
    }
    list.innerHTML = str;
}
// 刪除紀錄列表
function toggleDone(e) {
    e.preventDefault();
    //點擊若非a連結元素，則跳出此函數
    if (e.target.nodeName !== 'A') { return };
    //儲存受點擊元素data-index的值(data陣列裡的排序)
    let index = e.target.dataset.index;
    //刪除data陣列裡，受點擊的物件
    data.splice(index, 1);
    //將data陣列轉為JSON字串，上傳名稱為listData的localstorage
    localStorage.setItem('listData', JSON.stringify(data));
    // 更新紀錄列表的網頁內容
    updateList(data);
}