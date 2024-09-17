// 曜日の配列
const weeks = ["日", "月", "火", "水", "木", "金", "土"];

// 現在の日付を取得
const date = new Date();
let year = date.getFullYear();
let month = date.getMonth() + 1;
let nextmonth = month + 1;

// カレンダーを表示する関数
function showCalendar(year, month) {
    for (let i = 0; i < 2; i++) {
        if (i == 0) {
            const calendarHtml = createCalendar(year, month, true);
            const sec = document.createElement("section");
            sec.innerHTML = calendarHtml;
            document.querySelector("#calendar").appendChild(sec);

            month += 1;

            if (month > 12) {
                year++;
                month = 1;
            }

        } else {
            const calendarHtml = createCalendar(year, month, false);
            const sec = document.createElement("section");
            sec.innerHTML = calendarHtml;
            document.querySelector("#calendar").appendChild(sec);

            month += 1;

            if (month > 12) {
                year++;
                month = 1;
            }

        }
    }
}
//month == date.getMonth()+1

// カレンダーを生成する関数
function createCalendar(year, month, todaymonth) {
    const checkmonth = todaymonth;
    if (checkmonth == true) {
        const startDate = new Date(year, month - 1, 1);
        const endDate = new Date(year, month, 0);
        const endDayCount = endDate.getDate();
        const lastMonthEndDate = new Date(year, month - 1, 0);
        const lastMonthendDayCount = lastMonthEndDate.getDate();
        const startDay = startDate.getDay();
        let dayCount = 1;
        let calendarHtml = "";
        const today = new Date();


        calendarHtml += "<h1>" + year + "/" + month + "</h1>";
        calendarHtml += "<table>";

        for (let i = 0; i < weeks.length; i++) {
            calendarHtml += "<td>" + weeks[i] + "</td>";
        }

        for (let w = 0; w < 6; w++) {
            calendarHtml += "<tr>";

            for (let d = 0; d < 7; d++) {
                if (w === 0 && d < startDay) {
                    let num = lastMonthendDayCount - startDay + d + 1;
                    calendarHtml += '<td class="is-disabled">' + num + "</td>";
                } else if (dayCount > endDayCount) {
                    let num = dayCount - endDayCount;
                    calendarHtml += '<td class="is-disabled">' + num + "</td>";
                    dayCount++;
                } else {
                    if (
                        year === today.getFullYear() &&
                        month === today.getMonth() + 1 &&
                        dayCount === today.getDate()
                    ) {
                        calendarHtml += '<td class="today calendar-day">' + dayCount + "</td>";
                    } else {
                        calendarHtml += '<td class="calendar-day">' + dayCount + "</td>";
                    }
                    dayCount++;
                }
            }
            calendarHtml += "</tr>";
        }
        calendarHtml += "</table>";

        return calendarHtml;
    } else if (checkmonth == false) {
        const startDate = new Date(year, month - 1, 1);
        const endDate = new Date(year, month, 0);
        const endDayCount = endDate.getDate();
        const lastMonthEndDate = new Date(year, month - 1, 0);
        const lastMonthendDayCount = lastMonthEndDate.getDate();
        const startDay = startDate.getDay();
        let dayCount = 1;
        let calendarHtml = "";
        const today = new Date();


        calendarHtml += "<h1>" + year + "/" + month + "</h1>";
        calendarHtml += "<table>";

        for (let i = 0; i < weeks.length; i++) {
            calendarHtml += "<td>" + weeks[i] + "</td>";
        }

        for (let w = 0; w < 6; w++) {
            calendarHtml += "<tr>";

            for (let d = 0; d < 7; d++) {
                if (w === 0 && d < startDay) {
                    let num = lastMonthendDayCount - startDay + d + 1;
                    calendarHtml += '<td class="is-disabled">' + num + "</td>";
                } else if (dayCount > endDayCount) {
                    let num = dayCount - endDayCount;
                    calendarHtml += '<td class="is-disabled">' + num + "</td>";
                    dayCount++;
                } else {
                    if (
                        year === today.getFullYear() &&
                        month === today.getMonth() + 1 &&
                        dayCount === today.getDate()
                    ) {
                        calendarHtml += '<td class="today calendar-day">' + dayCount + "</td>";
                    } else {
                        calendarHtml += '<td class="nextcalendar-day">' + dayCount + "</td>";
                    }
                    dayCount++;
                }
            }
            calendarHtml += "</tr>";
        }
        calendarHtml += "</table>";

        return calendarHtml;
    }

}


