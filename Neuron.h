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
    virtual void activationFcn(); // Función de activación seleccionada
    void evaluate();
    void writeInput(MessageClass msg, int if_in);
    void writeOutput(MessageClass msg, int if_out);
    // TODO: void writeInputBlock()
    // TODO: void writeOutputBlock()
    Neuron();
    Neuron(const Neuron& orig);
    virtual ~Neuron();
private:

};

template <class MessageClass> ///< para ANNs, MessageClass=double (TODO: complejos y vectores)
void Neuron<MessageClass>::evaluate() {
    // para cada conexión hace push_back de un mensaje remoto (0 si no hay en el msgbuf_out del remoto)
    // hace 
    // hace salidas = activationFcn(Entradas)
    // calcula la sumatoria de (mensajes de entrada * peso de conex )
    // llama a activationFcn
}

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

