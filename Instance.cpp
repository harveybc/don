/* 
 * File:   Instance.cpp
 * Author: harveybc
 * 
 * Created on 3 de junio de 2015, 04:40 PM
 */

#include <vector>

#include "Instance.h"

// methods
int Instance::get_instance_id(){
    return(instance_id);
}
    
int Instance::get_base_neuron_id(){
    return(base_neuron_id);
}

int Instance::get_program_counter(){
    return(program_counter);
}

FractalProgram Instance::get_program(){
    return(program);
}

void Instance::set_program_counter(int position){
    program_counter = position;
}

void Instance::set_program(FractalProgram in_program){
    program = in_program;
}

void Instance::set_instance(int id, int base_neuron){
    instance_id = id; 
    base_neuron_id = base_neuron;
}

void Instance::add_instruction(FractalInstruction instr){
    program.push_instruction(instr);
}

bool Instance::fetch(FractalInstruction &instr){
    if (program_counter < program.get_size())
        instr = program.get_instruction(program_counter++);
    else
        return false;
    return true;
}

// constructors
Instance:: Instance(int id, int base_neuron){ //defaults program_id and pc to 0 {
    instance_id = id; 
    base_neuron_id = base_neuron;
    program_counter=0; 
    // reset the instance's program
    program.reset();
}

Instance::Instance(const Instance& orig) {
}

Instance::~Instance() {
}

