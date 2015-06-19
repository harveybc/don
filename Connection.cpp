/* 
 * File:   Connection.cpp
 * Author: harveybc
 * 
 * Created on 3 de junio de 2015, 04:39 PM
 */

#include "Connection.h"

void Connection::calculate_segment(){
    segment = length/speed;
}

int Connection::get_id(){
    return conn_id;
}

int Connection::get_source(){
    return source_id;
}

int Connection::get_target(){
    return target_id;
}

double Connection::get_length(){
    return length;
}

int Connection::get_source_interface(){
    return source_interface;
}

void Connection::set_source_interface(int s_if){
    source_interface = s_if;
}

bool Connection::get_active(){
    return active;
}

void Connection::get_conn(int &connid, int &source, int &target, 
        int &s_if, double &len, bool &act){
    connid = conn_id;       ///< identification number of the connection
    source = source_id;     ///< remote source node identification
    target = target_id;     ///< remote source node identification
    s_if = source_interface; 
    len = length;           ///<  connection length
    act = active;           ///< FALSE when the node is deleted
}

void Connection::set_conn(int connid, int source, int target, 
        int s_if, double w, double len, double spd,  bool act){
    conn_id = connid; ///< identification number of the connection
    source_id = source;     ///< remote source node identification
    target_id = target;     ///< remote source node identification
    source_interface = s_if;
    length = len;           ///<  connection length
    weight = w;
    speed = spd;
    
    active = act;           ///< FALSE when the node is deleted
    calculate_segment();
}

void Connection::set_length(double len){
    length = len;
    calculate_segment();
}

void Connection::set_active(bool act){
    active = act;
}

int Connection::get_weight(){
    return weight;
}

int Connection::get_speed(){
    return speed;
}

void Connection::set_weight(int w){
    weight = w;
}

void Connection::set_speed(int s){
    speed = s;
    calculate_segment();
}

int Connection::get_segment(){
    return(segment);
}

Connection::Connection(int connid, int source, int target, 
        int s_if, double len, double w, double spd, bool act) {
    conn_id = connid; ///< identification number of the connection
    source_id = source;     ///< remote source node identification
    target_id = target;     ///< remote source node identification
    source_interface = s_if;
    length = len;           ///<  connection length
    weight = w;
    speed = spd;
    active = act;           ///< FALSE when the node is deleted
    calculate_segment();
}

Connection::Connection(const Connection& orig) {
}

Connection::~Connection() {
}

