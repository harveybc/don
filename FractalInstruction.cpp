/* 
 * File:   FractalInstruction.cpp
 * Author: harveybc
 * 
 * Created on 5 de junio de 2015, 01:39 AM
 */

#include "FractalInstruction.h"

FractalInstruction::FractalInstruction(char in_id, std::vector <bool> in_parameters_b,
            std::vector <int> in_parameters_i, std::vector <float> in_parameters_f){
    id = in_id;
    parameters_b = in_parameters_b;
    parameters_i = in_parameters_i;
    parameters_f = in_parameters_f;
}

FractalInstruction::FractalInstruction(const FractalInstruction& orig) {
}

FractalInstruction::~FractalInstruction() {
}

