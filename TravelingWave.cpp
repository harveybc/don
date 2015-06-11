

/* 
 * File:   TravelingWave.cpp
 * Author: harveybc
 * 
 * Created on 8 de junio de 2015, 05:04 AM
 */

#include "TravelingWave.h"

void CreateFullyConnectedNet(int num_inputs, int num_outputs){
    // resets fractal machine
    // adds input+output nodes
    // creates connections from every input to each output
    // for each output
        //  for each input
            //creates the conex with len 0
    
}

void CreateNodeFromConnecction(int num_inputs, int num_outputs);
void CreateConnection(int node_source, int node_target);
void SetConnectionWeight(int conn_id, double wt);
void SetConnectionLength(int conn_id, double len);
void SetConnectionSpeed(int conn_id, double spd);
void MutateConn(int conn_id, double d_weight, double d_len, double d_spd);

// Calcula la función de activación de la neurona (gauss enre -1,1)
double TravelingWave::activation_fcn(double x){
    return(2*exp(-10*x*x)-1);
}

// Calcula la sumatoria de las conexiones del taxón
double TravelingWave::transfer_fcn(int node_id){
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
TravelingWave::TravelingWave() {
}

TravelingWave::TravelingWave(const TravelingWave& orig) {
}

TravelingWave::~TravelingWave() {
}

