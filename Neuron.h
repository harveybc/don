/* 
 * File:   Neuron.h
 * Author: harveybc
 *
 * I: La neurona lee datos desde una conexión a 
 * K: Es una taxonomía de un solo nodo con una sola interfaz de salida
 *    y varias conexiones como entradas.  
 * B: Al evaluarse se calcula la salida como la activationFcn() de la 
 *    transferFcn() 
 * 
 * Created on 29 de marzo de 2015, 03:55 PM
 */

#ifndef NEURON_H
#define	NEURON_H
#include "Taxonomy.h"
#include <math.h>

class Neuron: public Taxon<double> {
public:
    // Interfaces
    double activationFcn(double x); // Función de activación seleccionada ejecuta: Salida = activationFcn(transferFcn(Conex(Intefaces(Segments))))
    double transferFcn(std::vector<NodeConnection> &connections, std::vector<std::vector <std::deque <MessageClass> > > &interfaces); // Función de transferencia
    // Métodos    
    void evaluate(); // Evalúa la neurona, extrae dos valores de entrada y calcula la salida.
    Neuron(const Neuron& orig);
    virtual ~Neuron();
};

#endif	/* NEURON_H */

