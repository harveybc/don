/* 
 * File:   FractalInstance.cpp
 * Author: harveybc
 * 
 * Created on 3 de junio de 2015, 04:40 PM
 */

#include <vector>

#include "Instance.h"

// methods
int FractalInstance::get_instance_id(){
    return(instance_id);
}
    
int FractalInstance::get_base_node_id(){
    return(base_node_id);
}

int FractalInstance::get_program_counter(){
    return(program_counter);
}

FractalProgram FractalInstance::get_program(){
    return(program);
}

void FractalInstance::set_program_counter(int position){
    program_counter = position;
}

void FractalInstance::set_program(FractalProgram in_program){
    program = in_program;
}

void FractalInstance::set_instance(int id, int base_node){
    instance_id = id; 
    base_node_id = base_node;
}

void FractalInstance::add_instruction(FractalInstruction instr){
    program.push_instruction(instr);
}

bool FractalInstance::fetch(FractalInstruction &instr){
    if (program_counter < program.get_size())
        instr = program.get_instruction(program_counter++);
    else
        return false;
    return true;
}

// constructors
FractalInstance:: FractalInstance(int id, int base_node){ //defaults program_id and pc to 0 {
    instance_id = id; 
    base_node_id = base_node;
    program_counter=0; 
    // reset the instance's program
    program.reset();
}

FractalInstance::FractalInstance(const FractalInstance& orig) {
}

FractalInstance::~FractalInstance() {
}

