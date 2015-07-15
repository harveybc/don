/* 
 * File:   Evaluator.h
 * Author: harveybc
 * 
 * Evaluates a dataset on a neural network inputs, and the outputs of the net
 * are the inputs of a simulator wich outputs the efficiency.
 * For supervised training, the simulator mesures error of neural network's 
 * outputs from a training signal.
 * For unsupervised training, the simulator generates the efficiency based on
 * measurements in the simulation after some actuation in the simulator from
 * the outputs of the neural network.
 *
 * Created on 19 de junio de 2015, 03:35 AM
 */

#ifndef EVALUATOR_H
#define	EVALUATOR_H

class Evaluator {
public:
        // feedback input of fitness (normalized equity) float
    // feedback input of order_status (buy/sell/nothing) bools 
    // feedback input of normalized order_profit  float
    // feedback input of order_time_elapsed float

    void iterate_ann(); ///> evaluates 1 data from dataset on a neural 
                        ///> network inputs and it´s outputs are evaluated in a 
                        ///> simulation from wich the eficiency is extracted
    void iterate_sim(); ///> evaluates 1 data from the outputs of a neural
                        ///> network in a simulator wich produces the fitness
    float get_fitness();     ///> returns the fitness 
    float get_efficiency();  ///> returns the efficiency (normalized fitness)
    void evaluate_dataset();    ///> rvaluates 1
    // constructors 
    Evaluator();
    Evaluator(const Evaluator& orig);
    virtual ~Evaluator();
private:
    float fitness;
};

#endif	/* EVALUATOR_H */

