const monthTitle = document.getElementById("month");
const daysContainer = document.getElementById("days");

let current = new Date();

let month = current.getMonth();
let year = current.getFullYear();


// ======== ДАТА НАЧАЛА ГРАФИКА ========
// Здесь укажи первый рабочий день
const startDate = new Date(2026, 0, 22);
// ================================


document.getElementById("prev").onclick = () => {

    month--;

    if (month < 0) {
        month = 11;
        year--;
    }

    renderCalendar();
}

document.getElementById("next").onclick = () => {

    month++;

    if (month > 11) {
        month = 0;
        year++;
    }

    renderCalendar();

}

function renderCalendar() {

    daysContainer.innerHTML = "";

    monthTitle.textContent = new Date(year, month)
        .toLocaleString("ru", {
            month: "long",
            year: "numeric"
        });

    const firstDay = new Date(year, month, 1);

    const lastDay = new Date(year, month + 1, 0);

    let startWeek = firstDay.getDay();

    if (startWeek === 0)
        startWeek = 7;

    for (let i = 1; i < startWeek; i++) {

        const empty = document.createElement("div");
        empty.className = "empty";

        daysContainer.append(empty);

    }

    for (let day = 1; day <= lastDay.getDate(); day++) {

        const cell = document.createElement("div");

        cell.className = "day";

        cell.textContent = day;

        const date = new Date(year, month, day);

        const diff = Math.floor(
            (date - startDate) / (1000 * 60 * 60 * 24)
        );

        // цикл 2 рабочих / 2 выходных
        const cycle = ((diff % 4) + 4) % 4;

        if (cycle < 2) {

            cell.classList.add("work");

        } else {

            cell.classList.add("off");

        }

        const week = date.getDay();

        if (week === 6 || week === 0) {

            cell.classList.add("weekend");

        }

        const today = new Date();

        if (
            today.getDate() === day &&
            today.getMonth() === month &&
            today.getFullYear() === year
        ) {

            cell.classList.add("today");

        }

        daysContainer.append(cell);

    }

}

renderCalendar();
