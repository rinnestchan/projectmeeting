document.addEventListener('DOMContentLoaded', async () => {
    // SQL.jsを使用してSQLiteデータベースを初期化
    const SQL = await initSqlJs({ locateFile: filename => `https://cdnjs.cloudflare.com/ajax/libs/sql.js/1.5.0/${filename}` });
    let db;

    // ローカルストレージからデータベースを復元
    const savedDb = localStorage.getItem('sqlite_db');
    if (savedDb) {
        const uInt8Array = new Uint8Array(JSON.parse(savedDb));
        db = new SQL.Database(uInt8Array);
    } else {
        db = new SQL.Database();
        db.run("CREATE TABLE IF NOT EXISTS selected_times (name TEXT, date TEXT, time TEXT)");
    }

    // クリックされた時間をデータベースに保存
    function saveTimeToDatabase(nameTxt) {
        const checkTimeCells = document.querySelectorAll('.first-calendar td.checked');
        if (checkTimeCells.length == 0) {
            return;
        }
        checkTimeCells.forEach(time => {
            const selectTime = time.textContent;
            const CalendarDate = time.closest('.first-calendar').querySelector('#tableDate th').textContent;
            db.run("INSERT INTO selected_times (name, date, time) VALUES (?, ?, ?)", [nameTxt, CalendarDate, selectTime]);
        });
        saveDatabaseToLocalStorage();
    }

    function saveNextTimeToDatabase(nameTxt) {
        const checkTimeCells = document.querySelectorAll('.second-calendar td.checked');
        if (checkTimeCells.length == 0) {
            return;
        }
        checkTimeCells.forEach(time => {
            const selectTime = time.textContent;
            const CalendarDate = time.closest('.second-calendar').querySelector('#tableDate th').textContent;
            db.run("INSERT INTO selected_times (name, date, time) VALUES (?, ?, ?)", [nameTxt, CalendarDate, selectTime]);
        });
        saveDatabaseToLocalStorage();
    }

    // データベースをローカルストレージに保存
    function saveDatabaseToLocalStorage() {
        const data = db.export();
        const buffer = new Uint8Array(data);
        localStorage.setItem('sqlite_db', JSON.stringify(Array.from(buffer)));
    }

    // デバッグ用: 保存された時間をコンソールに表示
    function logSavedTimes() {
        const stmt = db.prepare("SELECT * FROM selected_times");
        while (stmt.step()) {
            console.log(stmt.getAsObject());
        }
        console.log("---保存しました---");
    }

    // データベースをリセット
    function resetDatabase() {
        db = new SQL.Database(); // 新しいデータベースを作成
        db.run("CREATE TABLE IF NOT EXISTS selected_times (name TEXT, date TEXT, time TEXT)");
        localStorage.removeItem('sqlite_db'); // ローカルストレージから削除
        alert('データベースをリセットしました');
    }

    //　リセットボタンの登録
    document.getElementById('resset-btn').addEventListener("click", resetDatabase);

    //　保存ボタンが押された時の動作
    function savebuttonsys() {
        const checkTimeCells = document.querySelectorAll('td.checked');
        const name = document.getElementById('name').value;
        if (name.trim() === "") {
            alert("名前を入力してください");
        } else
            if (checkTimeCells.length == 0) {
                alert("時間が指定されていません")
            } else {
                saveTimeToDatabase(name);
                saveNextTimeToDatabase(name);
                alert("保存しました");
                logSavedTimes();
            }
    }

    // 保存済みのデータを確認
    document.getElementById("savebtn").addEventListener("click", savebuttonsys);
});