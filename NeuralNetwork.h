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

class NeuralNetwork: public Taxonomy<Taxon, double> {
public:
    void push_input(int input_id, double msj_in); // descarta el mensaje más antiguo(front) e introduce el msj el el fin de la cola de entrada.
    void read_output(int output_id, double &msg_out); // obtiene el valor más nuevo de la interfaz de salida
    void evaluate(); // aplica la función de transferencia de la función de transferencia     
    void evaluateNode(int node_id); // marca un nodo como evaluado y evalúa el nodo
    NeuralNetwork(int num_inputs, int num_outputs); // params: número de entradas y número de neuronas de salida 
    NeuralNetwork(const NeuralNetwork& orig);
    virtual ~NeuralNetwork();
private:
    int num_inputs; // número de entradas
    int num_outputs; // número de salidas
    double activationFcn(double x); // Función de activación seleccionada ejecuta: Salida = activationFcn(transferFcn(Conex(Intefaces(Segments))))
    double transferFcn(int node_id); // Función de transferencia
};
#endif	/* NEURALNETWORK_H */

