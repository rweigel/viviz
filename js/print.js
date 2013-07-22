function PrintElem (div_element)
{
	PopupWindow ($(div_element).html ());
}

function PopupWindow (div_html) 
{
	var popup_window = window.open ('', 'fullframe', 'height=1010,width=1225');
	popup_window.document.write ('<html><head><title>Print Window</title>');
	/*optional stylesheet*/ //popup_window.document.write ('<link rel="stylesheet" href="main.css" type="text/css" />');
	popup_window.document.write ('</head><body>');
	popup_window.document.write (div_html);
	popup_window.document.write ('</body></html>');

	popup_window.print ();
	popup_window.close ();

	return true;
}
