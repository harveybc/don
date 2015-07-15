/* 
 * File:   Synapse.cpp
 * Author: harveybc
 * 
 * Created on 3 de junio de 2015, 04:39 PM
 */

#include "Synapse.h"

void Synapse::calculate_segment(){
    segment = length/speed;
}

int Synapse::get_id(){
    return syn_id;
}

int Synapse::get_source(){
    return source_id;
}

int Synapse::get_target(){
    return target_id;
}

float Synapse::get_length(){
    return length;
}

int Synapse::get_source_axon(){
    return source_axon;
}

void Synapse::set_source_axon(int s_if){
    source_axon = s_if;
}

bool Synapse::get_active(){
    return active;
}

void Synapse::get_conn(int &connid, int &source, int &target, 
        int &s_if, float &len, bool &act){
    connid = syn_id;       ///< identification number of the synapse
    source = source_id;     ///< remote source neuron identification
    target = target_id;     ///< remote source neuron identification
    s_if = source_axon; 
    len = length;           ///<  synapse length
    act = active;           ///< FALSE when the neuron is deleted
}

void Synapse::set_conn(int connid, int source, int target, 
        int s_if, float w, float len, float spd,  bool act){
    syn_id = connid; ///< identification number of the synapse
    source_id = source;     ///< remote source neuron identification
    target_id = target;     ///< remote source neuron identification
    source_axon = s_if;
    length = len;           ///<  synapse length
    weight = w;
    speed = spd;
    
    active = act;           ///< FALSE when the neuron is deleted
    calculate_segment();
}

void Synapse::set_length(float len){
    length = len;
    calculate_segment();
}

void Synapse::set_active(bool act){
    active = act;
}

int Synapse::get_weight(){
    return weight;
}

int Synapse::get_speed(){
    return speed;
}

void Synapse::set_weight(int w){
    weight = w;
}

void Synapse::set_speed(int s){
    speed = s;
    calculate_segment();
}

int Synapse::get_segment(){
    return(segment);
}

Synapse::Synapse(int connid, int source, int target, 
        int s_if, float len, float w, float spd, bool act) {
    syn_id = connid; ///< identification number of the synapse
    source_id = source;     ///< remote source neuron identification
    target_id = target;     ///< remote source neuron identification
    source_axon = s_if;
    length = len;           ///<  synapse length
    weight = w;
    speed = spd;
    active = act;           ///< FALSE when the neuron is deleted
    calculate_segment();
}

Synapse::Synapse(const Synapse& orig) {
}

Synapse::~Synapse() {
}

