function setWH(el, galleryid, GALLERYINFO, type) {

	console.log("setWH(): Computing width and height of " + type + " images based on image size and options.")
	var ar = el.naturalWidth/el.naturalHeight;

	if (type === "thumb") {
		if (!VIVIZ[galleryid][type+"Width"] && !VIVIZ[galleryid][type+"Height"]) {
			if ((GALLERYINFO["fulldir"] === GALLERYINFO["thumbdir"]) || (GALLERYINFO["thumbdir"] === "")) {
				if (!VIVIZ[galleryid][type+"Width"]) {
					console.log("setWH(): " + type + "Width was not given.")
					console.log("setWH(): Setting thumbnail width ratio to be 25% of natural width because fulldir = thumbdir or thumbdir was not specified.")
					VIVIZ[galleryid][type+"Width"] = 0.25;
				}
				if (!VIVIZ[galleryid][type+"Height"]) {
					console.log("setWH(): " + type + "Height was not given.")
					console.log("setWH(): Setting thumbnail height ratio to be 25% of natural width because fulldir = thumbdir or thumbdir was not specified.")
					VIVIZ[galleryid][type+"Height"] = 0.25;
				}
			} else {
				VIVIZ[galleryid][type+"Width"] = 1.0;
				VIVIZ[galleryid][type+"Height"] = 1.0;
			}
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
