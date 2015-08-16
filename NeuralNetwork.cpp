/* 
 * File:   NeuralNetwork.cpp
 * Author: harveybc
 * 
 * Created on 14 de abril de 2015, 11:32 PM
 */

#include "NeuralNetwork.h"
// neuro evolution commands to be implemented in derived classes

void NeuralNetwork::create_neurons( int num_neurons) {
    Neuron tmp_neuron();
    for (int i = 0; i < num_neurons; i++) {
        neurons.push_back(tmp_neuron);
    }
}

void NeuralNetwork::create_synapse(int source , int target, float strength, 
        float length, char synapse_type){
    float tmp_f;
    float tmp_speed;
    Synapse tmp_synapse();
    tmp_synapse.source_id = source;
    tmp_synapse.strength = strength;
    tmp_synapse.length = length;
    tmp_synapse.synapse_type = synapse_type;
    tmp_speed = neurons[source].axon_speed;
    //calculate segment and offset
    if ( neurons[source].axon_speed > 0){
        tmp_f = ((length/neurons[source].axon_speed)/clock_tick)/32.0;
        tmp_synapse.segment = (int) tmp_f; ///<  truncates decimals to get remote axon segment of the synapse = length/speed  
        tmp_synapse.offset = (int)(32.0*(tmp_f-tmp_synapse.segment)); ///< the remainning decimals are multiplied by 32 to get the offset
    } 
    else{
        tmp_synapse.segment = 0; 
        tmp_synapse.offset = 0;
    }
    // calculate offset bit mask
    tmp_synapse.mask = 0x80000000 >> tmp_synapse.offset;
    if (synapse_type==9){ // axo-extracellular
    }   
    else if (synapse_type==10){ // axo-secretory
    }   
    neurons[target].synapses.push_back(tmp_synapse);
}

void NeuralNetwork::create_fully_connected_net(int num_inputs, int num_outputs) {
    int i, j;
    // resets fractal machine
    FractalMachine::reset();
    // adds input+output neurons
    create_neurons(num_inputs + num_outputs);
    // creates synapses from every input to each output
    // for each output
    for (i = 0; i < num_outputs; i++) {
        //  for each input
        for (j = 0; j < num_inputs; j++) {
            //creates the conex with len 0
            create_synapse(j, num_inputs + i, 7.5e-11 , 0, 1);
        }
    }
}

void NeuralNetwork::create_neuron_from_synapse(int neuron_id, int syn_id) {
    Synapse *tmp_syn = &(neurons[neuron_id].synapses[syn_id]);
    // creates a new neuron
    create_neurons(1);
    // disables the synapse
    tmp_syn->active = false;
    // creates a synapse from source to new
    create_synapse(tmp_syn->source_id, neurons.size() - 1,
            tmp_syn->strength, tmp_syn->length, tmp_syn->synapse_type);
    // creates a synapse from new to target
    create_synapse(neurons.size - 1, neuron_id, 7.5e-11,  0, 1); // speed = 1m/s
}

NeuralNetwork::NeuralNetwork(int num_inputs, int num_outputs) {
    // erasess all neurons and conex
    create_fully_connected_net(num_inputs, num_outputs);
}

NeuralNetwork::NeuralNetwork(const NeuralNetwork& orig) {
}

NeuralNetwork::~NeuralNetwork() {
}
// Dedicado a mi madre y a mi padre QEPD los amaré por siempre.


