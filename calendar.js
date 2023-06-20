// declare an object Calendar
function Calendar(elem) {
  this.elem = elem;
  this.dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  this.iHTML = '';

  // HTML element in which to display the calendar
  this.elem = elem;

  // array containing list of names of the days of the week
  this.dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  /** Returns the month name of the year for a given month index.
   * @param monthIndex {number} zero-based index of the month of the year (0 = January, 11 = December)
   * @returns {string} the name of the given month
   */
  this.getMonth = function(monthIndex) {
    // Condition statement to return the month name or unknown if not a number or valid entry - CC
    if (typeof monthIndex !== "number" || monthIndex < 0 || monthIndex > 11) {
      return "Unknown";
    }

    // if/else statement to determine the names of the month - CC
    if (monthIndex === 0) {
      return "January";
    } else if (monthIndex === 1) {
      return "February";
    } else if (monthIndex === 2) {
      return "March";
    } else if (monthIndex === 3) {
      return "April";
    } else if (monthIndex === 4) {
      return "May";
    } else if (monthIndex === 5) {
      return "June";
    } else if (monthIndex === 6) {
      return "July";
    } else if (monthIndex === 7) {
      return "August";
    } else if (monthIndex === 8) {
      return "September";
    } else if (monthIndex === 9) {
      return "October";
    } else if (monthIndex === 10) {
      return "November";
    } else if (monthIndex === 11) {
      return "December";
    }
  }

  /** Returns the number of days in the month for a given zero-based month index and year.
   * @param monthIndex {number} zero-based index of the month of the year (0 = January, 11 = December)
   * @param year {number} a 4-digit year
   * @returns {number} the number of days in the given month and year
   */
  function isLeapYear(year) {
    return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
  }

  this.getDaysInMonth = function(monthIndex, year) {
    if (
      typeof monthIndex !== 'number' ||
      monthIndex < 0 ||
      monthIndex > 11 ||
      typeof year !== 'number'
    ) {
      return -1;
    }

    switch (monthIndex) {
      case 1:
        return isLeapYear(year) ? 29 : 28;
      case 3:
      case 5:
      case 8:
      case 10:
        return 30;
      default:
        return 31;
    }
  }

  // method display generates calendar HTML
  // the displayDate parameter indicates the year and month to render (display) 
  this.display = function(displayDate = new Date()) {
    // clear the calendar element
    this.elem.innerHTML = "";

    // create the calendar table -- CC
    const table = document.createElement("table");
    const thead = document.createElement("thead");
    const tbody = document.createElement("tbody");

    // create the table header row -- CC
    const headerRow = document.createElement("tr");

    // create the previous month button -- CC
    const previousMonthButton = document.createElement("button");
    previousMonthButton.textContent = "<< Previous Month";
    previousMonthButton.addEventListener("click", () => {
      const previousMonthDate = new Date(displayDate.getFullYear(), displayDate.getMonth() - 1);
      this.display(previousMonthDate);
    });
    const previousMonthButtonCell = document.createElement("td");
    previousMonthButtonCell.appendChild(previousMonthButton);
    headerRow.appendChild(previousMonthButtonCell);

    // create the month name and year header cell -- CC
    const monthYearHeaderCell = document.createElement("td");
    monthYearHeaderCell.setAttribute("colspan", "5");
    monthYearHeaderCell.innerHTML = "<h1>" + this.getMonth(displayDate.getMonth()) + " " + displayDate.getFullYear() + "</h1>";
    headerRow.appendChild(monthYearHeaderCell);

    // create the next month button -- CC
    const nextMonthButton = document.createElement("button");
    nextMonthButton.textContent = "Next Month >>";
    nextMonthButton.addEventListener("click", () => {
      const nextMonthDate = new Date(displayDate.getFullYear(), displayDate.getMonth() + 1);
      this.display(nextMonthDate);
    });
    const nextMonthButtonCell = document.createElement("td");
    nextMonthButtonCell.appendChild(nextMonthButton);
    headerRow.appendChild(nextMonthButtonCell);

    // append the header row to the table header row -- CC
    thead.appendChild(headerRow);

    // create the weekday name headers row -- CC
    const weekdayNamesRow = document.createElement("tr");
for (const dayName of this.dayNames) {
  const weekdayNameHeader = document.createElement("th");
  weekdayNameHeader.textContent = dayName;

  // Apply border styles to the weekday name headers
  weekdayNameHeader.style.border = "1px solid #000";
  weekdayNameHeader.style.padding = "8px";
  weekdayNameHeader.style.textAlign = "center";

  weekdayNamesRow.appendChild(weekdayNameHeader);
}

// Append an additional row for the border
const weekdayBordersRow = document.createElement("tr");
for (let i = 0; i < 7; i++) {
  const weekdayBorderCell = document.createElement("td");
  weekdayBorderCell.style.border = "1px solid #000";
  weekdayBordersRow.appendChild(weekdayBorderCell);
}

thead.appendChild(weekdayNamesRow);
thead.appendChild(weekdayBordersRow);

    // calculate the number of days in the month -- CC
    const daysInMonth = this.getDaysInMonth(displayDate.getMonth(), displayDate.getFullYear());

// create the calendar days -- CC
let dayCount = 1;
const firstDayOfWeek = new Date(displayDate.getFullYear(), displayDate.getMonth(), 1).getDay();

for (let week = 0; week < 6; week++) {
  const weekRow = document.createElement("tr");

  for (let dayOfWeek = 0; dayOfWeek < 7; dayOfWeek++) {
    const dayCell = document.createElement("td");

    if ((week === 0 && dayOfWeek < firstDayOfWeek) || dayCount > daysInMonth) {
      // empty cells before the first day of the month and after the last day
      dayCell.textContent = "";
    } else {
      // display the day of the month
      dayCell.textContent = dayCount;

      // Apply border styles to non-empty day cells
      dayCell.style.border = "1px solid #000";
      dayCell.style.padding = "8px";
      dayCell.style.textAlign = "center";

      dayCount++;
    }

    // Remove border styles from empty day cells
    if (dayCell.textContent === "") {
      dayCell.style.border = "none";
      dayCell.style.padding = "0";
    }

    weekRow.appendChild(dayCell);
  }

  tbody.appendChild(weekRow);
}

    // append the table header and body to the table -- CC
    table.appendChild(thead);
    table.appendChild(tbody);

    // append the table to the calendar element -- CC
    this.elem.appendChild(table);
  }
}

// create an instance of Calendar
const cal = new Calendar(document.getElementById("calendar"));

// call the display() method
cal.display();
