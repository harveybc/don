/* 
@file       Neuron.h
@author     Harvey D. Bastidas C. <harveybc@ingeni-us.com>
@date       3 de junio de 2015, 04:39 PM
@version    0.0.1 (pre-alpha)
@class      Neuron
@brief Integrate and fire spiking neuron. 
@image html Neuron.png 

@note @parblock Image source: Quasar Jarosz at English Wikipedia - https://en.wikipedia.org/wiki/Neuron#/media/File:Neuron_Hand-tuned.svg
@endparblock
 
     // uses a two phase evaluation and a neuroevolution training phase: 
    //      1. maduration:  do synaptic pruning and release nt for controlling prob prunning y prob synaptogenesis, and prob inheritable in  the next phase
    //      2. practice:  do synaptogénesis and release nt for controlling prob prunning y neuro/synaptogenesis, and prob inheritable in neuroevolution 
    //      3. training: use  prob pruning y neuro/synaptogenesis, and prob inheritable(little mutation factor, low mutation prob) during neuroevolution's mutation and crossover 

 
@details Synaptic plasticity modifies the strength of a synapse temporarily 
 depending on the activity of the neuron. 
 
@par Types of synaptic plasticity @parblock
    There are two types of synaptic plasticity depending on their mechanics and the time required to return the Synapse to it´s baseline strength:\n
        -Short-term plasticity (STP): acts as a band-pass filter of the pre-synaptic activity, is added to the base line strength of the synapse.\n
        -Long-term plasticity (LTP): uses hebbian learning and it´s intensity depends on the phase shift of the post-synaptic activity respect to the pre-synaptic activity, is added to the baselinestrengh of the synapse.
 
@endparblock
 
@par Epigenetics @parblock
 Epigenetics are modelled as inheritable changes in the strength of a connection
 related to external factors (fitness of the Neural Network). 
@endparblock
 
@par Relationships with other classes @parblock
 The Synapse class is the base class of PlasticSynapse used in the vectors of 
 synapses by type for each Neuron, all the types of synapses are  implemented 
 in the SpikingEvaluator class wich evauates all Neurons in a NeuralNetwork. 
@endparblock 
 */

#ifndef NEURON_H
#define	NEURON_H
#include <cstdint>
#include <array>
#include <forward_list>
#include "Synapse.h"

class Neuron {
public:
    // general neuron attributes
    bool active;        /// FALSE when the neuron is deleted, also become recesive gene for NE (def:true)
    // membrane attributes from (Beer, 1990) not for voltage but charge (integrating model over time)
    float Qm;     ///< membrane charge (def: -70mv*10nF)
    float Cm;      ///< membrane capacintance (def: 10nF)
    float Gm;     ///< membrane conductance (def: 100nS)
    float Qth;   ///< membrane charge threshold (def:-55mV*10nF Coulombs))
    float Qss;    ///< membrane steady state (resting) charge (def: -70mv*10nF)
    // membrane charge leaking
    float Qleak; ///< leaking charge factor (def: Gm/Cm  = 10)
    // neural network flags
    bool evaluated;     /// TRUE if neuron has been evaluated (def:false)
    // neurone axon's neurotransmitter code (5bit, max value :32)
    uint8_t neurotransmitter;
    // epigenetics: permanent changes in the genome caused by neurotransmitters, synaptic or neuronal activity
    float prob_synaptogenesis; ///< increases with neural activity and prob_inheritable, if negative, is probability of synaptic prunnig
    float prob_neurogenesis;   ///< increases with local complexity if negative, is probability of neural prunnig
    float prob_inheritable;    ///< increases with increases with fitness changes related
                               ///< to pruning or neurogenesis. A change of fitness 
                               ///< between neurogenesis events causes all presynaptic  
                               ///< neurons to modify their prob_inheritable)
    // extracellular activity masks for up to 32 neurotransmitters(NT)and receptors(NR)  
    uint32_t neurotransmitter_mask;  ///< def: 0x1 hex (first NT enabled )
    uint32_t nt_receptor_mask; ///< def: 0x1 hex (first NT receptor enabled)
    // synapses by type
    std::vector<Synapse> axosomatic_synapses;  ///< neuron´s axo dendritic and axosomatic synapses
    std::vector<Synapse> axodendritic_synapses;  ///< neuron´s axo dendritic and axosomatic synapses
    std::vector<Synapse> axosynaptic_and_synapses;  ///< neuron extracellular synapses (for local exteracellular medium concentrations)
    std::vector<Synapse> axosynaptic_or_synapses;  ///< neuron extracellular synapses (for local exteracellular medium concentrations)
    std::vector<Synapse> axosynaptic_xor_synapses;  ///< neuron extracellular synapses (for local exteracellular medium concentrations)
    std::vector<Synapse> axosynaptic_modulatory_synapses;  ///< neuron extracellular synapses (for local exteracellular medium concentrations)
    std::vector<Synapse> axoextracellular_synapses;  ///< neuron extracellular synapses (for local exteracellular medium concentrations)
    std::vector<Synapse> axosecretory_synapses;  ///< neuron extracellular synapses (for local exteracellular medium concentrations)
    std::vector<Synapse> nonspiking_axodendritic_synapses;  ///< neuron´s axo dendritic and axosomatic synapses
    std::vector<Synapse> electrical_nonrectifying_synapses;  ///< neuron extracellular synapses (for local exteracellular medium concentrations)
    std::vector<Synapse> electrical_rectifying_synapses;  ///< neuron extracellular synapses (for local exteracellular medium concentrations)
    // methonds
    void push_message(int msg);     ///< pushes a message in the axon´s front and removes the oldest from the back
    // constructos
    Neuron();
    Neuron(const Neuron& orig);
    virtual ~Neuron();
private:
};

#endif	/* NEURON_H */

