/* *
 * File:   Synapse.cpp
 * Author: harveybc
 * 
 * Created on 3 de junio de 2015, 04:39 PM
 */

#include "Synapse.h"
/*
Synapse::Synapse(
        uint32_t source_id_,// remote source neuron identification
        bool active_,       // FALSE when the synapse is deleted, also become recesive gene for NE (def:true)
        float strength_,    // Synapse strength in Coulombs/spike (def:7.5e-11, aprox (Qth-Qss)/2)
        // attributes used only for axo-synaptic synapses
        uint8_t target_synapse_type_,   // type of the target synapse
        uint16_t target_synapse_,       // index of the synapse in the target_synapse_type array of the target neuron(this)
        // trveling wave parameters
        float length_,          // synapse length in meters (def 0)
        // epigenetics
        float prob_inheritable_, // increases with fitness changes since the synaptogenesis/pruning event to the next event
        float speed_
        ) {
    // attributes
    source_id = source_id_; // remote source neuron identification
    active = active_;       // FALSE when the neuron is deleted
    strength = strength_;   // Synapse strength in Coulombs/spike def: 7.5e-11
    // attributes used only for axo-synaptic synapses
    target_synapse_type = target_synapse_type_; // type of the target synapse
    target_synapse = target_synapse_; // index of the synapse in the target_synapse_type array of the target neuron(this)
    // traveling wave parameters
    length = length_; // synapse length in meters (def 0)
    segment = (uint16_t) (length_ / speed_); // remote axon´s segment of the synapse = floor (length/speed)
    offset = (uint8_t) (32.0 * ((length_ / speed_)-(float) segment)); // remote axon's bit offset on the 32 bit segment (autocalculated)
    mask = (0x8000 >> offset);
    // epigenetics
    prob_inheritable = prob_inheritable_; // increases with fitness changes since the synaptogenesis/pruning event to the next event
}
*/

Synapse::Synapse() {
    // attributes
    source_id = 0; // remote source neuron identification
    active = true; // FALSE when the synapse is deleted
    strength = 7.5e-11f; // Synapse strength in Coulombs/spike (def: half of Qth-Qss)
    // traveling wave parameters
    length = 0; // synapse length in meters (def 0)
    segment = 0; // remote axon´s segment of the synapse = floor (length/speed)
    offset = 0; // remote axon's bit offset on the 32 bit segment (autocalculated)
    mask = 0x8000;
    // epigenetics
    prob_inheritable =0.5f; // increases with fitness changes in phase with post synaptic activity, decreases if postsynaptic activity decreases fitness (def:0.5)
}

Synapse::Synapse(const Synapse& orig) {
}

Synapse::~Synapse() {
}

