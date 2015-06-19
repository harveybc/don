/* 
 * File:   Node.cpp
 * Author: harveybc
 * 
 * Created on 3 de junio de 2015, 04:39 PM
 */

#include <vector>

#include "Node.h"

int Node::get_id(){
    return node_id;
}

int Node::get_source(){
    return source_id;
}

int Node::get_num_interfaces(){
    return interfaces.size();
}

void Node::add_interface(int num_if, double init_val){
    Interface<double> tmp_if(num_if, init_val);
    interfaces.push_back();
}

bool Node::get_evaluated(){
    return evaluated;
}

bool Node::get_active(){
    return active;
}

void Node::get_node(int &node, int &source, int &recurs, 
        bool &eval, bool &act){
    node = node_id;
    source = source_id;
    recurs = recursive;
    eval = evaluated;
    act = active;
}

int Node::get_recursive(){
    return(recursive);
}

void Node::set_recursive(int times){
    recursive = times;
}

void Node::set_evaluated(bool eval){
    evaluated = eval;
}

void Node::set_active(bool act){
    active = act;
}

void Node::set_node(int node, int source, int recurs, int num_if, bool eval, bool act){
    Interface<double> tmp_if(num_if, 0);
    node_id = node;
    source_id = source;
    recursive = recurs;
    interfaces.resize(num_if, tmp_if);
    evaluated = eval;
    active = act;
}

void Node::set_threshold(double th){
    threshold = th;
}

double Node::get_threshold(){
    return(threshold);
}

Node::Node(int node, int source, int recurs, int num_if, bool eval, bool act) {
    Interface<double> tmp_if(num_if, 0);
    node_id = node;
    source_id = source;
    recursive = recurs;
    interfaces.resize(num_if, tmp_if);
    evaluated = eval;
    active = act;
}

Node::Node() {
    Interface<double> tmp_if(1, 0);
    node_id = 0;
    source_id = 0;
    recursive = 0;
    interfaces.resize(1, tmp_if);
    evaluated = 1;
    active = true;
}

Node::Node(const Node& orig) {
}

Node::~Node() {
}

