function dropdown2(ids, names, funs, after, i, selected) {

	if (arguments.length < 5) {i = 0};
	if (arguments.length < 6) {selected = ""};

	if (i == ids.length) {return;}
	
	function settoggle(i) {
		$("#list"+ids[i]).unbind('click');
		$("#list"+ids[i]).
			click(function (){$("#"+ids[i]).attr('value','').css('color','black').autocomplete('search').focus();});

//			toggle(
//				function (){$("#"+ids[i]).attr('value','').css('color','black').autocomplete('search').focus();},
//				function (){$("#"+ids[i]).attr('value','-'+names[i]+'-').css('color','black').autocomplete('close');}
//			);
	}
	console.log("dropdown2: Creating dropdown " + i);
	function ac(i) {
		$("#"+ids[i]).autocomplete({
			source: funs[i](selected),
			close: function(event,ui) {
				settoggle(ids[i]);
				if ($(this).attr('value') == "")
				$("#"+ids[i]).attr('value','-'+names[i]+'-').css('color','black');
				//console.log(list);
				//console.log("dropdown2: close event triggered.");
			},
			change: function(event,ui) {
				console.log("dropdown2: Change event triggered on " + i);				
				// This is to deal with the fact that change() is called on a blur event.
				if (ui.item.value !== ui.item.valuelast) {
					console.log("           and value has changed.  Removing " + after+(i+1));
					$(after+(i+1)).html('');
				} else {
					console.log("           and value has not changed.  Not removing " + after+(i+1));
				}
			},			
			select: function(event,ui) {
						console.log("dropdown2: Select event triggered on " + i + " with value " + ui.item.value);
						dropdown2(ids, names, funs, after, i+1, ui.item.value);
						//$('#dropdowns'+(i+1)).html('Hello');
						$('#dropdowns'+(i+1)).show();
						ui.item.valuelast = ui.item.value;
						//settoggle();							
			},
			minLength: 0
		}).click(function () {
			$(this).attr('value','').css('color','black').autocomplete('search');
			//$("#list"+ids[i]).click();
		});
	}

	//console.log(after+ids[i]);
	$(after+(i))
		.append('<span class="ui-widget" style="display:table;width:100%;border:1px solid black;"></span>');
	$(after + (i) + " .ui-widget")
		.append('<span class="dropdown2" style="width:2px;display:table-cell"></span>')
		.append('<input id="'+ids[i]+'" class="dropdown2"  title="Enter text to search list" style="width:100%;display:table-cell;color:black;font-weight:bold;text-align:center;" value="-'+names[i]+'-"/>')
		.append('<span class="dropdown2" style="width:5px;display:table-cell"></span>')
		.append('<label id="list'+ids[i]+'" class="dropdown2" title="Show full list" style="width:1em;display:table-cell;cursor:pointer">&#9660;</label>');
	
	ac(i);
	settoggle(i);

}