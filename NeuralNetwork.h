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
#include "DataSet.h"

class NeuralNetwork {
public:
    int get_inputs();
    int get_outputs();
    void reset(int n_inputs, int n_outputs);
    NeuralNetwork(int n_inputs, int n_outputs); 
    NeuralNetwork(const NeuralNetwork& orig);
    virtual ~NeuralNetwork();
protected:
    // neuro evolution commands to be implemented in derived classes(TravelingWave and SimpleANN)
    virtual void create_fully_connected_net(int num_inputs, int num_outputs);
    virtual void create_node_from_connecction(int num_inputs, int num_outputs);
    virtual void create_connection(int node_source, int node_target);
    virtual void set_connection_weight(int conn_id, double wt);
    virtual void set_connection_length(int conn_id, double len);
    virtual void set_connection_speed(int conn_id, double spd);
    virtual void mutate_conn(int conn_id, double d_weight, double d_len, double d_spd);
    
    // activation and transfer functions to be implemented in derived classes (Activator)
    virtual double activation_fcn(); // neuron output = activation_fcn(transfer_fcn(inputs))
    virtual double transfer_fcn(int node_id); // neuron's transfer function
    
    // evaluation and training (Evaluator and Trainer)
    virtual void evaluate(DataSet data_input, DataSet &data_output);
    virtual void train(DataSet data_trainning, double &fitness, FractalMachine &champion );
    
    // real time evaluation and training (Expert)
    virtual void rt_evaluate(DataSet data_input, DataSet &data_output);
    virtual void rt_train(DataSet data_trainning, double &fitness, FractalMachine &champion );
    
    /// multi-expert real time evaluation and training (Agent)
    //virtual void me_evaluate(DataSet data_input, DataSet &data_output);
    //virtual void me_train(DataSet data_trainning, double &fitness, FractalMachine &champion );
    
    /// multi-agent evaluation and training network client and server (MultiAgentClient and MultiAgentServer)
    //virtual void ma_evaluate(DataSet data_input, DataSet &data_output);
    //virtual void ma_train(DataSet data_trainning, double &fitness, FractalMachine &champion );
    
    /// descentralized multi-agent evaluation and training P2P network node (Singularity)
    //virtual void ma_evaluate(DataSet data_input, DataSet &data_output);
    //virtual void ma_train(DataSet data_trainning, double &fitness, FractalMachine &champion );
    
private:
    int num_inputs;
    int num_outputs;
    FractalMachine network(); // fractal 
    
};
#endif	/* NEURALNETWORK_H */

