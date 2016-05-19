# -*- coding: utf-8 -*-
"""
Created on Wed May 18 09:57:44 2016

@author: robertweigel
"""
# Based on
# https://thesamovar.wordpress.com/2009/03/22/fast-fractals-with-python-and-numpy/
def julia(n, m, itermax, xmin, xmax, ymin, ymax):
    ix, iy = mgrid[0:n, 0:m]
    img = zeros(ix.shape, dtype=int)
    ix.shape = n*m
    iy.shape = n*m
    x = linspace(xmin, xmax, n)[ix]
    y = linspace(ymin, ymax, m)[iy]
    z = x+complex(0,1)*y
    z.shape = n*m
    c = complex(0,0.75)
    print z.shape
    del x, y
    for i in xrange(itermax):
        multiply(z, z, z)
        add(z, c, z)
        rem = abs(z)>2.0
        img[ix[rem], iy[rem]] = exp(-abs(z[rem]))
        img[ix[rem], iy[rem]] = i+1
    return img
    
if __name__=='__main__':
    from pylab import *
    import time
    start = time.time()
    I = julia(800, 800, 300, -1.5, 1.5, -1.5, 1.5)
    print 'Time taken:', time.time()-start
    I[I==0] = 301
    fig, ax = subplots()    
    img = imshow(log(I.T), cmap='Greens', origin='lower left', extent=[0,1,0,1],interpolation="nearest")
    plt.axis('off')
    img.write_png('julia.png',noscale=True)
    show()