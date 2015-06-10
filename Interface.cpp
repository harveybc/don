/* 
 * File:   Interface.cpp
 * Author: harveybc
 * 
 * Created on 9 de junio de 2015, 11:30 AM
 */

#include <deque>

#include "Interface.h"

// message management
MessageClass Interface::read_msg(){   ///< returns the front of the deque
    return(buffer.front());
}

void Interface::push_msg(MessageClass msg){ ///< puts msg into the back of the deque
    buffer.push_back(msg);
    buffer.pop_front();
}

void Interface::pop_msg(){            ///< removes msg from the front of the queue
    buffer.pop_front();
}

// buffer management
int Interface::get_buffer_size(){     ///< returns the buffer size
    return buffer.size();
}    

void Interface::resize_buffer(int if_size, MessageClass init_msg){      ///< changes the size of the buffer
    buffer.resize(if_size, init_msg);
}

void Interface::reset(MessageClass init_msg){  ///< fills the buffer with the init_msg
    buffer.assign(buffer.size(), init_msg);
}
// constructors
Interface::Interface(int if_size, MessageClass init_msg){
    buffer.assign(if_size, init_msg);
} 

Interface::Interface(const Interface& orig) {
}

Interface::~Interface() {
}

