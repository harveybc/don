/* 
 * File:   NonSpikingNeuron.h
 * Author: harveybc
 *
 * Created on 1 de septiembre de 2015, 01:24 AM
 */

#ifndef NONSPIKINGNEURON_H
#define	NONSPIKINGNEURON_H

class NonSpikingNeuron : Neuron {
public:
    // non-spiking synapses attribures
    float Q_sat; /// membrane saturation charge for non spiking synapses (def:-20mV??)
    // axon
    float axon_speed;    ///< axon's propagation speed in m/s (def: 100), proportional 
                         ///< to radius wich is proportional to soma diameter wich 
                         ///< controls the optimum number of dendrites (dendritic synapses)
                         ///< for synaptic pruning(maduration), synaptogenesis(practice)
                         ///< and neuroevolution(training).
    std::vector <float> axon;    ///< neuron's communications axon with 32 bit float trains
    // synapses
    std::vector<Synapse> axoaxonic_modulatory_synapses;  ///< neuron extracellular synapses (for local exteracellular medium concentrations)
    // constructors
    NonSpikingNeuron();
    NonSpikingNeuron(const NonSpikingNeuron& orig);
    virtual ~NonSpikingNeuron();
private:

};

#endif	/* NONSPIKINGNEURON_H */

