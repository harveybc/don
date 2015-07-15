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
    // neuro evolution commands 
    void create_neurons(int num_neurons);
    void create_synapse(int neuron_source, int neuron_target, 
            int source_axon, bool active, float weight, float length, 
            float speed);    
    void create_fully_connected_net(int num_inputs, int num_outputs);
    void create_neuron_from_synapse(int syn_id);
    void set_synapse_active(int syn_id, bool active);
    void set_synapse_weight(int syn_id, float wt);
    void set_synapse_length(int syn_id, float len);
    void set_synapse_speed(int syn_id, float spd);
    void set_neuron_m_potential(int neuron_id, int if_id, float m_potential);
    void set_neuron_threshold(int neuron_id, int if_id, float threshold);  
    void set_neuron_polarization_factor(int neuron_id, int if_id, float p_factor); 
    void set_neuron_refractory_period(int neuron_id, int if_id, int r_period);   
    //11: NeuronSetMembranePotential(int neuron_id, int axon_id, float m_pot)
    //12: NeuronSetThreshold(int syn_id, int axon_id, float threshold)
    //13: NeuronSetPolarizationFactor(int syn_id, int axon_id, float p_factor)
    //14: NeuronSetRefractoryPeriod(int syn_id, int axon_id, int r_period)
    
    float threshold;       ///< Membrane potential threshold
    float depolarization;  ///< Depolarization factor per tick
    // constructors
    NeuralNetwork(int n_inputs, int n_outputs); 
    NeuralNetwork(const NeuralNetwork& orig);
    virtual ~NeuralNetwork();
private:
    
};

#endif	/* NEURALNETWORK_H */

