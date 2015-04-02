/* 
 * File:   Neuron_d.h
 * Author: harveybc
 *
 * Created on 29 de marzo de 2015, 05:32 PM
 */

#ifndef NEURON_D_H
#define	NEURON_D_H
#include "Neuron.h"

class Neuron_d: public Neuron<double> {
public:
    
    void activationFcn(); 
    void evaluate(); 
    Neuron_d();
    Neuron_d(const Neuron_d& orig);
    virtual ~Neuron_d();
private:
    double fSigma(double v_X, double coef_a);  //NO OPTIMA//TODO: usar INLINE si es posible
    double threshold; //
};

#endif	/* NEURON_D_H */

