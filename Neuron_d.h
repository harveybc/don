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
    Neuron_d();
    Neuron_d(const Neuron_d& orig);
    virtual ~Neuron_d();
private:

};

#endif	/* NEURON_D_H */

