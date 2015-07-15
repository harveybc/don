/* 
 * File:   Instance.h
 * Author: harveybc
 *
 * Created on 3 de junio de 2015, 04:40 PM
 */

#ifndef FRACTALINSTANCE_H
#define	FRACTALINSTANCE_H
#include "FractalProgram.h"

class Instance {
public:
    FractalProgram program; ///< Cintas de instrucciones de la mÃ¡quina     
    // methods
    int get_instance_id();
    int get_base_neuron_id();
    int get_program_counter();
    FractalProgram get_program();
    void set_instance(int id, int base_neuron); 
    void set_program_counter(int position);
    void set_program(FractalProgram in_program); ///< Loads a program in an instance
    void add_instruction(FractalInstruction instr);
    bool fetch(FractalInstruction &instr); // Increments PC ands returns current instruction
    // constructors
    Instance(int id, int base_neuron); //defaults program_id and pc to 0
    Instance(const Instance& orig);
    virtual ~Instance();
private:
    int instance_id;        ///< Program instance identification
    int base_neuron_id;       ///< Id of the base neuron for the instance
    int program_counter;    ///< Next instruction to be executed in program
};

#endif	/* FRACTALINSTANCE_H */

