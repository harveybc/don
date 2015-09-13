/** 
@file       Synapse.h
@author     Harvey D. Bastidas C. <harveybc@ingeni-us.com>
@date       3 de junio de 2015, 04:39 PM
@version    0.0.1 (pre-alpha)
@class      Synapse

@brief Models a synapse from the axon of an integrate and fire spiking Neuron. 
 The image bellow shows examples of some types of synapses.\n
 
@image html Blausen_0843_SynapseTypes.png 
 
@note @parblock Image source: Blausen.com staff. "Blausen gallery 2014". 
 Wikiversity Journal of Medicine. DOI:10.15347/wjm/2014.010. ISSN 20018762. - 
 Own work
@endparblock
 
@warning @parblock The image's synapse type numbering does not correspond with 
 the actual numbering of all the types of synapes used.\n
@endparblock
 
@details Synapses are the inputs of neurons and receive data from the axon of a
 Neuron. This class models the connection to a source Neuron::axon.
@par Epigenetics @parblock
 
 Epigenetics are modeled using the Synapse::prob_inheritable attribute wich
 increases or decreases due to external factors (the ANN fitness). 
@endparblock
 
@par Relationships with other classes @parblock
 The Synapse class is the base class of PlasticSynapse used in the vectors of 
 synapses by type for each Neuron, all the types of synapses are  implemented 
 in the SpikingEvaluator class wich evauates all Neurons in a NeuralNetwork. 
@endparblock

@par Types of Synapses@parblock
 -# Axo-Somatic  
 -# Axo-Dendritic
 -# Axo-Synaptic AND
 -# Axo-Synaptic OR
 -# Axo-Synaptic XOR
 -# Axo-Synaptic Modulatory
 -# Axo-Axonic AND
 -# Axo-Axonic OR
 -# Axo-Axonic XOR
 -# Axo-Extracellular
 -# Axo-Secretory
 -# Non-spiking Axo-Dendritic
 -# Electrical Non-Rectifying
 -# Electrical Rectifying
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
    float prob_inheritable; /// increases with fitness changes in phase with post synaptic activity, decreases if postsynaptic activity decreases fitness (def:0.5))
    // constructors
    Synapse();
    Synapse(const Synapse& orig);
    virtual ~Synapse();
private:
};

#endif	/* SYNAPSE_H */

