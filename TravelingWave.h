/* 
 * File:   TravelingWave.h
 * Author: harveybc
 *
 * Models a node connection of an artificial neural network (ANN) as a 
 * longitudinal physical media of variable length with a traveling wave as 
 * codification of messages going over the connection. 
 * 
 
 *  
 * Created on 8 de junio de 2015, 05:04 AM
 */

#ifndef TRAVELINGWAVE_H
#define	TRAVELINGWAVE_H
#include "NeuralNetwork.h"

class TravelingWave: NeuralNetwork{
public:
    // neuro evolution commands to be implemented in derived classes
    void create_fully_connected_net(int num_inputs, int num_outputs);
    void create_node_from_connecction(int num_inputs, int num_outputs);
    void create_connection(int node_source, int node_target);
    void set_connection_weight(int conn_id, double wt);
    void set_connection_length(int conn_id, double len);
    void set_connection_speed(int conn_id, double spd);
    void mutate_conn(int conn_id, double d_weight, double d_len, double d_spd);    
    // constructors
    TravelingWave();
    TravelingWave(const TravelingWave& orig);
    virtual ~TravelingWave();
private:
    
};

#endif	/* TRAVELINGWAVE_H */

