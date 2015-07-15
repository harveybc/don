/* 
 * File:   Neuron.cpp
 * Author: harveybc
 * 
 * Created on 3 de junio de 2015, 04:39 PM
 */

#include <vector>

#include "Neuron.h"

int Neuron::get_id(){
    return neuron_id;
}

int Neuron::get_source(){
    return source_id;
}

bool Neuron::get_active(){
    return active;
}

void Neuron::get_neuron(int &neuron, int &source, int &recurs, 
        bool &eval, bool &act){
    neuron = neuron_id;
    source = source_id;
    recurs = recursive;
    eval = evaluated;
    act = active;
}

int Neuron::get_recursive(){
    return(recursive);
}

void Neuron::set_recursive(int times){
    recursive = times;
}

void Neuron::set_evaluated(bool eval){
    evaluated = eval;
}

void Neuron::set_active(bool act){
    active = act;
}

void Neuron::set_neuron(int neuron, int source, int recurs, bool eval, bool act){
    neuron_id = neuron;
    source_id = source;
    recursive = recurs;
    evaluated = eval;
    active = act;
}

void Neuron::set_threshold(int axon_id, float th){
    Qth = th; /// membrane potential threshold
}

float Neuron::get_threshold(int axon_id){
    return(axon[axon_id].threshold);
}
    
void Neuron::set_m_potential(int axon_id, float pot){
    axon[axon_id].m_potential = pot;
}

void Neuron::add_m_potential(int axon_id, float pot){
    axon[axon_id].m_potential += pot;
}
    
float Neuron::get_m_potential(int axon_id){
    return(axon[axon_id].m_potential);
}

void Neuron::set_depolarization_factor(int axon_id, float dep){
    axon.depolarization = dep;
}

float Neuron::get_depolarization_factor(int axon_id){
    return(axon.depolarization);
}
    
void Neuron::depolarize(int axon_id){
    axon[axon_id].m_potential *= axon[axon_id].depolarization;
}

Neuron::Neuron(int neuron, int source, int recurs, int num_if, bool eval, bool act) {
    Axon<float> tmp_if(num_if, 0);
    neuron_id = neuron;
    source_id = source;
    recursive = recurs;
    axon.resize(num_if, tmp_if);
    evaluated = eval;
    active = act;
}

Neuron::Neuron() {
    Axon<float> tmp_if(1, 0);
    neuron_id = 0;
    source_id = 0;
    recursive = 0;
    axon.resize(1, tmp_if);
    evaluated = 1;
    active = true;
}

Neuron::Neuron(const Neuron& orig) {
}

Neuron::~Neuron() {
}

