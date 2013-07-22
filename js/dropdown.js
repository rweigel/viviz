function dropdown(ID, list, after){
	if (arguments.length < 3) {
		after = "#controls";
	}
	////console.log("dropdown.js: Called with second argument");
	////console.log(list);
	////console.log("dropdown.js: Existing: ");
	////console.log($(ID).html());
	if (typeof(list) != "object") {
		//console.log('dropdown.js: List is not an object.')
		return;
	}
	//$(after + " #" + ID).remove();
	$(after + " #" + ID).remove();
	if (Object.keys(list).length === 0) {
		return;
	}
    $(after).append('<select id="' + ID + '" title="' + list.Title + '" class="' + list.Class + '"></select>');
    for (var k = 0; k < list["Values"].length; k++) {
        VALUE = list["Values"][k]["Value"];
        TITLE = list["Values"][k]["Title"];
        if (k == 0) {
        	////console.log(after + ' #' + ID);
            $(after + ' #' + ID).append('<option value="' + VALUE + '" class="def">' + list.Titleshort + '</option>');
            $(after + ' #' + ID).append('<option value="' + VALUE + '" selected="true">' + TITLE + '</option>');
//            $(after + ' #' + ID).append('<option value="' + VALUE + '" selected>' + TITLE + '</option>');
        }
        else {
            $(after + ' #' + ID).append('<option value="' + VALUE + '">' + TITLE + '</option>');
        }
    }
}
