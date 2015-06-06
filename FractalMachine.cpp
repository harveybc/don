/* 
 * File:   FractalMachine.cpp
 * Author: harveybc
 *
 * Executes the following instruction from a program from an instance, from a 
 * instances deque. If the program ends execution, it´s instance is removed 
 * from the deque.
 * 
 * Created on 22 de junio de 2014, 08:37 PM
 */

#include "FractalMachine.h"
#include "FractalTape.h"
#include "Expert.h"

int FractalMachine::reset() { ///< Erases all nodes, conex and instances
    nodes.clear();
    connections.clear();
    instances.clear();
}

int FractalMachine::iterate() { ///< Executes next instruction from the instance's queue
    FractalNode tmp_node;
    FractalConnection tmp_connection;
    std::vector<FractalConnection> tmp_connections;
    std::deque <FractalInstruction> tmp_instructions;
    std::deque<FractalInstance>::iterator it_instance=instances.begin();
    std::deque<FractalInstruction>::iterator it_instructions;
    // TODO: Create threads for each pending instance
    // TODO: Logging and parameter verification of each instruction
    while (it_instance!=instances.end()) {
        // Sets the instances program counter to 0
        it_instance->set_program_counter(0);
        // puts the instructions iterator in the beninning
        it_instance->get_program().get_instructions(tmp_instructions);
        it_instructions = tmp_instructions.begin();
        // Executes every command in the tape,later it is removed from instances         
        while (it_instructions!=tmp_instructions.end()) { 
                switch (it_instructions->id) {
                    case 0: /// Wait(milliseconds)
                        std::this_thread::sleep_for(std::chrono::milliseconds(it_instructions->parameters_i[0]));
                    break;
                    case 1: /// CreateNode(int source_id, int evaluated, bool active, double distance_from_source)
                        tmp_node.set_node(
                            nodes.size(),                        // id
                            it_instructions->parameters_i[0],    // source_id  
                            it_instructions->parameters_i[1],    // evaluated
                            it_instructions->parameters_b[0]     // active
                        );
                        // adds the node
                        nodes.push_back(tmp_node);
                        // adds a connection from the source node
                        tmp_connection.set_conn(
                            connection_counter++,               // connid
                            it_instructions->parameters_i[0],   // source_id 
                            nodes.size(),                       // target_id
                            it_instructions->parameters_d[0],   // length
                            it_instructions->parameters_b[0]    // active
                        );
                        tmp_connections.push_back(tmp_connection);
                        connections.push_back(tmp_connections);
                    break;
                    case 2: /// NodeSetActive(int node_id, bool act)
                        nodes[it_instructions->parameters_i[0]].set_active(it_instructions->parameters_b[0]);
                    break;
                    case 3: /// NodeSetEvaluated(int node_id, int evaluated)
                        nodes[it_instructions->parameters_i[0]].set_evaluated(it_instructions->parameters_i[1]);
                    break;
                    case 4: /// CreateConnection(node_id_source, node_id_target, length)
                        connections.
                    break;
                    case 5: /// ConnectionSetSource(conn_id, new_source_id)

                    break;
                    case 6: /// ConnectionSetTarget(conn_id, new_target_id)

                    break;
                    case 7: /// ConnectionSetLength(conn_id, length)

                    break;
                    case 8: /// ConnectionSetActive(conn_id)

                    break;
                    default:
                    break;
                }
            it_instruction++;            
        }
        it_instance++;
    }
}

FractalMachine::FractalMachine() {
    // Creates the first node
    FractalNode tmp_node(0, 0, 0, true);
    // Adds the first node 
    nodes.clear();
    nodes.push_back(tmp_node);
}

FractalMachine::FractalMachine(const FractalMachine& orig) {
}

FractalMachine::~FractalMachine() {
}


//template class FractalMachine<Expert<double >,double >;