/* 
 * File:   FractalProgram.cpp
 * Author: harveybc
 * 
 * Created on 2 de junio de 2015, 01:22 AM
 */

#include <deque>

#include "FractalProgram.h"

void FractalProgram::push_instruction(FractalInstruction instr){  ///< Adiciona una instrucción al final de la cinta
    instructions.push_back(instr);
}
void FractalProgram::pop_instruction(FractalInstruction &output){  ///< Adiciona una instrucción al final de la cinta
    output=instructions.front();
}

int FractalProgram::get_size(){ ///< Obtiene el número de instrucciones en la cinta.
    return instructions.size();
}

void FractalProgram::get_instructions(std::deque <FractalInstruction> &output_instr){ ///< Obtiene la cinta de instrucciones
    output_instr = instructions;
}

void FractalProgram::set_instructions(std::deque <FractalInstruction> in_instr){ ///< Obtiene la cinta de instrucciones
    instructions = in_instr;
}

void FractalProgram::reset(){ ///< destroys all elements in the instructrions deque
    instructions.clear();
}

FractalProgram::FractalProgram(std::deque <FractalInstruction> in_instr) {
    // Adds the first node 
    instructions = in_instr;
}

FractalProgram::FractalProgram(const FractalProgram& orig) {
}

FractalProgram::~FractalProgram() {
}

