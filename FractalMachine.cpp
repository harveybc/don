/* 
 * File:   FractalMachine.cpp
 * Author: harveybc
 *
 * Executes the following instruction from a program from an instance, from a 
 * instances deque. If the program ends execution, itÂ´s instance is removed 
 * from the deque.
 * 
 * Created on 22 de junio de 2014, 08:37 PM
 */

#include "FractalMachine.h"
#include "DataSet.h"


void FractalMachine::add_instruction(FractalInstruction instr){
    instances.front().add_instruction(instr);
}

void FractalMachine::run_instruction(FractalInstruction instr){
    instances.front().add_instruction(instr);
    iterate();
}

void FractalMachine::run_program(){
    while (!instances.empty())
        iterate();
}

 std::vector<int> FractalMachine::get_syn_list(int neuron_target_id){
     return(syn_list[neuron_target_id]);
}

Synapse FractalMachine::get_synapse(int syn_id){
    return(synapses[syn_id]);
}

Neuron FractalMachine::get_neuron(int neuron_id){
    return(neurons[neuron_id]);
}

Instance FractalMachine::get_instance(int instance_id){
    return(instances[instance_id]);
}
 
void FractalMachine::reset() { ///< Erases all neurons, conex and instances, create instance 0
    Instance tmp_instance(0,0);
    int i;
    // clears all neurons, conex and instances
    neurons.clear();
    synapses.clear();
    instances.clear();
    // adds a new instance
    instances.push_back(tmp_instance);
    // sets program counter to 0
    instances[0].set_program_counter(0);
    // reset conn list
    for (i=0;i<syn_list.size();i++){
        syn_list[i].clear();
    }
    syn_list.clear();
}

