/* 
 * File:   FractalInstruction.h
 * Author: harveybc
 *
 * Created on 5 de junio de 2015, 01:39 AM
 */

#ifndef FRACTALINSTRUCTION_H
#define	FRACTALINSTRUCTION_H

class FractalInstruction {
public:
    FractalInstruction(char id, std::vector <bool> parameters_b,
            std::vector <int> parameters_i, std::vector <double> parameters_d);
    FractalInstruction(const FractalInstruction& orig);
    virtual ~FractalInstruction();
    char id;                            ///< La instrucción a ejecutar 
    std::vector <bool> parameters_b;    ///< bool parameters
    std::vector <int> parameters_i;     ///< int parameters
    std::vector <double> parameters_d;  ///< double parameters
private:
};

#endif	/* FRACTALINSTRUCTION_H */

