/* 
 * File:   NeuralNetwork.cpp
 * Author: harveybc
 * 
 * Created on 14 de abril de 2015, 11:32 PM
 */

#include "NeuralNetwork.h"

int NeuralNetwork::get_inputs(){
    return(num_inputs);
}

int NeuralNetwork::get_outputs(){
    return(num_outputs);
}

NeuralNetwork::reset(int n_inputs, int n_outputs){
    create_fully_connected_net(n_inputs, n_outputs);
    num_inputs = n_inputs;
    num_outputs = n_outputs;
}

NeuralNetwork::NeuralNetwork(int num_inputs, int num_outputs) {
    reset(num_inputs, num_outputs);
}

NeuralNetwork::NeuralNetwork(const NeuralNetwork& orig) {
}

NeuralNetwork::~NeuralNetwork() {
}
// Dedicado a mi madre y a mi padre QEPD los amaré por siempre.


