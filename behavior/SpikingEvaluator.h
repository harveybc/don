/* 
 * File:   SpikingEvaluator.h
 * Author: harveybc
 *
 * Models a neuron synapse of an artificial neural network (ANN) as a 
 * longitudinal physical axon of variable length with a traveling wave as 
 * codification of messages going over the synapse. 
 * 
 
 *  
 * Created on 8 de junio de 2015, 05:04 AM
 */

#ifndef SPIKINGEVALUATOR_H
#define	SPIKINGEVALUATOR_H
#include "NeuralNetwork.h"

class SpikingEvaluator: public NeuralNetwork {
public:
    int num_inputs;     // number of inputs
    int num_outputs;    // number of outputs     SpikingEvaluator(int n_inputs, int n_outputs);
    float summation(int neuron_id); // integrate neuron synapses
    bool action_potential(Neuron &tmp_neuron, float tf_result); // true and starts refractory period if  membrane potential > threshold
    // evaluation
    void evaluate();
    void evaluate_neuron(int neuron_id);    
    // visualization
    void visualize();   // calculate xyz coords, and colors for neurons and conex 
                        // and renders the neural network with it´s state in 
                        // unreal engine 4 (Neurons and segments)
    // constructors
    SpikingEvaluator::SpikingEvaluator(int n_inputs, int n_outputs);
    SpikingEvaluator(const SpikingEvaluator& orig);
    virtual ~SpikingEvaluator();
    
private:
    
};
#endif	/* SPIKINGEVALUATOR_H */

