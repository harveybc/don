/* 
 * File:   NeuralNetwork.cpp
 * Author: harveybc
 * 
 * Created on 14 de abril de 2015, 11:32 PM
 */

#include "NeuralNetwork.h"
// neuro evolution commands to be implemented in derived classes

void NeuralNetwork::create_neurons(int num_neurons){
    int par_i[] = {0,0,1};      // int source_id, int recursive, int axon
    int par_b[] = {false,true}; // bool evaluated, bool active
    std::vector<int> parameters_i (par_i, par_i + sizeof(par_i) / sizeof(int) );
    std::vector<bool> parameters_b (par_b, par_b + sizeof(par_b) / sizeof(bool) );
    std::vector<float> parameters_d;
    for (int i=0; i<num_neurons;i++){
        // 1: CreateNeuron(int source_id, int recursive, int axon, bool evaluated, bool active)
        FractalInstruction tmp_instr(
            1,  //instruction id
                parameters_b,
                parameters_i,
                parameters_d
        );
        FractalMachine::run_instruction(tmp_instr);
    }
}

void NeuralNetwork::create_synapse(int neuron_source, int neuron_target, int source_axon, 
        bool active, float weight, float length, float speed){
    // 6: CreateSynapse(int neuron_id_source, int neuron_id_target, int src_if, float weight,float length,float speed, bool active)
    int par_i[] = {neuron_source, neuron_target, source_axon}; // int source_id, int recursive, int axon
    int par_b[] = {active};       // bool active
    int par_d[] = {weight, length, speed};     // weight, length(m), spped (m/s)
    std::vector<int> parameters_i (par_i, par_i + sizeof(par_i) / sizeof(int) );
    std::vector<bool> parameters_b (par_b, par_b + sizeof(par_b) / sizeof(bool) );
    std::vector<float> parameters_d (par_d, par_d + sizeof(par_d) / sizeof(float) );
    FractalInstruction tmp_instr(
        6,  //instruction id
        parameters_b,
        parameters_i,
        parameters_d
    );
    FractalMachine::run_instruction(tmp_instr);
}

void NeuralNetwork::create_fully_connected_net(int num_inputs, int num_outputs){
    int i,j;
    // resets fractal machine
    FractalMachine::reset();
    // adds input+output neurons
    create_neurons(num_inputs + num_outputs);
    // creates synapses from every input to each output
    // for each output
    for (i=0;i<num_outputs;i++){
        //  for each input
        for (j=0; j<num_inputs;j++){
            //creates the conex with len 0
            create_synapse(j, num_inputs+i, true, 0, 1,10);
        }
    }
}

void NeuralNetwork::set_synapse_active(int syn_id, bool active){
    //  10: SynapseSetActive(int syn_id, bool active)
    int par_i[] = {syn_id};// int syn_id
    int par_b[] = {active}; // bool active
    int par_d[] = {};       // none
    std::vector<int> parameters_i (par_i, par_i + sizeof(par_i) / sizeof(int) );
    std::vector<bool> parameters_b (par_b, par_b + sizeof(par_b) / sizeof(bool) );
    std::vector<float> parameters_d (par_d, par_d + sizeof(par_d) / sizeof(float) );
    FractalInstruction tmp_instr(
        10,  //instruction id
        parameters_b,
        parameters_i,
        parameters_d
    );
    FractalMachine::run_instruction(tmp_instr); 
}

void NeuralNetwork::create_neuron_from_synapse(int syn_id){
    // 6: CreateSynapse(int neuron_id_source, int neuron_id_target, int src_if, float length, bool active)
    Synapse tmp_conn;
    // gets synapse
    FractalMachine::get_synapse(syn_id, tmp_conn);
    // creates a new neuron
    create_neurons(1);
    // disables the synapse
    set_synapse_active(syn_id, false);
    // creates a synapse from source to new
    create_synapse(tmp_conn.get_source(), FractalMachine::num_neurons()-1 , 
            tmp_conn.get_source_axon(), tmp_conn.get_active(), 
            tmp_conn.get_weight(), tmp_conn.get_length(),
            tmp_conn.get_speed());    
    // creates a synapse from new to target
    create_synapse(FractalMachine::num_neurons()-1, tmp_conn.get_target() , 
            0, true,    // source if=0, active= true
            1, 0,       // weight = 1, length = 0m
            10);    // speed = 10m/s
}

void NeuralNetwork::set_synapse_weight(int syn_id, float wt){
    //  7: SynapseSetWeight(int syn_id, float weight)
    int par_i[] = {syn_id};// syn_id
    int par_b[] = {};       // none
    int par_d[] = {wt};       // weight
    std::vector<int> parameters_i (par_i, par_i + sizeof(par_i) / sizeof(int) );
    std::vector<bool> parameters_b (par_b, par_b + sizeof(par_b) / sizeof(bool) );
    std::vector<float> parameters_d (par_d, par_d + sizeof(par_d) / sizeof(float) );
    FractalInstruction tmp_instr(
        7,  //instruction id
        parameters_b,
        parameters_i,
        parameters_d
    );
    FractalMachine::run_instruction(tmp_instr); 
}

