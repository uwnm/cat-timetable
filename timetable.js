jQuery(function($){

var DAYS = ["日", "月", "火", "水", "木", "金", "土"];

var now = moment();
var today = moment(now).startOf("day");
var current = moment(today);
var base = moment("2015-01-01T00:00:00+09:00");

function formatDate(moment) {
  return moment.year() + "年" + (moment.month() + 1) + "月" + moment.date() + "日(" + DAYS[moment.day()] + ")";
}

function formatTimeSpan(begin, end) {
  // TODO: extensions for not-one-hour events.
  var h1 = begin.hour();
  var m1 = begin.minute();
  var h2 = end.hour();
  var m2 = end.minute();
  var s = "";
  if (h1 < 10) {
    s += "&nbsp;";
  }
  s += h1 + ":";
  if (m1 < 10) {
    s += "0";
  }
  s += m1 + " - ";
  if (h2 == 0) {
    s += 24;
  } else {
    if (h2 < 10) {
      s += "&nbsp;";
    }
    s += h2;
  }
  s += ":";
  if (m2 < 10) {
    s += "0";
  }
  s += m2;
  return s;
}

function formatGroup(group) {
  return String.fromCharCode(65 + group);
}

function calcGroup(Moment) {
  var t = moment(Moment).utcOffset(540);
  return (4 - (t.diff(base, "days") % 4) + t.hour()) % 4;
}

function clearTable() {
  $("#table").empty();
}

function addTableHeader(moment) {
  $("#table").append(
    $("<div/>").addClass("bs-callout bs-callout-info")
               .html("<h4>" + formatDate(moment) + "</h4>")
  );
}

function addTableEntry(group, begin, end) {
  $("#table").append(
    $("<div/>").addClass("TableEntry Group" + group)
               .html("<strong>" + formatTimeSpan(begin, end) + "</strong> : グループ" + formatGroup(group))
  );
}

function updateTable() {
  clearTable();
  addTableHeader(current);
  for (var i = 0; i < 24; i++) {
    var t1 = moment(current).add(i, "hour");
    var t2 = moment(t1).add(1, "hour");
    addTableEntry(calcGroup(t1), t1, t2);
  }
}

$("#prev-day").click(function() {
  current.subtract(1, "day");
  updateTable();
});

$("#next-day").click(function() {
  current.add(1, "day");
  updateTable();
});

updateTable();

});
