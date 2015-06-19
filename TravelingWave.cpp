/* 
 * File:   TravelingWave.cpp
 * Author: harveybc
 * 
 * Created on 8 de junio de 2015, 05:04 AM
 */

#include "TravelingWave.h"

int TravelingWave::get_inputs(){
    return(num_inputs);
}

int TravelingWave::get_outputs(){
    return(num_outputs);
}

// Calcula la sumatoria de las conexiones del taxón
double TravelingWave::transfer_fcn(int node_id){
    double acum=0;
    int i, conn_source;
    std::vector<int> conn_list;
    Connection conn_tmp;
    conn_list = FractalMachine::get_conn_list(node_id);
    // sums (weight*taxon_id,if_id,segment) for all connections to a node
    for (std::vector<int>::iterator it = conn_list.begin();it != conn_list.end()
            ;++it){
        conn_tmp = FractalMachine::get_connection(*it);
        conn_source = conn_tmp.get_source();
        // if the node is not evaluated, evaluates it before calculating acum
        if (FractalMachine::get_node(
                conn_source 
                ).get_evaluated()){ 
            evaluate_node(conn_source);
        }
        acum += conn_tmp.get_weight() * 
            FractalMachine::read_message(node_id, 0, conn_tmp.get_segment());
    }
    return acum;
}

// Calcula la función de activación de la neurona (gauss enre -1,1)
double TravelingWave::activation_fcn(double x){
    return(2*exp(-10*x*x)-1);
}

void TravelingWave::evaluate(){
    double tmp_out;
    int i, acum1, acum2;
    int n_nodes = FractalMachine::num_nodes();
    acum1 = num_inputs+1;
    // sets evaluated flags to false for all the nodes except bias and input
    FractalMachine::reset_nodes(num_inputs);
    // evaluate each output neuron
    acum2 = acum1+num_outputs;
    for (i = acum1; i<acum2; i++){
        evaluate_node(i);
    }
}

// marca un nodo como evaluado y evalúa el nodo
void TravelingWave::evaluate_node(int node_id){
    int i;
    double tmp_out;
    // marca el nodo como evaluado si no lo estaba
    if (!FractalMachine::get_node_eval(node_id)){
        FractalMachine::set_node_evaluated(node_id, true);
    } 
    else {
        return;
    }
    // calculates activation funcion of transfer function for the node
    tmp_out=activation_fcn(transfer_fcn(node_id));
    // pushes the value to the interface and discards the oldesd message (front)
    FractalMachine::push_message(node_id, 0, tmp_out);
}

// constructors

TravelingWave::TravelingWave(int n_inputs, int n_outputs):NeuralNetwork(int n_inputs, int n_outputs) {
}

TravelingWave::TravelingWave(const TravelingWave& orig) {
}

TravelingWave::~TravelingWave() {
}

