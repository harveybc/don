/* 
 * File:   SpikingNeuron.h
 * Author: harveybc
 *
 * Created on 1 de septiembre de 2015, 02:13 AM
 */

#ifndef SPIKINGNEURON_H
#define	SPIKINGNEURON_H

class SpikingNeuron : Neuron{
public:
    // action potential timing
    uint16_t action_potential_period;    /// duration of action potential polarization and depolarization(def:2)
    uint16_t remaining_action_potential; /// remaining clock ticks of action potential
    uint16_t refractory_period;          /// refractory period in milliseconds (def:2)
    uint16_t remaining_refractory;       /// remaining refractory period in milliseconds
    // axon
    float axon_speed;    ///< axon's propagation speed in m/s (def: 100), proportional 
                         ///< to radius wich is proportional to soma diameter wich 
                         ///< controls the optimum number of dendrites (dendritic synapses)
                         ///< for synaptic pruning(maduration), synaptogenesis(practice)
                         ///< and neuroevolution(training).
    float axon_feedback_strength; ///< strength of the feedback connection n Coulombs/spike (def:7.5e-11) 
    bool bidirectional; //  def: true if axosomatic synapse length < 40um (def:true)
                        //  or axo-dendrític ( bidirectional if length < 300um)
                        //  axo-axonic - postsynapticOR (bidirectional if length < 300um)
    std::vector <uint32_t> axon;    ///< neuron's communications axon with 32 bit spike trains
    std::vector <uint32_t> axon_feedback;    ///<  used for bidirectional axon's  propagation
    // synapses
    std::vector<Synapse> axoaxonic_and_synapses;  ///< neuron extracellular synapses (for local exteracellular medium concentrations)
    std::vector<Synapse> axoaxonic_or_synapses;  ///< neuron extracellular synapses (for local exteracellular medium concentrations)
    std::vector<Synapse> axoaxonic_xor_synapses;  ///< neuron extracellular synapses (for local exteracellular medium concentrations)
    // constructors
    SpikingNeuron();
    SpikingNeuron(const SpikingNeuron& orig);
    virtual ~SpikingNeuron();
private:

};

#endif	/* SPIKINGNEURON_H */

