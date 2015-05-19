/* 
 * File:   NeuralNetwork.cpp
 * Author: harveybc
 * 
 * Created on 14 de abril de 2015, 11:32 PM
 */

#include "NeuralNetwork.h"

// descarta el mensaje más antiguo(front) e introduce el msj el el fin de la cola de entrada.
void push_input(int input_id, double msg_in){
    // saca el mensaje más viejo de la interfaz del nodo 0(general input)
    Taxonomy::pop_msg(input_id,0);
    // introduce el nuevo mensaje en la interfaz
    Taxonomy::
}
 
// obtiene el valor más nuevo de una interfaz de salida
void read_output(int node_id, interface_id, double &msg_out){
    // si existe un mensaje, lo retorna, sino, retorna 0.
    msg_out=fractal.interfaces[node_id][interface_id][0];
}

// evalúa los nodos de salida y recursivamente todos los demás
void evaluate(){
    int i;
    double tmp_out;
    // coloca todos los indicadores de evaluación en 0 excepto la neurona de entrada/bias;
    for (int i=1; i<=fractal.nodes_eval;i++){
        fractal.nodes_eval[i]=0;
    }
    // para cada neurona de salida (node_id > 0 <oputputs) la evalúa.
    for (int i=1; i<=num_outputs;i++){
        evaluateNode(i);
    }
}

// marca un nodo como evaluado y evalúa el nodo
void evaluateNode(int node_id){
    int i;
    double tmp_out;
    // marca el nodo como evaluado
    if (fractal.eval_nodes[node_id]==0){
        fractal.eval_nodes[node_id]=1;
    } 
    else {
        return;
    }
    // calcula la activationFcn de la transferFcn 
    tmp_out=activationFcn(transferFcn(node_id));
    // descarta el valor más antiguo(front) de la interfaz de salida(0 para neuronas) de node_id
    fractal.interfaces[node_id][0].pop_front();
    // introduce el nuevo valor en la interfaz de salida 0 (back)
    fractal.interfaces[node_id][0].push_back(tmp_out);
}

// Calcula la función de activación de la neurona (gauss enre -1,1)
double activationFcn(double x){
    return(2*exp(-10*x*x)-1);
}
// Calcula la sumatoria de las conexiones del taxón
double transferFcn(int node_id){
    double acum=0;
    int i;
    // Para todas las conex de entrada a node_id, suma (weight*taxon_id,if_id,segment)
    for (i=0;i< fractal.connections[node_id].size();i++){
        // si el taxón remoto de la conex no ha sido evaluado, lo evalúa
        if (nodes_eval[fractal.connections[node_id][i].remote_id]) //PARECE REDUNDANTE PERO ES UNA OPTIMIZACIón para evitar el not
        {
            acum+=fractal.connections[node_id][i].weight* fractal.interfaces[fractal.connections[node_id][i].remote_id][fractal.connections[node_id][i].remote_interface][fractal.connections[node_id][i].segment];
        }
        else
        {
            evaluateNode(nodes_eval[fractal.connections[node_id][i].remote_id]);
            acum+=fractal.connections[node_id][i].weight* fractal.interfaces[fractal.connections[node_id][i].remote_id][fractal.connections[node_id][i].remote_interface][fractal.connections[node_id][i].segment];
        }
    }
    return acum;
}

NeuralNetwork::NeuralNetwork(int num_inputs, int num_outputs) {
    // adiciona num_outputs nodos
    add_taxons(num_outputs+1);
    // para cada salida, crea una conexión a todas las entradas
    for (int i=1; i<=num_outputs; i++){
        for (int j=0; j<num_inputs;j++){
            add_connection(i, j, 0, 0.000005, 1); ///< Crea una nueva conexión de largo 0;
        }
    }
}

NeuralNetwork::NeuralNetwork(const NeuralNetwork& orig) {
}

NeuralNetwork::~NeuralNetwork() {
}
// Dedicado a mi madre y a mi padre QEPD los amaré por siempre.


