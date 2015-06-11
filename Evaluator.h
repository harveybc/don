/* 
 * File:   Evaluator.h
 * Author: harveybc
 *
 * Created on 11 de junio de 2015, 01:01 AM
 */

#ifndef EVALUATOR_H
#define	EVALUATOR_H

class Evaluator {
public:
    void evaluate();
    void evaluate_node(int node_id);
    Evaluator();
    Evaluator(const Evaluator& orig);
    virtual ~Evaluator();
private:

};

#endif	/* EVALUATOR_H */

