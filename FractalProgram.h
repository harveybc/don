/* 
 * File:   FractalProgram.h
 * Author: harveybc
 *
 * Created on 2 de junio de 2015, 01:22 AM
 */

#ifndef FRACTALPROGRAM_H
#define	FRACTALPROGRAM_H

class FractalProgram {
public:
    // Typedefs y structs
    struct FractalCmd {
        char id;                            ///< La instrucción a ejecutar 
        std::vector <int> parameters_i;     ///< Parámetros enteros
        std::vector <double> parameters_d;  ///< Parámetros double
    };
    int push_instruction(FractalCmd instr);  ///< Adiciona una instrucción al final de la cinta, retorna el tamaño de la cinta
    int pop_instruction(FractalCmd &output);  ///< Adiciona una instrucción al final de la cinta, retorna el tamaño de la cinta
    int get_tape(std::deque <FractalCmd> &output_tape); ///< Obtiene la cinta de instrucciones, retorna el número de instrucciones leídas
    int get_size(); ///< Obtiene el número de instrucciones en la cinta.
    int file_export(std::string file_path); ///< Exporta la cinta a un archivo en el formato JSON
    int file_import(std::string file_path); ///< Importa la cinta desde un archivo JSON   
    FractalProgram();
    FractalProram(const FractalProgram& orig);
    virtual ~FractalProgram();
private:
    std::deque <FractalCmd> instructions; ///< Una cinta fractal es una cola FIFO de caldas de instrucciones que se ejecutan en cada iteración en el estado de la máquina.
};

#endif	/* FRACTALPROGRAM_H */

