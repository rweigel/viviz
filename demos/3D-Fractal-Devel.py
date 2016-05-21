# -*- coding: utf-8 -*-
"""
Created on Thu May 19 23:02:25 2016

@author: robertweigel
"""

# -*- coding: utf-8 -*-
"""
Created on Wed May 18 09:57:44 2016

@author: robertweigel
"""
from pylab import *
c = complex(0,0.6)
n = 800
m = 800
xmin = -1.5
xmax = 1.5
ymin = -1.5
ymax = 1.5
itermax = 100
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

ix, iy = mgrid[0:n, 0:m]
ix.reshape(n,m)
iy.reshape(n,m)
img.reshape(n,m)
fig = plt.figure()
ax = fig.add_subplot(111, projection='3d')
ax.plot_surface(ix,iy,log(img),cmap='Greens',linewidth=0, antialiased=False)
draw()