void NeuralNetwork::set_synapse_length(int syn_id, float len){
    //  8: SynapseSetLength(int syn_id, float length)
    int par_i[] = {syn_id};// syn_id
    int par_b[] = {};       // none
    int par_d[] = {len};       // length
    std::vector<int> parameters_i (par_i, par_i + sizeof(par_i) / sizeof(int) );
    std::vector<bool> parameters_b (par_b, par_b + sizeof(par_b) / sizeof(bool) );
    std::vector<float> parameters_d (par_d, par_d + sizeof(par_d) / sizeof(float) );
    FractalInstruction tmp_instr(
        8,  //instruction id
        parameters_b,
        parameters_i,
        parameters_d
    );
    FractalMachine::run_instruction(tmp_instr); 
}

void NeuralNetwork::set_synapse_speed(int syn_id, float spd){
    //  9: SynapseSetSpeed(int syn_id, float speed)
    int par_i[] = {syn_id};// syn_id
    int par_b[] = {};       // none
    int par_d[] = {spd};       // speed
    std::vector<int> parameters_i (par_i, par_i + sizeof(par_i) / sizeof(int) );
    std::vector<bool> parameters_b (par_b, par_b + sizeof(par_b) / sizeof(bool) );
    std::vector<float> parameters_d (par_d, par_d + sizeof(par_d) / sizeof(float) );
    FractalInstruction tmp_instr(
        9,  //instruction id
        parameters_b,
        parameters_i,
        parameters_d
    );
    FractalMachine::run_instruction(tmp_instr); 
}

void NeuralNetwork::set_neuron_m_potential(int neuron_id, int if_id, float m_potential){
    //11: NeuronSetMembranePotential(int neuron_id, int axon_id, float m_pot)
    int par_i[] = {neuron_id, if_id}; // neuron_id, axon_id
    int par_b[] = {};               // none
    int par_d[] = {m_potential};    // m_pot
    std::vector<int> parameters_i (par_i, par_i + sizeof(par_i) / sizeof(int) );
    std::vector<bool> parameters_b (par_b, par_b + sizeof(par_b) / sizeof(bool) );
    std::vector<float> parameters_d (par_d, par_d + sizeof(par_d) / sizeof(float) );
    FractalInstruction tmp_instr(
        11,  //instruction id
        parameters_b,
        parameters_i,
        parameters_d
    );
    FractalMachine::run_instruction(tmp_instr); 
}

void set_neuron_threshold(int neuron_id, int if_id, float threshold){
    //12: NeuronSetThreshold(int syn_id, int axon_id, float threshold)
    int par_i[] = {neuron_id, if_id}; // neuron_id, axon_id
    int par_b[] = {};               // none
    int par_d[] = {threshold};    // m_pot
    std::vector<int> parameters_i (par_i, par_i + sizeof(par_i) / sizeof(int) );
    std::vector<bool> parameters_b (par_b, par_b + sizeof(par_b) / sizeof(bool) );
    std::vector<float> parameters_d (par_d, par_d + sizeof(par_d) / sizeof(float) );
    FractalInstruction tmp_instr(
        12,  //instruction id
        parameters_b,
        parameters_i,
        parameters_d
    );
    FractalMachine::run_instruction(tmp_instr); 
}  

void set_neuron_polarization_factor(int neuron_id, int if_id, float p_factor){
    //13: NeuronSetPolarizationFactor(int syn_id, int axon_id, float p_factor)
    int par_i[] = {neuron_id, if_id}; // neuron_id, axon_id
    int par_b[] = {};               // none
    int par_d[] = {p_factor};    // polarization factor
    std::vector<int> parameters_i (par_i, par_i + sizeof(par_i) / sizeof(int) );
    std::vector<bool> parameters_b (par_b, par_b + sizeof(par_b) / sizeof(bool) );
    std::vector<float> parameters_d (par_d, par_d + sizeof(par_d) / sizeof(float) );
    FractalInstruction tmp_instr(
        13,  //instruction id
        parameters_b,
        parameters_i,
        parameters_d
    );
    FractalMachine::run_instruction(tmp_instr); 
} 

void set_neuron_refractory_period(int neuron_id, int if_id, int r_period){
    //14: NeuronSetRefractoryPeriod(int syn_id, int axon_id, int r_period)        
    int par_i[] = {neuron_id, if_id, r_period}; // neuron_id, axon_id
    int par_b[] = {};               // none
    int par_d[] = {};    // polarization factor
    std::vector<int> parameters_i (par_i, par_i + sizeof(par_i) / sizeof(int) );
    std::vector<bool> parameters_b (par_b, par_b + sizeof(par_b) / sizeof(bool) );
    std::vector<float> parameters_d (par_d, par_d + sizeof(par_d) / sizeof(float) );
    FractalInstruction tmp_instr(
        14,  //instruction id
        parameters_b,
        parameters_i,
        parameters_d
    );
    FractalMachine::run_instruction(tmp_instr); 
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


