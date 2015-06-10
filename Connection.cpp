/* 
 * File:   FractalConnection.cpp
 * Author: harveybc
 * 
 * Created on 3 de junio de 2015, 04:39 PM
 */

#include "Connection.h"

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

int FractalConnection::get_source_interface(){
    return source_interface;
}

void FractalConnection::set_source_interface(int s_if){
    source_interface = s_if;
}

bool FractalConnection::get_active(){
    return active;
}

void FractalConnection::get_conn(int &connid, int &source, int &target, 
        int &s_if, double &len, bool &act){
    connid = conn_id;       ///< identification number of the connection
    source = source_id;     ///< remote source node identification
    target = target_id;     ///< remote source node identification
    s_if = source_interface; 
    len = length;           ///<  connection length
    act = active;           ///< FALSE when the node is deleted
}

void FractalConnection::set_conn(int connid, int source, int target, 
        int s_if, double len, double w, double spd,  bool act){
    conn_id = connid; ///< identification number of the connection
    source_id = source;     ///< remote source node identification
    target_id = target;     ///< remote source node identification
    source_interface = s_if;
    length = len;           ///<  connection length
    weight = w;
    speed = spd;
    
    active = act;           ///< FALSE when the node is deleted
}

void FractalConnection::set_length(double len){
    length = len;
}

void FractalConnection::set_active(bool act){
    active = act;
}

int FractalConnection::get_weight(){
    return weight;
}

int FractalConnection::get_speed(){
    return speed;
}

void FractalConnection::set_weight(int w){
    weight = w;
}

void FractalConnection::set_speed(int s){
    speed = s;
}

FractalConnection::FractalConnection(int connid, int source, int target, 
        int s_if, double len, double w, double spd, bool act) {
    conn_id = connid; ///< identification number of the connection
    source_id = source;     ///< remote source node identification
    target_id = target;     ///< remote source node identification
    source_interface = s_if;
    length = len;           ///<  connection length
    weight = w;
    speed = spd;
    active = act;           ///< FALSE when the node is deleted
}

FractalConnection::FractalConnection(const FractalConnection& orig) {
}

FractalConnection::~FractalConnection() {
}

