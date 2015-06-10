/* 
 * File:   FractalNode.cpp
 * Author: harveybc
 * 
 * Created on 3 de junio de 2015, 04:39 PM
 */

#include <vector>

#include "Node.h"

int FractalNode::get_id(){
    return node_id;
}

int FractalNode::get_source(){
    return source_id;
}

int FractalNode::get_num_interfaces(){
    return interfaces.size();
}

void FractalNode::add_interface(int num_if, double init_val){
    Interface<double> tmp_if(num_if, init_val);
    interfaces.push_back();
}

int FractalNode::get_evaluated(){
    return evaluated;
}

bool FractalNode::get_active(){
    return active;
}

void FractalNode::get_node(int &node, int &source, int &recurs, 
        bool &eval, bool &act){
    node = node_id;
    source = source_id;
    recurs = recursive;
    eval = evaluated;
    act = active;
}

int FractalNode::get_recursive(){
    return(recursive);
}

void FractalNode::set_recursive(int times){
    recursive = times;
}

void FractalNode::set_evaluated(bool eval){
    evaluated = eval;
}

void FractalNode::set_active(bool act){
    active = act;
}

void FractalNode::set_node(int node, int source, int recurs, int num_if, bool eval, bool act){
    Interface<double> tmp_if(num_if, 0);
    node_id = node;
    source_id = source;
    recursive = recurs;
    interfaces.resize(num_if, tmp_if);
    evaluated = eval;
    active = act;
}

FractalNode::FractalNode(int node, int source, int recurs, int num_if, bool eval, bool act) {
    Interface<double> tmp_if(num_if, 0);
    node_id = node;
    source_id = source;
    recursive = recurs;
    interfaces.resize(num_if, tmp_if);
    evaluated = eval;
    active = act;
}

FractalNode::FractalNode() {
    Interface<double> tmp_if(1, 0);
    node_id = 0;
    source_id = 0;
    recursive = 0;
    interfaces.resize(1, tmp_if);
    evaluated = 1;
    active = true;
}

FractalNode::FractalNode(const FractalNode& orig) {
}

FractalNode::~FractalNode() {
}

