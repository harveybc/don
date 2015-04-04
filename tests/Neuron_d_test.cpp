/* 
 * File:   Neuron_d_test.cpp
 * Author: harveybc
 *
 * Created on 1/04/2015, 10:22:36 PM
 */

#include <stdlib.h>
#include <iostream>
#include "Neuron_d.h"

/*
 * Simple C++ Test Suite
 */

/* Prueba de Neuron_d (que usa mensajes tipo double) */
void test1(double input_0, double input_1) {
    int tmp_int=0;
    double tmp_double;
    // Se crea una neurona 
    Neuron_d neurona;
    // Crea 2 conexiones de entrada
    TaxonConnection conn = { 
        1, //  Tipo de conexión: duplex (0), entrada(1), salida(2) o de pertenencia a grupo >2
        -1, // id del taxón remoto, -1 si es de entrada
        0, // interface en el taxón local
        -1, // interface en el taxón remoto
        0, // largo de la conexión en um, , T=1.5ms, Lambda=4-17mm, r_neurona=(5E-6,1.5E-3m)
        1, // radio n y la velocidad de salida V=(2.8-9.7m/s)myelinated, V=(max:C0=176m/s) La suma de los radios da tamaño a neurona)
        0, // segmento, calculado automáticamente al crear la conex
        1  // peso de la conexión, sensnibilidad de la conex de entrada.
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
    // Se colocan valores double en las interfaces de entrada de la neurona
    tmp_int=neurona.push_msg_in(input_0,0);
    tmp_int=neurona.push_msg_in(input_1,1);
    // Se evalúa
    neurona.evaluate();
    // Se extrae el valor de la salida en tmp_double
    tmp_int=neurona.pop_msg_out(tmp_double,0);
    //Se imprime resultado
    std::cout << "Input 0  = " << input_0 << std::endl;
    std::cout << "Input 1  = " << input_1 << std::endl;
    std::cout << "Output 0 = " << tmp_double << std::endl;
}

void test2() {
    std::cout << "Neuron_d_test test 2" << std::endl;
    std::cout << "%TEST_FAILED% time=0 testname=test2 (Neuron_d_test) message=error message sample" << std::endl;
}

int main(int argc, char** argv) {
    std::cout << "%SUITE_STARTING% Neuron_d_test" << std::endl;
    std::cout << "%SUITE_STARTED%" << std::endl;

    std::cout << "%TEST_STARTED% test1 (Neuron_d_test)" << std::endl;
    test1(1,-1);
    std::cout << "%TEST_FINISHED% time=0 test1 (Neuron_d_test)" << std::endl;

    std::cout << "%TEST_STARTED% test2 (Neuron_d_test)\n" << std::endl;
    test2();
    std::cout << "%TEST_FINISHED% time=0 test2 (Neuron_d_test)" << std::endl;

    std::cout << "%SUITE_FINISHED% time=0" << std::endl;

    return (EXIT_SUCCESS);
}

