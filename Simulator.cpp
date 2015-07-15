/* 
 * File:   Simulator.cpp
 * Author: harveybc
 * 
 * Created on 21 de junio de 2015, 02:51 AM
 */

#include "Simulator.h"

void Simulator::normalize(float max_vol, float min_vol){
    min_volume = min_vol;
    max_volume = max_vol;
}

// Decreases each input and when it reaches 0, puts a pulse (true) in the ANN
// inputs, else puts a false.
void Simulator::step(std::vector<char> inputs){
    int i,j; // cycle counters
    std::vector<char>::iterator it; // iterator for inputs
    std::vector<char>::iterator tmp_it = inputs.end();
    // Evaluates a period (127 ticks)
    // Push spike train inputs in the first output segment of the ANN input Neurones
    for (i=0; i < 127; i++) {
        j=0;
        for (it = inputs.begin(); it =! tmp_it;
                it++) {
            // if input == 0 puts a true pulse, else puts a false pulse
           if (! *it){
               FractalMachine::push_message(j++, 0, true);
           }
           else
           {
               FractalMachine::push_message(j++, 0, false);
           }
           // decreases input value
           *it--;
        }
        
    }

}

Simulator::Simulator(int n_inputs, int n_outputs): SpikingEvaluator(int n_inputs, int n_outputs) {

}

Simulator::Simulator(const Simulator& orig) {
}

Simulator::~Simulator() {
}

