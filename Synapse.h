/** 
@file       Synapse.h
@author     harveybc
@date       3 de junio de 2015, 04:39 PM
@version    0.0.1 (pre-alpha)
@class      Synapse
@brief Chemical synapse from a spiking neuron's axon's segment. 

@details Synapses are the inputs of neurons and receive data from the axon of a
 Neuron. This class models the connection to a source Neuron::axon with 
 physycal, chemical and genetic attributes: #length, #strength and 
 #prob_inheritable.

@par Relationships with other classes @parblock
 The Synapse class is the base class of PlasticSynapse used in the vectors of 
 synapses by type for each Neuron and there are 10 types of synapses implemented
 in the SpikingEvaluator class wich evauates all Neurons in a NeuralNetwork.
 @endparblock
 */
#ifndef SYNAPSE_H
#define	SYNAPSE_H
#include <cstdint>
#include "Configuration.h"

class Synapse {
public:
    // attributes
    uint32_t source_id; /// remote source neuron identification
    bool active;        /// FALSE when the synapse is deleted, also become recesive gene for NE (def:true)
    float strength;     /// Synapse strength in Coulombs/spike (def:7.5e-11, aprox (Qth-Qss)/2)
    // attributes used only for axo-synaptic synapses
    uint8_t target_synapse_type;/// type of the target synapse
    uint16_t target_synapse;    /// index of the synapse in the target_synapse_type array of the target neuron(this)
    // traveling wave parameters
    float length;       /// synapse length in meters (def 0)
    uint16_t segment;   /// remote axon´s segment of the synapse = floor (autocalculated in length/speed)
    uint8_t offset;     /// remote axon's bit offset on the 32 bit segment (autocalculated)
    uint32_t mask;      /// remote axon's bit mask for reading single bits (autocalculated=0x01 hex>>offset)
    // epigenetics
    float prob_inheritable; /// increases with fitness changes since the synaptogenesis/pruning event to the next event
    // constructors
    Synapse( 
            uint32_t source_id_,/// remote source neuron identification
            bool active_,       /// FALSE when the synapse is deleted, also become recesive gene for NE (def:true)
            float strength_,    /// Synapse strength in Coulombs/spike (def:7.5e-11, aprox (Qth-Qss)/2)
            // attributes used only for axo-synaptic synapses
            uint8_t target_synapse_type_,   /// type of the target synapse
            uint16_t target_synapse_,       /// index of the synapse in the target_synapse_type array of the target neuron(this)
            // trveling wave parameters
            float length_,      /// synapse length in meters (def 0)
            // epigenetics
            float prob_inheritable_,/// increases with fitness changes since the synaptogenesis/pruning event to the next event
            float speed_            /// speed of the source axon
            );
    Synapse();
    Synapse(const Synapse& orig);
    virtual ~Synapse();
private:
};

#endif	/* SYNAPSE_H */

