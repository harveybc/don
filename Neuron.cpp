/* 
 * File:   Neuron.cpp
 * Author: harveybc
 * 
 * Created on 29 de marzo de 2015, 03:55 PM
 */

#include "neuron.h"




// Evalúa las entradas con transferFcn y activationFcn para obtener las salidas
void Neuron::evaluate() {
    // H: Coloca en la interfaz de salida del taxón la activationFcn(transferFcn())
    push_msg(activationFcn(transferFcn()), 0, 0); 
}

//Constructor
Neuron::Neuron(int num_inputs,int num_outputs) {
    // Crea un nodo
    neurona.add_taxons(1);
    // Crea 2 conexiones de entrada
    FractalMachine::NodeConnection conn = { 
        1, //  Tipo de conexión: duplex (0), entrada(1), salida(2) o de pertenencia a grupo >2
        -1, // id del taxón remoto, -1 si es de entrada
        0, // interface en el taxón local
        -1, // interface en el taxón remoto
        0, // largo de la conexión en um, , T=1.5ms, Lambda=4-17mm, r_neurona=(5E-6,1.5E-3m)
        1, // radio n y la velocidad de salida V=(2.8-9.7m/s)myelinated, V=(max:C0=176m/s) La suma de los radios da tamaño a neurona)
        0, // segmento, calculado automáticamente al crear la conex
        1  // peso de la conexión, sensibilidad de la conex de entrada.
    };
    neurona.add_connection(conn); 
    conn = { 
        1, //  Tipo de conexión: duplex (0), entrada(1), salida(2) o de pertenencia a grupo >2
        -1, // id del taxón remoto, -1 si es de entrada o salida
        1, // interface en el taxón local
        -1, // interface en el taxón remoto, -1 si es entrada o salida
        0, // largo de la conexión en um, , T=1.5ms, Lambda=4-17mm, r_neurona=(5E-6,1.5E-3m)
        1, // radio en um aprox vol_neurona/100. Equiv al peso de la conex in y la velocidad de salida V=(2.8-9.7m/s)myelinated, V=(max:C0=176m/s) La suma de los radios da tamaño a neurona)
        0, // segmento, calculado automáticamente al crear la conex
        1  // peso de la conexión, sensnibilidad de la conex de entrada.
    };
    neurona.add_connection(conn);
    // crea una conexión de salida
    conn = { 
        2, //  Tipo de conexión: duplex (0), entrada(1), salida(2) o de pertenencia a grupo >2
        -1, // id del taxón remoto, -1 si es de entrada o salida
        0, // interface en el taxón local
        -1, // interface en el taxón remoto, -1 si es entrada o salida
        0, // largo de la conexión en um, , T=1.5ms, Lambda=4-17mm, r_neurona=(5E-6,1.5E-3m)
        1, // radio en um aprox vol_neurona/100. Equiv al peso de la conex in y la velocidad de salida V=(2.8-9.7m/s)myelinated, V=(max:C0=176m/s) La suma de los radios da tamaño a neurona)
        1  // peso de la conexión, sensibilidad de la conex de entrada.
    };
}

Neuron::Neuron(const Neuron& orig) {
}

Neuron::~Neuron() {
}


