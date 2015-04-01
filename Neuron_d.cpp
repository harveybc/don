/* 
 * File:   Neuron_d.cpp
 * Author: harveybc
 * 
 * Created on 29 de marzo de 2015, 05:32 PM
 */

#include "Neuron_d.h"

void Neuron_d::activationFcn(){
    //toma los primeros mensajes de cada interfaz_in
    //aplica la fdt
    //coloca los mensajes de salida en las interfaces_out
}

void calcularD(TConfig* conf)  //TODO, falta calcular params paa aproximaciones
{
    // para el tsigma escogido, calcula los par�metros (coeficientes ) de la funci�n fSigma seleccionada.
    if (conf->tSigma==0)  //con y(-1)=0, y(0)=1 y y(0.5)=0.5
    {
        conf->A = 10;
        conf->D = 1.04;
        conf->F = -0.2;
    }
    if (conf->tSigma==4)  //con y(-1)=0, y(0)=1 y y(0.5)=0.5
    {
        conf->A = 2.435;
        conf->D = 1.09626166044;
        conf->F = -0.09626166044;
    }
    if (conf->tSigma==1003)  //con y(-1)=0, y(0)=1 y y(0.5)=0.5
    {
        conf->A = 2.435;
        conf->D = 1.09626166044;
        conf->F = -0.09626166044;
    }

}

float fSigma(float fX, unsigned param, float fD, TConfig* conf)  //NO OPTIMA//TODO: usar INLINE si es posible
{
//fSigma, retorna un float corespondiente a la funcion de activaci�n seleccionada con param para una entrada X
//TODO: verificar rangos de entrada y salida de cada aprox sigma
    float y=0;
    //Param =	0 = sigma(0,1),		y = 1 / (1 + exp (- D * x)) -> corregido
    //		1 = sigma aprox (0,1)	y = 0.5 + x * (1 - abs(x) / 2), y=0 si x<=-1, y=1 si x>=1
    //		2 = elliot (0,1)	y = (x / 2) / (1 + |x|) + 0.5
    //		3 = binario (0,1)	y = x>=0 ? 1:0
    //		4 = gauss(0,1),		y = exp(- x * x)
    //		1000 = tanh(-1,1),		y = 2 / (1 + exp(-2 * x)) - 1
    //		1000 = elliot,(-1,1)	y = x / (1 + |x|)
    //		1002 = binario (-1,1) 	y = x=0 ? 1: -1;
    //		1003 = gaussAn (-1,1)	y= 2*exp(- x*x))-1
    if (param==0)
        return ((conf->D / (1.0 + exp (- conf->A * (fX+0.5))))+conf->F);
    if (param==1)
    {
        if (fX<=-1)
        {
            return (0);
        }
        if (fX>=1.0)
        {
            return (1.0);
        }
        if ((fX!=-1.0)&&(fX<1.0))
            y = 0.5 + fX * (1.0 - (fabs(fX) / 2.0));
        return (y);
    }
    if (param==2)
        return ((fX / 2.0) / (1.0 + fabs(fX)) + 0.5);
    if (param==3)
    {
        return (fX>=0 ? fX>=1 ? 0: cos(3.14*fX): fX<=-1 ? 0: fX+1) ;
        //return (fX>=0 ? fX>=1 ? 0: -fX+1: fX<=-1 ? 0: fX+1) ;  TODO: probando funci�n de activaci�n sinusoidal, podr�a usarse con valores fasoriales de entradas
    }
    if (param==4)
        //return (conf->D*exp(-conf->A*(fX * fX))+conf->F);
        return(exp(-conf->A*(fX * fX)));
    //return (exp(-3*(fX * fX)));
    if (param==1000)
        return (2.0 / (1.0 + exp(fX*-2.0)) - 1.0);

    if (param==1001)
        return (fX / (1.0 + fabs(fX)));
    if (param==1002)
    {
        return (fX>=0 ? 1.0:-1.0);
    }
    if (param==1003)
        return 2*(exp(-conf->A*(fX * fX)))-1;
    return(0);
}


Neuron_d::Neuron_d() {
}

Neuron_d::Neuron_d(const Neuron_d& orig) {
}

Neuron_d::~Neuron_d() {
}