void FractalMachine::iterate() { ///< Executes next instruction from the instance's queue
    Neuron tmp_neuron;
    FractalInstruction tmp_instruction;
    Synapse tmp_synapse;
    std::deque <FractalInstruction> tmp_instructions;
    Instance tmp_instance(0,0);
    std::vector <int> tmp_syn_index;
    tmp_syn_index.push_back(0); // adds an element to tmp_syn_index
    if (instances.size() > 0) {
        // Executes every command in the tape,later it is removed from instances         
        if (instances.front().fetch(tmp_instruction)) { 
            switch (tmp_instruction->id) {
                case 0: /// Wait(milliseconds)
                    std::this_thread::sleep_for(std::chrono::milliseconds(tmp_instruction->parameters_i[0]));
                break;
                case 1: /// CreateNeuron(int source_id, int recursive, int axon, bool evaluated, bool active)
                    tmp_neuron.set_neuron(
                        neurons.size(),                        // id
                        tmp_instruction->parameters_i[0],    // source_id  
                        tmp_instruction->parameters_i[1],    // recursive  
                        tmp_instruction->parameters_i[2],     // axon
                        tmp_instruction->parameters_b[0],    // evaluated
                        tmp_instruction->parameters_b[1]     // active
                    );
                    // adds the neuron
                    neurons.push_back(tmp_neuron);
                    // if neuron is recursive, a new instance is added
                    if (tmp_instruction->parameters_i[1] > 0){ // 0 evaluations
                        tmp_instance.set_instance(instances.size(), tmp_instruction->parameters_i[0]);
                        instances.push_back(tmp_instance);
                    }
                break;
                case 2: /// NeuronSetActive(int neuron_id, bool act)
                    neurons[tmp_instruction->parameters_i[0]].set_active(tmp_instruction->parameters_b[0]);
                break;
                case 3: /// TODO:: REMOVER NeuronSetEvaluated(int neuron_id, bool evaluated)
                    neurons[tmp_instruction->parameters_i[0]].set_evaluated(tmp_instruction->parameters_b[0]);
                break;
                case 4: /// NeuronAddAxon(int neuron_id, int num, float init_val)
                    neurons[tmp_instruction->parameters_i[0]].add_axon(tmp_instruction->parameters_i[1],
                            tmp_instruction->parameters_d[0]);
                break;
                case 5: /// NeuronSetRecursive(int neuron_id, int recursive)
                    // if neuron is not-evaluated, a new instance is added
                    if (tmp_instruction->parameters_i[1] > 0){ // >0 evaluations
                        // if the previous recursive was 0, adds an instance
                        if (neurons[tmp_instruction->parameters_i[0]].get_recursive()==0){
                            tmp_instance.set_instance(instances.size(), tmp_instruction->parameters_i[0]);
                            instances.push_back(tmp_instance);
                        }
                    }
                    neurons[tmp_instruction->parameters_i[0]].set_recursive(tmp_instruction->parameters_i[1]);
                    
                break;
                case 6: /// CreateSynapse(neuron_id_source, neuron_id_target, src_if, length,active)
                    tmp_synapse.set_conn(
                        synapses.size(),                 // connid
                        tmp_instruction->parameters_i[0],   // source_id (remote)
                        tmp_instruction->parameters_i[1],   // target_id (local)
                        tmp_instruction->parameters_i[2],   // source axon
                        tmp_instruction->parameters_d[0],   // weight    
                        tmp_instruction->parameters_d[1],   // length
                        tmp_instruction->parameters_d[2],   // speed
                        tmp_instruction->parameters_b[0]    // active
                    );
                    // adds the syn_index for easy ANN evaluation
                    syn_list[tmp_instruction->parameters_i[1]].push_back(synapses.size());
                    // calculates the segment
                    tmp_synapse.calculate_segment();
                    // verify the source axon size and increases it if needed
                    if (neurons[tmp_instruction->parameters_i[0]].axon[0].get_buffer_size()
                            <= tmp_synapse.get_segment()){
                        neurons[tmp_instruction->parameters_i[0]].axon[0].resize_buffer(tmp_synapse.get_segment()+1);
                    }
                    // adds synapse to the synapses deque
                    synapses.push_back(tmp_synapse);
                    
                break;
                case 7: /// SynapseSetWeight(int syn_id, float weight)
                    synapses[tmp_instruction->parameters_i[0]].set_weight(tmp_instruction->parameters_d[0]);
                break;
                case 8: /// SynapseSetLength(int syn_id, float length)
                    synapses[tmp_instruction->parameters_i[0]].set_length(tmp_instruction->parameters_d[1]);
                    // verify the source axon size and increases it if needed
                    if (neurons[tmp_instruction->parameters_i[0]].axon[0].get_buffer_size()
                            <= tmp_synapse.get_segment()){
                        neurons[tmp_instruction->parameters_i[0]].axon[0].resize_buffer(tmp_synapse.get_segment()+1);
                    }
               break;
                case 9: /// SynapseSetSpeed(int syn_id, float speed)
                    synapses[tmp_instruction->parameters_i[0]].set_speed(tmp_instruction->parameters_d[2]);
                    // verify the source axon size and increases it if needed
                    if (neurons[tmp_instruction->parameters_i[0]].axon[0].get_buffer_size()
                            <= tmp_synapse.get_segment()){
                        neurons[tmp_instruction->parameters_i[0]].axon[0].resize_buffer(tmp_synapse.get_segment()+1);
                    }
                break;
                case 10: /// SynapseSetActive(int syn_id, bool active)
                    synapses[tmp_instruction->parameters_i[0]].set_active(tmp_instruction->parameters_b[0]);
                break;                
                case 11: /// NeuronSetMembranePotential(int neuron_id, int axon_id, float m_pot)
                    neurons[tmp_instruction->parameters_i[0]].axon[tmp_instruction->parameters_i[1]].m_potential 
                            = tmp_instruction->parameters_d[0];
                break;                
                case 12: /// NeuronSetThreshold(int syn_id, int axon_id, float threshold)
                    neurons[tmp_instruction->parameters_i[0]].axon[tmp_instruction->parameters_i[1]].threshold
                            = tmp_instruction->parameters_d[0];
                break;                
                case 13: /// NeuronSetPolarizationFactor(int syn_id, int axon_id, float p_factor)
                    neurons[tmp_instruction->parameters_i[0]].axon[tmp_instruction->parameters_i[1]].threshold
                            = tmp_instruction->parameters_d[0];
                break;                
                case 14: /// NeuronSetRefractoryPeriod(int syn_id, int axon_id, int r_period)
                    neurons[tmp_instruction->parameters_i[0]].axon[tmp_instruction->parameters_i[1]].threshold
                            = tmp_instruction->parameters_i[2];
                break;                
                default:
                break;
            }
        }
        else{
            // if the front instance's base neuron has recursive > 0, 
            if (neurons[instances.front().get_base_neuron_id()].get_recursive()>0)
            // decreases recursive
            neurons[instances.front().get_base_neuron_id()].set_recursive(neurons[instances.front().get_base_neuron_id()].get_recursive()-1);    
            // sets front instance's program counter to 0
            instances.front().set_program_counter(0);
            // push the instance in the back of the deque
            instances.push_back(instances.front());
            // pop instance from front
            instances.pop_front();
            if (instances.size() > 0) {
                instances.front().set_program_counter(0);
            }
        }
    }
}

