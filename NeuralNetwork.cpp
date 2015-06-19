/* 
 * File:   NeuralNetwork.cpp
 * Author: harveybc
 * 
 * Created on 14 de abril de 2015, 11:32 PM
 */

#include "NeuralNetwork.h"
// neuro evolution commands to be implemented in derived classes

void NeuralNetwork::create_nodes(int num_nodes){
    int par_i[] = {0,0,1};      // int source_id, int recursive, int interfaces
    int par_b[] = {false,true}; // bool evaluated, bool active
    std::vector<int> parameters_i (par_i, par_i + sizeof(par_i) / sizeof(int) );
    std::vector<bool> parameters_b (par_b, par_b + sizeof(par_b) / sizeof(bool) );
    std::vector<double> parameters_d;
    for (int i=0; i<num_nodes;i++){
        // 1: CreateNode(int source_id, int recursive, int interfaces, bool evaluated, bool active)
        FractalInstruction tmp_instr(
            1,  //instruction id
                parameters_b,
                parameters_i,
                parameters_d
        );
        FractalMachine::run_instruction(tmp_instr);
    }
}

void NeuralNetwork::create_connection(int node_source, int node_target, int source_interface, 
        bool active, double weight, double length, double speed){
    // 6: CreateConnection(int node_id_source, int node_id_target, int src_if, double weight,double length,double speed, bool active)
    int par_i[] = {node_source, node_target, source_interface}; // int source_id, int recursive, int interfaces
    int par_b[] = {active};       // bool active
    int par_d[] = {weight, length, speed};     // weight, length(m), spped (m/s)
    std::vector<int> parameters_i (par_i, par_i + sizeof(par_i) / sizeof(int) );
    std::vector<bool> parameters_b (par_b, par_b + sizeof(par_b) / sizeof(bool) );
    std::vector<double> parameters_d (par_d, par_d + sizeof(par_d) / sizeof(double) );
    FractalInstruction tmp_instr(
        6,  //instruction id
        parameters_b,
        parameters_i,
        parameters_d
    );
    FractalMachine::run_instruction(tmp_instr);
}

void NeuralNetwork::create_fully_connected_net(int num_inputs, int num_outputs){
    int i,j;
    // resets fractal machine
    FractalMachine::reset();
    // adds input+output nodes
    create_nodes(num_inputs + num_outputs);
    // creates connections from every input to each output
    // for each output
    for (i=0;i<num_outputs;i++){
        //  for each input
        for (j=0; j<num_inputs;j++){
            //creates the conex with len 0
            create_connection(j, num_inputs+i, true, 0, 1,10);
        }
    }
}

void NeuralNetwork::set_connection_active(int conn_id, bool active){
    //  10: ConnectionSetActive(int conn_id, bool active)
    int par_i[] = {conn_id};// int conn_id
    int par_b[] = {active}; // bool active
    int par_d[] = {};       // none
    std::vector<int> parameters_i (par_i, par_i + sizeof(par_i) / sizeof(int) );
    std::vector<bool> parameters_b (par_b, par_b + sizeof(par_b) / sizeof(bool) );
    std::vector<double> parameters_d (par_d, par_d + sizeof(par_d) / sizeof(double) );
    FractalInstruction tmp_instr(
        10,  //instruction id
        parameters_b,
        parameters_i,
        parameters_d
    );
    FractalMachine::run_instruction(tmp_instr); 
}

void NeuralNetwork::create_node_from_connection(int conn_id){
    // 6: CreateConnection(int node_id_source, int node_id_target, int src_if, double length, bool active)
    Connection tmp_conn;
    // gets connection
    FractalMachine::get_connection(conn_id, tmp_conn);
    // creates a new node
    create_nodes(1);
    // disables the connection
    set_connection_active(conn_id, false);
    // creates a connection from source to new
    create_connection(tmp_conn.get_source(), FractalMachine::num_nodes()-1 , 
            tmp_conn.get_source_interface(), tmp_conn.get_active(), 
            tmp_conn.get_weight(), tmp_conn.get_length(),
            tmp_conn.get_speed());    
    // creates a connection from new to target
    create_connection(FractalMachine::num_nodes()-1, tmp_conn.get_target() , 
            0, true,    // source if=0, active= true
            1, 0,       // weight = 1, length = 0m
            10);    // speed = 10m/s
}

void NeuralNetwork::set_connection_weight(int conn_id, double wt){
    //  7: ConnectionSetWeight(int conn_id, double weight)
    int par_i[] = {conn_id};// conn_id
    int par_b[] = {};       // none
    int par_d[] = {wt};       // weight
    std::vector<int> parameters_i (par_i, par_i + sizeof(par_i) / sizeof(int) );
    std::vector<bool> parameters_b (par_b, par_b + sizeof(par_b) / sizeof(bool) );
    std::vector<double> parameters_d (par_d, par_d + sizeof(par_d) / sizeof(double) );
    FractalInstruction tmp_instr(
        7,  //instruction id
        parameters_b,
        parameters_i,
        parameters_d
    );
    FractalMachine::run_instruction(tmp_instr); 
}

void NeuralNetwork::set_connection_length(int conn_id, double len){
    //  8: ConnectionSetLength(int conn_id, double length)
    int par_i[] = {conn_id};// conn_id
    int par_b[] = {};       // none
    int par_d[] = {len};       // length
    std::vector<int> parameters_i (par_i, par_i + sizeof(par_i) / sizeof(int) );
    std::vector<bool> parameters_b (par_b, par_b + sizeof(par_b) / sizeof(bool) );
    std::vector<double> parameters_d (par_d, par_d + sizeof(par_d) / sizeof(double) );
    FractalInstruction tmp_instr(
        8,  //instruction id
        parameters_b,
        parameters_i,
        parameters_d
    );
    FractalMachine::run_instruction(tmp_instr); 
}

void NeuralNetwork::set_connection_speed(int conn_id, double spd){
    //  9: ConnectionSetSpeed(int conn_id, double speed)
    int par_i[] = {conn_id};// conn_id
    int par_b[] = {};       // none
    int par_d[] = {spd};       // speed
    std::vector<int> parameters_i (par_i, par_i + sizeof(par_i) / sizeof(int) );
    std::vector<bool> parameters_b (par_b, par_b + sizeof(par_b) / sizeof(bool) );
    std::vector<double> parameters_d (par_d, par_d + sizeof(par_d) / sizeof(double) );
    FractalInstruction tmp_instr(
        9,  //instruction id
        parameters_b,
        parameters_i,
        parameters_d
    );
    FractalMachine::run_instruction(tmp_instr); 
}

NeuralNetwork::NeuralNetwork(int num_inputs, int num_outputs) {
    // erasess all nodes and conex
    create_fully_connected_net(num_inputs, num_outputs);
}

NeuralNetwork::NeuralNetwork(const NeuralNetwork& orig) {
}

NeuralNetwork::~NeuralNetwork() {
}
// Dedicado a mi madre y a mi padre QEPD los amaré por siempre.


