function setWH(el,galleryid,GALLERYINFO) {
	var ar = el.naturalWidth/el.naturalHeight;

	if (VIVIZ[type+"Width"]) {
		VIVIZ[galleryid][type+"Width"] = VIVIZ[type+"Width"];
	}
	if (VIVIZ[type+"Height"]) {
		VIVIZ[galleryid][type+"Height"] = VIVIZ[type+"Height"];
	}

	if (!VIVIZ[galleryid][type+"Width"] && !VIVIZ[galleryid][type+"Height"]) {
		VIVIZ[galleryid][type+"Width"] = 1.0;
		VIVIZ[galleryid][type+"Height"] = 1.0;
		if ((GALLERYINFO["fulldir"] === GALLERYINFO["thumbdir"]) || (GALLERYINFO["thumbdir"] === "")) {
			VIVIZ[galleryid][type+"Width"] = 0.25;
			VIVIZ[galleryid][type+"Height"] = 0.25;
			console.log("gallery.firstimage(): Setting thumbnail ratio to be 25% of natural width and height because fulldir = thumbdir or thumbdir was not specified.")
		}
	}

	// Compute pixels if given fractions.
	if (VIVIZ[galleryid][type+"Width"]) {
		if (VIVIZ[galleryid][type+"Width"] > 1.0) {
			VIVIZ[galleryid][type+"Width"] = VIVIZ[galleryid][type+"Width"];
		} else {
			VIVIZ[galleryid][type+"Width"] = el.naturalWidth*VIVIZ[galleryid][type+"Width"];
		}
	}
	if (VIVIZ[galleryid][type+"Height"]) {
		if (VIVIZ[galleryid][type+"Height"] > 1.0) {
			VIVIZ[galleryid][type+"Height"] = VIVIZ[type+"Height"];
		} else {
			VIVIZ[galleryid][type+"Height"] = el.naturalHeight*VIVIZ[galleryid][type+"Height"];
		}
	}

	// Compute un-specified width or height.
	if (VIVIZ[galleryid][type+"Width"] && !VIVIZ[galleryid][type+"Height"]) {
		VIVIZ[galleryid][type+"Height"] = VIVIZ[galleryid][type+"Width"]/ar;
	}
	if (VIVIZ[galleryid][type+"Height"] && !VIVIZ[galleryid][type+"Width"]) {
		VIVIZ[galleryid][type+"Width"] = VIVIZ[galleryid][type+"Height"]*ar;
	}

	if (!VIVIZ[galleryid][type+"Height"]) {
		VIVIZ[galleryid][type+"Height"] = el.naturalHeight;
	}
	if (!VIVIZ[galleryid][type+"Width"]) {
		VIVIZ[galleryid][type+"Width"] = el.naturalWidth;
	}
	VIVIZ[galleryid][type+"NaturalHeight"] = el.naturalHeight;
	VIVIZ[galleryid][type+"NaturalWidth"] = el.naturalWidth;

	return true;
}
