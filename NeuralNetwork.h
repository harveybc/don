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
    void create_nodes(int num_nodes);
    void create_connection(int node_source, int node_target, 
            int source_interface, bool active, double weight, double length, 
            double speed);    
    void create_fully_connected_net(int num_inputs, int num_outputs);
    void create_node_from_connection(int conn_id);
    void set_connection_active(int conn_id, bool active);
    void set_connection_weight(int conn_id, double wt);
    void set_connection_length(int conn_id, double len);
    void set_connection_speed(int conn_id, double spd);
    // constructors
    NeuralNetwork(int n_inputs, int n_outputs); 
    NeuralNetwork(const NeuralNetwork& orig);
    virtual ~NeuralNetwork();
private:
    
};

#endif	/* NEURALNETWORK_H */

