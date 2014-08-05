#!/usr/bin/perl
#Usage statement if input is off
$usage="Usage: roll.pl input.html -html htmloutputbase -js jsoutputbase -c compiler.jar (-e excludefile)\n";

#Find compiler based on where script is run from
if(-e "compiler.jar")
{
	$compiler="compiler.jar";
}
elsif(-e "build/compiler.jar")
{
	$compiler="../build/compiler.jar";
}

#Get html file to read from
$htmlin=shift;
if($htmlin!~/.+\.html/)
{
	print $usage and die;
}

#Get rest of naming and exlusion options (order independent switch)
$option = 1;
while(defined $option)
{
	OPTION: {
		$option eq '-html' and do {
			$html=shift;
			last OPTION;
		};
		$option eq '-js' and do {
			$js=shift;
			last OPTION;
		};
		$option eq '-e' and do {
			$exclude=shift;
			last OPTION;
		};
		$option eq '-c' and do {
			$compiler=shift;
			last OPTION;
		};
	}
	$option=shift;
}

print "--$compiler\n";
#If they didn't provide basenames
if(not defined $html or not defined $js)
{
	print $usage and die;
}

#Get html contents
open(FH,$htmlin);
@lines=<FH>;
close(FH);

#Command parameters to be built on
$tocat="cat ";
$toopt="java -jar $compiler";

#Extensions
$cat=$html . "-cat.html";
$opt=$html . "-min.html";
$catjs=$js . "-cat.js";
$optjs=$js . "-min.js";

#Open new html files for writing
open(CAT,">",$cat);
open(OPT,">",$opt);
$first=0;
$inbody=0;

#Loop through line contents
foreach $line(@lines)
 {
	if($line=~/\<body/) #Strip the body
	{
		$inbody=1;
		print CAT $line;
	}
	if($inbody==0)
	{
		if($line=~/="([^"]*\.js)"/ && $line!~/\<\!/)
		{
			if($1!~/$exclude/) #If it shouldn't be excluded, roll it and don't print
			{
			$toopt=$toopt . " --js $1 ";
			$tocat=$tocat . "$1 ";

			if($first==0) #Easiest to print the rolled js file as a replacement for the first js file found
				{
				$line=~s/="[^"]*\.js"/="$catjs"/;
				print CAT $line;
				$line=~s/$catjs/$optjs/;
				print OPT $line;
				$first=1;
				}

			}
			else #If it should be excluded from rolling, just print the line
			{
				print CAT $line;
				print OPT $line;
			}
		}
		else #If not a script line, just print
		{
			print CAT $line;
			print OPT $line;
		}
	} else {
		print CAT $line;
	}
	if($line=~/\<\/body\>/) #After body ends, re-enable printing (even if just for </html>)
	{
		$inbody=0;
		print CAT $line;
	}
 }

close(CAT);
close(OPT);

#Finish up commands and execute
$toopt=$toopt . " --js_output_file $optjs";
$tocat=$tocat . "> $catjs";

print "Evaluating $tocat\n";
system($tocat);
print "\nEvaluating $toopt\n";
system($toopt);


