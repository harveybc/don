/* 
 * File:   Candlestick.h
 * Author: harveybc
 *
 * Created on 22 de junio de 2015, 07:43 PM
 */

#ifndef CANDLESTICK_H
#define	CANDLESTICK_H

class Candlestick {
public:
    Candlestick(float op, float cl, float hi, float lo, float vol, 
            unsigned long int tm);
    Candlestick(const Candlestick& orig);
    virtual ~Candlestick();
private:
    float open;
    float close;
    float high;
    float low;
    float volume;
    unsigned long int time;
};
        // para cada entrada 

        // get normalized value volume
        
        // get w
        // get theta
        // get time of the day
        // get day of the week
        // get day of the month

#endif	/* CANDLESTICK_H */

