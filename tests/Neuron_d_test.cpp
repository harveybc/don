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
    // Se crea una neurona de 2 entradas y 1 salida.
    Neuron_d neurona;
    // Crea 2 conexiones de entrada
    neurona.add_interfaces_in(input_0);
    neurona.add_interfaces_out(input_1);
    // Crea 1 conexión de salida
    
    // Se colocan valores double en las interfaces de entrada de la neurona
    tmp_int=neurona.push_msg_in(input_0,0);
    tmp_int=neurona.push_msg_in(input_1,1);
    // Se evalúa
    
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

