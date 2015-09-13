/* 
 * File:   SpikingEvaluator.cpp
 * Author: harveybc
 * 
 * Created on 8 de junio de 2015, 05:04 AM
 */

#include "SpikingEvaluator.h"

// sums the charge from SYNAPSES
float SpikingEvaluator::summation(Neuron &neuron){
    float acum=0;
    int syn_source, num_synapses;
    Neuron *source_neuron;
    Synapse *tmp_synapse;
    // sums strength for all synapses to a neuron
    num_synapses = neuron.synapses.size();
    for (int i = 0; i < num_synapses; i++){
        tmp_synapse =  &(neuron.synapses[i]);
         syn_source = tmp_synapse->source_id;
         source_neuron = &(neurons[syn_source]);
        // if the neuron is not evaluated, evaluates it before calculating acum
        if (!source_neuron->evaluated){ 
            evaluate_neuron(neurons[syn_source]);
        }
        // if the message is true, sums the weigth(charge) to the accumulator
        if (source_neuron->axon[tmp_synapse->segment] &
                source_neuron->axon[tmp_synapse->mask]){
            acum += tmp_synapse->strength;
        }
    }
    return acum;
}

 // true and starts refractory period if threshold < membrane potential 
bool SpikingEvaluator::action_potential(Neuron &tmp_neuron, int tf_result){
    char n_type = tmp_neuron.neuron_type;
    float tmp_Qm = tmp_neuron.Qm; // used for optimization
    // if there is no refractory period active
    if (tmp_neuron.remaining_refractory < 1){
        // sets the intrinsic currents for the tonic, bistable, pacemaker and random neurons
        if (n_type==1){ // Tonic Neuron
            
        }
        if (n_type==2){ // Bistable Neuron
            
        }
        if (n_type==3){ // Pacemaker Neuron
            
        }
        if (n_type==4){ // Random Neuron
            
        }
        // decreases membrane_potential with polarization factor
        tmp_Qm -= tmp_neuron.Qleak;
        // adds the transfer function to the membrane potential
        tmp_Qm += tf_result;
        // calculates output
        if (tmp_Qm > tmp_neuron.Qth){
            // polarize the membrane
            tmp_Qm = tmp_neuron.Qss;
            // starts the refractory period
            tmp_neuron.remaining_refractory 
                    = tmp_neuron.refractory_period;
            //outputs true signal
            tmp_neuron.Qm = tmp_Qm;
            return(true); 
        }
        else{
            tmp_neuron.Qm = tmp_Qm;
            return(false);
        }
    }
    else{
        tmp_neuron.refractory_period--;
        return(false);
    }
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
        tf_result = summation(FractalMachine:: get_syn_list(neuron_id));
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

