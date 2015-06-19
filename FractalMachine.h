/** 
 * ***************************************************************************** 
 * @brief       Fractal Machine Class Template
 * ***************************************************************************** 
 * @par Description @parblock 
 * 
 * A sequence of instructions called "fractal tape" is used to create a
 * connection graph that has some nodes marked as not-evaluated and they are
 * used as origin node for running again the fractal tape or parts of it, to
 * generate a connection pattern of increasing complexity every time the 
 * fractal tape is iterated in the non-evaluated nodes. We call Fractals to 
 * these connection structures of variable complexity. The fractals are used 
 * in this program to create a CPPN (Connectivity Pattern Producing Networks)
 * for use in scalble Neural Networks as the fractals can be resolved to any 
 * resolution (millions of neurons) potencially taking making feasible the 
 * usability of pre-trained experts.
 * 
    0: /// Wait(milliseconds)
    1: /// CreateNode(int source_id, int recursive, int interfaces, bool evaluated, bool active, double distance_from_source)
    2: /// NodeSetActive(int node_id, bool act) 
    3: /// NodeSetEvaluated(int node_id, bool evaluated)
    4: /// NodeAddInterface(int node_id, int num)
    5: /// NodeSetRecursive(int node_id, int recursive)
    6: /// CreateConnection(node_id_source, node_id_target, src_if, length,active)
    7: /// ConnectionSetLength(conn_id, length)
    8: /// ConnectionSetActive(conn_id)
 *       
 *      Behaviour:  Plantilla de clase implementando una máquina de Turing para
 *                  programar la generación de patrones de conectividad que se 
 *                  pueden resolver en cualquier resolución (fractales).
 * 
 *      Structure:  Atributos para almacenamiento de secuencia de comandos
 *                  (fractal_tape) y el estado de la máquina: nodos, conexiones,
 *                  buses de datos de los nodos llamados interfaces y registros
 *                  para operaciones temporales.
 * 
 *      Interface:  Métodos para agregar comandos a la cinta de comandos 
 *                  (fractal_tape), el método iterate() lee y ejecuta el próximo 
 *                  comando de la cinta y actualiza el estado de la máquina.
 *
 *  Extended information at:
 *  <http://singularityproject.co>
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
 * @file        FractalMachine.h
 * @version     0.1
 * @date        20 de junio de 2014, 08:37 PM
 * @author      Harvey D. Bastidas C. <harveybc@ingeni-us.com>
 * COMPLETE
 **/

#ifndef FRACTALMACHINE_H
#define	FRACTALMACHINE_H
#include <vector>
#include <cmath>
#include <chrono>
#include <thread>
#include <iostream>
#include "Node.h"
#include "Connection.h"
#include "Instance.h"
#include "DataSet.h"


class FractalMachine {
public:
    void add_instruction(FractalInstruction instr);
    void run_instruction(FractalInstruction instr);
    void run_program();
    std::vector<int> get_conn_list(int node_target_id);// returns connections list per target node
    Connection get_connection(int conn_id);
    Node get_node(int node_id);
    Instance get_instance(int instance_id);
    void reset();       ///< Erases all nodes, conex and instances
    void iterate();     ///< Executes next instruction from the instance's queue
    int num_nodes();    ///< returns the number of nodes
    double read_message(int node_id, int interface_id, int segment); ///< reads a message from a interface
    void push_message(int node_id, int interface_id, double msg); ///< puts a message in a interface and deletes the oldest one
    void set_node_evaluated(int node_id, bool eval);
    void reset_nodes(int num_inputs); ///< sets evaluated = false to all hidden an output neurons
    bool get_node_eval(int node_id);
    // constructors
    FractalMachine();
    FractalMachine(const FractalMachine& orig);
    virtual ~FractalMachine();
protected:
    // neuro evolution commands to be implemented in derived classes(TravelingWave and SimpleANN)
    virtual void create_fully_connected_net(int num_inputs, int num_outputs);
    virtual void create_node_from_connecction(int num_inputs, int num_outputs);
    virtual void create_connection(int node_source, int node_target);
    virtual void set_connection_weight(int conn_id, double wt);
    virtual void set_connection_length(int conn_id, double len);
    virtual void set_connection_speed(int conn_id, double spd);
    
    // activation and transfer functions to be implemented in derived classes (Activator)
    virtual double activation_fcn(); // neuron output = activation_fcn(transfer_fcn(inputs))
    virtual double transfer_fcn(int node_id); // neuron's transfer function
    
    // evaluation and training (Evaluator and Trainer)
    virtual void evaluate(DataSet data_input, DataSet &data_output);
    virtual void visualize(); // renders the neural network in unreal engine 4
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
    std::vector <std::vector<int> > conn_list; ///< connection[target_id][0..n] index in conn queue for evaluation order
    std::vector<Connection> connections;
    std::vector <Node> nodes;               ///< Taxones que componen el estado de la máquina (persistente entre iteraciones))
    std::deque <Instance> instances;       ///< Instancias de programas ejecutándose en nodos
};
#endif	/* FRACTALMACHINE_H */
