/* 
 * File:   Evaluator.cpp
 * Author: harveybc
 * 
 * Created on 11 de junio de 2015, 01:01 AM
 */

#include "Evaluator.h"

void Evaluator::evaluate(){
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
void Evaluator::evaluate_node(int node_id){
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

Evaluator::Evaluator() {
}

Evaluator::Evaluator(const Evaluator& orig) {
}

Evaluator::~Evaluator() {
}

