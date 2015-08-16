/**
 * @mainpage
 * ***************************************************************************** 
 * @brief       Neural Network Class
 * ***************************************************************************** 
 * @par Description @parblock
 *      
 * Neural network implementation using a fractal structure
 *  Extended information at:
 *  <http://singularityproject.co>|/
 * 
 *  @endparblock
 *  @copyright @parblock
 *  This file is part of Singularity.
 *  Singularity is free software; you can redistribute it and/or modify it under
 *  the terms of the GNU General Public License as published by the Free
 *  Software Foundation; either version 3, or (at your option) any later
 *  version. Singularity is distributed in the hope that it will be useful, but 
 *  WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY 
 *  or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU General Public License
 *  for more details. You should have received a copy of the GNU General Public 
 *  License along with GCC; see the file COPYING3.  If not see
 *  <http://www.gnu.org/licenses/>. 
 * @endparblock
 * @file        NeuralNetwork.h
 * @version     0.1
 * @date        Created on 14 de abril de 2015, 11:32 PM
 * @author      Harvey D. Bastidas C. <harveybc@ingeni-us.com>
 **/

#ifndef NEURALNETWORK_H
#define	NEURALNETWORK_H
#include "FractalMachine.h"

class NeuralNetwork: public FractalMachine{
public:
    // time resolution
    float clock_tick = 1e-3; // time resolution = 1 milli second
    // membrane attributes for model with intrinsic currents from (Beer, 1990) not for voltage but charge (integrating model over time)
    float Qm;    ///< membrane charge (def: -70mV*10nF   = -7e-10C)
    float Cm;    ///< membrane capacintance (def: 10nF = 10e-9)
    float Gm;    ///< membrane conductance (def: 100nS =  100e-9)
    float Qth;   ///< membrane charge threshold (def:-55mV*10nF = -5.5e-10C)
    float Qss;   ///< membrane steady state (resting) charge (def: -70mv*10nF = -7e-10C)
    // synapses
    bool use_long_term_plasticity; ///< true = persistent hebbian learning (post-synaptic) 
    bool use_short_term_plasticity; ///< true = short term non-hebbian learning (presynaptic) 
    bool use_persistent_plasticity; ///< a fraction of ltp is modified in baseline strength permanently if true
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

