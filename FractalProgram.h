/* 
 * File:   FractalProgram.h
 * Author: harveybc
 *
 * Created on 2 de junio de 2015, 01:22 AM
 * COMPLETE
 */

#ifndef FRACTALPROGRAM_H
#define	FRACTALPROGRAM_H
#include "FractalInstruction.h"

class FractalProgram {
public:
    void push_instruction(FractalInstruction instr);  ///< Adiciona una instrucción al final de la cinta, retorna el tamaño de la cinta
    void get_instruction(int index);  
    int get_size(); ///< Obtiene el número de instrucciones en la cinta.
    void get_instructions(std::deque <FractalInstruction> &output_instr); ///< Obtiene la cinta de instrucciones, retorna el número de instrucciones leídas
    void set_instructions(std::deque <FractalInstruction> in_instr); ///< Obtiene la cinta de instrucciones, retorna el número de instrucciones leídas
    void reset(); ///< destroys all elements in the instructrions deque
    // constructors
    FractalProgram(std::deque <FractalInstruction> in_instr);
    FractalProgram(const FractalProgram& orig);
    virtual ~FractalProgram();
private:
    std::vector <FractalInstruction> instructions; ///< Una cinta fractal es una cola FIFO de caldas de instrucciones que se ejecutan en cada iteración en el estado de la máquina.
};

#endif	/* FRACTALPROGRAM_H */

