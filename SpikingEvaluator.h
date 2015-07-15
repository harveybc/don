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
    int get_inputs();
    int get_outputs();
    SpikingEvaluator(int n_inputs, int n_outputs);
    SpikingEvaluator(const SpikingEvaluator& orig);
    virtual ~SpikingEvaluator();
protected:    
    // activation and transfer functions to be implemented in derived classes (Activator)
    float activation_fcn(); // neuron output = activation_fcn(transfer_fcn(inputs))
    float transfer_fcn(int neuron_id); // neuron's transfer function
    // evaluation
    void evaluate();
    void evaluate_neuron(int neuron_id);    
    // visualization
    void visualize();   // calculate xyz coords, and colors for neurons and conex 
                        // and renders the neural network with it´s state in 
                        // unreal engine 4 (Neurons and segments)
private:
    int num_inputs;     // number of inputs
    int num_outputs;    // number of outputs 
};
#endif	/* SPIKINGEVALUATOR_H */

