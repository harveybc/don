/* 
 * File:   FractalRegister.h
 * Author: harveybc
 *
 * Created on 5 de junio de 2015, 03:04 AM
 * NECESARIO?
 */

#ifndef FRACTALREGISTER_H
#define	FRACTALREGISTER_H

class FractalRegister {
public:
    bool    get_register_b(int index);
    int     get_register_i(int index);
    double  get_register_d(int index);
    void    set_register_b(int index, bool value);
    void    set_register_d(int index, int value);
    void    set_register_i(int index, double value);
    int     new_register_b(bool value);
    int     new_register_d(int value);
    int     new_register_i(double value);
    FractalRegister();
    FractalRegister(const FractalRegister& orig);
    virtual ~FractalRegister();
private:
    std::vector<bool> register_b;   ///< ProgramÂ´s boolean variables
    std::vector<int> register_i;    ///< ProgramÂ´s int variables
    std::vector<double> register_d; ///< ProgramÂ´s double variables
};

#endif	/* FRACTALREGISTER_H */

