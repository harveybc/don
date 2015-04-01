/* 
 * File:   Neuron.h
 * Author: harveybc
 *
 * Created on 29 de marzo de 2015, 03:55 PM
 */

#ifndef NEURON_H
#define	NEURON_H
#include "Taxon.h"

template <class MessageClass> ///< La clase MessageClass es el tipo de mensaje que se envía a otra neurona
class Neuron: public Taxon<MessageClass> {
public:
    Neuron();
    Neuron(const Neuron& orig);
    virtual ~Neuron();
private:

};

template <class MessageClass> ///< para ANNs, MessageClass=double (TODO: complejos y vectores)
Neuron<MessageClass>::Neuron() {
}

template <class MessageClass> ///< para IA, taxonClass=Expert
Neuron<MessageClass>::Neuron(const Neuron& orig) {
}

template <class MessageClass> ///< para IA, taxonClass=Expert
Neuron<MessageClass>::~Neuron() {
}

template class Neuron<double>; //TODO : Implementación de neurona para experto de Complex ANNs

#endif	/* NEURON_H */

