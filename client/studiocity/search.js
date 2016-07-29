function pickerPrev() {
	$(".flexible-search input.flex-date").datepick("performAction", "prev")
}
function pickerNext() {
	$(".flexible-search input.flex-date").datepick("performAction", "next")
}
function pickerClose() {
	$(".flexible-search input.flex-date").datepick("performAction", "close")
}
function monthPrev() {
	$("#inline-calendar").datepick("performAction", "prev")
}
function monthNext() {
	$("#inline-calendar").datepick("performAction", "next")
}
function dayPrev() {
	$("#dateslider-calendar").datepick("performAction", "prevSlideDay")
}
function dayNext() {
	$("#dateslider-calendar").datepick("performAction", "nextSlideDay")
}
function sliderDayRangePrev(a) {
	$dateslidersearch = $(a).closest(".dateslider-search-room-type");
	$dateslidersearch.datepick("performAction", "prevSlideDayRange")
}
function sliderDayRangeNext(a) {
	$dateslidersearch = $(a).closest(".dateslider-search-room-type");
	$dateslidersearch.datepick("performAction", "nextSlideDayRange")
}
$.datepick = $.extend({}, $.datepick);
$.datepick.themeRollerRenderer = $.extend({}, $.datepick.themeRollerRenderer);
(function (d) {
	var b = d.extend({}, d.datepick.themeRollerRenderer, {
			picker : '<div{popup:start} id="ui-datepicker-div"{popup:end} class="datepicker-div-to-hide ui-datepicker ui-widget ui-widget-content ui-helper-clearfix ui-corner-all{inline:start} ui-datepicker-inline{inline:end}">{popup:start}<div class="ui-datepicker-header ui-widget-header ui-helper-clearfix ui-corner-all">{button:close}</div>{popup:end}{months}<div class="ui-helper-clearfix"></div><div id="calendar-replace"></div></div>',
			monthRow : '<div class="ui-datepicker-row-break"><div class="ui-datepicker-header ui-corner-all">{months}<a data-tag="wh-calendar-prev" class="ui-datepicker-prev ui-corner-all" onclick="pickerPrev()"><span class="ui-icon ui-icon-circle-triangle-w"></span></a><a data-tag="wh-calendar-next" class="ui-datepicker-next ui-corner-all" onclick="pickerNext()"><span class="ui-icon ui-icon-circle-triangle-e"></span></a></div></div>',
			commandButtonClass : "button"
		});
	var f = d.extend({}, d.datepick.themeRollerRenderer, {
			picker : '<div{popup:start} id="ui-datepicker-div"{popup:end} class="datepicker-div-to-hide ui-datepicker ui-widget ui-widget-content ui-helper-clearfix {inline:start} ui-datepicker-inline{inline:end}">{popup:start}<div class="ui-datepicker-header ui-widget-header ui-helper-clearfix ui-corner-all"></div>{popup:end}{months}<div class="ui-helper-clearfix"></div><div id="calendar-replace"></div></div>',
			monthRow : '<div class="ui-datepicker-row-break"><div class="ui-datepicker-header ui-corner-all" style="padding:0;">{months}<a data-tag="wh-calendar-prev" class="ui-datepicker-prev ui-corner-all" onclick="monthPrev()" style="cursor:pointer;"><span class="ui-icon ui-icon-circle-triangle-w"></span></a><a data-tag="wh-calendar-next" class="ui-datepicker-next ui-corner-all" onclick="monthNext()" style="cursor:pointer;"><span class="ui-icon ui-icon-circle-triangle-e"></span></a></div></div>',
			commandButtonClass : "button"
		});
	var a = d.extend({}, d.datepick.themeRollerRenderer, {
			picker : '<div{popup:start} id="ui-dateslider-div"{popup:end} class="dateslider-div ui-datepicker ui-widget ui-widget-content ui-helper-clearfix {inline:start} ui-datepicker-inline{inline:end}">{popup:start}<div class="ui-datepicker-header ui-widget-header ui-helper-clearfix ui-corner-all"></div>{popup:end}<div class="dateslider-info"><label class="find-label"></label><a data-tag="wh-alternate-dates-click" class="dateslider-find" href="javascript:void(0);"></a></div><div class="dateslider-slider"></div>{months}<div id="calendar-replace"></div><div class="ui-helper-clearfix"></div></div>',
			monthRow : '<div class="ui-datepicker-row-break"><div class="ui-datepicker-header ui-corner-all" style="padding:0;">{months}</div></div>',
			month : '<div class="dateslider-month"><div class="dateslider-month-header">{monthHeader}</div><div class="ui-datepicker-calendar dateslider-calendar-dates">{weeks}<div style="display:none;">{weekHeader}</div><div class="ui-helper-clearfix"></div></div></div>',
			weekHeader : "{days}",
			dayHeader : '<div class="dateslider-day-name">{day}</div>',
			week : "{days}",
			day : '<div class="dateslider-days">{monthName}<div class="dateslider-day-name">{dayName}</div><div class="dateslider-day">{day}</div></div>',
			monthSelector : ".dateslider-month",
			daySelector : ".dateslider-day",
			commandButtonClass : "button"
		});
	var e = d.extend({}, d.datepick.themeRollerRenderer, {
			picker : '<div{popup:start} id="ui-dateslider-div"{popup:end} class="dateslider-div ui-datepicker ui-widget ui-widget-content ui-helper-clearfix {inline:start} ui-datepicker-inline{inline:end}">{popup:start}<div class="ui-datepicker-header ui-widget-header ui-helper-clearfix ui-corner-all"></div>{popup:end}{months}<div id="calendar-replace"></div><div class="ui-helper-clearfix"></div></div>',
			monthRow : '<div class="ui-datepicker-row-break"><div class="ui-datepicker-header ui-corner-all" style="padding:0;">{months}<a class="ui-datepicker-prev ui-corner-all" onclick="sliderDayRangePrev(this)" style="cursor:pointer;"><span class="ui-icon ui-icon-circle-triangle-w"></span></a><a class="ui-datepicker-next ui-corner-all" onclick="sliderDayRangeNext(this)" style="cursor:pointer;"><span class="ui-icon ui-icon-circle-triangle-e"></span></a></div></div>',
			month : '<div class="dateslider-month"><div class="dateslider-month-header">{monthHeader}</div><div class="ui-datepicker-calendar dateslider-calendar-dates">{weeks}<div style="display:none;">{weekHeader}</div><div class="ui-helper-clearfix"></div></div></div>',
			weekHeader : "{days}",
			dayHeader : '<div class="dateslider-day-name">{day}</div>',
			week : "{days}",
			day : '<div class="dateslider-days">{monthName}<div class="dateslider-day-name">{dayName}</div><div class="dateslider-day">{day}</div></div>',
			monthSelector : ".dateslider-month",
			daySelector : ".dateslider-day",
			commandButtonClass : "button"
		});
	var c = d.extend({}, d.datepick.themeRollerRenderer, {
			picker : '<div{popup:start} id="ui-dateslider-div"{popup:end} class="dateslider-div ui-datepicker ui-widget ui-widget-content ui-helper-clearfix {inline:start} ui-datepicker-inline{inline:end}">{popup:start}<div class="ui-datepicker-header ui-widget-header ui-helper-clearfix ui-corner-all"></div>{popup:end}{months}<div id="calendar-replace"></div><div class="ui-helper-clearfix"></div></div>',
			monthRow : '<div class="ui-datepicker-row-break"><div class="ui-datepicker-header ui-corner-all" style="padding:0;">{months}</div></div>',
			month : '<div class="dateslider-month"><div class="dateslider-month-header">{monthHeader}</div><div class="ui-datepicker-calendar dateslider-calendar-dates">{weeks}<div style="display:none;">{weekHeader}</div><div class="ui-helper-clearfix"></div></div></div>',
			weekHeader : "{days}",
			dayHeader : "",
			week : "{days}",
			day : '<div class="dateslider-days"><div class="dateslider-day">{day}</div></div>',
			monthSelector : ".dateslider-month",
			daySelector : ".dateslider-day",
			commandButtonClass : "button"
		});
	d.extend(d.datepick, {
		mySearchCalRenderer : f,
		myAvailCalRenderer : b,
		myTimelineCalRenderer : a,
		mySearchCalRoomTypeFirstLineRenderer : e,
		mySearchCalRoomTypeOtherLinesRenderer : c,
		addColorLegendAndRateText : function (l, j, g, o) {
			var h = "";
			var i = "";
			var n = "";
			if (g) {
				i = MessageHandler.formatMessage(((typeof(rateCurrencyLbl) !== "undefined") ? rateCurrencyLbl : "All Rates shown in {0}."), g)
			}
			if (j) {
				n = '<div class="ui-datepicker-row-break"><div class="ui-datepicker-legend"><table><tr><td class="color-area"><div class="available-dates"></div></td><td class="color-label">' + ((typeof(availableDatesLbl) !== "undefined") ? availableDatesLbl : "Available Dates") + '</td></tr><tr><td class="color-area"><div class="selected-dates"></div></td><td class="color-label">' + ((typeof(selectedDatesLbl) !== "undefined") ? selectedDatesLbl : "Selected Dates") + '</td></tr><tr><td class="color-area"><div class="unavailable-dates"></div></td><td class="color-label">' + ((typeof(unAvailableDatesLbl) !== "undefined") ? unAvailableDatesLbl : "Unavailable Dates") + "</td></tr>";
				if (o && o.showRestrictionLegend) {
					n += '<tr><td class="color-area"><div class="restriction-dates"></div></td><td class="color-label">' + ((typeof(restrictionDatesLbl) !== "undefined") ? restrictionDatesLbl : "Restriction Dates") + "</td></tr>"
				}
				if (o && o.showEventLegend) {
					n += '<tr><td class="color-area"><div class="event-dates"></div></td><td class="color-label">' + ((typeof(eventDatesLbl) !== "undefined") ? eventDatesLbl : "Event Dates") + "</td></tr>"
				}
				n += "</table></div><br/>";
				if (o && o.showPrice) {
					n += '<div class="other other-text"><span class="other other-currency">' + i + '</span><br><br><span class="other">' + ((typeof(availCalDisclaimerLbl) !== "undefined") ? availCalDisclaimerLbl : "* Rates in search results may vary.") + "</span></div>"
				}
				n += "</div>"
			} else {
				if (o && o.showPrice) {
					n = '<div class="ui-datepicker-row-break"><div class="other">' + i + '</div><div class="other">' + ((typeof(availCalDisclaimerLbl) !== "undefined") ? availCalDisclaimerLbl : "* Rates in search results may vary.") + "</div></div>"
				}
			}
			l = d(l.target || l);
			var k = d.data(l[0], d.datepick.dataName);
			if (k) {
				var m = k.get("renderer");
				m.picker = '<div{popup:start} id="ui-datepicker-div"{popup:end} class="datepicker-div-to-hide ui-datepicker ui-widget ui-widget-content ui-helper-clearfix ui-corner-all{inline:start} ui-datepicker-inline{inline:end}">{popup:start}<div class="ui-datepicker-header ui-widget-header ui-helper-clearfix ui-corner-all">{button:close}</div>{popup:end}{months}<div class="ui-helper-clearfix"></div>' + n + "</div>"
			}
		},
		addColorLegendWithEvents : function (n, k, g, s) {
			var r = "";
			var i = "";
			var j = "";
			var q = ((typeof(knowDatesLbl) !== "undefined") ? knowDatesLbl : "I know my dates");
			var m = ((typeof(justShoppingLbl) !== "undefined") ? justShoppingLbl : "Just Shopping");
			if (g) {
				j = MessageHandler.formatMessage(((typeof(rateCurrencyLbl) !== "undefined") ? rateCurrencyLbl : "All Rates shown in {0}."), g)
			}
			var p = (d("#srchResort").val() != "ALL");
			if (k) {
				var h = "";
				if (document.URL.indexOf("multi_choose_date.cmd") == -1) {
					h = '<button data-tag="wh-check-availability-click" class="button ac-calendar" id="ac-submit" onclick="return beforeSubmit(this);" type="button">' + q + "</button>"
				}
				r = '<div class="ui-datepicker-row-break"><div class="ui-datepicker-legend"><table><tr><td class="color-area"><div class="available-dates"></div></td><td class="color-label">' + ((typeof(availableDatesLbl) !== "undefined") ? availableDatesLbl : "Available Dates") + '</td></tr><tr><td class="color-area"><div class="selected-dates"></div></td><td class="color-label">' + ((typeof(selectedDatesLbl) !== "undefined") ? selectedDatesLbl : "Selected Dates") + '</td></tr><tr><td class="color-area"><div class="unavailable-dates"></div></td><td class="color-label">' + ((typeof(unAvailableDatesLbl) !== "undefined") ? unAvailableDatesLbl : "Unavailable Dates") + "</td></tr>";
				if (s && s.showRestrictionLegend) {
					r += '<tr><td class="color-area"><div class="restriction-dates"></div></td><td class="color-label">' + ((typeof(restrictionDatesLbl) !== "undefined") ? restrictionDatesLbl : "Restriction Dates") + "</td></tr>"
				}
				if (s && s.showEventLegend) {
					r += '<tr><td class="color-area"><div class="event-dates"></div></td><td class="color-label">' + ((typeof(eventDatesLbl) !== "undefined") ? eventDatesLbl : "Event Dates") + "</td></tr>"
				}
				r += '</table></div><div class="knowndates-other">' + h + "</div>" + ((p && document.URL.indexOf("multi_choose_date.cmd") == -1) ? ('<div class="justshopping-other"><button data-tag="wh-check-calendar-click" type="button" id="ac-lookup" class="button ac-calendar" onclick="DailyRates.onJustShopping();">' + m + "</button></div>") : "") + "<br/>";
				if (s && s.showPrice) {
					r += '<div class="other other-text"><span class="other other-currency">' + j + '</span><br><br><span class="other">' + ((typeof(availCalDisclaimerLbl) !== "undefined") ? availCalDisclaimerLbl : "* Rates in search results may vary.") + "</span></div>"
				}
				r += "</div>"
			} else {
				if (s && s.showPrice) {
					r = '<div class="ui-datepicker-row-break"><div class="other">' + j + '</div><div class="other">' + ((typeof(availCalDisclaimerLbl) !== "undefined") ? availCalDisclaimerLbl : "* Rates in search results may vary.") + "</div></div>"
				}
			}
			n = d(n.target || n);
			var l = d.data(n[0], d.datepick.dataName);
			if (l) {
				var o = l.get("renderer");
				o.highlightedClass = "";
				o.picker = '<div{popup:start} id="ui-datepicker-div"{popup:end} class="datepicker-div-to-hide ui-datepicker ui-widget ui-widget-content ui-helper-clearfix ui-corner-all{inline:start} ui-datepicker-inline{inline:end}">{popup:start}<div class="ui-datepicker-header ui-widget-header ui-helper-clearfix ui-corner-all">{button:close}</div>{popup:end}{months}<div class="ui-helper-clearfix"></div>' + r + "</div>"
			}
		},
		addSliderLegend : function () {
			var g = (((typeof(showSLegend) !== "undefined") ? showSLegend : false) ? '<div class="ui-datepicker-legend ui-slider-legend"><table><tbody><tr><td class="color-area"><div class="available-dates"></div></td><td class="color-label">' + ((typeof(availableDatesLbl) !== "undefined") ? availableDatesLbl : "Available Dates") + '</td><td class="color-area"><div class="selected-dates"></div></td><td class="color-label">' + ((typeof(selectedDatesLbl) !== "undefined") ? selectedDatesLbl : "Selected Dates") + '</td><td class="color-area"><div class="unavailable-dates"></div></td><td class="color-label">' + ((typeof(unAvailableDatesLbl) !== "undefined") ? unAvailableDatesLbl : "Unavailable Dates") + '</td><td class="color-area"><div class="restriction-dates"></div></td><td class="color-label">' + ((typeof(restrictionDatesLbl) !== "undefined") ? restrictionDatesLbl : "Restriction Dates") + '</td><td class="color-area"><div class="event-dates"></div></td><td class="color-label">' + ((typeof(eventDatesLbl) !== "undefined") ? eventDatesLbl : "Event Dates") + "</td></tr></tbody></table></div>" : "");
			d("#dateslider-calendar #calendar-replace").html(g)
		},
		addSliderLabels : function () {
			var g = ((typeof(modifyRangeLbl) !== "undefined") ? modifyRangeLbl : "Alternate Range");
			d("#dateslider-calendar .find-label").html(g)
		},
		addTimelineCalendar : function (n, m, h) {
			var j = "";
			var g = "";
			var i = "";
			if (m) {
				j = '<div class="ui-datepicker-row-break"></div>'
			} else {
				j = '<div class="ui-datepicker-row-break"></div>'
			}
			n = d(n.target || n);
			var l = d.data(n[0], d.datepick.dataName);
			if (l) {
				var k = l.get("renderer");
				k.highlightedClass = "";
				k.picker = '<div{popup:start} id="ui-datepicker-div"{popup:end} class="datepicker-div-to-hide ui-datepicker ui-widget ui-widget-content ui-helper-clearfix ui-corner-all{inline:start} ui-datepicker-inline{inline:end}">{popup:start}<div class="ui-datepicker-header ui-widget-header ui-helper-clearfix ui-corner-all">{button:close}</div>{popup:end}{months}' + j + '<div class="ui-helper-clearfix"></div></div>'
			}
		},
		replaceWithError : function () {
			var g = d(".datepicker-div-to-hide").width();
			var j = d(".datepicker-div-to-hide").height();
			var i = '<div class="ui-datepicker-error" style="width: auto; height:auto;"><div class="error-header"><div class="error-close-section"><a class="error-close-action" href="javascript:void(0)" onclick="pickerClose();"><span class="localize-me">Close Window</span></a></div></div><div class="ui-datepicker-row-break error-text-section"><div class="error-text"><p><br>Pricing data is currently unavailable.<br>Please close and try again or check back later.</p></div></div>';
			"</div>";
			d(".datepicker-div-to-hide").replaceWith(i)
		},
		replaceWithErrorDiv : function () {
			var g = d(".datepicker-div-to-hide").width();
			var j = d(".datepicker-div-to-hide").height();
			var i = '<div class="ui-datepicker-error" style="width: auto; height:auto; display:inline; "><div class="error-header"><div class="ui-datepicker-row-break error-text-section"><div class="error-text"><p><br>Pricing data is currently unavailable.<br>Please close and try again or check back later.</p></div></div>';
			"</div>";
			d(".datepicker-div-to-hide").replaceWith(i)
		}
	})
})(jQuery);
var AvailabilityChecker = {
	getCheckinDate : function () {
		var a = parseInt($("#checkinYear").find(":selected").val(), 10);
		var c = parseInt($("#checkinMonth").find(":selected").val(), 10);
		var b = parseInt($("#checkinDay").find(":selected").val(), 10);
		return new Date(a, c - 1, b, 0, 0, 0)
	},
	getCheckoutDate : function () {},
	validateCheckinDay : function () {
		var c = AvailabilityChecker.getDaysInMonth($("#checkinMonth").val(), $("#checkinYear").val());
		var b = $("#checkinDay").val();
		var e = $("#checkinDay")[0].options.length;
		$("#checkinDay")[0].options.length = c;
		for (var d = e; d < c; d++) {
			$("#checkinDay")[0].options[d] = new Option(d + 1, d + 1)
		}
		if (b > c) {
			b = c
		}
		var a = $("#checkinDay").find("option").get(b - 1);
		if (a) {
			a.disabled = false
		}
		$("#checkinDay").val(b);
		AvailabilityChecker.reinitializeDateCombo("checkinYear", "checkinMonth", "checkinDay")
	},
	validateCheckoutYear : function () {
		if (parseInt($("#checkoutYear").val()) < parseInt($("#checkinYear").val())) {
			$("#checkoutYear").val($("#checkinYear").val())
		}
	},
	validateCheckoutMonth : function () {
		if (parseInt($("#checkoutYear").val()) == parseInt($("#checkinYear").val()) && parseInt($("#checkoutMonth").val()) < parseInt($("#checkinMonth").val())) {
			$("#checkoutMonth").val($("#checkinMonth").val())
		}
	},
	validateCheckoutDay : function () {
		if (parseInt($("#checkoutYear").val()) == parseInt($("#checkinYear").val()) && parseInt($("#checkoutMonth").val()) == parseInt($("#checkinMonth").val()) && parseInt($("#checkoutDay").val()) <= parseInt($("#checkinDay").val())) {
			$("#checkoutDay").val(parseInt($("#checkinDay").val()) + 1)
		}
		var c = AvailabilityChecker.getDaysInMonth($("#checkoutMonth").val(), $("#checkoutYear").val());
		var b = $("#checkoutDay").val();
		var e = $("#checkoutDay")[0].options.length;
		$("#checkoutDay")[0].options.length = c;
		for (var d = e; d < c; d++) {
			$("#checkoutDay")[0].options[d] = new Option(d + 1, d + 1)
		}
		if (b > c) {
			b = c
		}
		var a = $("#checkoutDay").find("option").get(b - 1);
		if (a) {
			a.disabled = false
		}
		$("#checkoutDay").val(b);
		AvailabilityChecker.reinitializeDateCombo("checkoutYear", "checkoutMonth", "checkoutDay")
	},
	initCheckinDateCombo : function () {
		var c = getMinDate();
		var e = c.getMonth() + 1;
		var d = c.getFullYear();
		var b = c.getDate();
		if (b > AvailabilityChecker.getDaysInMonth(e, d)) {
			b = 1;
			e = e + 1;
			if (e > 12) {
				d = d + 1;
				e = 1
			}
		}
		var a = AvailabilityChecker.getDaysInMonth(e, d);
		$("#checkinDay")[0].options.length = a;
		$("#checkinMonth").val(e);
		$("#checkinDay").val(b);
		$("#checkinYear").val(d)
	},
	initCheckoutDateCombo : function () {
		var c = getMinDate();
		var e = c.getMonth() + 1;
		var d = c.getFullYear();
		var b = c.getDate() + 1;
		var a = AvailabilityChecker.getDaysInMonth(e, d);
		if (b > a) {
			b = b - a;
			e = e + 1;
			if (e > 12) {
				d = d + 1;
				e = 1
			}
		}
		var a = AvailabilityChecker.getDaysInMonth(e, d);
		$("#checkoutDay")[0].options.length = a;
		$("#checkoutMonth").val(e);
		$("#checkoutDay").val(b);
		$("#checkoutYear").val(d)
	},
	initFlexibleTravelDates : function () {
		$(".flexible-search input.flex-date").datepick({
			autoWidth : true,
			rangeSelect : true,
			monthsToShow : 2,
			showTrigger : ".flexible-search span.flex-trig",
			minDate : 0,
			changeMonth : false,
			onDate : DailyRates.getDailyRate,
			onChangeMonthYear : DailyRates.setDailyRate,
			onSelect : DailyRates.updateOtherDates,
			renderer : $.datepick.myAvailCalRenderer,
			onShow : $.datepick.hoverCallback(DailyRates.showHover),
			closeText : $("#close_window").html()
		});
		$("span.ratedDate").not(".ui-datepicker-other-month").addClass("ui-state-unavailable")
	},
	initCheckinDatePicker : function () {
		AvailabilityChecker.setCheckinDatepicker();
		var b = $("#checkinYear").get(0);
		var a = getMinDate();
		$("#h_checkinDate").datepicker({
			dateFormat : "mm/dd/yy",
			showOn : "button",
			buttonText : "Calendar",
			buttonImageOnly : true,
			buttonImage : "/assets/webhotel/calendar-icon.png",
			minDate : a,
			selectOtherMonths : false,
			showButtonPanel : true,
			showOtherMonths : true,
			numberOfMonths : window.getNoOfMonthDispCalDatePicker(),
			onSelect : AvailabilityChecker.setCheckinDate
		})
	},
	updCheckinDatePicker : function () {
		var a = getMinDate();
		$("#h_checkinDate").datepicker("option", "minDate", a)
	},
	initCheckoutDatePicker : function () {
		AvailabilityChecker.setCheckoutDatepicker();
		var b = $("#checkoutYear").get(0);
		var a = getMinDate();
		a.setDate(a.getDate() + 1);
		$("#h_checkoutDate").datepicker({
			dateFormat : "mm/dd/yy",
			showOn : "button",
			buttonText : "Calendar",
			buttonImageOnly : true,
			buttonImage : "/assets/webhotel/calendar-icon.png",
			minDate : a,
			selectOtherMonths : false,
			showButtonPanel : true,
			showOtherMonths : true,
			numberOfMonths : window.getNoOfMonthDispCalDatePicker(),
			onSelect : AvailabilityChecker.setCheckoutDate
		})
	},
	updCheckoutDatePicker : function () {
		var a = getMinDate();
		a.setDate(a.getDate() + 1);
		$("#h_checkoutDate").datepicker("option", "minDate", a)
	},
	setCheckinDatepicker : function () {
		$("#h_checkinDate").val($("#checkinMonth").val() + "/" + $("#checkinDay").val() + "/" + $("#checkinYear").val())
	},
	setCheckoutDatepicker : function () {
		if ($("#displayCheckoutDate").val() == "on") {
			$("#h_checkoutDate").val($("#checkoutMonth").val() + "/" + $("#checkoutDay").val() + "/" + $("#checkoutYear").val())
		}
	},
	setCheckinDate : function (g, f) {
		var e = g.split("/");
		var b = AvailabilityChecker.getDaysInMonth(parseInt(e[0], 10), e[2]);
		var a = parseInt(e[1], 10);
		var d = $("#checkinDay")[0].options.length;
		$("#checkinDay")[0].options.length = b;
		for (var c = d; c < b; c++) {
			$("#checkinDay")[0].options[c] = new Option(c + 1, c + 1)
		}
		if (a > b) {
			a = b
		}
		$("#checkinDay option[value=" + a + "]").attr("disabled", false);
		$("#checkinMonth option[value=" + parseInt(e[0], 10) + "]").attr("disabled", false);
		$("#checkinDay").val(a);
		$("#checkinMonth").val(parseInt(e[0], 10));
		$("#checkinYear").val(e[2]);
		$("#h_checkinDate").val(g);
		if ($("#displayCheckoutDate").val() == "on") {
			AvailabilityChecker.updateCheckoutDate(1)
		}
		AvailabilityChecker.reinitializeDateCombo("checkinYear", "checkinMonth", "checkinDay")
	},
	setCheckinDateEx : function (g, f) {
		var e = g.split("/");
		var b = AvailabilityChecker.getDaysInMonth(parseInt(e[0], 10), e[2]);
		var a = parseInt(e[1], 10);
		var d = $("#checkinDay")[0].options.length;
		$("#checkinDay")[0].options.length = b;
		for (var c = d; c < b; c++) {
			$("#checkinDay")[0].options[c] = new Option(c + 1, c + 1)
		}
		if (a > b) {
			a = b
		}
		$("#checkinDay").val(a);
		$("#checkinMonth").val(parseInt(e[0], 10));
		$("#checkinYear").val(e[2]);
		$("#h_checkinDate").val(g);
		AvailabilityChecker.reinitializeDateCombo("checkinYear", "checkinMonth", "checkinDay")
	},
	setCheckoutDate : function (h, g) {
		if ($("#displayCheckoutDate").val() == "on") {
			var f = h.split("/");
			var b = AvailabilityChecker.getDaysInMonth(parseInt(f[0], 10), f[2]);
			var a = parseInt(f[1], 10);
			var e = $("#checkoutDay")[0].options.length;
			$("#checkoutDay")[0].options.length = b;
			for (var c = e; c < b; c++) {
				$("#checkoutDay")[0].options[c] = new Option(c + 1, c + 1)
			}
			if (a > b) {
				a = b
			}
			var d = new Date(parseInt(f[2], 10), parseInt(f[0], 10) - 1, parseInt(a, 10), 0, 0, 0);
			if (AvailabilityChecker.getCheckinDate().getTime() < d.getTime()) {
				$("#checkoutDay").val(a);
				$("#checkoutMonth").val(parseInt(f[0], 10));
				$("#checkoutYear").val(f[2]);
				$("#h_checkoutDate").val(h);
				if ($("#displayNumNights").val() == "on") {
					AvailabilityChecker.adjustNumberOfNights()
				}
			} else {
				AvailabilityChecker.setCheckoutDatepicker()
			}
			AvailabilityChecker.reinitializeDateCombo("checkoutYear", "checkoutMonth", "checkoutDay")
		}
	},
	updateCheckoutDate : function (a) {
		AvailabilityChecker.updateDATES(a);
		AvailabilityChecker.setCheckoutDatepicker();
		if ($("#checkoutDay").length != 0) {
			AvailabilityChecker.reinitializeDateCombo("checkoutYear", "checkoutMonth", "checkoutDay");
			AvailabilityChecker.validateCheckoutDay()
		}
		AvailabilityChecker.reinitializeDateCombo("checkinYear", "checkinMonth", "checkinDay")
	},
	reinitializeDateCombo : function (m, o, j) {
		var i = $("#" + m);
		var g = $("#" + o);
		var d = $("#" + j);
		if (i && g && d && i.length > 0 && g.length > 0 && d.length > 0) {
			var e = getMinDate();
			if (j == "checkoutDay") {
				e.setDate(e.getDate() + 1)
			}
			var k = e.getFullYear();
			var n = Number(i.val());
			var h = e.getMonth() + 1;
			var f = Number(g.val());
			var l = e.getDate();
			var b = Number(d.val());
			g.children("option").attr("disabled", true);
			d.children("option").attr("disabled", true);
			if (n > k) {
				g.children("option").attr("disabled", false);
				d.children("option").attr("disabled", false)
			} else {
				if (n == k) {
					g.children("option").each(function (q) {
						var p = $(this);
						if (Number(p.val()) >= h) {
							p.attr("disabled", false)
						}
					});
					if (f > h) {
						d.children("option").attr("disabled", false)
					} else {
						d.children("option").each(function (q) {
							var p = $(this);
							if (Number(p.val()) >= l) {
								p.attr("disabled", false)
							}
						});
						var a = d.find(":selected").val();
						if (a && a != "") {
							a = Number(a);
							if (a < l) {
								d.val(l)
							}
						}
					}
					var c = g.find(":selected").val();
					if (c && c != "") {
						c = Number(g.find(":selected").val());
						if (c < h) {
							g.val(h)
						}
					}
				}
			}
			if (i.dataNvl("uiCombobox", "combobox", "ui-combobox") && g.dataNvl("uiCombobox", "combobox", "ui-combobox") && d.dataNvl("uiCombobox", "combobox", "ui-combobox") && i.combobox("isVisible") && g.combobox("isVisible") && d.combobox("isVisible")) {
				i.combobox("refresh");
				g.combobox("refresh");
				d.combobox("refresh")
			}
		}
	},
	adjustNumberOfNights : function () {
		AvailabilityChecker.updateDATES(-1);
		AvailabilityChecker.validateCheckoutDay()
	},
	updateDATES : function (i) {
		var e = parseInt($("#checkinYear").val(), 10);
		var g = parseInt($("#checkinMonth").val(), 10);
		var j = parseInt($("#checkinDay").val(), 10);
		var l = new Date(e, g - 1, j, 3, 0, 0);
		var f = parseInt($("#checkoutYear").val(), 10);
		var a = parseInt($("#checkoutMonth").val(), 10);
		var c = parseInt($("#checkoutDay").val(), 10);
		var b = new Date(f, a - 1, c, 4, 0, 0);
		var h = $("#displayNumNights").val();
		if (i != -1) {
			b = l.addDays(i);
			f = b.getFullYear();
			a = b.getMonth() + 1;
			c = b.getDate();
			AvailabilityChecker.updateDateCombos(f, a, c, "checkoutYear", "checkoutMonth", "checkoutDay");
			if (h == "on") {
				if (i != document.getElementById("numberOfNights").selectedIndex) {
					$("#numberOfNights").val(i)
				}
			}
		} else {
			if (h == "on") {
				var d = AvailabilityChecker.DateDiff(l, b);
				var k = 1;
				if (d > 0) {
					k = d
				} else {
					k = document.getElementById("numberOfNights").options[document.getElementById("numberOfNights").selectedIndex].value
				}
				if (document.getElementById("numberOfNights") != null && k <= 20) {
					$("#numberOfNights").val(k)
				}
			}
		}
		DailyRates.setFlexibleDates()
	},
	addDays : function (a, b) {
		return new Date(a.getTime() + b * 24 * 60 * 60 * 1000)
	},
	DateDiff : function (g, b) {
		var f = 0;
		var d = "Check the Start Date and End Date\n";
		d += "must be a valid date format.\n\n";
		d += "Please try again.";
		var a = Date.parse(g);
		var c = Date.parse(b);
		if (isNaN(a) || isNaN(c)) {
			return null
		}
		var e = c - a;
		f = parseInt(e / 86400000);
		return f
	},
	updateDateCombos : function (h, d, a, c, g, i) {
		var f = $("#" + c);
		var e = $("#" + g);
		var b = $("#" + i);
		f.val(h);
		e.val(d);
		b.val(a);
		return true
	},
	getDaysInMonth : function (b, c) {
		var a = 31;
		if (b == 2) {
			if (AvailabilityChecker.isLeapYear(c)) {
				a = 29
			} else {
				a = 28
			}
		}
		if (b == 4 || b == 6 || b == 9 || b == 11) {
			a = 30
		}
		return a
	},
	isLeapYear : function (a) {
		var b = parseInt(a, 10);
		return ((b % 400) == 0 || ((b % 100 != 0) && (b % 4) == 0))
	},
	localizeCheckinCheckoutMonth : function (f) {
		var d = $.datepick.regional["" + f] ? $.datepick.regional["" + f] : $.datepick.regional[""];
		var a = d.monthNamesShort;
		var c = $("select[name=checkinMonth]");
		var e = $("select[name=checkoutMonth]");
		for (var b = 0; b < a.length; b++) {
			if (c.length > 0) {
				c[0].options[b].text = a[b]
			}
			if (e.length > 0) {
				e[0].options[b].text = a[b]
			}
		}
	},
	localizePointsStartPointsEndMonth : function (f) {
		var d = $.datepick.regional["" + f] ? $.datepick.regional["" + f] : $.datepick.regional[""];
		var b = d.monthNamesShort;
		var e = $("#pointsStartMonth");
		var a = $("#pointsEndMonth");
		for (var c = 0; c < b.length; c++) {
			if (e.length > 0) {
				e[0].options[c].text = b[c]
			}
			if (a.length > 0) {
				a[0].options[c].text = b[c]
			}
		}
	},
	initializeDialogues : function () {
		$("#roomPolicyDialog").dialog({
			autoOpen : false,
			draggable : false,
			resizable : false
		});
		$("#rateTypeDialog").dialog({
			autoOpen : false,
			draggable : false,
			resizable : false
		});
		$("#promoCodeDialog").dialog({
			autoOpen : false,
			draggable : false,
			resizable : false
		});
		$("#groupCodeDialog").dialog({
			autoOpen : false,
			draggable : false,
			resizable : false
		});
		$("#corpIdDialog").dialog({
			autoOpen : false,
			draggable : false,
			resizable : false
		});
		$("#IATADialog").dialog({
			autoOpen : false,
			draggable : false,
			resizable : false
		});
		$("#roomPolicyImg").bind("click", function () {
			$("[id$=Dialog]:visible").dialog("close");
			var a = getHelpDialogPosition($(this));
			$("#roomPolicyDialog").dialog({
				position : a
			});
			$("#roomPolicyDialog").dialog("open")
		});
		$("#rateTypeImg").bind("click", function () {
			$("[id$=Dialog]:visible").dialog("close");
			var a = getHelpDialogPosition($(this));
			$("#rateTypeDialog").dialog({
				position : a
			});
			$("#rateTypeDialog").dialog("open")
		});
		$("#promoCodeImg").bind("click", function () {
			$("[id$=Dialog]:visible").dialog("close");
			var a = getHelpDialogPosition($(this));
			$("#promoCodeDialog").dialog({
				position : a
			});
			$("#promoCodeDialog").dialog("open")
		});
		$("#groupCodeImg").bind("click", function () {
			$("[id$=Dialog]:visible").dialog("close");
			var a = getHelpDialogPosition($(this));
			$("#groupCodeDialog").dialog({
				position : a
			});
			$("#groupCodeDialog").dialog("open")
		});
		$("#corpIdImg").bind("click", function () {
			$("[id$=Dialog]:visible").dialog("close");
			var a = getHelpDialogPosition($(this));
			$("#corpIdDialog").dialog({
				position : a
			});
			$("#corpIdDialog").dialog("open")
		});
		$("#IATAImg").bind("click", function () {
			$("[id$=Dialog]:visible").dialog("close");
			var a = getHelpDialogPosition($(this));
			$("#IATADialog").dialog({
				position : a
			});
			$("#IATADialog").dialog("open")
		});
		$("[id*=srchRoomTypeImg]").bind("click", function () {
			$("[id$=Dialog]:visible").dialog("close");
			var a = getHelpDialogPosition($(this));
			$("#roomTypeDialog").dialog({
				position : a
			});
			$("#roomTypeDialog").dialog("open")
		});
		$("[id*=srchRoomClassImg]").bind("click", function () {
			$("[id$=Dialog]:visible").dialog("close");
			var a = getHelpDialogPosition($(this));
			$("#roomClassDialog").dialog({
				position : a
			});
			$("#roomClassDialog").dialog("open")
		});
		$("[id*=srchAmenityImg]").bind("click", function () {
			$("[id$=Dialog]:visible").dialog("close");
			var a = getHelpDialogPosition($(this));
			$("#amenityDialog").dialog({
				position : a
			});
			$("#amenityDialog").dialog("open")
		})
	}
};
window.getNoOfMonthDispCalDatePicker = function () {
	return 2
};
var _userClickedSelection = false;
var _firstRoomType = null;
var _selectedRoomType = "";
var DailyRates = {};
(function () {
	var A = "/bp/get_availability_calendar_data.cmd",
	a = 0;
	var h = "/bp/search_rooms.cmd";
	var x = {};
	var s = {};
	var p = null;
	var C = ".datepick-popup";
	var n = "";
	var u = "";
	var w = "";
	var t = "";
	var H = false;
	var f = "60px";
	var d = "40px";
	var b = "";
	var z = false;
	var m = false;
	var c = false;
	if ($("#csstpl").length != 0) {
		$.ajaxSetup({
			cache : true
		})
	}
	var y = function (M, N) {
		if (!validateSingleCheckinCheckoutDateCtrls()) {
			$(C).hide();
			return false
		}
		$(C).block({
			message : "<span class='waitingMsg'>Loading ...</span>"
		});
		var K = N + "/" + M,
		L = x[K],
		J = new Date().getTime();
		if (L == null || L.timeout < J) {
			var I = $("#SearchForm").serialize();
			I += "&reqMonth=" + N;
			I += "&reqYear=" + M;
			I += "&events=true";
			I += "&rates=true";
			I += "&months=false";
			$.ajax({
				url : A,
				async : true,
				dataType : "text",
				cache : false,
				data : I,
				success : function (O) {
					r(M, N, O)
				},
				error : function (Q, O, P) {
					if (console) {
						console.log(O)
					}
				}
			})
		}
	};
	var q = function (ad, N, ae, P, I) {
		var Z = null;
		if (ae && ae.rates && !m) {
			if (I) {
				Z = ae.rates[ad.getDate()][I]
			} else {
				Z = ae.rates[ad.getDate()]
			}
			Z = typeof(Z) === "undefined" ? null : Z
		}
		var K = null;
		if (P && P.events) {
			K = P.events[ad.getDate()];
			K = typeof(K) === "undefined" ? null : K
		}
		var M = (ae) ? ae.showPrice : false;
		var ac = ad.getDate();
		var S = true;
		var V = (P) ? P.hasEvents : false;
		var af = false;
		var R = "ratedDate";
		var aa = (P) ? P.effect : ((ae) ? ae.effect : "");
		var L = "";
		var ab = "";
		var Y = "";
		var U = "";
		if (Z == null && K == null) {
			return {
				content : ac,
				dateClass : R,
				effectClass : aa,
				eventContent : ab,
				eventClass : L,
				hasEvents : V,
				resContent : U,
				resClass : Y,
				hasRestrictions : af
			}
		}
		if (Z == null && K != null) {
			S = false
		}
		if (Z) {
			if (M) {
				ac = ((C == "#dateslider-calendar") ? "" : ad.getDate() + "<br/>") + ((Z && Z[0]) ? '<div class="day-price">' + ((C == "#dateslider-calendar" && !I) ? "" : Z[0]) + "</div>" : "--")
			} else {
				ac = ((C == "#dateslider-calendar") ? "" : ad.getDate() + "<br/>")
			}
		}
		var J = $.datepick.options($(C), "monthsToShow");
		if (I) {
			var Q = "#dateslider-search-" + I;
			J = $.datepick.options($(Q), "monthsToShow")
		}
		if (N | J == 1) {
			if (Z && Z.length >= 2) {
				S = false;
				var O = Z[0];
				var W = Z[1];
				if (O == "") {
					R += (" ui-state-unavailable " + W);
					if (W == "SOLD-OUT") {}

				}
				if (W == "restrictions") {
					if (Z.length >= 3) {
						af = true;
						Y += " ui-state-restrictions";
						if (C == "#dateslider-calendar") {}

						U += '<div id="rct' + ad.getFullYear() + (ad.getMonth() + 1) + ad.getDate() + '" class="day-restrictions">';
						U += "  <ul>";
						var T = Z[2];
						if (T.MINIMUM_LENGTH_OF_STAY) {
							U += '    <li><p class="desc">' + ((typeof(minimumLengthOfStayLbl) !== "undefined") ? minimumLengthOfStayLbl : "Minimum Length Of Stay") + " " + T.MINIMUM_LENGTH_OF_STAY + " " + ((typeof(numberOfDaysLbl) !== "undefined") ? numberOfDaysLbl : "Days") + "</p></li>"
						}
						if (T.MAXIMUM_LENGTH_OF_STAY) {
							U += '    <li><p class="desc">' + ((typeof(maximumLengthOfStayLbl) !== "undefined") ? maximumLengthOfStayLbl : "Maximum Length Of Stay") + " " + T.MAXIMUM_LENGTH_OF_STAY + " " + ((typeof(numberOfDaysLbl) !== "undefined") ? numberOfDaysLbl : "Days") + "</p></li>"
						}
						if (T.MINIMUM_ADVANCE_BOOKING) {
							U += '    <li><p class="desc">' + ((typeof(minimumAdvanceBookingLbl) !== "undefined") ? minimumAdvanceBookingLbl : "Minimum Days In Advance") + " " + T.MINIMUM_ADVANCE_BOOKING + " " + ((typeof(numberOfDaysLbl) !== "undefined") ? numberOfDaysLbl : "Days") + "</p></li>"
						}
						if (T.MAXIMUM_ADVANCE_BOOKING) {
							U += '    <li><p class="desc">' + ((typeof(maximumAdvanceBookingLbl) !== "undefined") ? maximumAdvanceBookingLbl : "Maximum Days In Advance") + " " + T.MAXIMUM_ADVANCE_BOOKING + " " + ((typeof(numberOfDaysLbl) !== "undefined") ? numberOfDaysLbl : "Days") + "</p></li>"
						}
						if (T.MINIMUM_STAY_THROUGH) {
							U += '    <li><p class="desc">' + ((typeof(minimumStayThroughLbl) !== "undefined") ? minimumStayThroughLbl : "Minimum Stay Through") + " " + T.MINIMUM_STAY_THROUGH + " " + ((typeof(numberOfDaysLbl) !== "undefined") ? numberOfDaysLbl : "Days") + "</p></li>"
						}
						if (T.MAXIMUM_STAY_THROUGH) {
							U += '    <li><p class="desc">' + ((typeof(maximumStayThroughLbl) !== "undefined") ? maximumStayThroughLbl : "Maximum Stay Through") + " " + T.MAXIMUM_STAY_THROUGH + " " + ((typeof(numberOfDaysLbl) !== "undefined") ? numberOfDaysLbl : "Days") + "</p></li>"
						}
						if (T.CLOSED_FOR_ARRIVAL) {
							U += '    <li><p class="desc">' + ((typeof(closedForArrivalLbl) !== "undefined") ? closedForArrivalLbl : "Closed For Arrival") + "</p></li>"
						}
						if (T.CLOSED_FOR_DEPARTURE) {
							U += '    <li><p class="desc">' + ((typeof(closedForDepartureLbl) !== "undefined") ? closedForDepartureLbl : "Closed For Departure") + "</p></li>"
						}
						U += "  </ul>";
						U += "</div>"
					}
				}
			}
			if (K && K.length > 0) {
				L = "has-event-day";
				if (C == "#dateslider-calendar") {}

				ab += '<div id="ct' + ad.getFullYear() + (ad.getMonth() + 1) + ad.getDate() + '" class="day-events">';
				ab += "  <ul>";
				for (var X = 0; X < K.length; X = X + 3) {
					ab += '    <li><h3 class="title">' + K[X] + "</h3>";
					ab += '<p class="desc">';
					if (K[X + 2] != "") {
						ab += '<img class="img" src="' + K[X + 2] + '" alt="' + K[X] + '" />'
					}
					ab += K[X + 1] + '</p><div style="clear:both;"></div></li>'
				}
				ab += "  </ul>";
				ab += "</div>"
			}
		} else {
			ac = ((C == "#dateslider-calendar") ? "" : ad.getDate() + "<br/>");
			S = false
		}
		if (S) {
			R += " ui-state-unavailable"
		}
		return {
			content : ac,
			dateClass : R,
			effectClass : aa,
			eventContent : ab,
			eventClass : L,
			hasEvents : V,
			resContent : U,
			resClass : Y,
			hasRestrictions : af
		}
	};
	var i = function (M, L, I) {
		if (!$(".ui-datepicker-calendar").find(".ui-dateslider-loader").length) {
			$(".ui-datepicker-calendar").width() / 2;
			var N = $('<div class="ui-loader ui-dateslider-loader" />').append($("#ui-loader-img-cont label").clone()).append($("#ui-loader-img").clone());
			N.css("top", "-20px").css("height", "auto").css("margin", "0");
			N.prependTo(".ui-datepicker-calendar")
		}
		var O = L + "/" + M,
		Q = s[O],
		J = new Date().getTime();
		if (Q == null || Q.timeout < J) {
			var P = $("#SearchForm").serialize();
			P += "&reqMonth=" + L;
			P += "&reqYear=" + M;
			P += "&events=true";
			try {
				$.ajax({
					url : A,
					async : true,
					dataType : "text",
					cache : false,
					data : P,
					success : function (R) {
						r(M, L, R);
						$(C).find(".ui-dateslider-loader").remove()
					},
					error : function (T, R, S) {
						$(C).find(".ui-dateslider-loader").remove();
						if (console) {
							console.log(R);
							console.log(S)
						}
					}
				})
			} catch (K) {
				$(C).find(".ui-dateslider-loader").remove()
			}
		}
	};
	var F = function (N, P, L) {
		$.showPageLoadingMsg();
		var K = P + "/" + N,
		M = s[K],
		J = new Date().getTime();
		if (M == null || M.timeout < J) {
			var I = $("#SearchForm").serialize();
			I += "&reqMonth=" + P;
			I += "&reqYear=" + N;
			I += "&events=true";
			I += "&rates=true";
			I += "&months=false";
			try {
				$.ajax({
					url : A,
					async : true,
					dataType : "text",
					cache : false,
					data : I,
					success : function (Q) {
						r(N, P, Q);
						$.hidePageLoadingMsg()
					},
					error : function (S, Q, R) {
						$.hidePageLoadingMsg();
						if (console) {
							console.log(Q)
						}
					}
				})
			} catch (O) {
				$(C).find(".ui-dateslider-loader").remove()
			}
		}
	};
	var l = function (I, J) {
		if (!$(".ui-datepicker .ui-datepicker-row-break").eq(0).find(".ui-dateslider-loader").length) {
			$('<div class="ui-loader ui-dateslider-loader" />').append($("#ui-loader-img-cont label").clone()).append($("#ui-loader-img").clone()).appendTo($(".ui-datepicker .ui-datepicker-row-break").eq(0))
		}
		var M = I.getMonth() + 1;
		var N = I.getFullYear();
		var O = M + "/" + N,
		Q = s[O],
		K = new Date().getTime();
		if (Q == null || Q.timeout < K) {
			var P = $("#SearchForm").serialize();
			P += "&reqMonth=" + M;
			P += "&reqYear=" + N;
			P += "&events=true";
			P += "&rates=true";
			P += "&span=true";
			P += "&spanDay=" + I.getDate();
			P += "&spanMonth=" + M;
			P += "&spanYear=" + N;
			P += "&spanDays=" + $(".ratedDate").length;
			try {
				$.ajax({
					url : A,
					async : true,
					dataType : "text",
					cache : false,
					data : P,
					success : function (R) {
						r(N, M, R);
						if (z == false) {
							g()
						}
						$(C).find(".ui-dateslider-loader").remove()
					},
					error : function (T, R, S) {
						$(C).find(".ui-dateslider-loader").remove();
						if (console) {
							console.log(R)
						}
					}
				})
			} catch (L) {
				$(C).find(".ui-dateslider-loader").remove()
			}
		}
	};
	var D = function () {
		if (!$(".ui-datepicker .ui-datepicker-row-break").eq(0).find(".ui-dateslider-loader").length) {
			$('<div class="ui-loader ui-dateslider-loader" />').append($("#ui-loader-img-cont label").clone()).append($("#ui-loader-img").clone()).appendTo($(".ui-datepicker .ui-datepicker-row-break").eq(0))
		}
		var I = $("#SearchForm").serialize();
		I += "&list=true";
		$("#search-results-wrapper").html("");
		z = true;
		try {
			$.ajax({
				url : h + " #search-results-wrapper",
				type : "POST",
				async : true,
				dataType : "text",
				cache : true,
				data : I,
				success : function (O) {
					$("#search-results-wrapper").html("");
					var K = /<head\b[^<]*(?:(?!<\/head>)<[^<]*)*<\/head>/gi;
					var L = O.replace(K, "");
					var N = L.match(/<!-- listresults -->[^<]*(?:(?!<!-- listresults -->)<[^<]*)*<!-- listresults -->/gi);
					if (N && N.length > 0) {
						for (var M = 0; M < N.length; M++) {
							$("#search-results-wrapper").append(N[M])
						}
					} else {
						$("#search-results-wrapper").html($("<div>").append(O.replace(K, "")).find("#search-results-wrapper"))
					}
					initSearchList();
					$.initSearchListResultsJS();
					if ($("#search-results-wrapper").find("#no-results-messaging").length) {
						$("#no-results-messaging .message").hide();
						$(".view-options").hide();
						$(".mass-currency").hide()
					} else {
						$(".view-options").show();
						$(".mass-currency").show();
						g()
					}
					if ($("#csstpl").length) {
						$(".search-results-rooms").width("auto");
						$("#options-pagination").width("auto")
					}
					$(C).find(".ui-dateslider-loader").remove();
					z = false;
					window.setTimeout(function () {
						try {
							$.redoTemplateLayout()
						} catch (P) {}

					}, 200)
				},
				error : function (M, K, L) {
					$(C).find(".ui-dateslider-loader").remove();
					z = false;
					$("#search-results-wrapper").html("")
				}
			})
		} catch (J) {
			$(C).find(".ui-dateslider-loader").remove();
			z = false
		}
	};
	var g = function () {
		var I = parseInt($("span.average_room_rate span.converted_currency_amount").eq(0).html());
		var K = $("span.average_room_rate span.converted_currency_amount").eq(0);
		$("span.average_room_rate span.converted_currency_amount").each(function () {
			var L = parseInt($(this).html().trim());
			if (L < I) {
				I = L;
				K = $(this)
			}
		});
		if ($("#room-sort").val() == "SortByPriceDescending") {
			I = parseInt($("span.average_room_rate span.converted_currency_amount").eq(0).html());
			K = $("span.average_room_rate span.converted_currency_amount").eq(0);
			$("span.average_room_rate span.converted_currency_amount").each(function () {
				var L = parseInt($(this).html().trim());
				if (L > I) {
					I = L;
					K = $(this)
				}
			})
		}
		var J = "";
		if (roomMode) {
			J += '<div id="dailyRate" class="day-rate-short">';
			J += K.closest("h3").find("a").eq(0).clone().find("span").remove().end().text().trim();
			J += "</div>"
		} else {
			J += '<div id="dailyRate" class="day-rate-short">';
			J += K.closest("section").parent().find(".room-type-hed>span").text().trim();
			J += "</div>"
		}
		if (!$(C).find("#dailyRate").length) {
			$(C).append(J)
		}
		$(".ratedDate").each(function () {
			var M = $(this);
			if (M.hasClass("ui-state-active")) {
				M.find(".day-price").html(K.html())
			} else {
				var N = M.find(".day-price");
				var L = N.parent();
				N.html("");
				L.html("");
				L.html(N)
			}
		});
		$(".ratedDate.ui-state-active :last .day-price").hide();
		$(C).delegate("div.day-price:not([rel])", "mouseenter", function (L) {
			var M = "#" + $(C).find(".day-rate-short").attr("id");
			$(this).attr("rel", M);
			$(this).cluetip("destroy");
			$(this).cluetip({
				multiple : false,
				activation : "hover",
				cluezIndex : 8000,
				local : true,
				positionBy : "bottomTop",
				width : "auto",
				sticky : false,
				showTitle : false,
				arrows : true,
				cursor : "pointer",
				hoverIntent : null,
				onShow : function (O, N) {
					N.find(".day-rate-short").css("display", "block")
				},
				cluetipClass : "rounded"
			}).trigger("mouseenter");
			$(".cluetip-arrows").removeClass("ui-state-default");
			L.preventDefault()
		})
	};
	var r = function (O, N, K) {
		var L = false;
		if (K != null) {
			K = $.parseJSON(K)
		}
		var S = (K) ? K.effect : "";
		if (!K || !K.rateData) {
			var P = N + "/" + O;
			if (!P in x) {
				x[P] = {
					timeout : (new Date()).getTime() + a * 1000,
					rates : {},
					showPrice : false,
					effect : S
				}
			}
			L = true;
			if (C == ".datepick-popup") {
				$.datepick.replaceWithError()
			}
		} else {
			var I = K.showPrice;
			var R = (K) ? K.hasEvents : false;
			var Q = (K) ? K.hasRestrictions : false;
			for (var M in K.rateData) {
				var J = {
					timeout : (new Date()).getTime() + a * 1000,
					rates : K.rateData[M].rateStructure,
					showPrice : I,
					effect : S
				};
				var P = K.rateData[M].responseMonth + "/" + K.rateData[M].responseYear;
				if ($.isEmptyObject(x)) {
					x[P] = J
				} else {
					if (!(P in x)) {
						x[P] = J
					} else {
						for (rt in J.rates) {
							if (!(rt in x[P].rates)) {
								x[P].rates[rt] = J.rates[rt]
							}
						}
					}
				}
			}
			if (C == ".datepick-popup") {
				$.datepick.addColorLegendAndRateText($(".flexible-search input.flex-date"), (K.bShowColorLegend == "true") ? true : false, K.currencyCode, {
					showEventLegend : (K) ? K.hasEvents : false,
					showRestrictionLegend : (K) ? K.hasRestrictions : false,
					showPrice : K.showPrice
				})
			}
			if (C == "#inline-calendar") {
				$.datepick.addColorLegendWithEvents($("#inline-calendar"), K.bShowColorLegend == "true", K.currencyCode, {
					showEventLegend : (K) ? K.hasEvents : false,
					showRestrictionLegend : (K) ? K.hasRestrictions : false,
					showPrice : K.showPrice
				})
			}
		}
		if (!K) {
			var R = (K) ? K.hasEvents : false;
			var P = N + "/" + O;
			s[P] = {
				timeout : (new Date()).getTime() + a * 1000,
				events : {},
				hasEvents : R,
				effect : S
			};
			L = true;
			if (C == ".datepick-popup") {
				$.datepick.replaceWithError()
			} else {
				if (C == "#inline-calendar") {
					$.datepick._update($("#inline-calendar"))
				}
				if (C == "#dateslider-calendar") {
					$.datepick._update("#dateslider-calendar")
				}
			}
		} else {
			for (var M in K.eventData) {
				var R = K.hasEvents;
				var J = {
					timeout : (new Date()).getTime() + a * 1000,
					events : K.eventData[M].eventStructure,
					hasEvents : R,
					effect : S,
					showPrice : K.showPrice
				};
				var P = K.eventData[M].responseMonth + "/" + K.eventData[M].responseYear;
				s[P] = J
			}
			if (C == ".datepick-popup") {
				$.datepick._update($(".flexible-search input.flex-date"));
				$(C).delegate("a.has-event-day:not([rel])", "mouseenter", function (T) {
					var U = "#" + $(this).parent().find(".day-events").attr("id");
					$(this).attr("rel", U);
					$(this).cluetip("destroy");
					$(this).cluetip({
						multiple : false,
						activation : "hover",
						cluezIndex : 8000,
						local : true,
						positionBy : "bottomTop",
						width : "auto",
						sticky : true,
						showTitle : false,
						arrows : true,
						cursor : "pointer",
						hoverIntent : null,
						mouseOutClose : true,
						closePosition : "title",
						closeText : '<span class="ui-icon ui-icon-closethick">close</span>',
						onShow : function (W, V) {
							V.parent().find(".day-events").css("display", "block")
						},
						cluetipClass : "rounded"
					}).trigger("mouseenter");
					$(".cluetip-arrows").removeClass("ui-state-default");
					T.preventDefault()
				})
			} else {
				if (C == "#inline-calendar" || C == "#dateslider-calendar") {
					$.datepick.options($(C), "onDate", DailyRates.getDailyRate);
					$.datepick._update($(C));
					if (C == "#inline-calendar") {
						m = false
					}
					$(C).delegate("a.has-event-day:not([rel])", "mouseenter", function (T) {
						var U = "#" + $(this).parent().find(".day-events").attr("id");
						$(this).attr("rel", U);
						$(this).cluetip("destroy");
						$(this).cluetip({
							multiple : false,
							activation : "hover",
							cluezIndex : 8000,
							local : true,
							positionBy : "bottomTop",
							width : "auto",
							sticky : true,
							showTitle : false,
							arrows : true,
							cursor : "pointer",
							hoverIntent : null,
							mouseOutClose : true,
							closePosition : "title",
							closeText : '<span class="ui-icon ui-icon-closethick">close</span>',
							onShow : function (W, V) {
								V.parent().find(".day-events").css("display", "block")
							},
							cluetipClass : "rounded"
						}).trigger("mouseenter");
						$(".cluetip-arrows").removeClass("ui-state-default");
						T.preventDefault()
					})
				}
			}
		}
		if (C == "#dateslider-calendar") {
			B()
		}
		if (K && K.rateData) {
			if (C == "#dateslider-calendar") {
				$(C).delegate("a.ui-state-restrictions:not([rel])", "mouseenter", function (T) {
					var U = "#" + $(this).find(".day-restrictions").attr("id");
					$(this).attr("rel", U);
					$(this).cluetip("destroy");
					$(this).cluetip({
						multiple : false,
						activation : "hover",
						cluezIndex : 8000,
						local : true,
						positionBy : "bottomTop",
						width : "auto",
						sticky : false,
						showTitle : false,
						arrows : true,
						cursor : "pointer",
						hoverIntent : null,
						onShow : function (W, V) {
							V.find(".day-restrictions").css("display", "block")
						},
						cluetipClass : "rounded"
					}).trigger("mouseenter");
					$(".cluetip-arrows").removeClass("ui-state-default");
					T.preventDefault()
				})
			} else {
				$(C).delegate("a.ui-state-restrictions:not([rel])", "mouseenter", function (U) {
					if (!H) {
						var T = $(this);
						var V = "#" + T.find(".day-restrictions").attr("id");
						T.attr("rel", V);
						T.cluetip("destroy");
						T.cluetip({
							multiple : false,
							activation : "hover",
							cluezIndex : 8000,
							local : true,
							positionBy : "bottomTop",
							width : "auto",
							sticky : false,
							showTitle : false,
							arrows : true,
							cursor : "pointer",
							hoverIntent : null,
							onShow : function (X, W) {
								W.find(".day-restrictions").css("display", "block")
							},
							cluetipClass : "rounded"
						}).trigger("mouseenter").show();
						$(".cluetip-arrows").removeClass("ui-state-default");
						U.preventDefault()
					}
				})
			}
		}
		$("span.ratedDate").not(".ui-datepicker-other-month").addClass("ui-state-unavailable");
		window.setTimeout(function () {
			try {
				if ($("#csstpl").length != 0) {
					$.redoTemplateLayout()
				}
			} catch (T) {}

		}, 800)
	};
	DailyRates.init = function () {
		p = null;
		_userClickedSelection = false;
		H = false;
		n = ""
	};
	DailyRates.setDailyRate = function (I, J) {
		if (I != u || J != n) {
			y(I, J)
		}
		u = I;
		n = J
	};
	DailyRates.setEvents = function (I, J) {
		if (I != u || J != n) {
			i(I, J, true)
		}
		u = I;
		n = J
	};
	DailyRates.resetDates = function () {
		u = "";
		n = ""
	};
	DailyRates.onChangeMonth = function (I, J) {
		if (u == "") {
			u = (new Date()).getFullYear()
		}
		if (n == "") {
			n = (new Date()).getMonth() + 1
		}
		if (I != u || J != n) {
			y(I, J)
		}
		u = I;
		n = J
	};
	DailyRates.onChangeMonthEvent = function (J, K) {
		if (u == "") {
			u = (new Date()).getFullYear()
		}
		if (n == "") {
			n = (new Date()).getMonth() + 1
		}
		if (J != u || K != n) {
			if (K > n) {
				if (C == "#inline-calendar") {
					var I = $.datepick.options($(C), "monthsToShow");
					var L = (I == 1) ? $.datepick.newDate(J, K, 28) : $.datepick.newDate(J, K + 1, 28);
					ts = L.getTime();
					if ($(C).find(".dp" + ts).find(".day-price").length == 0) {
						m = true
					}
				}
			}
			i(J, K)
		}
		u = J;
		n = K
	};
	DailyRates.onChangeMonthEventWithRates = function (J, K) {
		if (u == "") {
			u = (new Date()).getFullYear()
		}
		if (n == "") {
			n = (new Date()).getMonth() + 1
		}
		if (J != u || K != n) {
			if (c) {
				if (C == "#inline-calendar") {
					var I = $.datepick.options($(C), "monthsToShow");
					var L = (I == 1) ? $.datepick.newDate(J, K, 28) : $.datepick.newDate(J, K + 1, 28);
					ts = L.getTime();
					if ($(C).find(".dp" + ts).find(".day-price").length == 0) {
						F(J, K)
					}
				}
			} else {
				if (K > n) {
					if (C == "#inline-calendar") {
						var I = $.datepick.options($(C), "monthsToShow");
						var L = (I == 1) ? $.datepick.newDate(J, K, 28) : $.datepick.newDate(J, K + 1, 28);
						ts = L.getTime();
						if ($(C).find(".dp" + ts).find(".day-price").length == 0) {
							m = true
						}
					}
				}
				i(J, K)
			}
		}
		u = J;
		n = K
	};
	DailyRates.getDailyRate = function (I, L) {
		var J = (I.getMonth() + 1) + "/" + I.getFullYear();
		var K = null;
		K = q.call(this, I, L, x[J], s[J]);
		return K
	};
	DailyRates.updateOtherDates = function (I) {
		var R = 86400000;
		var M = $.data(this, "datepick");
		if (_userClickedSelection) {
			if (I && I.length == 2) {
				var T = I[0];
				var J = I[1];
				if ((typeof T !== "undefined") && (typeof J !== "undefined") && T && J) {
					if (T.getTime() != J.getTime()) {
						if ($._dateFormatter) {
							var L = $("#checkinDateStr");
							if (L.length && L.is(":visible")) {
								L.val($._dateFormatter.format(T))
							}
							var O = $("#checkoutDateStr");
							if (O.length && O.is(":visible")) {
								O.val($._dateFormatter.format(J))
							}
						}
						AvailabilityChecker.setCheckinDateEx((T.getMonth() + 1) + "/" + T.getDate() + "/" + T.getFullYear());
						var Q = $("#numberOfNights");
						if (Q.length == 0) {
							AvailabilityChecker.setCheckoutDate((J.getMonth() + 1) + "/" + J.getDate() + "/" + J.getFullYear())
						} else {
							var S = Q.find("option").length;
							var K = Math.ceil((J.getTime() - T.getTime()) / R);
							if (K <= S) {
								Q.val(K)
							} else {
								Q.val(S);
								AvailabilityChecker.updateCheckoutDate(S);
								AvailabilityChecker.setCheckoutDatepicker();
								var N = $("#numberOfNightsError");
								var P = $("#numberOfNightsErrorMsg").text().trim();
								N.addClass("hint--bottom hint--error hint--always");
								N.attr("data-hint", P);
								setTimeout(function () {
									$(window).off("click.showNumberOfNightsError").on("click.showNumberOfNightsError", function () {
										if (N.hasClass("hint--bottom hint--error hint--always")) {
											N.removeClass("hint--bottom hint--error hint--always");
											N.removeAttr("data-hint")
										}
									})
								}, 300)
							}
							if (Q.dataNvl("uiCombobox", "combobox", "ui-combobox") && Q.combobox("isVisible")) {
								Q.combobox("refresh")
							}
						}
					}
				}
				p = new Date(T)
			}
			$("span.ratedDate").not(".ui-datepicker-other-month").addClass("ui-state-unavailable")
		}
		if (M.pickingRange) {
			H = !H
		} else {
			H = false
		}
		_userClickedSelection = true
	};
	DailyRates.setFlexibleDates = function () {
		var Q = parseInt($("#checkinYear").find(":selected").val(), 10);
		var U = parseInt($("#checkinMonth").find(":selected").val(), 10);
		var X = parseInt($("#checkinDay").find(":selected").val(), 10);
		var Y = new Date(Q, U - 1, X, 3, 0, 0);
		var J = $("#numberOfNights");
		var O;
		if (J.length == 0) {
			var S = parseInt($("#checkoutYear").find(":selected").val(), 10);
			var K = parseInt($("#checkoutMonth").find(":selected").val(), 10);
			var N = parseInt($("#checkoutDay").find(":selected").val(), 10);
			O = new Date(S, K - 1, N, 4, 0, 0)
		} else {
			O = new Date(Y.getTime());
			O.setDate(O.getDate() + parseInt(J.val()))
		}
		var M = [Y];
		if (O.getTime() > Y.getTime()) {
			M.push(O)
		}
		if (C == ".datepick-popup") {
			$(".flexible-search input.flex-date").datepick("setDate", M)
		} else {
			if (C == "#dateslider-calendar" && _selectedRoomType != "undefined") {
				if (_selectedRoomType == "") {
					if (_firstRoomType != null) {
						v(_firstRoomType);
						var V = $("#dateslider-search-" + _firstRoomType);
						var I = $.datepick.retrieveDate(V[0], V.find('a[class*="dp"] :first')[0]);
						var L = $.datepick.retrieveDate(V[0], V.find('a[class*="dp"] :last')[0]);
						if (M[0].getTime() < I.getTime() || M[0].getTime() > L.getTime()) {
							var T = V.datepick("options", "dateSliderVisibleDays");
							var R = $("div[id*=dateslider-search-]");
							for (var P = 0; P < R.length; P++) {
								$.datepick.options(R[P], "dateSliderStartDate", M[0])
							}
							$.datepick.changeDay(V, T);
							DailyRates.onSliderChangeEventByRoomType(M[0], new Date(M[0].getTime() + T * 86400000), 0);
							V.datepick("setDate", M)
						} else {
							V.datepick("setDate", M)
						}
					}
				} else {
					var W = $("#dateslider-search-" + _selectedRoomType);
					var I = $.datepick.retrieveDate(W[0], W.find('a[class*="dp"] :first')[0]);
					var L = $.datepick.retrieveDate(W[0], W.find('a[class*="dp"] :last')[0]);
					if (M[0].getTime() < I.getTime() || M[0].getTime() > L.getTime()) {
						var T = W.datepick("options", "dateSliderVisibleDays");
						var R = $("div[id*=dateslider-search-]");
						for (var P = 0; P < R.length; P++) {
							$.datepick.options(R[P], "dateSliderStartDate", M[0])
						}
						$.datepick.changeDay(W, T);
						DailyRates.onSliderChangeEventByRoomType(M[0], new Date(M[0].getTime() + T * 86400000), 0);
						W.datepick("setDate", M)
					} else {
						W.datepick("setDate", M)
					}
				}
			} else {
				$(C).datepick("setDate", M)
			}
		}
	};
	DailyRates.showHover = function (L, K) {
		if (typeof K !== "undefined") {
			if (H && K && p != null && L >= p) {
				$(C + " .selected-date-background").removeClass("selected-date-background");
				var J = new Date(p);
				while (J <= L) {
					var I = C + " .dp" + J.getTime();
					$(I).each(function () {
						var M = $(this);
						M.addClass("selected-date-background");
						M.parent().addClass("selected-date-background")
					});
					J.setDate(J.getDate() + 1)
				}
			}
		}
	};
	DailyRates.showLegend = function () {
		if (C == "#inline-calendar") {
			$.datepick.addColorLegendWithEvents($(C), true, null);
			$.datepick._update($(C))
		}
	};
	DailyRates.setContainer = function (I) {
		C = I
	};
	DailyRates.onJustShopping = function () {
		DailyRates.setContainer("#inline-calendar");
		var I = $(C);
		var N = $.data(I[0], "datepick").drawDate.getMonth() + 1;
		var M = $.data(I[0], "datepick").drawDate.getFullYear();
		var L = $.datepick.retrieveDate(I[0], I.find('td a[class*="dp"] :first')[0]);
		var J = $.datepick.retrieveDate(I[0], I.find('td a[class*="dp"] :last')[0]);
		var K = N + "/" + M;
		if (K in x) {
			delete x[K];
			if ($.datepick.options(I, "monthsToShow") == 2) {
				K = (N + 1) + "/" + M;
				if (K in x) {
					delete x[K]
				}
			}
		}
		K = (L.getMonth() + 1) + "/" + L.getFullYear();
		if (K in x) {
			for (rt in x[K].rates) {
				if (rt >= L.getDate()) {
					delete x[K].rates[rt]
				}
			}
		}
		K = (J.getMonth() + 1) + "/" + J.getFullYear();
		if (K in x) {
			for (rt in x[K].rates) {
				if (rt <= J.getDate()) {
					delete x[K].rates[rt]
				}
			}
		}
		if (u == "") {
			u = M
		}
		if (n == "") {
			n = N
		}
		F(u, n);
		c = true
	};
	DailyRates.updateSliderDates = function (L) {
		var K = 86400000;
		if (_userClickedSelection) {
			if (L && L.length == 2) {
				var J = L[0];
				var I = L[1];
				if ((typeof J !== "undefined") && (typeof I !== "undefined") && J && I) {
					if (J.getTime() != I.getTime()) {
						G(J, I);
						D()
					}
				}
				p = new Date(J)
			}
		}
		_userClickedSelection = true
	};
	var G = function (S, J) {
		var R = 86400000;
		AvailabilityChecker.setCheckinDateEx((S.getMonth() + 1) + "/" + S.getDate() + "/" + S.getFullYear());
		$('[name="searchRoomForm"]').find('[name="checkinDay"]').val(S.getDate());
		$('[name="searchRoomForm"]').find('[name="checkinMonth"]').val((S.getMonth() + 1));
		$('[name="searchRoomForm"]').find('[name="checkinYear"]').val(S.getFullYear());
		$('[name="RoomDetailForm"]').find('[name="checkinDay"]').val(S.getDate());
		$('[name="RoomDetailForm"]').find('[name="checkinMonth"]').val((S.getMonth() + 1));
		$('[name="RoomDetailForm"]').find('[name="checkinYear"]').val(S.getFullYear());
		var I = $("#numberOfNights");
		if (I.length == 0) {
			AvailabilityChecker.setCheckoutDate((J.getMonth() + 1) + "/" + J.getDate() + "/" + J.getFullYear());
			$('[name="searchRoomForm"]').find('[name="checkoutDay"]').val(J.getDate());
			$('[name="searchRoomForm"]').find('[name="checkoutMonth"]').val((J.getMonth() + 1));
			$('[name="searchRoomForm"]').find('[name="checkoutYear"]').val(J.getFullYear());
			$('[name="RoomDetailForm"]').find('[name="checkoutDay"]').val(J.getDate());
			$('[name="RoomDetailForm"]').find('[name="checkoutMonth"]').val((J.getMonth() + 1));
			$('[name="RoomDetailForm"]').find('[name="checkoutYear"]').val(J.getFullYear())
		} else {
			I.val(Math.ceil((J.getTime() - S.getTime()) / R));
			$('[name="searchRoomForm"]').find('[name="numberOfNights"]').val(I.val());
			$('[name="RoomDetailForm"]').find('[name="numberOfNights"]').val(I.val())
		}
		var P = new SimpleDateFormat(StringUtils.nvl($._dateFormat, "MM-dd-yyyy"));
		var K = P.format(S);
		var M = P.format(J);
		$("#search-options time:first").attr("datetime", K);
		$("#search-options time:first").html(K);
		$("#search-options time:last").attr("datetime", M);
		$("#search-options time:last").html(M);
		var O = Math.ceil((J.getTime() - S.getTime()) / R);
		var Q = $("#reservation-info li:first").html().replace(/(\d[\d\.\*]*)/g, O);
		$("#reservation-info li:first").html(Q);
		if (O == 1) {
			$("#reservation-info li:first span:first").html($("#reservation-info li:first span#singular").html())
		} else {
			if (O > 1) {
				$("#reservation-info li:first span:first").html($("#reservation-info li:first span#plural").html())
			}
		}
		if ($("#toCurrencyCode").length) {
			$("#toCurrencyCode").find('option[value=""]').attr("selected", "selected")
		}
		if ($._dateFormatter) {
			var L = $("#checkinDateStr");
			if (L.length && L.is(":visible")) {
				L.val($._dateFormatter.format(S))
			}
			var N = $("#checkoutDateStr");
			if (N.length && N.is(":visible")) {
				N.val($._dateFormatter.format(J))
			}
		}
	};
	DailyRates.updateSliderDatesByRoomType = function (N, K) {
		var M = 86400000;
		var L = $.data(this, "datepick");
		if (_userClickedSelection) {
			if (!k(K)) {
				return
			}
			if (N && N.length == 2) {
				var J = N[0];
				var I = N[1];
				if ((typeof J !== "undefined") && (typeof I !== "undefined") && J && I) {
					if (J.getTime() != I.getTime()) {
						e(J, I, K)
					}
				}
				p = new Date(J)
			}
		}
		if (L.pickingRange) {
			H = !H
		} else {
			H = false
		}
		_userClickedSelection = true;
		v(K);
		j()
	};
	var v = function (J) {
		_selectedRoomType = J;
		var I = $("#srchRoomType");
		I.val(J);
		if (I.dataNvl("uiCombobox", "combobox", "ui-combobox") && I.combobox("isVisible")) {
			I.combobox("refresh")
		}
	};
	var k = function (K) {
		var N = $.data($("#dateslider-search-" + K)[0], "datepick");
		if (!N.pickingRange && N.selectedDates && N.selectedDates.length == 2 && N.selectedDates[1].getTime() > N.selectedDates[0].getTime()) {
			var O = N.selectedDates[0];
			var M = N.selectedDates[1];
			var K = N.get("dateSliderRoomType");
			var J = O.addDays(1);
			while (J.getTime() < M.getTime()) {
				var L = (J.getMonth() + 1) + "/" + J.getFullYear();
				var I = x[L];
				if (I && I.rates) {
					rateInfo = I.rates[J.getDate()][K];
					rateInfo = typeof(rateInfo) === "undefined" ? null : rateInfo
				}
				if (rateInfo && rateInfo.length >= 2) {
					var P = rateInfo[0];
					if (P == "") {
						alert(nonAvailabilitySliderLbl);
						N.pickingRange = !instpickingRange;
						N.selectedDates[1] = N.selectedDates[0];
						return false
					}
				}
				J = J.addDays(1)
			}
		}
		return true
	};
	var e = function (M, L, K) {
		var P = 86400000;
		var N = Math.ceil((L.getTime() - M.getTime()) / P);
		AvailabilityChecker.setCheckinDateEx((M.getMonth() + 1) + "/" + M.getDate() + "/" + M.getFullYear());
		$('[name="SearchForm"]').find('[name="checkinDay"]').val(M.getDate());
		$('[name="SearchForm"]').find('[name="checkinMonth"]').val((M.getMonth() + 1));
		$('[name="SearchForm"]').find('[name="checkinYear"]').val(M.getFullYear());
		var J = $("#numberOfNights");
		if (J.length == 0) {
			AvailabilityChecker.setCheckoutDate((L.getMonth() + 1) + "/" + L.getDate() + "/" + L.getFullYear());
			$('[name="SearchForm"]').find('[name="checkoutDay"]').val(L.getDate());
			$('[name="SearchForm"]').find('[name="checkoutMonth"]').val((L.getMonth() + 1));
			$('[name="SearchForm"]').find('[name="checkoutYear"]').val(L.getFullYear())
		} else {
			J.val(N);
			$('[name="SearchForm"]').find('[name="numberOfNights"]').val(J.val());
			if (J.dataNvl("uiCombobox", "combobox", "ui-combobox") && J.combobox("isVisible")) {
				J.combobox("refresh")
			}
		}
		if ($._dateFormatter) {
			var I = $("#checkinDateStr");
			if (I.length && I.is(":visible")) {
				I.val($._dateFormatter.format(M))
			}
			var O = $("#checkoutDateStr");
			if (O.length && O.is(":visible")) {
				O.val($._dateFormatter.format(L))
			}
		}
	};
	var B = function () {
		$(C).undelegate("a.dateslider-find:not([rel])", "click").delegate("a.dateslider-find:not([rel])", "click", function (I) {
			$(this).attr("rel", "#dateslider-search");
			$(this).cluetip("destroy");
			$(this).cluetip({
				multiple : false,
				activation : "click",
				cluezIndex : 8000,
				local : true,
				positionBy : "bottomTop",
				width : "200px",
				sticky : false,
				showTitle : false,
				arrows : true,
				cursor : "pointer",
				hoverIntent : null,
				onShow : function (L, K) {
					if ($(C).parent().find("#dateslider-search").length) {
						K.find("#dateslider-search").css("display", "block");
						K.find("#startdate").attr("id", "d_startdate");
						K.find("#dateslider-numnights").attr("id", "d_numnights");
						var O = "#" + L.attr("id") + " #dateslider-search";
						var M = $.datepick.getDate($(C)[0]);
						$(O).find("#d_startdate").val((M[0].getDate()) + "/" + (M[0].getMonth() + 1) + "/" + (M[0].getFullYear()));
						var J = $(O).find("#d_numnights").val(Math.ceil((M[1].getTime() - M[0].getTime()) / 86400000));
						var N = $(".ratedDate").length;
						if (N > 0) {
							if ($(O).find("#d_numnights option").length > N) {
								$(O).find("#d_numnights option").each(function () {
									var P = $(this);
									if (P.val() > N - 1) {
										P.remove()
									}
								})
							}
						} else {
							N = $.datepick.options($(C), "dateSliderVisibleDays");
							if ($(O).find("#d_numnights option").length > N) {
								$(O).find("#d_numnights option").each(function () {
									var P = $(this);
									if (P.val() > N - 1) {
										P.remove()
									}
								})
							}
						}
						$(O).find("#d_numnights").combobox({
							appendTo : O
						});
						$(O).find("#d_startdate").datepicker({
							formatDate : "dd/mm/yyyy",
							minDate : getMinDate(),
							numberOfMonths : window.getNoOfMonthDispCalDatePicker(),
							onSelect : function (Q, P) {
								$("#d_startdate").val((P.currentDay) + "/" + (P.currentMonth + 1) + "/" + (P.currentYear))
							},
							onClose : function () {}

						});
						$(O).find("a.dateslider-button-find").bind("click", function () {
							var Q = $("#d_startdate").val().split("/");
							var X = parseInt(Q[0], 10);
							var U = parseInt(Q[1], 10) - 1;
							var W = parseInt(Q[2], 10);
							var R = parseInt($("#d_numnights").val(), 10);
							var Y = new Date(W, U, X);
							var P = getMinDate();
							P.setTime(Y.getTime() + (R * 86400000));
							$("#d_startdate").datepicker("destroy");
							$("#d_numnights").combobox("destroy");
							G(Y, P);
							var V = $.datepick.options($(C), "dayWidth");
							var S = $.datepick.options($(C), "dayHeight");
							var T = $.datepick.options($(C), "dayEffect");
							DailyRates.initDateSlider("#dateslider-calendar", V, S, T);
							$(document).trigger("hideCluetip")
						})
					}
				},
				onHide : function (K, J) {
					if (J.find("#dateslider-search").length) {
						if ($(C).parent().find("#dateslider-search").length == 0) {
							$("#d_startdate").datepicker("destroy");
							$("#d_numnights").combobox("destroy")
						}
					}
				},
				cluetipClass : "rounded"
			}).trigger("click");
			$(".cluetip-arrows").removeClass("ui-state-default");
			I.preventDefault();
			return false
		})
	};
	DailyRates.onSliderChangeEvent = function (I, O, K) {
		var N = 86400000;
		if (I && O) {
			var M = $.datepick.options($(C), "dayWidth");
			var L = $.datepick.options($(C), "dayHeight");
			var P = $.datepick.options($(C), "dayEffect");
			var J = ((O.getTime() - I.getTime()) / N) + 1;
			if (J > 0) {
				DailyRates.initDateSlider(C, M, L, P, I, O, J, K)
			}
		}
	};
	DailyRates.initCalendarSearch = function (J, L, I, K) {
		DailyRates.init();
		DailyRates.setContainer(J);
		$(J).datepick({
			autoWidth : true,
			rangeSelect : true,
			showOtherMonths : true,
			selectOtherMonths : (I) ? true : false,
			fixedWeeks : false,
			monthsToShow : (I) ? 1 : 2,
			minDate : 0,
			changeMonth : true,
			yearRange : "c-1:c+1",
			onDate : DailyRates.getDailyRate,
			onChangeMonthYear : (K) ? DailyRates.onChangeMonthEventWithRates : DailyRates.onChangeMonthEvent,
			onSelect : DailyRates.updateOtherDates,
			renderer : $.datepick.mySearchCalRenderer,
			onShow : $.datepick.hoverCallback(DailyRates.showHover),
			dayEffect : L
		});
		DailyRates.setFlexibleDates();
		DailyRates.showLegend();
		DailyRates.resetDates();
		DailyRates.setEvents(parseInt($("#checkinYear").find(":selected").val(), 10), parseInt($("#checkinMonth").find(":selected").val(), 10))
	};
	DailyRates.initDateSlider = function (X, ae, Y, W, K, Z, T, R) {
		DailyRates.init();
		DailyRates.setContainer(X);
		$("#show_availability_calendar").hide();
		if (ae && ae != "") {
			f = ae
		}
		if (Y && Y != "") {
			d = Y
		}
		if (W && W != "") {
			b = W
		}
		var N = parseInt($("#checkinYear").find(":selected").val(), 10);
		var P = parseInt($("#checkinMonth").find(":selected").val(), 10);
		var S = parseInt($("#checkinDay").find(":selected").val(), 10);
		var V = new Date(N, P - 1, S, 3, 0, 0);
		var I = $("#numberOfNights");
		var Q;
		if (I.length == 0) {
			var ad = parseInt($("#checkoutYear").find(":selected").val(), 10);
			var L = parseInt($("#checkoutMonth").find(":selected").val(), 10);
			var ac = parseInt($("#checkoutDay").find(":selected").val(), 10);
			Q = new Date(ad, L - 1, ac, 4, 0, 0)
		} else {
			Q = new Date(V.getTime());
			Q.setDate(Q.getDate() + parseInt(I.val()))
		}
		var O = [V];
		if (Q.getTime() > V.getTime()) {
			O.push(Q)
		}
		var J = (T) ? T : 11;
		var M = Math.ceil((Q.getTime() - V.getTime()) / 86400000);
		if (M > J) {
			$(X).datepick("destroy");
			$(X).datepick({
				autoWidth : true,
				rangeSelect : true,
				showOtherMonths : true,
				selectOtherMonths : true,
				fixedWeeks : true,
				monthsToShow : 1,
				minDate : 0,
				firstDay : 0,
				changeMonth : false,
				onDate : DailyRates.getDailyRate,
				onChangeMonthYear : DailyRates.onSliderChangeEvent,
				onSelect : DailyRates.updateSliderDates,
				renderer : $.datepick.myTimelineCalRenderer,
				onShow : null,
				dateSlider : true,
				dateSliderStartDate : V,
				dateSliderNights : J,
				dateSliderVisibleDays : J,
				dateSliderShiftDay : (R) ? R : 0,
				dayWidth : f,
				dayHeight : d,
				dayEffect : b
			});
			$(X).datepick("setDate", O);
			$(X).find(".dateslider-info").width($(X).find(".ui-datepicker").width());
			$(X).find(".dateslider-slider").html("");
			$(X).find(".ui-datepicker-row-break").html("");
			$(X).find("#calendar-replace").html("");
			B()
		} else {
			$(X).datepick("destroy");
			$(X).datepick({
				autoWidth : true,
				rangeSelect : true,
				showOtherMonths : true,
				selectOtherMonths : true,
				fixedWeeks : true,
				monthsToShow : 1,
				minDate : 0,
				firstDay : 0,
				changeMonth : false,
				onDate : DailyRates.getDailyRate,
				onChangeMonthYear : DailyRates.onSliderChangeEvent,
				onSelect : DailyRates.updateSliderDates,
				renderer : $.datepick.myTimelineCalRenderer,
				onShow : null,
				dateSlider : true,
				dateSliderStartDate : V,
				dateSliderNights : Q.getDate() - V.getDate(),
				dateSliderVisibleDays : J,
				dateSliderShiftDay : (R) ? R : 0,
				dayWidth : f,
				dayHeight : d,
				dayEffect : b
			});
			$(X).datepick("setDate", O);
			var U = Math.ceil((Q.getTime() - V.getTime()) / 86400000);
			if ($(".ratedDate").length - 1 < U) {
				$(X).datepick("destroy");
				$(X).datepick({
					autoWidth : true,
					rangeSelect : true,
					showOtherMonths : true,
					selectOtherMonths : true,
					fixedWeeks : true,
					monthsToShow : 1,
					minDate : 0,
					firstDay : 0,
					changeMonth : false,
					onDate : DailyRates.getDailyRate,
					onChangeMonthYear : DailyRates.onSliderChangeEvent,
					onSelect : DailyRates.updateSliderDates,
					renderer : $.datepick.myTimelineCalRenderer,
					onShow : null,
					dateSlider : true,
					dateSliderStartDate : V,
					dateSliderNights : J,
					dateSliderVisibleDays : J,
					dateSliderShiftDay : (R) ? R : 0,
					dayWidth : f,
					dayHeight : d,
					dayEffect : b
				});
				$(X).datepick("setDate", O);
				$(X).find(".dateslider-info").width($(X).find(".ui-datepicker").width());
				$(X).find(".dateslider-slider").html("");
				$(X).find(".ui-datepicker-row-break").html("");
				$(X).find("#calendar-replace").html("");
				B();
				return
			}
			if (M == J) {
				if (K) {
					V = K
				}
				l(V, J)
			} else {
				var aa = new Date(V);
				aa.setTime(V.getTime() - 86400000);
				var ab = getMinDate();
				if (aa < ab) {
					aa = ab
				}
				if (K) {
					aa = K
				}
				l(aa, J)
			}
		}
	};
	var j = function () {
		if (_selectedRoomType != "") {
			var I = $("#dateslider-search-" + _selectedRoomType);
			$("div[id*=dateslider-search-]").not(I).each(function () {
				var K = $(this);
				$("a[class*=dp]", K).removeClass("ui-state-active");
				if ($(".cal-srch-arrival-lbl", $(this)).length > 0) {
					$(".cal-srch-arrival-lbl", $(this)).remove()
				}
				if ($(".cal-srch-departure-lbl", $(this)).length > 0) {
					$(".cal-srch-departure-lbl", $(this)).remove()
				}
				var J = $.data(K[0], "datepick");
				J.selectedDates = [];
				J.pickingRange = false;
				J.inSelect = false
			})
		}
	};
	var E = function (Y, ai, ak, O, L, K, ad, V, M, W) {
		var aj = false;
		var ab = (ak) ? ak.effect : "";
		var N = ak.showPrice;
		var ac = (ak) ? ak.hasEvents : false;
		for (var ag in ak.rateData) {
			var Z = {
				timeout : (new Date()).getTime() + a * 1000,
				rates : ak.rateData[ag].rateStructure,
				showPrice : N,
				effect : ab
			};
			var am = ak.rateData[ag].responseMonth + "/" + ak.rateData[ag].responseYear;
			if ($.isEmptyObject(x)) {
				x[am] = Z
			} else {
				if (!(am in x)) {
					x[am] = Z
				} else {
					for (rt in Z.rates) {
						if (!(rt in x[am].rates)) {
							x[am].rates[rt] = Z.rates[rt]
						}
					}
				}
			}
		}
		for (var ag in ak.eventData) {
			var ac = ak.hasEvents;
			var Z = {
				timeout : (new Date()).getTime() + a * 1000,
				events : ak.eventData[ag].eventStructure,
				hasEvents : ac,
				effect : ab,
				showPrice : ak.showPrice
			};
			var am = ak.eventData[ag].responseMonth + "/" + ak.eventData[ag].responseYear;
			s[am] = Z
		}
		var U = 0;
		var R = [ad];
		if (V.getTime() > ad.getTime()) {
			R.push(V)
		}
		for (var ae = 0; ae < ak.roomTypeData.length; ae++) {
			var S = ak.roomTypeData[ae];
			var J = S[0];
			var T = "dateslider-search-" + J;
			var P = $("#" + T);
			if (P.length == 0) {
				var Q = $("<div class='dateslider-container'></div>");
				var X = "<div id='" + J + "' class='room-type'><span class='room-type-dateslider-desc'>" + S[1] + "</span><img class='room-type-dateslider-img-url' src='" + S[2] + "'><div class='room-detail-link'>" + S[3] + "</div></div>";
				var af = $("<div id='" + T + "' class='dateslider-search-room-type'></div>");
				Q.appendTo($(C));
				$(X).appendTo(Q);
				af.appendTo(Q);
				var ah = $.datepick.mySearchCalRoomTypeFirstLineRenderer;
				if (U == 0) {
					if (_firstRoomType == null) {
						_firstRoomType = J
					} else {
						ah = $.datepick.mySearchCalRoomTypeOtherLinesRenderer
					}
				} else {
					ah = $.datepick.mySearchCalRoomTypeOtherLinesRenderer
				}
				U++;
				af.datepick("destroy");
				af.datepick({
					autoWidth : true,
					rangeSelect : true,
					showOtherMonths : true,
					selectOtherMonths : true,
					fixedWeeks : true,
					monthsToShow : 1,
					minDate : 0,
					firstDay : 0,
					changeMonth : false,
					onDate : function (ao, ar, an) {
						DailyRates.setContainer("#dateslider-calendar");
						var ap = (ao.getMonth() + 1) + "/" + ao.getFullYear();
						var aq = null;
						aq = q.call(this, ao, ar, x[ap], s[ap], an);
						return aq
					},
					onChangeMonthYear : DailyRates.onSliderChangeEventByRoomType,
					onSelect : DailyRates.updateSliderDatesByRoomType,
					renderer : ah,
					onShow : null,
					dateSlider : true,
					dateSliderRoomType : J,
					dateSliderStartDate : ad,
					dateSliderNights : V.getDate() - ad.getDate(),
					dateSliderVisibleDays : M,
					dateSliderShiftDay : (W) ? W : 0,
					dayWidth : O,
					dayHeight : L,
					dayEffect : K
				});
				var aa = Math.ceil((V.getTime() - ad.getTime()) / 86400000);
				if ($(".ratedDate").length - 1 < aa) {
					af.datepick("destroy");
					af.datepick({
						autoWidth : true,
						rangeSelect : true,
						showOtherMonths : true,
						selectOtherMonths : true,
						fixedWeeks : true,
						monthsToShow : 1,
						minDate : 0,
						firstDay : 0,
						changeMonth : false,
						onDate : function (ao, ar, an) {
							DailyRates.setContainer("#dateslider-calendar");
							var ap = (ao.getMonth() + 1) + "/" + ao.getFullYear();
							var aq = null;
							aq = q.call(this, ao, ar, x[ap], s[ap], an);
							return aq
						},
						onChangeMonthYear : DailyRates.onSliderChangeEventByRoomType,
						onSelect : DailyRates.updateSliderDatesByRoomType,
						renderer : ah,
						onShow : null,
						dateSlider : true,
						dateSliderRoomType : J,
						dateSliderStartDate : ad,
						dateSliderNights : M,
						dateSliderVisibleDays : M,
						dateSliderShiftDay : (W) ? W : 0,
						dayWidth : O,
						dayHeight : L,
						dayEffect : K
					})
				}
				P = af
			}
			if (C == "#dateslider-calendar") {
				$.datepick.options(P, "onDate", function (ao, ar, an) {
					DailyRates.setContainer("#dateslider-calendar");
					var ap = (ao.getMonth() + 1) + "/" + ao.getFullYear();
					var aq = null;
					aq = q.call(this, ao, ar, x[ap], s[ap], an);
					return aq
				});
				$.datepick._update(P);
				P.delegate("a.has-event-day:not([rel])", "mouseenter", function (an) {
					var ao = "#" + $(this).parent().find(".day-events").attr("id");
					$(this).attr("rel", ao);
					$(this).cluetip("destroy");
					$(this).cluetip({
						multiple : false,
						activation : "hover",
						cluezIndex : 8000,
						local : true,
						positionBy : "bottomTop",
						width : "auto",
						sticky : true,
						showTitle : false,
						arrows : true,
						cursor : "pointer",
						hoverIntent : null,
						mouseOutClose : true,
						closePosition : "title",
						closeText : '<span class="ui-icon ui-icon-closethick">close</span>',
						onShow : function (aq, ap) {
							ap.parent().find(".day-events").css("display", "block")
						},
						cluetipClass : "rounded"
					}).trigger("mouseenter");
					$(".cluetip-arrows").removeClass("ui-state-default");
					an.preventDefault()
				})
			}
			if (ak && ak.rateData) {
				if (C == "#dateslider-calendar") {
					P.delegate("a.ui-state-restrictions:not([rel])", "mouseenter", function (an) {
						var ao = "#" + $(this).find(".day-restrictions").attr("id");
						$(this).attr("rel", ao);
						$(this).cluetip("destroy");
						$(this).cluetip({
							multiple : false,
							activation : "hover",
							cluezIndex : 8000,
							local : true,
							positionBy : "bottomTop",
							width : "auto",
							sticky : false,
							showTitle : false,
							arrows : true,
							cursor : "pointer",
							hoverIntent : null,
							onShow : function (aq, ap) {
								ap.find(".day-restrictions").css("display", "block")
							},
							cluetipClass : "rounded"
						}).trigger("mouseenter");
						$(".cluetip-arrows").removeClass("ui-state-default");
						an.preventDefault()
					})
				}
			}
		}
		$(".room-type-dateslider-desc, .room-type-dateslider-img-url").each(function (ao, ap) {
			var an = $(ap);
			an.on("click", function () {
				var at = $(this);
				var aq = at.closest("div")[0].id;
				if (_selectedRoomType != "" || aq != _selectedRoomType) {
					j();
					_selectedRoomType = aq;
					DailyRates.setContainer("#dateslider-calendar");
					DailyRates.setFlexibleDates();
					var ar = $.data($("#dateslider-search-" + _selectedRoomType)[0], "datepick");
					ar.drawDate = ar.prevDate
				}
			})
		});
		var ac = (ak) ? ak.hasEvents : false;
		if (ak && !ak.eventData) {
			ac = false
		}
		var al = (ak) ? ak.hasRestrictions : false;
		var I = $(o(ak.bShowColorLegend == "true", ak.currencyCode, {
					showEventLegend : ac,
					showRestrictionLegend : al,
					showPrice : ak.showPrice
				}));
		$(".ui-datepicker-legend-div").remove();
		I.appendTo($(C));
		$("span.ratedDate").not(".ui-datepicker-other-month").addClass("ui-state-unavailable");
		try {
			if ($("#csstpl").length != 0) {
				$.redoTemplateLayout()
			}
		} catch (ag) {}

	};
	var o = function (O, I, K) {
		var L = "";
		var M = "";
		var N = ((typeof(knowDatesLbl) !== "undefined") ? knowDatesLbl : "I know my dates");
		if (I) {
			L = MessageHandler.formatMessage(((typeof(rateCurrencyLbl) !== "undefined") ? rateCurrencyLbl : "All Rates shown in {0}."), I)
		}
		var J = ($("#srchResort").val() != "ALL");
		if (O) {
			var P = "";
			if (document.URL.indexOf("multi_choose_date.cmd") == -1) {
				P = '<button data-tag="wh-check-availability-click" class="button ac-calendar" id="ac-submit" onclick="return beforeSubmit(this);" type="button">' + N + "</button>"
			}
			M = '<div class="ui-datepicker-legend-div"><div class="ui-datepicker-legend"><table><tr><td class="color-area"><div class="available-dates"></div></td><td class="color-label">' + ((typeof(availableDatesLbl) !== "undefined") ? availableDatesLbl : "Available Dates") + '</td></tr><tr><td class="color-area"><div class="selected-dates"></div></td><td class="color-label">' + ((typeof(selectedDatesLbl) !== "undefined") ? selectedDatesLbl : "Selected Dates") + '</td></tr><tr><td class="color-area"><div class="unavailable-dates"></div></td><td class="color-label">' + ((typeof(unAvailableDatesLbl) !== "undefined") ? unAvailableDatesLbl : "Unavailable Dates") + "</td></tr>";
			if (K && K.showRestrictionLegend) {
				M += '<tr><td class="color-area"><div class="restriction-dates"></div></td><td class="color-label">' + ((typeof(restrictionDatesLbl) !== "undefined") ? restrictionDatesLbl : "Restriction Dates") + "</td></tr>"
			}
			if (K && K.showEventLegend) {
				M += '<tr><td class="color-area"><div class="event-dates"></div></td><td class="color-label">' + ((typeof(eventDatesLbl) !== "undefined") ? eventDatesLbl : "Event Dates") + "</td></tr>"
			}
			M += '</table></div><div class="knowndates-other">' + P + "</div><br/>";
			if (K && K.showPrice) {
				M += '<div class="other other-text"><span class="other other-currency">' + L + '</span><br><br><span class="other">' + ((typeof(availCalDisclaimerLbl) !== "undefined") ? availCalDisclaimerLbl : "* Rates in search results may vary.") + "</span></div>"
			}
			M += "</div>"
		} else {
			if (K && K.showPrice) {
				M = '<div class="ui-datepicker-row-break"><div class="other">' + L + '</div><div class="other">' + ((typeof(availCalDisclaimerLbl) !== "undefined") ? availCalDisclaimerLbl : "* Rates in search results may vary.") + "</div></div>"
			}
		}
		return M
	};
	DailyRates.onSliderChangeEventByRoomType = function (I, M, K) {
		var L = 86400000;
		if (I && M) {
			var J = ((M.getTime() - I.getTime()) / L) + 1;
			if (J > 0) {
				DailyRates.initDateSliderByRoomType("false", "#dateslider-calendar", _sliderDayWidth, _sliderDayHeight, _sliderDayEffect, I, M, J, K)
			}
		}
	};
	DailyRates.initDateSliderByRoomType = function (I, ac, am, ad, ab, M, ae, Z, T) {
		if (I == "true") {
			DailyRates.init();
			$("#dateslider-calendar").html("");
			_selectedRoomType = "";
			_firstRoomType = null;
			x = {};
			s = {}

		}
		DailyRates.setContainer(ac);
		var U = $("#srchRoomType");
		U.val("");
		if (U.dataNvl("uiCombobox", "combobox", "ui-combobox") && U.combobox("isVisible")) {
			U.combobox("refresh")
		}
		$("#show_availability_calendar").hide();
		var O = parseInt($("#checkinYear").find(":selected").val(), 10);
		var Q = parseInt($("#checkinMonth").find(":selected").val(), 10);
		var X = parseInt($("#checkinDay").find(":selected").val(), 10);
		var aa = new Date(O, Q - 1, X, 3, 0, 0);
		var J = $("#numberOfNights");
		var S;
		if (J.length == 0) {
			var ak = parseInt($("#checkoutYear").find(":selected").val(), 10);
			var L = parseInt($("#checkoutMonth").find(":selected").val(), 10);
			var aj = parseInt($("#checkoutDay").find(":selected").val(), 10);
			S = new Date(ak, L - 1, aj, 4, 0, 0)
		} else {
			S = new Date(aa.getTime());
			S.setDate(S.getDate() + parseInt(J.val()))
		}
		var K = (Z) ? Z : _visibleDays;
		var N = Math.ceil((S.getTime() - aa.getTime()) / 86400000);
		var af = new Date(aa);
		var R = new Date(S);
		if (N == K) {
			if (M) {
				af = M
			}
		} else {
			af.setTime(aa.getTime() - 86400000);
			var ah = getMinDate();
			if (af < ah || af > ah) {
				af = ah
			}
			if (M) {
				af = M
			}
			if (ae) {
				R = ae
			}
		}
		var ai = af.getMonth() + 1;
		var Y = af.getFullYear();
		var al = ai + "/" + Y,
		W = s[al],
		V = new Date().getTime();
		if (W == null || W.timeout < V) {
			var P = $("#SearchForm").serialize();
			P += "&reqMonth=" + ai;
			P += "&reqYear=" + Y;
			P += "&events=true";
			P += "&rates=true";
			P += "&span=true";
			P += "&spanDay=" + af.getDate();
			P += "&spanMonth=" + ai;
			P += "&spanYear=" + Y;
			P += "&spanDays=" + _visibleDays;
			P += "&calendarByRoomType=true";
			if ($("#srchResort").val() == "ALL") {
				return
			}
			if (!$("#dateslider-calendar").eq(0).find(".ui-dateslider-loader").length) {
				$('<div class="ui-loader ui-dateslider-loader" />').css("height", "auto").append($("#ui-loader-img-cont label").clone()).append($("#ui-loader-img").clone()).prependTo($("#dateslider-calendar").eq(0))
			}
			try {
				$.ajax({
					url : A,
					async : true,
					dataType : "text",
					cache : false,
					data : P,
					success : function (ar) {
						if (ar != null) {
							ar = $.parseJSON(ar);
							if (ar && ar.roomTypeData) {
								E(Y, ai, ar, am, ad, ab, af, R, K)
							}
							var ao = $("div[id*=dateslider-search-]");
							for (var aq = 0; aq < ao.length; aq++) {
								if (I == "false") {
									$.datepick.showMonth(ao[aq], M.getFullYear(), M.getMonth() + 1, M.getDate())
								}
								$.datepick._update(ao[aq])
							}
							j();
							if (_selectedRoomType != "") {
								U.val(_selectedRoomType);
								if (U.dataNvl("uiCombobox", "combobox", "ui-combobox") && U.combobox("isVisible")) {
									U.combobox("refresh")
								}
							}
							if (_selectedRoomType == "" && _firstRoomType != null) {
								var an = $("#checkinDateStr");
								var au = $("#checkinYear");
								var at = $("#checkinMonth");
								var ap = $("#checkinDay");
								if ((an.length > 0 && an.is(":visible") && an.val() != "") || (an.length == 0 && ap.val() != "" && at.val() != "" && au.val() != "")) {
									_selectedRoomType = _firstRoomType;
									var av = $("#dateslider-search-" + _firstRoomType);
									av.datepick("setDate", [aa, S])
								}
							}
							$(C).find(".ui-dateslider-loader").remove()
						}
					},
					error : function (ap, an, ao) {
						$(C).find(".ui-dateslider-loader").remove();
						if (console) {
							console.log(an)
						}
					}
				})
			} catch (ag) {
				$(C).find(".ui-dateslider-loader").remove()
			}
		}
	}
})();
function selectRate(b, c, a) {
	jQuery(document).ready(function () {
		jQuery("#roomTypeCode").val(b);
		jQuery("#ratePlanCode").val(c);
		jQuery("#numOfUnits").val(a);
		var d = jQuery("#searchRoomForm");
		d.attr("action", "/bp/room_type_details.cmd");
		d.submit()
	})
}
$("#SearchForm").submit(function () {
	var c = $("#numberOfChildren").val();
	var d = $("#selectChildrenAges").val();
	var b = "";
	if (d == "on") {
		for (var a = 1; a <= c; a++) {
			if (a != c) {
				b = b + $("#childAge" + a).find(":selected").val() + ","
			} else {
				b = b + $("#childAge" + a).find(":selected").val()
			}
		}
		$("#childAges").val(b)
	}
});
function updateDatePairCtrl(i, c, e, a, d) {
	if (i.length && c.length && c.val()) {
		e = parseInt(e);
		a = StringUtils.nvl($._dateFormat, a);
		var h = new SimpleDateFormat(a);
		var g = c.val();
		var b = h.parse(g);
		if (b.constructor == Date) {
			var f = h.parse(i.val());
			if (f.constructor != Date) {
				f = b
			}
			if (e < 0) {
				if (b.getNumOfDayDiff(f, true) <= 0) {
					f = b.addDays(e)
				}
			} else {
				if (b.getNumOfDayDiff(f, true) >= 0) {
					f = b.addDays(e)
				}
			}
			if (f.constructor == Date) {
				i.val(h.format(f));
				i.css("color", "inherit");
				if (d) {
					d()
				}
			}
		}
	}
}
function updateHiddenDateCtrlFields(h, e, g, a) {
	var d = $._dateFormatter.parse(h);
	if (d.constructor == Date) {
		a.val(d.getFullYear());
		g.val(d.getMonth() + 1);
		var c = e.get(0).options;
		var f = AvailabilityChecker.getDaysInMonth(d.getMonth() + 1, d.getFullYear());
		if (c.length < f) {
			for (var b = length; b < f; b++) {
				c[b] = new Option(b + 1, b + 1)
			}
		}
		e.val(d.getDate())
	}
}
function validateSingleDateCtrl(a) {
	if (a.length && !StringUtils.isEmpty(a.val())) {
		return ($._dateFormatter.parse(a.val()).constructor == Date)
	}
	return false
}
function singleDateCtrlFocusHandler() {
	var a = $(this);
	a.css("color", "inherit");
	if (a.val() == $._dateFormat || StringUtils.isEmpty(a.val())) {
		a.val($._dateFormat);
		this.select()
	}
}
function singleDateCtrlBlurHandler() {
	var a = $(this);
	if (a.val() == $._dateFormat || StringUtils.isEmpty(a.val())) {
		a.css("color", "#CCC");
		a.val($._dateFormat)
	} else {
		a.css("color", "inherit")
	}
}
function validateSingleCheckinCheckoutDateCtrls() {
	var c = true;
	var b = $._dateFormatter;
	var a = $("#checkinDateStr");
	if (a.length && a.is(":visible")) {
		$("#ui-checkin-date-mandatory-error").hide();
		$("#ui-checkin-date-invalid-error").hide();
		var e = a.val();
		if (StringUtils.isEmpty(e) || e == $._dateFormat) {
			$("#ui-checkin-date-mandatory-error").show();
			c = false
		} else {
			if (b.parse(e).constructor != Date) {
				$("#ui-checkin-date-invalid-error").show();
				c = false
			}
		}
	}
	var d = $("#checkoutDateStr");
	if (d.length && d.is(":visible")) {
		$("#ui-checkout-date-mandatory-error").hide();
		$("#ui-checkout-date-invalid-error").hide();
		var e = d.val();
		if (StringUtils.isEmpty(e) || e == $._dateFormat) {
			$("#ui-checkout-date-mandatory-error").show();
			c = false
		} else {
			if (b.parse(e).constructor != Date) {
				$("#ui-checkout-date-invalid-error").show();
				c = false
			}
		}
	}
	return c
}
function beforeSubmit(a) {
	var k = true;
	var d = $("#numberOfChildren").val();
	var b = $("#selectChildrenAges").val();
	if (b == "on") {
		if (d > 0) {
			var h = "";
			for (var g = 1; g <= d; g++) {
				var j = $("#childAge" + g).val();
				if (StringUtils.isEmpty(j)) {
					k = false;
					$("#childAgeError").show()
				} else {
					h += j;
					if (g != d) {
						h += ","
					}
				}
			}
			if (k) {
				$("#childAges").val(h)
			} else {
				$("#childAges").val("")
			}
		} else {
			$("#childAges").val("")
		}
	} else {
		$("#childAges").val("")
	}
	if (k == true) {
		if (a && a.type != "submit") {
			var l = $(a).closest("form");
			var c = l[0];
			var e = l.attr("target");
			if (!e || e == "" || e == "_self") {
				if (typeof($.showPageLoadingMsg) !== "undefined" && $.showPageLoadingMsg) {
					$.showPageLoadingMsg()
				}
			} else {
				if (e == "_blank") {
					var f = c.action;
					f = f.replace(/search_regional\.cmd/g, "search_regional_cmd.jsp");
					f = f.replace(/search_rooms\.cmd/g, "search_rooms_cmd.jsp");
					c.action = f
				}
			}
			c.submit()
		} else {
			if (typeof($.showPageLoadingMsg) !== "undefined" && $.showPageLoadingMsg) {
				$.showPageLoadingMsg()
			}
		}
		return true
	} else {
		return false
	}
}
function updateCities() {
	sessionStorage.setItem("selectedCountry", $("select[name=country]").val());
	sessionStorage.setItem("countryList", $("select[name=country]").html());
	$("#ui-no-city-found-for-region-error").hide();
	var a = '<option value="default_city">' + $("select[name=city]").text() + "</option>";
	if ("default_country" == $("select[name=country]").val()) {
		var b = $("select[name=city]");
		b.children("option:not(:first)").remove();
		if (b.dataNvl("uiCombobox", "combobox", "ui-combobox")) {
			if ($(".multi_search_box")) {
				b.combobox().combobox("refresh")
			} else {
				b.combobox("refresh")
			}
		}
		updateResorts();
		return
	}
	$.ajax({
		url : "/bp/get_lov.cmd",
		data : {
			command : "getCitiesByCountryCode",
			countryCode : $("select[name=country]").val()
		},
		success : function (g) {
			var f = "An error occurred while attempting to retrieve the list of values from Opera. Check the specified request code to ensure the setup is correct and try again.";
			var c = [];
			if (g.success) {
				if (g.list.length > 0) {
					try {
						$.each(g.list, function (h, j) {
							c.push('<option value="' + j.value + '">' + j.text + "</option>")
						});
						var e = $("select[name=city]");
						e.children("option:not(:first)").remove();
						e.append(c.join(""));
						if (1 == e.children("option:not(:first)").length) {
							e.find("option:eq(1)").attr("selected", "selected")
						}
						if (undefined != window.repopCity && !window.repopCity == "") {
							e.find("option[value='" + window.repopCity + "']").attr("selected", "selected");
							window.repopCity = ""
						}
						if (e.dataNvl("uiCombobox", "combobox", "ui-combobox")) {
							e.combobox("refresh")
						}
					} catch (d) {}

				} else {
					$("#ui-no-city-found-for-region-error").show()
				}
			}
			updateResorts()
		},
		error : function (d, e, c) {},
		dataType : "json"
	})
}
function updateResorts() {
	var c = $("#countryInRoomSearchForm");
	var b = $("#cityInRoomSearchForm");
	if (c.length && b.length) {
		var d = $("#countryInRoomSearchForm").val();
		var a = $("#cityInRoomSearchForm").val();
		sessionStorage.setItem("selectedCity", a);
		sessionStorage.setItem("cityList", b.html());
		if (!StringUtils.isEmpty(d) && !StringUtils.isEmpty(a)) {
			jQuery.ajax({
				url : "/bp/includes/resorts_info.jsp?countryCode=" + encodeURIComponent(d) + "&cityCode=" + encodeURIComponent(a),
				type : "get",
				dataType : "html",
				success : function (e) {
					var g = $("select[name=srchResort]");
					var f = $("[data-hotel]");
					g.html(e);
					if (f.length) {
						g.val(f.data("hotel"))
					}
					if (undefined != window.repopResort && !window.repopResort == "") {
						g.find("option[value='" + window.repopResort + "']").attr("selected", "selected");
						window.repopResort = ""
					}
					if (g.dataNvl("uiCombobox", "combobox", "ui-combobox")) {
						g.combobox("refresh")
					}
					g.trigger("change")
				}
			})
		}
	}
}
function updateRatePlanLevels() {
	if ($("#srchResort").length) {
		if ($("#srchResort").val() != "ALL") {
			$.ajax({
				url : "/bp/get_lov.cmd",
				data : {
					command : "getRatePlanByResort",
					resort : $("select[name=srchResort]").val()
				},
				success : function (d) {
					var c = "An error occurred while attempting to retrieve the list of values from Opera. Check the specified request code to ensure the setup is correct and try again.";
					var a = [];
					if (d.success) {
						try {
							a.push('<option value=""></option>');
							$.each(d.list, function (e, f) {
								a.push('<option value="' + f.value + '">' + f.text + "</option>")
							});
							if (a.length > 1) {
								$(".rate-search").show();
								$("#rateCodeInRoomSearchForm").html(a.join(""))
							} else {
								$(".rate-search").hide()
							}
						} catch (b) {}

					}
				},
				error : function (b, c, a) {},
				dataType : "json"
			})
		}
	}
}
function getMinDate() {
	function c() {
		var g = new Date();
		var d = g.getFullYear();
		var h = g.getMonth();
		var i = g.getDate();
		return new Date(d, h, i)
	}
	var f = c();
	var a = $("#resortMinArrivalDate").val();
	if (typeof a === "undefined" || !a) {
		return f
	}
	var e = a.split("/");
	if (e.length != 3) {
		return currDate
	}
	var b = new Date(e[2], e[0] - 1, e[1]);
	return b
}
$(window).unload(function () {
	$(window).unbind("unload")
});
$(document).ready(function () {
	$("#promoCode").setUpperCaseInput();
	$("#groupCode").setUpperCaseInput();
	$("#corporateId").setUpperCaseInput();
	$("#IATANo").setUpperCaseInput();
	AvailabilityChecker.initializeDialogues();
	var c = getMinDate();
	var g = c.getFullYear();
	var f = $("#checkinYear");
	var e = $("#checkinMonth");
	var s = $("#checkinDay");
	var n = $("#checkoutYear");
	var j = $("#checkoutMonth");
	var p = $("#checkoutDay");
	var m = ($("#displayCheckoutDate").val() == "on");
	var r = (f.val() == g && e.val() == "1" && s.val() == "1" && n.val() == g && j.val() == "1" && p.val() == "1");
	if (r) {
		AvailabilityChecker.initCheckinDateCombo()
	}
	AvailabilityChecker.initCheckinDatePicker();
	if (m) {
		if (r) {
			AvailabilityChecker.initCheckoutDateCombo()
		}
		AvailabilityChecker.initCheckoutDatePicker()
	}
	AvailabilityChecker.initFlexibleTravelDates();
	if ($("#numberOfChildren").val() != 0) {
		var b = $("#numberOfChildren").val();
		if (b != 0) {
			$("#children").show();
			for (var l = 0; l < b; l++) {
				$("#divChild" + (l + 1)).show()
			}
		}
	}
	var a = $("#numberOfChildren");
	if (a.length) {
		a.bind("change", function () {
			var w = $(this);
			var v = w.find(":selected").val();
			var u = $("#checkinDay")[0].options.length;
			for (var t = 0; t < u; t++) {
				$("#divChild" + (t + 1)).hide()
			}
			if (v == 0) {
				$("#children").hide()
			} else {
				$("#children").show();
				for (var t = 0; t < v; t++) {
					$("#divChild" + (t + 1)).show()
				}
			}
			_redoTemplateLayout()
		})
	}
	s.bind("change", function () {
		_userClickedSelection = false;
		AvailabilityChecker.setCheckinDatepicker();
		if ($("#displayCheckoutDate").val() == "on") {
			AvailabilityChecker.updateCheckoutDate(1)
		} else {
			var i = $("#numberOfNights").find(":selected").val();
			AvailabilityChecker.updateCheckoutDate(i)
		}
	});
	e.bind("change", function () {
		_userClickedSelection = false;
		AvailabilityChecker.validateCheckinDay();
		AvailabilityChecker.setCheckinDatepicker();
		if ($("#displayCheckoutDate").val() == "on") {
			AvailabilityChecker.updateCheckoutDate(1)
		} else {
			var i = $("#numberOfNights").find(":selected").val();
			AvailabilityChecker.updateCheckoutDate(i)
		}
	});
	f.bind("change", function () {
		_userClickedSelection = false;
		AvailabilityChecker.validateCheckinDay();
		AvailabilityChecker.setCheckinDatepicker();
		if ($("#displayCheckoutDate").val() == "on") {
			AvailabilityChecker.updateCheckoutDate(1)
		} else {
			var i = $("#numberOfNights").find(":selected").val();
			AvailabilityChecker.updateCheckoutDate(i)
		}
	});
	if (m) {
		p.bind("change", function () {
			_userClickedSelection = false;
			AvailabilityChecker.validateCheckoutDay();
			AvailabilityChecker.setCheckoutDatepicker();
			AvailabilityChecker.adjustNumberOfNights()
		});
		j.bind("change", function () {
			_userClickedSelection = false;
			AvailabilityChecker.validateCheckoutMonth();
			AvailabilityChecker.validateCheckoutDay();
			AvailabilityChecker.setCheckoutDatepicker();
			AvailabilityChecker.adjustNumberOfNights()
		});
		n.bind("change", function () {
			_userClickedSelection = false;
			AvailabilityChecker.validateCheckoutYear();
			AvailabilityChecker.validateCheckoutMonth();
			AvailabilityChecker.validateCheckoutDay();
			AvailabilityChecker.setCheckoutDatepicker();
			AvailabilityChecker.adjustNumberOfNights()
		})
	} else {
		$("#numberOfNights").bind("change", function () {
			_userClickedSelection = false;
			var i = $("#numberOfNights").find(":selected").val();
			if ($("#displayNumNights").val() == "on") {
				AvailabilityChecker.updateCheckoutDate(i);
				AvailabilityChecker.setCheckoutDatepicker()
			}
		})
	}
	$(".flexible-search span.flex-trig").click(function () {
		DailyRates.init();
		DailyRates.setContainer(".datepick-popup");
		DailyRates.setFlexibleDates();
		var i = parseInt($("#checkinYear").find(":selected").val(), 10);
		var t = parseInt($("#checkinMonth").find(":selected").val(), 10);
		DailyRates.setDailyRate(i, t)
	});
	$("#checkout_time_hidden").hide();
	var k = sessionStorage.getItem("selectedCountry");
	var o = sessionStorage.getItem("selectedCity");
	var q = sessionStorage.getItem("countryList");
	var d = sessionStorage.getItem("cityList");
	if (typeof $("#cityInRoomSearchForm").val() != "undefined" && typeof $("#countryInRoomSearchForm").val() != "undefined") {
		if (k && q && q.indexOf(k) > -1) {
			$("#countryInRoomSearchForm").val(k);
			if (o && d && d.indexOf(o) > -1) {
				$("#cityInRoomSearchForm").html(d);
				$("#cityInRoomSearchForm").val(o)
			}
		}
		updateResorts();
		if ($("#srchResort")) {
			if ($("#srchResort").val() == "ALL") {
				if ($("#rateCodeInRoomSearchForm")) {
					$(".rate-search").hide()
				}
			} else {
				if ($("#rateCodeInRoomSearchForm")) {
					$(".rate-search").show()
				}
			}
		}
	}
	var h = $("#srchResort").val();
	if (h == "ALL") {
		$("#show_availability_calendar").hide();
		$("#promoCodegroupCode").hide();
		$("#searchByRoomTypeHide").hide();
		$("#searchByRoomAmenityHide").hide();
		$("#searchByRoomClassHide").hide();
		$(".iata, .corporate, .more-btn").hide();
		$("#mr").hide()
	}
	$("#srchResort").bind("change", function () {
		var w = $("#srchResort").val();
		var v = $("#srchRoomType").val();
		if (w == "ALL") {
			$("#show_availability_calendar").hide();
			$("#promoCodegroupCode").hide();
			$("#searchByRoomTypeHide").hide();
			$("#searchByRoomAmenityHide").hide();
			$(".rate-search").hide();
			$("#searchByRoomAmenityHide").hide();
			$("#searchByRoomClassHide").hide();
			$(".iata, .corporate, .more-btn").hide();
			$("#mr").hide();
			$("#SearchForm").attr("action", "/bp/search_regional.cmd")
		} else {
			$("#SearchForm").attr("action", "/bp/search_rooms.cmd");
			if ($("#searchByRoomAmenityHide").length != 0) {
				jQuery.ajax({
					url : "/bp/includes/search_by_amenities.jsp?hotel_code=" + w + "&room_type=" + v,
					type : "get",
					cache : false,
					dataType : "html",
					success : function (C) {
						$("#searchByRoomAmenityHide").html(C)
					}
				})
			}
			$("#show_availability_calendar").show();
			$("#promoCodegroupCode").show();
			$("#srchRoomType").html($("#srchRoomType-" + w).html());
			$("#searchByRoomTypeHide").show();
			$("#searchByRoomAmenityHide").show();
			$(".rate-search").show();
			$("#searchByRoomClassHide").show();
			$(".iata, .corporate, .more-btn").show();
			$("#mr").show()
		}
		if ($("#hotel_addr_info").length != 0) {
			jQuery.ajax({
				url : "/includes/hotel_address_info.jsp?hotel_code=" + w,
				type : "get",
				cache : false,
				dataType : "html",
				success : function (C) {
					$("#hotel_addr_info").html(C);
					if ($("#header_hotel_info").html() != "") {
						$("#header_hotel_info").html($("#hotel_addr_info").html())
					}
					if ($("#footer_hotel_info").html() != "") {
						$("#footer_hotel_info").html($("#hotel_addr_info").html())
					}
					$(".hotel_name").html($(".nodisplay_hotelname").html());
					$("#home_hotel_desc").html($(".nodisplay_hotelDesc").html());
					$("#home_hotel_name").html($(".nodisplay_hotelname").html());
					if ($("#map").length != 0) {
						$(".hotel-name").html($(".nodisplay_hotelname").html());
						$(".hotel-address").html($("#hotel_addr_info").html())
					}
				}
			})
		}
		var z = window.location.pathname;
		var y = "";
		var B = "";
		if (z == "/info/guestrooms.jsp" || z == "/info/packages.jsp") {
			if (w != "ALL") {
				B = "?srchResort=" + w
			}
			if (z == "/info/guestrooms.jsp") {
				y = "../info/guestrooms_body.jsp"
			}
			if (z == "/info/packages.jsp") {
				y = "../info/packages_body.jsp"
			}
			jQuery.ajax({
				url : y + B,
				type : "get",
				async : false,
				dataType : "html",
				success : function (C) {
					if (z == "/info/guestrooms.jsp") {
						$("#guestrooms_dynamic_list").html(C)
					}
					if (z == "/info/packages.jsp") {
						$("#packages_dynamic_list").html(C)
					}
				}
			})
		}
		updateRatePlanLevels();
		if ($("#lrblock").length != 0) {
			jQuery.ajax({
				url : "/includes/lead_rate_include.jsp?srchResort=" + w,
				type : "get",
				cache : false,
				dataType : "html",
				success : function (C) {
					$("#lrblock").html(C)
				}
			})
		}
		if ($("#map-scripts").length != 0) {
			var i = (w == "ALL") ? "" : "?hotel=" + w;
			jQuery.ajax({
				url : "/js/location_attraction_include.jsp" + i,
				type : "get",
				cache : false,
				dataType : "html",
				success : function (C) {
					$("#map-scripts").html("");
					$("#map-scripts").html(C);
					var D = location.href.indexOf("location_attraction") > 0 ? true : false;
					if (D) {
						initializeMap(true, true, true, true)
					} else {
						initializeMap(false, false, false, false)
					}
				}
			})
		}
		if ($("#header-links li a") != null) {
			$("#header-links li a").each(function () {
				if (this.id == "room-link" || this.id == "pkg-link" || this.id == "ams-link") {
					var C = this.href;
					if (C.indexOf("srchResort") > 0) {
						C = C.substring(0, C.indexOf("srchResort") - 1)
					}
					if (w == "ALL") {
						this.href = C
					} else {
						this.href = C + ((C.indexOf("?") > 0) ? "&" : "?") + "srchResort=" + w
					}
				}
			})
		}
		var x = $("#webhotel_logo");
		if (x.length) {
			var t = $(x[0]).width(),
			A = $(x[0]).height(),
			u;
			if (!t) {
				t = 205
			}
			if (!A) {
				A = 125
			}
			if (w == "ALL") {
				u = "width=" + t + "&height=" + A
			} else {
				u = "srchResort=" + w + "&width=" + t + "&height=" + A
			}
			jQuery.ajax({
				url : "/includes/logo_image.jsp?" + u,
				type : "get",
				dataType : "html",
				success : function (C) {
					if (C) {
						var D = $(C);
						$(".webhotel_logo").each(function (E, F) {
							var H = $(F),
							G = D.attr("alt"),
							I = D.attr("src");
							H.attr("title", G);
							H.attr("alt", G);
							if (I) {
								H.animate({
									opacity : 0.1
								}, 300, "linear", function () {
									$(this).attr("src", I).animate({
										opacity : 1
									}, 500, "linear")
								})
							}
						})
					}
				}
			})
		}
		if ($("title").text().indexOf("Home Page") > 0) {
			jQuery.ajax({
				url : "/includes/home_background.jsp?hotelCode=" + w,
				type : "get",
				dataType : "json",
				success : function (C) {
					if (C) {
						$("body").css({
							"background-image" : "url(" + C + ")"
						})
					}
				}
			})
		}
		if ($.updateSearchOptions !== undefined && $.isFunction($.updateSearchOptions)) {
			$.updateSearchOptions()
		}
		window.setTimeout(function () {
			try {
				$.redoTemplateLayout()
			} catch (C) {}

		}, 100)
	})
});