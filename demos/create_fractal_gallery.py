# -*- coding: utf-8 -*-
"""
Created on Wed May 18 09:57:44 2016

@author: robertweigel
"""
def julia(c, n, m, itermax, xmin, xmax, ymin, ymax):
# Based on
# https://thesamovar.wordpress.com/2009/03/22/fast-fractals-with-python-and-numpy/
    ix, iy = mgrid[0:n, 0:m]
    img = zeros(ix.shape, dtype=int)
    ix.shape = n*m
    iy.shape = n*m
    x = linspace(xmin, xmax, n)[ix]
    y = linspace(ymin, ymax, m)[iy]
    z = x+complex(0,1)*y
    z.shape = n*m
    del x, y
    for i in xrange(itermax):
        multiply(z, z, z)
        add(z, c, z)
        rem = abs(z)>2.0
        img[ix[rem], iy[rem]] = i+1
        rem = ~rem
        z = z[rem]
        ix, iy = ix[rem], iy[rem]
    img[img==0] = 301
    return img
    
def render(c,w,h):
    plt.figure(0,figsize=(w,h))
    clf()
    cla()
    ax = axes([0.0, 0.0, 1.0, 1.0])
    plt.axis('off')
    plt.axis('equal')
    img = imshow(log(I.T), cmap='Greens', \
                    origin='lower left', \
                    interpolation="nearest")
    plt.text(400,775,"c = 0.00 + %.2fj" % imag(c), \
            horizontalalignment='center')
    draw()

def viviz(files):
    import os as os
    import json
    import webbrowser

    attributes = ['filename','c(real)','c(imag)']
    data  = [ 
    { 'id':'Julia Fractals', \
        'attributes': attributes, \
        'fulldir': 'demos/full/', 'thumbdir': 'demos/thumb/', \
        'files': files } ]
    dataj = json.dumps(data)
    
    # File must be named user.json.
    print "Saving ../catalogs/user.json"
    file = open("../catalogs/user.json", "w")
    file.write('VIVIZ["catalogs"]["User"] = ' + dataj)
    file.close()
    
    cwd = os.path.dirname(os.path.realpath(__file__))
    url = "file://" + cwd + "/../index.htm#catalog=User&mode=thumb"
    print "Attempting to open " + url 
    webbrowser.open(url,new=2)

if __name__=='__main__':
    from pylab import *
    N = 1
    Ci = linspace(0,1,N)
    n = 0;
    files = []
    for ci in Ci:
        c = complex(0,ci)
        I = julia(c, 800, 800, 100, -1.5, 1.5, -1.5, 1.5)
        
        render(c, 8, 8)
        savefig('full/julia_%03d.png' % n, bbox_inches=0, dpi=100)
        print "Wrote full/julia_%03d.png" % n
        
        render(c, 2, 2)
        savefig('thumb/julia_%03d.png' % n, bbox_inches=0, dpi=25)
        print "Wrote thumb/julia_%03d.png" % n

        files.append(['julia_%03d.png' % n, 0, '%.2f' % ci])
        n = n + 1
    viviz(files)