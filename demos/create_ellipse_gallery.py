# 1. Creates png files with ellipsis of various widths, heights,
#    and blue intensity.
# 2. Creates user.json with gallery configuration with file
#    list in fullfiles node and launches browser. Note that file
#    must be named user.json.

import matplotlib.pyplot as plt
from matplotlib.patches import Ellipse
import os as os
import json
import webbrowser

if os.path.isdir('thumb') == False:
    os.mkdir('thumb')
if os.path.isdir('full') == False:
    os.mkdir('full')

def plot_ellipse(w,h,b):
    fig = plt.figure(0)
    fig.clf()
    ax = fig.add_subplot(111, aspect='equal')
    e = Ellipse((0.,0.),w,h)
    e.set_facecolor((0.,0.,b))
    ax.add_artist(e)
    ax.set_xlim(-1., 1.)
    ax.set_ylim(-1., 1.)

N = 3;
i = 0
files = []
for b in range(N):
    for h in range(N):
        for w in range(N):
            W = 2.*(w+1.)/3.
            H = 2.*(h+1.)/3.
            B = (b+1.)/3.
            plot_ellipse(W,H,B)
            file = 'Ellipse_%04d.png' % i
            print "Saving {full/thumb}/" + file
            plt.savefig('full/' + file,dpi=100)
            plt.savefig('thumb/' + file,dpi=30)
            # List of files and their attributes
            files.append([file,float("%.2f" % W),float("%.2f" % H),float("%.2f" % B)])
            i = i + 1;

print files
# Gallery configuration object
attributes = ['filename','width','height','blue level']
filters = \
[ \
    [{}],\
    [{"name": "All widths", "value": "width > 0"},{"name": "Width greater than 1.5", "value": "width > 1.5"}], \
    [{}],\
    [{}],\
]
data  = [ 
{ 'id':'Ellipses', \
    'attributes': attributes, \
    'filters': filters, \
    'fulldir': 'demos/full/', 'thumbdir': 'demos/thumb/', \
    'files': files } ]
dataj = json.dumps(data)

# File must be named user.json.
print "Saving ../catalogs/user.json"
file = open("../catalogs/user.json", "w")
file.write('VIVIZ["catalogs"]["User"] =' + dataj)
file.close()

cwd = os.path.dirname(os.path.realpath(__file__))
url = "file://" + cwd + "/../index.htm#catalog=User&mode=thumb"
print "Attempting to open " + url 
webbrowser.open(url,new=2)