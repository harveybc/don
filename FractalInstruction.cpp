/* 
 * File:   FractalInstruction.cpp
 * Author: harveybc
 * 
 * Created on 5 de junio de 2015, 01:39 AM
 */

#include "FractalInstruction.h"

FractalInstruction::FractalInstruction(char in_id, std::vector <bool> in_parameters_b,
            std::vector <int> in_parameters_i, std::vector <double> in_parameters_d){
    id = in_id;
    parameters_b = in_parameters_b;
    parameters_i = in_parameters_i;
    parameters_d = in_parameters_d;
}

FractalInstruction::FractalInstruction(const FractalInstruction& orig) {
}

FractalInstruction::~FractalInstruction() {
}

