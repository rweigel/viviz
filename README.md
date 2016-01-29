# ViViz

Software for browsing, sorting, and subsetting pre-generated images in a web browser.  It is an out-growth of the [ViRBO](http://virbo.org/) project.

[Demo page](http://viviz.org/gallery/)

# Use

If remote images are available from an HTTP address and the filenames follow a simple pattern, the images may be viewed by appending parameters to the URL `http://viviz.org/#`.  For alternative usage, including for viewing local images, see [Installation](Installation).

**Example**

The directory http://sohowww.nascom.nasa.gov/data/synoptic/sunspots_earth/ contains image files of the form `sunspots_512_$Y$m$d.jpg`.

Use: 
http://viviz.org/#dir=http://sohowww.nascom.nasa.gov/data/synoptic/sunspots_earth/&strftime=sunspots_512_$Y$m$d.jpg&start=2006-01-20&stop=P0D

The directory contains images of two sizes.  To specify different full and thumbnail images, use

http://viviz.org/#dir=http://sohowww.nascom.nasa.gov/data/synoptic/sunspots_earth/&fullstrftime=sunspots_1024_$Y$m$d.jpg&thumbstrftime=sunspots_512_$Y$m$d.jpg&start=2006-01-20&stop=P0D

## Performance Hints

* Use thumbnail images.
* Use interlaced PNG encoding for large full-sized images.
* Use [https://pngquant.org/ PNGQuant] for compressing PNG images.

## Installation

### Basic

* Open http://viviz.org/gallery/index.htm
* Select `File > Save As > index.htm`
or
* `curl -O <nowiki>http://viviz.org/gallery/index.htm</nowiki>`
* Open the saved `index.htm` file in a web browser

To configure,
* Modify one of the gallery [[#Configuration|configuration]] examples at the top of `index.htm` with a text editor. 
or
* Append arguments to `index.htm`, e.g., 
:`<nowiki>index.htm#dir=file:///path/to/images/&strftime=...&start=...&stop=...</nowiki>`
:`<nowiki>index.htm#dir=dir=http://sohowww.nascom.nasa.gov/data/synoptic/sunspots_earth/&strftime=sunspots_512_$Y$m$d.jpg&start=2006-01-20&stop=P0D</nowiki>`

### Web Server

In this mode, directories for the location of the directory may be relative and the parameter `list` may be a relative path.  For absolute URLs, a [[#Full Application]] installation is required.

 curl http://viviz.org/gallery/index.htm > /server/root/dir/index.htm
or
 git pull http://github.com/rweigel/viviz

### Full Application

The full application includes a web server and a proxy server that retrieves remote file lists and remote catalogs and requires installation of [http://node.js/ Node].

```
 git pull http://github.com/rweigel/viviz
 cd viviz
 npm install
 node viviz.js --port 8002
```

and open http://localhost:8002/ with a web browser.

### Configuration

The variable `VIVIZ` in `index.htm` contains all of the application and gallery configuation options.

To see the gallery configuation for the gallery in view, select the Gallery configuration link.  See also `index.htm` for many examples of gallery configurations.

Any configuration option that appears in `VIVIZ["config"]` is over-ridden by a same-named option that appears in a gallery configuation or a parameter in the query string.

The main configuration parameters for a gallery are
* `fulldir` or `dir`: A URL to the location of full-sized image files (default is same directory of index.html)
* `thumbdir`: A URL to the location of reduced-size versions of the full-sized images (default is `fulldir`).
* `fullfiles` or `files`: A list of image filenames that are appended to `fulldir`.
* `thumbfiles`: A list of image filenames that are appended to `thumbdir` (default is `fullfiles`).  

The format of the lists is either a Javascript array of the form
```
[["demo-2001.png"],["demo-2002.png"],["demo-2003.png"],["demo-2004.png"]]
```
or a new-line separated list
```
"demo-2001.png\ndemo-2002.png\ndemo-2003.png\ndemo-2004.png"
```

When the list of files is long and the filenames have a pattern, the list of image URLs can be represented by `sprintf` or `strftime` along with `start` and `stop` indices or dates.
* `sprintf` is a [http://linux.die.net/man/3/sprintf formatted string expression]]
* `strftime` is a [http://linux.die.net/man/3/strftime formatted time string expression]
* `start`: Either an integer or a date
* `stop`: Either an integer or a date

When the list of full- or reduced-size image files cannot be desribed using the above parameters, the lists can be specified using `list` or `script`, where
* `list` is a [file](#File List) containing a list of image file names and their attributes. (Only available for web server and full install; for web server install, paths must be relative.)
* `script` is a [script](#Script) that generates a list of files.

If any of the above parameters (excluding `start` and `stop`) applies only to either the full- or reduced-sized images, the parameters should be prefixed by `full` or `thumb`, respectively.

### File List

Each image can have zero or more [[#Attributes|attributes]] that can be used to view a subset of the images.  The format is

```
 [
  ["file1.png", "attribute1", "attribute2", ..., "attributeM"],
  ...
  ["fileN.png", "attribute1", "attribute2", ..., "attributeM"]
 ]
```
where attributes that are numbers do not need to be quoted, or
```
  file1.png, attribute1, attribute2, ..., attributeM
  fileN.png, attribute1, attribute2, ..., attributeM
```
where all attributes are assumed to be strings unless they can be converted to floating point numbers.

### Script

Any Javascript code that can run in a browser is allowed and the functions [sprintf](https://github.com/alexei/sprintf.js) and [strftime](http://hacks.bluesmoon.info/strftime/strftime strftime) are available.

The following three examples create the same list of four files.

```javascript
	function () {
		files = []
		for (i = 0; i < 4; i++) {
			files[i] = ['demo-200' + (i+1) + '.png']
		}
		return files
	}
```

```javascript
	function () {
		files = []
		for (i = 0; i < 4; i++) {
			files[i] = ['demo-' + sprintf('%02d',i+1) + '.png']
		}
		return files
	}
```

```javascript
	function () {
		files = []
		for (i = 0; i < 4; i++) {
			files[i] = ['demo-' + strftime('%Y',2000+i+1) + '.png']
		}
		return files
	}
```

### Attributes and Filters

* Each image can have zero or more attributes and each attribute can have zero or more filters that allow for showing only a subset of images. 
* Filters expressions can be either regular expressions (for string attributes) or logical expressions (for numeric attributes).  To refer to the value of the attribute in logical expressions, use the `this` keyword.

When `strftime` has a year pattern (`$Y`), a drop-down menu is automatically created that allows viewing all of the images or only one year of images.

```
 file1.png, "AB", 4.0
 file2.png, "BC", 5.0
 ...
```

```javascript
[
	{
		"name": "Attribute 1",
		"filters":
			[
				{"name": "All", "value": ".*"},
				{"name": "Attribute 1 contains the letter C", "value": ".*C"},
			]
	},
	{
		"name": "Attribute 2",
		"unit": "nT&#183;hr",
		"format": "%.1f",
		"filters":
			[
				{"name": "All", "value": true},
				{"name": "Attribute 2 is greater than 4.0", "value": "this > 4.0"}
			]
	}
}
```
