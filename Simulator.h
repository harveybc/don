/* 
 * File:   Simulator.h
 * Author: harveybc
 *
 * 
 * 
 * Created on 21 de junio de 2015, 02:51 AM
 */

#ifndef SIMULATOR_H
#define	SIMULATOR_H
#include "SpikingEvaluator.h"
#include "Candlestick.h"

class Simulator : SpikingEvaluator {
public:
    // normalize(): initializes the required normalization factors from a 
    // dataset analysis
    void normalize(float max_volume, float min_volume);      
    // step() evaluates inputs in a ANN and the outputs are applied to the 
    // simulator as controls for a simulated agent model
    void step(std::vector <unsigned char> inputs);      
    // executes the command cmd_type with parameters volume, stop-loss and 
    // take profit in the simulated agent model
    void model(int cmd_type, float vol, float sl, float tp);
    // constructors
    Simulator(int n_inputs, int n_outputs);
    Simulator(const Simulator& orig);
    virtual ~Simulator();
    // feedback inputs:
    
    // feedback input of fitness (normalized equity) float
    // feedback input of order_status (buy/sell/nothing) bools 
    // feedback input of normalized order_profit  float
    // feedback input of order_time_elapsed float

    // simulated agent inputs (controls)
    float open_order_short;
    float tp_short;
    float sl_short;
    float volume_short;
    float close_order_short;
    float open_order_long;
    float tp_long;
    float sl_long;
    float volume_long;
    float close_order_short;
    // simulation state
    int order_status;       // input for the ANN
    float fitness;         // in this case the fitness is the equity - ()
    float equity;          
    float take_profit;
    float stop_loss;
    float volatility;      // input for the ANN
    float agressiveness;   // output of the ANN
    int spread;
    float time_from_last;  // input for the ANN?
    int cons_losses;
    float cons_losses_d;
    int cons_wins;
    float cons_wins_d;
    float max_drawdown;
    int short_pos_won;
    int long_pos_won;
private:    
    float min_volume;
    float max_volume;
};

#endif	/* SIMULATOR_H */

