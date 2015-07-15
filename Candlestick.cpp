/* 
 * File:   Candlestick.cpp
 * Author: harveybc
 * 
 * Created on 22 de junio de 2015, 07:43 PM
 */

#include "Candlestick.h"

Candlestick::Candlestick(float op, float cl, float hi, float lo, float vol, 
            unsigned long int tm){
    open   = op;
    close  = cl;
    high   = hi;
    low    = lo;
    volume = vol;
    time   = tm;
}

Candlestick::Candlestick(const Candlestick& orig) {
}

Candlestick::~Candlestick() {
}