int FractalMachine::num_neurons(){    ///< returns the number of neurons
    return(neurons.size());
}

float FractalMachine::read_message(int neuron_id, int axon_id, int segment){   ///< reads a message from a axon
    return(neurons[neuron_id].axon[axon_id].read_msg(segment));
}
    
void FractalMachine::push_message(int neuron_id, int axon_id, float msg){    ///< puts a message in a axon and deletes the oldest one
    neurons[neuron_id].axon[axon_id].push_msg(msg);
}

void FractalMachine::set_neuron_evaluated(int neuron_id, bool eval){
    neurons[neuron_id].evaluated = eval;
}

void FractalMachine::reset_neurons(int num_inputs){
    int acum1 = num_inputs+1;
    int n_neurons = num_neurons();
    int i;
    for (i = acum1; i < n_neurons; i++){
        neurons[i].evaluated=false;
    }
    // sets the input and bias (num_inputs) neurons as evaluated
    for (i = 0; i <= num_inputs; i++){
        neurons[i].evaluated=true;
    }
}

bool FractalMachine::get_neuron_eval(int neuron_id){
    return (neurons[neuron_id].evaluated);
}

 // true and starts refractory period if threshold < membrane potential 
bool FractalMachine::action_potential(int neuron_id, int axon_id, int tf_result){
    // if there is no refractory period active
    if (neurons[neuron_id].axon[axon_id].remaining_refractory < 1){
        // if the neuron is a pacemaker (and not in refr period),returns starts 
        // refractory period again and outputs true
        if (neurons[neuron_id].axon[axon_id].pacemaker){
            // TODO: VERIFICAR http://animatlab.com/Help/Documentation/Neural-Network-Editor/Neural-Simulation-Plug-ins/Firing-Rate-Neural-Plug-in/Pacemaker-Neuron
        }
        // decreases membrane_potential with de polarization factor
        neurons[neuron_id].axon[axon_id].m_potential *= 
                neurons[neuron_id].axon[axon_id].polarization_factor;
        // adds the transfer function to the membrane potential
        neurons[neuron_id].axon[axon_id].m_potential += tf_result;
        // calculates output
        if (neurons[neuron_id].axon[axon_id].m_potential > 
                neurons[neuron_id].axon[axon_id].threshold){
            // polarize the membrane
            neurons[neuron_id].axon[axon_id].m_potential = 0;
            // starts the refractory period
            neurons[neuron_id].axon[axon_id].remaining_refractory = 
                    neurons[neuron_id].axon[axon_id].refractory_period;
            //outputs true signal
            return(true); 
        }
        else{
            return(false);
        }
    }
    else{
        neurons[neuron_id].axon[axon_id].refractory_period--;
        return(false);
    }
}

// true if remaining_refractory > 0
bool FractalMachine::get_refractory_state(int neuron_id, int axon_id){
    return(neurons[neuron_id].axon[axon_id].remaining_refractory > 0);
}

int FractalMachine::get_num_axon(int neuron_id){
    return(neurons[neuron_id].axon.size());
}

void FractalMachine::increase_membrane_potential(int neuron_id, int axon_id, float pot){
    neurons[neuron_id].axon[axon_id].m_potential += pot;
}

bool FractalMachine::refracted_neuron(int neuron_id){
    bool result=true;
    for (int i=0; i < neurons[neuron_id].axon.size(); i++){
        result = result && (neurons[neuron_id].axon[i].remaining_refractory>0);
    }
}

FractalMachine::FractalMachine() {
    /// reset
    reset();
}

FractalMachine::FractalMachine(const FractalMachine& orig) {
}

FractalMachine::~FractalMachine() {
}


//template class FractalMachine<Expert<float >,float >;