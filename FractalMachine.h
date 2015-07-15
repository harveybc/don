/** 
 * ***************************************************************************** 
 * @brief       Fractal Machine Class Template
 * ***************************************************************************** 
 * @par Description @parblock 
 * 
 * A sequence of instructions called "fractal tape" is used to create a
 * synapse graph that has some neurons marked as not-evaluated and they are
 * used as origin neuron for running again the fractal tape or parts of it, to
 * generate a synapse pattern of increasing complexity every time the 
 * fractal tape is iterated in the non-evaluated neurons. We call Fractals to 
 * these synapse structures of variable complexity. The fractals are used 
 * in this program to create a CPPN (Connectivity Pattern Producing Networks)
 * for use in scalble Neural Networks as the fractals can be resolved to any 
 * resolution (millions of neurons) potencially taking making feasible the 
 * usability of pre-trained experts.
 * 
    0: /// Wait(milliseconds)
    1: /// CreateNeuron(int source_id, int recursive, int axon, bool evaluated, bool active, float distance_from_source)
    2: /// NeuronSetActive(int neuron_id, bool act) 
    3: /// NeuronSetEvaluated(int neuron_id, bool evaluated)
    4: /// NeuronAddAxon(int neuron_id, int num)
    5: /// NeuronSetRecursive(int neuron_id, int recursive)
    6: /// CreateSynapse(neuron_id_source, neuron_id_target, src_if, length,active)
    7: /// SynapseSetLength(syn_id, length)
    8: /// SynapseSetActive(syn_id)
 *       
 *      Behaviour:  Plantilla de clase implementando una máquina de Turing para
 *                  programar la generación de patrones de conectividad que se 
 *                  pueden resolver en cualquier resolución (fractales).
 * 
 *      Structure:  Atributos para almacenamiento de secuencia de comandos
 *                  (fractal_tape) y el estado de la máquina: nodos, conexiones,
 *                  buses de datos de los nodos llamados axon y registros
 *                  para operaciones temporales.
 * 
 *      Axon:  Métodos para agregar comandos a la cinta de comandos 
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
#include "Neuron.h"
#include "Synapse.h"
#include "Instance.h"
#include "DataSet.h"


class FractalMachine {
public:
    // attributes (public for use during evaluation from Simulator)
    std::vector<Synapse> synapses;
    std::vector <Neuron> neurons;              
    // methods
    void add_instruction(FractalInstruction instr);
    void run_instruction(FractalInstruction instr);
    void run_program();
    std::vector<int> get_syn_list(int neuron_target_id);// returns synapses list per target neuron
    Synapse get_synapse(int syn_id);
    Neuron get_neuron(int neuron_id);
    Instance get_instance(int instance_id);
    void reset();       ///< Erases all neurons, conex and instances
    void iterate();     ///< Executes next instruction from the instance's queue
    int num_neurons();    ///< returns the number of neurons
    bool read_message(int neuron_id, int axon_id, int segment); ///< reads a message from a axon
    void push_message(int neuron_id, int axon_id, bool msg); ///< puts a message in a axon and deletes the oldest one
    void set_neuron_evaluated(int neuron_id, bool eval);
    void reset_neurons(int num_inputs); ///< sets evaluated = false to all hidden an output neurons
    bool get_neuron_eval(int neuron_id);
    bool action_potential(int neuron_id, int axon_id, int tf_result); // true and starts refractory period if  membrane potential > threshold
    bool get_refractory_state(int neuron_id, int axon_id); // true if remaining_refractory > 0
    int get_num_axon(int neuron_id);
    void increase_membrane_potential(int neuron_id, int axon_id, float pot);
    // constructors
    FractalMachine();
    FractalMachine(const FractalMachine& orig);
    virtual ~FractalMachine();
protected:
    // neuro evolution commands to be implemented in derived classes(SpikingEvaluator and SimpleANN)
    virtual void create_fully_connected_net(int num_inputs, int num_outputs);
    virtual void create_neuron_from_connecction(int num_inputs, int num_outputs);
    virtual void create_synapse(int neuron_source, int neuron_target);
    virtual void set_synapse_weight(int syn_id, float wt);
    virtual void set_synapse_length(int syn_id, float len);
    virtual void set_synapse_speed(int syn_id, float spd);
    
    // activation and transfer functions to be implemented in derived classes (Activator)
    virtual float activation_fcn(); // neuron output = activation_fcn(transfer_fcn(inputs))
    virtual float transfer_fcn(int neuron_id); // neuron's transfer function
    
    // evaluation and training (Evaluator and Trainer)
    virtual void evaluate(DataSet data_input, DataSet &data_output);
    virtual void visualize(); // renders the neural network in unreal engine 4
    virtual void train(DataSet data_trainning, float &fitness, FractalMachine &champion );
    
    // real time evaluation and training (Expert)
    virtual void rt_evaluate(DataSet data_input, DataSet &data_output);
    virtual void rt_train(DataSet data_trainning, float &fitness, FractalMachine &champion );
    
    /// multi-expert real time evaluation and training (Agent)
    //virtual void me_evaluate(DataSet data_input, DataSet &data_output);
    //virtual void me_train(DataSet data_trainning, float &fitness, FractalMachine &champion );
    
    /// multi-agent evaluation and training network client and server (MultiAgentClient and MultiAgentServer)
    //virtual void ma_evaluate(DataSet data_input, DataSet &data_output);
    //virtual void ma_train(DataSet data_trainning, float &fitness, FractalMachine &champion );
    
    /// descentralized multi-agent evaluation and training P2P network neuron (Singularity)
    //virtual void ma_evaluate(DataSet data_input, DataSet &data_output);
    //virtual void ma_train(DataSet data_trainning, float &fitness, FractalMachine &champion );
private:
    std::vector <std::vector<int> > syn_list; ///< synapse[target_id][0..n] index in conn queue for evaluation order
    std::deque <Instance> instances;       ///< Instancias de programas ejecutándose en nodos
};
#endif	/* FRACTALMACHINE_H */
