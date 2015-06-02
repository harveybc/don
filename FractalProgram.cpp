/* 
 * File:   FractalProgram.cpp
 * Author: harveybc
 * 
 * Created on 2 de junio de 2015, 01:22 AM
 */

#include "FractalProgram.h"
int FractalProgram::push_instruction(FractalCmd instr){  ///< Adiciona una instrucción al final de la cinta
    instructions.push_back(instr);
}
int FractalProgram::pop_instruction(FractalCmd &output){  ///< Adiciona una instrucción al final de la cinta
    output=instructions.front();
}

int FractalProgram::get_tape(std::deque <FractalCmd> &output_tape){ ///< Obtiene la cinta de instrucciones
    output_tape=instructions;
}

int FractalProgram::get_size(){ ///< Obtiene el número de instrucciones en la cinta.
    return instructions.size();
}
FractalProgram::FractalProgram() {
}

FractalProgram::FractalProgram(const FractalProgram& orig) {
}

FractalProgram::~FractalProgram() {
}

