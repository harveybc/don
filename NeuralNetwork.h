/* 
 * File:   NeuralNetwork.h
 * Author: harveybc
 *
 * Created on 14 de abril de 2015, 11:32 PM
 * 
 * Red neuronal creada con una neurona, sus interfaces son las entradas de la 
 * red, al crear la red también se crea una neurona adicional para cada salida.
 * 
 */

#ifndef NEURALNETWORK_H
#define	NEURALNETWORK_H
#include "Taxonomy.h"

//Es una taxonomía
template <class MessageClass>
class NeuralNetwork: public Taxonomy<Taxon, MessageClass> {
public:
    NeuralNetwork(int num_inputs, int num_outputs); // params: número de entradas y número de neuronas de salida 
    NeuralNetwork(const NeuralNetwork& orig);
    virtual ~NeuralNetwork();
private:
    double activationFcn(MessageClass x); // Función de activación seleccionada ejecuta: Salida = activationFcn(transferFcn(Conex(Intefaces(Segments))))
    double transferFcn(int node_id); // Función de transferencia
};
#endif	/* NEURALNETWORK_H */

