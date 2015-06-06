/* 
 * File:   FractalInstance.cpp
 * Author: harveybc
 * 
 * Created on 3 de junio de 2015, 04:40 PM
 */

#include <vector>

#include "FractalInstance.h"

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
// constructors
FractalInstance:: FractalInstance(int id, int base_node){ //defaults program_id and pc to 0 {
    instance_id = id; 
    base_node_id = base_node;
    program_counter=0; 
    // reset the instance's program
    program.reset();
    // adds a instruction to create the node 0
    std::vector <bool> parameters_b(1,true);// active
    std::vector <int> parameters_i(2,0);    // source=0, evaluated=0 times
    std::vector <double> parameters_d;      // double parameters (none)
    FractalInstruction tmp_instruction(1, parameters_b, parameters_i
            , parameters_d);   ///< create node 0 active and non-avaluated
    program.push_instruction(tmp_instruction);
}

FractalInstance::FractalInstance(const FractalInstance& orig) {
}

FractalInstance::~FractalInstance() {
}

