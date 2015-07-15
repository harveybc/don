/* 
 * File:   SpikingEvaluator.cpp
 * Author: harveybc
 * 
 * Created on 8 de junio de 2015, 05:04 AM
 */

#include "SpikingEvaluator.h"

int SpikingEvaluator::get_inputs(){
    return(num_inputs);
}

int SpikingEvaluator::get_outputs(){
    return(num_outputs);
}

// sums the charge from SYNAPSES
float SpikingEvaluator::transfer_fcn(int neuron_id){
    float acum=0;
    int i, syn_source;
    std::vector<int> syn_list;
    Synapse syn_tmp;
    syn_list = FractalMachine::get_syn_list(neuron_id);
    // sums (weight*taxon_id,if_id,segment) for all synapses to a neuron
    for (std::vector<int>::iterator it = syn_list.begin();it != syn_list.end()
            ;++it){
        syn_tmp = FractalMachine::synapses[ *it];
        syn_source = syn_tmp.source_id;
        // if the neuron is not evaluated, evaluates it before calculating acum
        if (FractalMachine::get_neuron_eval(syn_source)){ 
            evaluate_neuron(syn_source);
        }
        // if the message is true, sums the weigth(charge) to the accumulator
        if (FractalMachine::read_message(neuron_id, 0, syn_tmp.segment))
            acum += syn_tmp.weight;
    }
    return acum;
}

void SpikingEvaluator::evaluate(){
    float tmp_out;
    int i, acum1, acum2;
    int n_neurons = FractalMachine::num_neurons();
    acum1 = num_inputs+1;
    // sets evaluated flags to false for all the neurons except bias and input
    FractalMachine::reset_neurons(num_inputs);
    // evaluate each output neuron
    acum2 = acum1+num_outputs;
    for (i = acum1; i<acum2; i++){
        evaluate_neuron(i);
    }
}

// marca un nodo como evaluado y evalÃƒÆ’Ã‚Âºa el nodo
void SpikingEvaluator::evaluate_neuron(int neuron_id){
    int i, num_if;
    bool tmp_out;
    float tf_result;
    // marca el nodo como evaluado si no lo estaba
    if (!FractalMachine::get_neuron_eval(neuron_id)){
        FractalMachine::set_neuron_evaluated(neuron_id, true);
    } 
    else {
        return;
    }
    // calculates the transfer function if there is a non-refractory axon
    if (FractalMachine::refracted_neuron(neuron_id)){
        tf_result = transfer_fcn(neuron_id);
    }
    else{
        tf_result = 0;
    }
    // calculates the action potential for each axon
    num_if = FractalMachine::get_num_axon(neuron_id);
    for (i = 0; i < num_if; i++){
        //calculates  action potential 
        tmp_out = FractalMachine::action_potential(neuron_id,i,tf_result);
        // pushes the value to the axon and discards the oldest message (front)
        FractalMachine::push_message(neuron_id, i, tmp_out);
    }
}

// constructors

SpikingEvaluator::SpikingEvaluator(int n_inputs, int n_outputs):NeuralNetwork(int n_inputs, int n_outputs) {
}

SpikingEvaluator::SpikingEvaluator(const SpikingEvaluator& orig) {
}

SpikingEvaluator::~SpikingEvaluator() {
}

