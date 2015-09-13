/**
@file       NeuralNetwork.h
@author     Harvey D. Bastidas C. <harveybc@ingeni-us.com>
@date       14 de abril de 2015, 11:32 PM
@version    0.0.1 (pre-alpha)
@class      NeuralNetwork
@brief Chemical synapse with long/short-term plasticity. 

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

#ifndef NEURALNETWORK_H
#define	NEURALNETWORK_H
#include <array>
#include "FractalMachine.h"

class NeuralNetwork: public FractalMachine{
public:
    // time resolution
    float clock_tick = 1e-3; // time resolution = 1 milli second
    // axon attributes
    float bidir_max_length; // length of the bidirectional section of the axon (def:500e-6 m)
    // synapses
    bool use_long_term_plasticity; ///< true = persistent hebbian learning (post-synaptic) 
    bool use_short_term_plasticity; ///< true = short term non-hebbian learning (presynaptic) 
    bool use_persistent_plasticity; ///< a fraction of ltp is modified in baseline strength permanently if true
    // Extracellular medium Neurotransmitter concentration (g/liter?) from blood for each NT
    std::array <float,32> ecm_neuro_transmitter;    
    // Whole membrane NT receptor charge factor (in: Coulombs/concentration) 
    // Def: Qth / GABA concentration:1.23e-1 g/Liter  (from: http://www.sciencedirect.com/science/article/pii/S0925492700000755)
    std::array <float,32> ecm_nt_receptor_charge_factor;
    // Extracellular dissipation factor per tick (def: 0.99931 for 10 seconds to 0.1%)
    std::array <float,32> ecm_nt_dissipation;
    // neuro evolution commands 
    void create_neurons(int num_neurons);
    void create_synapse(int source, int target, float strength, float length,
                char synapse_type);    
    void create_fully_connected_net(int num_inputs, int num_outputs);
    void create_neuron_from_synapse(Neuron &neuron, int syn_id);
    // constructors
    NeuralNetwork(int n_inputs, int n_outputs); 
    NeuralNetwork(const NeuralNetwork& orig);
    virtual ~NeuralNetwork();
private:
    
};

#endif	/* NEURALNETWORK_H */

