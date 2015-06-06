/* 
 * File:   FractalNode.cpp
 * Author: harveybc
 * 
 * Created on 3 de junio de 2015, 04:39 PM
 */

#include "FractalNode.h"

int FractalNode::get_id(){
    return node_id;
}

int FractalNode::get_source(){
    return source_id;
}

int FractalNode::get_evaluated(){
    return evaluated;
}

bool FractalNode::get_active(){
    return active;
}

void FractalNode::get_node(int &node, int &source, int &eval, bool &act){
    node = node_id;
    source = source_id;
    eval = evaluated;
    act = active;
}

void FractalNode::set_evaluated(int eval){
    evaluated = eval;
}

void FractalNode::set_active(bool act){
    active = act;
}

void FractalNode::set_node(int node, int source, int eval, bool act){
    node_id = node;
    source_id = source;
    evaluated = eval;
    active = act;
}

FractalNode::FractalNode(int node, int source, int eval, bool act) {
    node_id = node;
    source_id = source;
    evaluated = eval;
    active = act;
}

FractalNode::FractalNode() {
    node_id = 0;
    source_id = 0;
    evaluated = 1;
    active = true;
}

FractalNode::FractalNode(const FractalNode& orig) {
}

FractalNode::~FractalNode() {
}

