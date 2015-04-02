/* 
 * File:   Neuron_d.cpp
 * Author: harveybc
 * 
 * Created on 29 de marzo de 2015, 05:32 PM
 */

#include "Neuron_d.h"
#include <math.h>

void Neuron_d::activationFcn(){ ///< Calcula las salidas como función de las entradas
    // lee los primeros mensajes de cada conex de entrada
    // multiplica cada peso
    // acumula
    // aplica la fdt
    // coloca los mensajes de salida en las interfaces_out
}

double fGauss(double x)  //NO OPTIMA//TODO: usar INLINE si es posible // calcula gauss de x
{   //		1003 = gaussAn (-1,1)	y= 2*exp(- x*x))-1
    return(2*(exp(-10*(x * x)))-1);
}

Neuron_d::Neuron_d() {
}

Neuron_d::Neuron_d(const Neuron_d& orig) {
}

Neuron_d::~Neuron_d() {
}

