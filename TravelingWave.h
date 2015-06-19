/* 
 * File:   TravelingWave.h
 * Author: harveybc
 *
 * Models a node connection of an artificial neural network (ANN) as a 
 * longitudinal physical media of variable length with a traveling wave as 
 * codification of messages going over the connection. 
 * 
 
 *  
 * Created on 8 de junio de 2015, 05:04 AM
 */

#ifndef TRAVELINGWAVE_H
#define	TRAVELINGWAVE_H
#include "NeuralNetwork.h"

class TravelingWave: public NeuralNetwork {
public:
    int get_inputs();
    int get_outputs();
    TravelingWave(int n_inputs, int n_outputs);
    TravelingWave(const TravelingWave& orig);
    virtual ~TravelingWave();
protected:    
    // activation and transfer functions to be implemented in derived classes (Activator)
    double activation_fcn(); // neuron output = activation_fcn(transfer_fcn(inputs))
    double transfer_fcn(int node_id); // neuron's transfer function
    // evaluation
    void evaluate();
    void evaluate_node(int node_id);    
    // visualization
    void visualize();   // calculate xyz coords, and colors for nodes and conex 
                        // and renders the neural network with it´s state in 
                        // unreal engine 4 (Nodes and segments)
private:
    // bias is neuron 0
    int num_inputs;     // number of inputs
    int num_outputs;    // number of outputs 
};
#endif	/* TRAVELINGWAVE_H */

