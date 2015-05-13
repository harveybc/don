/* 
 * File:   Expert.h
 * Author: harveybc
 *
 * Created on 29 de marzo de 2015, 04:16 PM
 */

#ifndef EXPERT_H
#define	EXPERT_H
#include "Taxon.h"

template <class MessageClass> ///< La clase MessageClass es el tipo de mensaje que se envía a otro experto
class Expert: public Taxon<MessageClass> {
public:
    void push_input(int input_id, double msj_in); // descarta el mensaje más antiguo(front) e introduce el msj el el fin de la cola de entrada.
    void read_output(int output_id, double &msg_out); // obtiene el valor más nuevo de la interfaz de salida
    void train(); // entrena el experto
    void evaluate(); // coloca un valor en la entrada y obtiene una salida 
    void evaluateNode(int node_id); // marca un nodo como evaluado y evalúa el nodo
    Expert();
    Expert(const Expert& orig);
    virtual ~Expert();
private:
    FractalMachine fractal; // conexiones entre taxonomías
    std::vector<int[3]> taxonomyIndex; // [FractalCoord, TaxonomiesIndex, TaxonomyIndex]
    std::deque<NeuralNetwork> taxonomies_ANN_bit;
    std::deque<NeuralNetwork> taxonomies_ANN_double;
    std::deque<NeuralNetwork> taxonomies_ANN_complex;
    int num_inputs; // número de entradas
    int num_outputs; // número de salidas
};

template <class MessageClass> ///< para IA, MessageClass=double
Expert<MessageClass>::Expert() {
}

template <class MessageClass> ///< para IA, MessageClass=double
Expert<MessageClass>::Expert(const Expert& orig) {
}

template <class MessageClass> ///< para IA, MessageClass=double
Expert<MessageClass>::~Expert() {
}

template class Expert<double>; //TODO : Implementación de experto de Complex ANNs

#endif	/* EXPERT_H */


