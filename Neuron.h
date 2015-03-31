/* 
 * File:   Neuron.h
 * Author: harveybc
 *
 * Created on 29 de marzo de 2015, 03:55 PM
 */

#ifndef NEURON_H
#define	NEURON_H

template <class MessageClass> ///< La clase MessageClass es el tipo de mensaje que se envía a otra neurona
class Neuron {
public:
    Neuron();
    Neuron(const Neuron& orig);
    virtual ~Neuron();
private:

};

#endif	/* NEURON_H */

