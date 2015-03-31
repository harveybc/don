/* 
 * File:   Neuron.cpp
 * Author: harveybc
 * 
 * Created on 29 de marzo de 2015, 03:55 PM
 */

#include "Neuron.h"

template <class MessageClass> ///< para ANNs, MessageClass=double (TODO: complejos y vectores)
Neuron<MessageClass>::Neuron() {
}

template <class MessageClass> ///< para IA, taxonClass=Expert
Neuron<MessageClass>::Neuron(const Neuron& orig) {
}

template <class MessageClass> ///< para IA, taxonClass=Expert
Neuron<MessageClass>::~Neuron() {
}

