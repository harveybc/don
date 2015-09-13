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

Instance FractalMachine::get_instance(int instance_id){
    return(instances[instance_id]);
}
 
void FractalMachine::reset() { ///< Erases all neurons, conex and instances, create instance 0
    Instance tmp_instance(0,0);
    int i;
    // clears all neurons, conex and instances
    neurons.clear();
    instances.clear();
    // adds a new instance
    instances.push_back(tmp_instance);
    // sets program counter to 0
    instances[0].set_program_counter(0);
}

void FractalMachine::iterate() { ///< Executes next instruction from the instance's queue
    Instance tmp_instance;
    FractalInstruction tmp_instruction;
    if (instances.size() > 0) {
        // Executes every command in the tape,later it is removed from instances         
        if (instances.front().fetch(tmp_instruction)) { 
            switch (tmp_instruction->id) {
                case 0: /// Wait(milliseconds)
                    //std::this_thread::sleep_for(std::chrono::milliseconds(tmp_instruction->parameters_i[0]));
                break;
                case 1: /// CreateNeuron()
                    Neuron tmp_neuron               
                    {
                        // general attributes
                        tmp_instruction->parameters_i[0], //int parent_id_,  ///< Parent neuron's identification number
                        tmp_instruction->parameters_i[1], //int recursive_,  ///< Number of times this neuron must be evaluated
                        tmp_instruction->parameters_b[0], //bool active_,    ///< FALSE when the neuron is deleted
                        // neural network flags
                        tmp_instruction->parameters_b[1], //bool evaluated_, ///< TRUE if neuron has been evaluated
                        tmp_instruction->parameters_i[2], //char neuron_type_,  ///< 0=normal, 1=Tonic, 2=Bistable, 3=Pacemaker, 4=Random
                        // membrane attributes for model with intrinsic currents from (Beer, 1990) not for voltage but charge (integrating model over time)
                        tmp_instruction->parameters_f[0], //float Qm_,     ///< membrane charge (def: -70mv*10nF)
                        tmp_instruction->parameters_f[1], //float Cm_,      ///< membrane capacintance (def: 10nF)
                        tmp_instruction->parameters_f[2], //float Gm_,     ///< membrane conductance (def: 100nS)
                        tmp_instruction->parameters_f[3], //float Qth_,   ///< membrane charge threshold (def:-55mV*10nF Coulombs))
                        tmp_instruction->parameters_f[4], //float Qss_,    ///< membrane steady state (resting) charge (def: -70mv*10nF)
                        // intrinsic currents for pacemaker neurons (Beer, 1990) 
                        tmp_instruction->parameters_f[5], //float Q_min_, ///< membrane intrinsic current charge threshold (-54mV*10nF)
                        tmp_instruction->parameters_f[6], //float Ih_,        ///< intrinsic depolarizing current
                        tmp_instruction->parameters_f[7], //float Il_,       ///< intrinsic hyperpolarizing current
                        tmp_instruction->parameters_f[8], //float Th_,         ///< time Ih should remain active (def:100ms)
                        tmp_instruction->parameters_f[9], //float Mtl_,              ///< slope of line used to calculate Tl
                        tmp_instruction->parameters_f[10], //float Btl_,              ///< initial time used to calculate Tl
                        // action potential timming
                        tmp_instruction->parameters_i[3], //int action_potential_period_,  ///< duration of action potential polarization and depolarization
                        tmp_instruction->parameters_i[4], //int remaining_action_potential_,   ///< remaining time of action potential
                        tmp_instruction->parameters_i[5], //int refractory_period_,        ///< refractory period in milliseconds
                        tmp_instruction->parameters_i[6], //int remaining_refractory_,     ///< rremaining refractory period in milliseconds
                        // synaptogenesis and neurogenesis and prunning
                        tmp_instruction->parameters_f[11], //float prob_synaptogenesis_,    ///< increases with neural activity, if negative, is probability of synaptic prunnig
                        tmp_instruction->parameters_f[12], //float prob_neurogenesis_,      ///< increases with local complexity if negative, is probability of neural prunnig
                        // extracellular activity (neurotransmitters, receptors and modulators)
                        tmp_instruction->parameters_f[13], //float synapse_neurotransmitter_, 
                        tmp_instruction->parameters_f[14], //float synapse_receptor_, 
                        tmp_instruction->parameters_f[15], //float secreted_neurotransmitter_, // for volume transfer synapses
                        tmp_instruction->parameters_f[16], //float inhibiting_neuro_receptor_, 
                        tmp_instruction->parameters_f[17], //float stimulating_neuro_receptor_,
                        tmp_instruction->parameters_f[18], //float inhibiting_neuro_modulator_,
                        tmp_instruction->parameters_f[19]  //float stimulating_neuro_modulator_
                    };
                    // adds the neuron
                    neurons.push_back(tmp_neuron);
                    // if neuron is recursive, a new instance is added
                    if (tmp_instruction->parameters_i[1] > 0){ // 0 evaluations
                        tmp_instance.set_instance(instances.size(), tmp_instruction->parameters_i[0]);
                        instances.push_back(tmp_instance);
                    }
                break;
                case 2: /// CreateSynapse()
                    Synapse tmp_synapse
                    {
                        // attributes
                        tmp_instruction->parameters_i[0], //int source_id_, ///< remote source neuron identification
                        tmp_instruction->parameters_b[0], //bool active_, ///< FALSE when the neuron is deleted
                        tmp_instruction->parameters_f[0], //float strength_, ///< Synapse strength in Coulombs/spike
                        tmp_instruction->parameters_i[1], //char synapse_type_, ///< 0=axodendritic, 1=axoaxonic, 2=axoextracellular, 3=axosecretory
                        // short term plasticity 
                        tmp_instruction->parameters_b[1], //bool short_term_plasticity_, ///< true = short term non-hebbian learning (presynaptic) 
                        tmp_instruction->parameters_i[2], //int stp_critical_period_, ///< time to return to baseline strength
                        tmp_instruction->parameters_i[3], //int stp_recovery_period_, ///< period for spike counting (in ms)    
                        tmp_instruction->parameters_f[1], //float stp_max_intensity_,  ///< initial stp intensity as a fraction of str, can be negative for st-depression         
                        tmp_instruction->parameters_i[4], //int stp_depletion_rate_,     ///<  stp depletion in Coulombs/clock_tick = max_intensity/recovery_period
                        tmp_instruction->parameters_i[5], //int stp_remaining_recovery_, ///<  remaining ticks to recovery
                        tmp_instruction->parameters_f[2], //float stp_, ///< stp magnitude added to strength per tick 
                        // long term plasticity 
                        tmp_instruction->parameters_b[2], //bool long_term_plasticity_, ///< true = persistent hebbian learning (presynaptic) 
                        tmp_instruction->parameters_i[6], //int ltp_critical_period_, ///<  period for presynaptic to postsynaptic spike phase calculus (in ms)    
                        tmp_instruction->parameters_i[7], //int ltp_recovery_period_, ///< time to return to baseline strenth
                        tmp_instruction->parameters_f[3], //float ltp_max_intensity_,  ///< initial ltp intensity as a fraction of str, can be negative for st-depression         
                        tmp_instruction->parameters_i[8], //int ltp_depletion_rate_, ///<  stp depletion in Coulombs/clock_tick = max_intensity/recovery_period
                        tmp_instruction->parameters_i[9], //int ltp_remaining_recovery_, ///<  remaining ticks to recovery
                        tmp_instruction->parameters_f[4], //float ltp_, ///< ltp magnitude added to strength per tick 
                        // persistent long term plasticity
                        tmp_instruction->parameters_b[3], //bool persistent_plasticity_, ///< a fraction of ltp is modified in baseline strength permanently if true
                        tmp_instruction->parameters_f[5], //float persistent_change_factor_, ///< fraction of ltp that becomes permanent change in strength
                        // trveling wave parameters
                        tmp_instruction->parameters_f[6], //float length_, ///< synapse length, regulates phase
                        tmp_instruction->parameters_f[7]  //float speed_ ///< synapse radius, regulates propagation speed                    
                    };                        
                    // verify the source axon size and increases it if needed
                    if (neurons[tmp_instruction->parameters_i[0]].axon.size()
                            <= tmp_synapse.segment){
                        neurons[tmp_instruction->parameters_i[0]].axon.resize(tmp_synapse.segment+1,0);
                    }
                    // adds synapse to the synapses deque parameters_i[10] is the target_id
                    neurons[tmp_instruction->parameters_i[10]].synapses.push_back(tmp_synapse);
                break;
                default:
                break;
            }
        }
        else{
            // if the front instance's base neuron has recursive > 0, 
            if (neurons[instances.front().get_base_neuron_id()].recursive > 0){
                // decreases recursive
                neurons[instances.front().get_base_neuron_id()].recursive = neurons[instances.front().get_base_neuron_id()].recursive - 1;    
                // sets front instance's program counter to 0
                instances.front().set_program_counter(0);
                // push the instance in the back of the deque
                instances.push_back(instances.front());
            }
            // pop instance from front
            instances.pop_front();
            if (instances.size() > 0) {
                instances.front().set_program_counter(0);
            }
        }
    }
}

void FractalMachine::reset_neurons(int num_inputs){
    int acum1 = num_inputs+1;
    int n_neurons = neurons.size();
    int i;
    for (i = acum1; i < n_neurons; i++){
        neurons[i].evaluated=false;
    }
    // sets the input and bias (num_inputs) neurons as evaluated
    for (i = 0; i <= num_inputs; i++){
        neurons[i].evaluated=true;
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