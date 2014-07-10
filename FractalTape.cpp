/* 
 * File:   FractalTape.cpp
 * Author: harveybc
 * 
 * Created on 23 de junio de 2014, 01:12 AM
 */

#include "FractalTape.h"

pushInstruction(fractal_instruction instr){  ///< Adiciona una instrucción al final de la cinta
    full_tape.push(instr);
}

popInstruction(fractal_instruction &output){  ///< Adiciona una instrucción al final de la cinta
    output=full_tape.front();
}

int getTape(std::queue <tape_cell> &output_tape){ ///< Obtiene la cinta de instrucciones
    output=full_tape;
}

int getSize(){ ///< Obtiene el número de instrucciones en la cinta.
    return fulltape.size();
}

template <class InstructionClass> 
FractalTape<InstructionClass>::FractalTape() {
}

template <class InstructionClass> 
FractalTape<InstructionClass>::FractalTape(const FractalTape& orig) {
}

template <class InstructionClass> 
FractalTape<InstructionClass>::~FractalTape() {
}