// 日付をクリックした時の処理
function handleDayClick(e) {
    const day = e.target.textContent;
    const calendarName = document.getElementById("calendar-name").value;
    const startTime = document.getElementById("start-time").value;
    const endTime = document.getElementById("end-time").value;
    const checkday = e.target.id;

    //console.log(e.target.id);

    if (checkday == "nextcalendar-day") {
        console.log(
            `日付: ${year}/${nextmonth}/${day}, カレンダー名: ${calendarName}, 開始時刻: ${startTime}, 終了時刻: ${endTime}`
        );
    } else {
        console.log(
            `日付: ${year}/${month}/${day}, カレンダー名: ${calendarName}, 開始時刻: ${startTime}, 終了時刻: ${endTime}`
        );
    }

    e.target.classList.toggle("clicked");
}

// 日付のクリックイベントをハンドリング
function handleDayClickEvent(day) {
    day.addEventListener("click", handleDayClick);
}

// カレンダーの日付要素にイベントを割り当てる関数
function attachClickEventToCalendarDays() {
    const calendarDays = document.querySelectorAll(".calendar-day, .nextcalendar-day, .today");
    calendarDays.forEach(handleDayClickEvent);
}

// カレンダーを移動する関数
function moveCalendar(e) {
    document.querySelector("#calendar").innerHTML = "";

    if (e.target.id === "prev") {
        month--;
        if (month < 1) {
            year--;
            month = 12;
        }
    }

    if (e.target.id === "next") {
        month++;
        if (month > 12) {
            year++;
            month = 1;
        }
    }

    showCalendar(year, month);
    attachClickEventToCalendarDays();
}

document.querySelector("#prev").addEventListener("click", moveCalendar);
document.querySelector("#next").addEventListener("click", moveCalendar);

showCalendar(year, month);
attachClickEventToCalendarDays();


//作成ボタンの動作
function handleCreateButtonClick() {
    const calendarName = document.getElementById("calendar-name").value.trim();
    const startTime = document.getElementById("start-time").value;
    const endTime = document.getElementById("end-time").value;
    const selectedDays = document.querySelectorAll(".calendar-day.clicked, .today.clicked");
    const nm_selectedDays = document.querySelectorAll(".nextcalendar-day.clicked");
    //nextmonthdatesを作り送る。
    let errorMessage = "";
    if (!calendarName) {
        errorMessage += "カレンダー名が入力されていません。\n";
    }
    if (selectedDays.length === 0 && nm_selectedDays.length === 0) {
        errorMessage += "日付が選択されていません。\n";
    }
    if (!startTime) {
        errorMessage += "開始時刻が入力されていません。\n";
    }
    if (!endTime) {
        errorMessage += "終了時刻が入力されていません。\n";
    }

    if (errorMessage) {
        alert(errorMessage);
        return;
    }

    const selectedDates = Array.from(selectedDays).map(day => day.textContent);
    const nm_selectedDates = Array.from(nm_selectedDays).map(day => day.textContent);

    const params = new URLSearchParams({
        calendarName,
        year,
        month,
        selectedDates: JSON.stringify(selectedDates),
        nm_selectedDates: JSON.stringify(nm_selectedDates),
        startTime,
        endTime
    });

    window.location.href = `new_page.html?${params.toString()}`;
}

//テスト用
function testbutton() {
    const selectedDays = document.querySelectorAll(".calendar-day.clicked, .today.clicked");
    const nm_selectedDays = document.querySelectorAll(".nextcalendar-day.clicked");
    const selectedDates = Array.from(selectedDays).map(day => day.textContent);
    const nm_selectedDates = Array.from(nm_selectedDays).map(day => day.textContent);
    console.log(nm_selectedDates);
}

document.getElementById("create-button").addEventListener("click", handleCreateButtonClick);

//テスト用メソッドを設定
//document.getElementById("testbutton").addEventListener("click", testbutton);