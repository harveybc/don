/* 
 * File:   FractalConnection.cpp
 * Author: harveybc
 * 
 * Created on 3 de junio de 2015, 04:39 PM
 */

#include "FractalConnection.h"

int FractalConnection::get_id(){
    return conn_id;
}

int FractalConnection::get_source(){
    return source_id;
}

int FractalConnection::get_target(){
    return target_id;
}

double FractalConnection::get_length(){
    return length;
}

bool FractalConnection::get_active(){
    return active;
}

void FractalConnection::get_conn(int &connid, int &source, int &target, 
        double &len, bool &act){
    connid = conn_id;       ///< identification number of the connection
    source = source_id;     ///< remote source node identification
    target = target_id;     ///< remote source node identification
    len = length;           ///<  connection length
    act = active;           ///< FALSE when the node is deleted
}

void FractalConnection::set_conn(int connid, int source, int target, double len, 
        bool act){
    conn_id = connid; ///< identification number of the connection
    source_id = source;     ///< remote source node identification
    target_id = target;     ///< remote source node identification
    length = len;           ///<  connection length
    active = act;           ///< FALSE when the node is deleted
}

FractalConnection::FractalConnection(int connid, int source, int target, 
        double len, bool act) {
    conn_id = connid; ///< identification number of the connection
    source_id = source;     ///< remote source node identification
    target_id = target;     ///< remote source node identification
    length = len;           ///<  connection length
    active = act;           ///< FALSE when the node is deleted
}

FractalConnection::FractalConnection(const FractalConnection& orig) {
}

FractalConnection::~FractalConnection() {
}

