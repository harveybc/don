/* 
 * File:   FractalMachine.cpp
 * Author: harveybc
 * 
 * Created on 22 de junio de 2014, 08:37 PM
 */

#include "FractalMachine.h"
#include "FractalTape.h"
template <class MessageClass> 
int FractalMachine<MessageClass>::run(FractalTape tape){ ///< Ejecuta la cinta de instrucciones, retorna el número de instrucciones ejecutadas
    int counter=0;
    int i=0;
    fractal_instruction instruction, tmp_instr;
    while (tape.get_size()>0){ //Hace fetch de instrucciones, saca una a una las celdas de la cinta
        if (tape.pop_instruction(instruction)){ ///< Comienza decodificación de instrucciones: 0=NOP,1=CREATE_NODE,2=REPLACE_NODE,3=DELETE_NODE,4=CREATE_CONNECTION,5=REPLACE_CONNECTION,6=DELETE_CONNECTION,7=WRITE_INSTRUCTION
            /// instruction 1 = Create objects, params: base node id, usa taxon_register como los nuevos
            if (instruction.id=='1'){ ///< TODO: colocar como constantes los id de las instrucciones. :
                if (instruction.parameters.size()<1) return 0; // Verifica si el número de params es 1
                if (get_size()>instruction.parameters[0]) return 0; // Verifica si el fractal coord base existe
                if (taxon_register.size()=0) return 0; //Verifica si el registro de taxones está vacío
                for (i=0;i<taxon_register.size();i++){ // Ejecución de comando 1: crear nodo
                    fractal_machine_state.push_back(taxon_register[i]); 
                }
            }           
            /// instruction 2 = replace object, params: base node id, usa taxon register para realizar el reemplazo del objeto en el estado
            if (instruction.id=='2'){
                if (get_size()<1) return 0; // Verifica si el número de params es 1
                if (get_size()>instruction.parameters[0]) return 0; // Verifica si el fractal coord base existe
                if (taxon_register.size()=0) return 0; //Verifica si el registro de taxones está vacío
                fractal_machine_state[instruction.parameters[0]]=taxon_register[0];// Ejecución de comando 2: reemplazar nodo
            }            
            ///< TODO: instruction 3 = delete object (todos sus hijos se pasan al parent y se coloca su estado como inactivo), params: base node id, usa taxon register para realizar el reemplazo del objeto en el estado
            /// instruction 4 = create connections, params: base node id, usa conn register 
            if (instruction.id=='4'){
                if (instruction.parameters.size()<1) return 0; // Verifica si el número de params es 1
                if (fractal_machine_state.size()>instruction.parameters[0]) return 0; // Verifica si el fractal coord base existe
                if (conn_register.size()=0) return 0; //Verifica si el registro de conexiones está vacío
                for (i=0;i<conn_register.size();i++){ // Ejecución de comando 4: crear conex
                    fractal_machine_state[instruction.parameters[0]].add_connection(conn_register[i]); /// Adiciona una conex al objeto
                }
            } 
            /// instruction 5 = replace connections, params: base node id, conn_id, usa conn register 
            if (instruction.id=='5'){
                if (instruction.parameters.size()<2) return 0; // Verifica si el número de params es 2
                if (fractal_machine_state.size()>instruction.parameters[0]) return 0; // Verifica si el fractal coord base existe
                if (conn_register.size()=0) return 0; //Verifica si el registro de conexiones está vacío
                fractal_machine_state[instruction.parameters[0]].modify_connection(instruction.parameters[1],conn_register[0]);/// ejecuta comando 5: reemplazar
            } 
            /// instruction 6 = delete connections, params: base node id, conn_id
            if (instruction.id=='6'){
                if (instruction.parameters.size()<2) return 0; // Verifica si el número de params es 1
                if (fractal_machine_state.size()>instruction.parameters[0]) return 0; // Verifica si el fractal coord base existe
                if (conn_register.size()=0) return 0; //Verifica si el registro de conexiones está vacío
                fractal_machine_state[instruction.parameters[0]].erase_connection(instruction.parameters[1]);/// ejecuta comando 6: borrar conexión
            } 
            /// instruction 7 = add instruction to tape, params: instruction id, instruction params
            if (instruction.id=='7'){
                if (instruction.parameters.size()<3) return 0; // Verifica si el número de params es > 3
                tmp_instr.id=instruction.id;
                for (i=0;i<(instruction.parameters.size()-1);i++){
                    tmp_instr.parameters.push_back(instruction.parameters[i+1]);
                }
                tape.push_instruction(tmp_instr); // Inserta la instrucción al final de la cinta.
            } 
        }
    }
}

template <class MessageClass> 
int FractalMachine<MessageClass>::reset(){ ///< Borra todos los objetos del estado
    fractal_machine_state.clear();
}

template <class MessageClass> 
int FractalMachine<MessageClass>::get_size(){ ///< Obtiene el número de objetos en el estado de la máquina
    fractal_machine_state.size();
}

template <class MessageClass> 
int FractalMachine<MessageClass>::get_state(int position, Taxon <MessageClass> &output){ ///< Obtiene el objeto de la posición indicada
    if (fractal_machine_state.size()>position) return 0;
    output=fractal_machine_state[position];
    return 1;
}

template <class MessageClass> 
int FractalMachine<MessageClass>::replace_state(Taxon <MessageClass> new_object, int position){ ///< Reemplaza el objeto de la posición indicada on el nuevo objeto
    if (fractal_machine_state.size()>position) return 0;
    fractal_machine_state[position]=new_object;
    return 1;
}    
    
template <class MessageClass> 
FractalMachine<MessageClass>::FractalMachine() {
}
template <class MessageClass> 
FractalMachine<MessageClass>::FractalMachine(const FractalMachine& orig) {
}
template <class MessageClass> 
FractalMachine<MessageClass>::~FractalMachine() {
}

