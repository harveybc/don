/* 
 * File:   FractalTape.cpp
 * Author: harveybc
 * 
 * Created on 23 de junio de 2014, 01:12 AM
 */

#include "FractalTape.h"

void FractalTape::push_instruction(fractal_instruction instr){  ///< Adiciona una instrucción al final de la cinta
    full_tape.push_back(instr);
}

void FractalTape::pop_instruction(fractal_instruction &output){  ///< Adiciona una instrucción al final de la cinta
    output=full_tape.front();
}

void FractalTape::get_tape(std::deque <fractal_instruction> &output_tape){ ///< Obtiene la cinta de instrucciones
    output_tape=full_tape;
}

int FractalTape::get_size(){ ///< Obtiene el número de instrucciones en la cinta.
    return full_tape.size();
}

FractalTape::FractalTape() {
}

FractalTape::FractalTape(const FractalTape& orig) {
}

FractalTape::~FractalTape() {
}

