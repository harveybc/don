/* 
 * File:   Axon.cpp
 * Author: harveybc
 * 
 * Created on 9 de junio de 2015, 11:30 AM
 */

#include <deque>

#include "Axon.h"

// message management
MessageClass Axon::read_msg(int segment){   ///< returns the front of the deque
    return(buffer[segment]);
}

void Axon::push_msg(MessageClass msg){ ///< puts msg into the back of the deque
    buffer.push_back(msg);
    buffer.pop_front();
}

void Axon::pop_msg(){            ///< removes msg from the front of the queue
    buffer.pop_front();
}

// buffer management
int Axon::get_buffer_size(){     ///< returns the buffer size
    return buffer.size();
}    

void Axon::resize_buffer(int if_size, MessageClass init_msg){      ///< changes the size of the buffer
    buffer.resize(if_size, init_msg);
}

void Axon::reset(MessageClass init_msg){  ///< fills the buffer with the init_msg
    buffer.assign(buffer.size(), init_msg);
}
// constructors
Axon::Axon(int if_size, MessageClass init_msg){
    buffer.assign(if_size, init_msg);
} 

Axon::Axon(const Axon& orig) {
}

Axon::~Axon() {
}

